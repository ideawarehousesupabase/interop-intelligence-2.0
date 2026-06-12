import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  FileCode2,
  ArrowRight,
  Copy,
  Check,
  ChevronRight,
  Filter,
  RotateCcw,
  Lock,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { messageCatalog, type MessageDetail, type MessageField } from "../data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/reasoning/$messageId")({ component: Reasoning });

// Fallback when an unknown messageId is requested.
const fallback: MessageDetail = Object.values(messageCatalog)[0];

function stripHL7(hl7: string, fields: MessageField[], included: Record<string, boolean>) {
  const lines = hl7.split("\n");
  return lines
    .map((line) => {
      const parts = line.split("|");
      const seg = parts[0];
      fields.forEach((f) => {
        if (f.segment === seg && !included[f.key] && parts[f.index] !== undefined) {
          parts[f.index] = "";
        }
      });
      return parts.join("|");
    })
    .join("\n");
}

// Parse HL7 segments into a lookup keyed by segment name.
function parseSegments(hl7: string): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  hl7.split("\n").forEach((line) => {
    const parts = line.split("|");
    if (parts[0]) map[parts[0]] = parts;
  });
  return map;
}

// Transform a single HL7 raw value into the FHIR-shaped value for that field.
function transformField(f: MessageField, raw: string | undefined): unknown {
  if (raw === undefined || raw === "") return undefined;
  const comps = raw.split("^");
  const key = `${f.segment}-${f.index}`;
  switch (key) {
    case "PID-3": {
      const system = comps[3]
        ? `https://${comps[3].toLowerCase()}.nhs.uk/${comps[4]?.toLowerCase() || "id"}`
        : "urn:hl7:identifier";
      const sys = comps[3] === "NHS" ? "https://fhir.nhs.uk/Id/nhs-number" : system;
      return [{ system: sys, value: comps[0] }];
    }
    case "PID-5":
      return [{ family: comps[0], given: comps.slice(1, 3).filter(Boolean) }];
    case "PID-7": {
      const v = comps[0];
      return v.length >= 8 ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` : v;
    }
    case "PID-8": {
      const m: Record<string, string> = { M: "male", F: "female", O: "other", U: "unknown" };
      return m[comps[0]] ?? comps[0].toLowerCase();
    }
    case "PID-11":
      return [
        {
          line: [comps[0]].filter(Boolean),
          city: comps[2],
          postalCode: comps[4],
          country: comps[5],
        },
      ];
    case "PID-13":
      return [{ system: "phone", value: comps[0] }];
    case "OBX-3":
      // f.key disambiguates identifier vs code.
      if (f.key === "identifier") return [{ system: "urn:loinc", value: comps[0] }];
      return {
        coding: [{ system: "http://loinc.org", code: comps[0], display: comps[1] }],
      };
    case "OBX-5": {
      const n = Number(comps[0]);
      return Number.isFinite(n) ? { value: n, system: "http://unitsofmeasure.org" } : comps[0];
    }
    case "OBX-6":
      return comps[0];
    case "OBX-7": {
      const m = comps[0].match(/^([\d.]+)\s*-\s*([\d.]+)$/);
      return m ? [{ low: { value: Number(m[1]) }, high: { value: Number(m[2]) } }] : [{ text: comps[0] }];
    }
    case "OBX-11": {
      const m: Record<string, string> = { F: "final", P: "preliminary", C: "corrected" };
      return m[comps[0]] ?? comps[0].toLowerCase();
    }
    case "OBR-3":
      return [{ system: "urn:accession", value: raw }];
    case "OBR-4":
      return [{ coding: [{ code: comps[0], display: comps[1] }] }];
    case "OBR-7": {
      const v = comps[0];
      return v.length >= 12
        ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}T${v.slice(8, 10)}:${v.slice(10, 12)}:00Z`
        : v;
    }
    case "OBR-16":
      return { display: `${comps[5] ? comps[5] + " " : ""}${comps[2] || ""} ${comps[1] || ""}`.trim() };
    case "OBR-24":
      return [{ code: comps[0] }];
    case "OBR-25":
      return comps[0] === "CM" ? "available" : comps[0].toLowerCase();
    case "RXE-2":
      return {
        coding: [{ system: "http://snomed.info/sct", code: comps[0], display: comps[1] }],
      };
    case "RXE-3": {
      const n = Number(comps[0]);
      return Number.isFinite(n) ? { value: n } : { text: comps[0] };
    }
    case "RXE-5":
      return comps[0];
    case "RXE-6": {
      const route: Record<string, string> = { PO: "Oral", IV: "Intravenous", IM: "Intramuscular" };
      return { coding: [{ code: comps[0], display: route[comps[0]] || comps[0] }] };
    }
    case "RXE-1":
      return [{ text: raw }];
    case "RXE-13":
      return { reference: `Practitioner/${comps[0]}` };
    default:
      return raw;
  }
}

function buildFHIRObject(
  fhir: Record<string, unknown>,
  fields: MessageField[],
  included: Record<string, boolean>,
  segments: Record<string, string[]>,
) {
  const out: Record<string, unknown> = {
    resourceType: fhir.resourceType,
    id: fhir.id,
  };
  // Preserve fields not in the toggle list (e.g. status/intent for resources).
  const fieldKeys = new Set(fields.map((f) => f.fhirKey));
  Object.entries(fhir).forEach(([k, v]) => {
    if (k === "resourceType" || k === "id") return;
    if (!fieldKeys.has(k)) out[k] = v;
  });
  fields.forEach((f) => {
    if (!included[f.key]) return;
    const parts = segments[f.segment];
    if (!parts) return;
    const raw = parts[f.index];
    const value = transformField(f, raw);
    if (value !== undefined) out[f.fhirKey] = value;
  });
  return out;
}

function loadProjectRequirements(projectId: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(`project-requirements:${projectId}`);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function Reasoning() {
  const { messageId } = Route.useParams();
  const detail = messageCatalog[messageId] ?? fallback;
  const { fields, reasoningSteps } = detail;

  const projectRequirements = useMemo(
    () => loadProjectRequirements(detail.projectId),
    [detail.projectId],
  );
  const fieldExcludedByProject = (f: MessageField) =>
    projectRequirements[`${f.segment}-${f.index}`] === false;

  const initialIncluded = useMemo(
    () => Object.fromEntries(fields.map((f) => [f.key, !fieldExcludedByProject(f)])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, projectRequirements],
  );

  const [copiedHL7, setCopiedHL7] = useState(false);
  const [copiedFHIR, setCopiedFHIR] = useState(false);
  const [included, setIncluded] = useState<Record<string, boolean>>(initialIncluded);

  // Re-sync when navigating between messages/projects.
  useEffect(() => {
    setIncluded(initialIncluded);
  }, [initialIncluded]);

  const segments = useMemo(() => parseSegments(detail.hl7), [detail.hl7]);
  const hl7Text = useMemo(() => stripHL7(detail.hl7, fields, included), [detail.hl7, fields, included]);
  const fhirObj = useMemo(
    () => buildFHIRObject(detail.fhir, fields, included, segments),
    [detail.fhir, fields, included, segments],
  );
  const fhirText = useMemo(() => JSON.stringify(fhirObj, null, 2), [fhirObj]);

  const toggle = (key: string) => {
    const f = fields.find((x) => x.key === key);
    if (f && fieldExcludedByProject(f)) {
      toast.error("Excluded by project requirements. Re-enable in the project's Requirements settings.");
      return;
    }
    setIncluded((p) => ({ ...p, [key]: !p[key] }));
  };
  const resetAll = () =>
    setIncluded(initialIncluded);

  const copy = async (text: string, setter: (v: boolean) => void, label: string) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setter(false), 2000);
  };

  const includedCount = Object.values(included).filter(Boolean).length;
  const statusTone =
    detail.status === "Success"
      ? "bg-success/15 text-success border-success/30"
      : detail.status === "Warning"
        ? "bg-warning/15 text-warning border-warning/30"
        : "bg-destructive/15 text-destructive border-destructive/30";

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
        <Link to="/projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          to="/projects/$id"
          params={{ id: detail.projectId }}
          className="hover:text-foreground transition-colors"
        >
          {detail.projectName}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Message {messageId}</span>
      </div>
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">Reasoning Chain Viewer: {messageId}</h1>
          <Badge variant="outline" className="bg-primary/15 text-primary border-primary/30">
            <Sparkles className="h-3 w-3 mr-1" />
            Explainable AI
          </Badge>
          <Badge variant="outline" className={statusTone}>
            {detail.status}
          </Badge>
          <Badge variant="outline">{detail.type}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {detail.source} → {detail.destination} · received at {detail.timestamp}
        </p>
      </div>

      {/* Field filter — improved UI */}
      <Card className="p-5 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/15 text-primary flex items-center justify-center">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold leading-tight">Field filter</h3>
              <p className="text-xs text-muted-foreground">
                Toggle fields to include. Input and output update in real time.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {includedCount} / {fields.length} included
            </Badge>
            <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs" onClick={resetAll}>
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {fields.map((f) => {
            const on = included[f.key];
            const locked = fieldExcludedByProject(f);
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => toggle(f.key)}
                aria-pressed={on}
                disabled={locked}
                title={locked ? "Excluded by project requirements" : undefined}
                className={`group relative text-left p-3 rounded-lg border transition-all ${
                  locked
                    ? "border-destructive/30 bg-destructive/5 opacity-60 cursor-not-allowed"
                    : on
                      ? "border-primary/50 bg-primary/10 shadow-sm"
                      : "border-border bg-muted/20 hover:bg-muted/40 opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      {f.segment}-{f.index}
                      {locked && <Lock className="h-2.5 w-2.5" />}
                    </div>
                    <div className="text-sm font-medium leading-tight mt-0.5 truncate">
                      {f.label.replace(/\s*\([^)]*\)\s*$/, "")}
                    </div>
                    {locked && (
                      <div className="text-[10px] text-destructive mt-0.5">Excluded by project</div>
                    )}
                  </div>
                  <div
                    className={`h-5 w-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      on
                        ? "bg-primary text-primary-foreground"
                        : "bg-background border border-border"
                    }`}
                  >
                    {on && <Check className="h-3 w-3" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-info" />
              <span className="font-semibold text-sm">HL7 v2.5 — Input</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {detail.type}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={() => copy(hl7Text, setCopiedHL7, "HL7 message")}
              >
                {copiedHL7 ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy HL7
                  </>
                )}
              </Button>
            </div>
          </div>
          <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-background/40 text-foreground/90 whitespace-pre">
            {hl7Text}
          </pre>
        </Card>

        <Card className="p-0 overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-success" />
              <span className="font-semibold text-sm">FHIR R4 — Output</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-success/15 text-success border-success/30">
                UK Core ✓
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={() => copy(fhirText, setCopiedFHIR, "FHIR resource")}
              >
                {copiedFHIR ? (
                  <>
                    <Check className="h-3 w-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    Copy FHIR
                  </>
                )}
              </Button>
            </div>
          </div>
          <pre className="p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-background/40 text-foreground/90">
            {fhirText}
          </pre>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Reasoning chain</h3>
          <Badge variant="outline" className="text-xs ml-auto">
            {reasoningSteps.length} steps
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mb-6">
          Step-by-step transformation logic with full provenance.
        </p>

        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-accent to-success" />
          <div className="space-y-4">
            {reasoningSteps.map((s) => (
              <div key={s.step} className="relative flex gap-4 pl-2">
                <div
                  className="relative z-10 h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: "var(--gradient-primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  {s.step}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{s.title}</h4>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <Badge variant="outline" className="text-[10px] py-0">
                      verified
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
