import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, AlertCircle, Activity, Database, Zap, Settings2, Check, ChevronDown, Filter } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "../components/ui/dialog";
import { StatCard } from "../components/StatCard";
import { integrations, transformationLogs, projectMessages, recentMessages, platformMetrics } from "../data/mock";
import { toast } from "sonner";

type SegmentKey = "MSH" | "PID" | "PV1" | "DG1";

const SEGMENT_FIELDS: Record<SegmentKey, { key: string; label: string; fhir: string }[]> = {
  MSH: [
    { key: "MSH-3", label: "Sending Application", fhir: "MessageHeader.source" },
    { key: "MSH-4", label: "Sending Facility", fhir: "MessageHeader.sender" },
    { key: "MSH-7", label: "Message Timestamp", fhir: "MessageHeader.timestamp" },
    { key: "MSH-9", label: "Message Type", fhir: "MessageHeader.eventCoding" },
    { key: "MSH-10", label: "Control ID", fhir: "MessageHeader.id" },
  ],
  PID: [
    { key: "PID-3", label: "Patient Identifier", fhir: "Patient.identifier" },
    { key: "PID-5", label: "Patient Name", fhir: "Patient.name" },
    { key: "PID-7", label: "Date of Birth", fhir: "Patient.birthDate" },
    { key: "PID-8", label: "Gender", fhir: "Patient.gender" },
    { key: "PID-11", label: "Address", fhir: "Patient.address" },
    { key: "PID-13", label: "Phone Number", fhir: "Patient.telecom" },
  ],
  PV1: [
    { key: "PV1-2", label: "Patient Class", fhir: "Encounter.class" },
    { key: "PV1-3", label: "Assigned Location", fhir: "Encounter.location" },
    { key: "PV1-7", label: "Attending Doctor", fhir: "Encounter.participant" },
    { key: "PV1-44", label: "Admit Date/Time", fhir: "Encounter.period.start" },
  ],
  DG1: [
    { key: "DG1-3", label: "Diagnosis Code", fhir: "Condition.code" },
    { key: "DG1-4", label: "Diagnosis Description", fhir: "Condition.code.text" },
    { key: "DG1-5", label: "Diagnosis Date/Time", fhir: "Condition.onsetDateTime" },
    { key: "DG1-6", label: "Diagnosis Type", fhir: "Condition.category" },
  ],
};

export const Route = createFileRoute("/_app/projects/$id")({ component: IntegrationDetail });


function IntegrationDetail() {
  const { id } = Route.useParams();
  const integration = integrations.find((i) => i.id === id) || integrations[0];
  const messages = projectMessages[integration.id] ?? recentMessages;

  const allFields = (Object.keys(SEGMENT_FIELDS) as SegmentKey[]).flatMap((s) =>
    SEGMENT_FIELDS[s].map((f) => f.key),
  );
  const storageKey = `project-requirements:${integration.id}`;
  const loadStored = (): Record<string, boolean> => {
    if (typeof window === "undefined") return Object.fromEntries(allFields.map((k) => [k, true]));
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, boolean>;
        return Object.fromEntries(allFields.map((k) => [k, parsed[k] ?? true]));
      }
    } catch {}
    return Object.fromEntries(allFields.map((k) => [k, true]));
  };
  const [requirements, setRequirements] = useState<Record<string, boolean>>(loadStored);
  const [draft, setDraft] = useState<Record<string, boolean>>(requirements);
  const [reqOpen, setReqOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<SegmentKey, boolean>>({
    MSH: true,
    PID: true,
    PV1: false,
    DG1: false,
  });
  const [segmentFilter, setSegmentFilter] = useState<"all" | "included" | "excluded">("all");

  const toggleDraft = (key: string) => setDraft((p) => ({ ...p, [key]: !p[key] }));
  const setAllInSegment = (seg: SegmentKey, value: boolean) =>
    setDraft((p) => {
      const next = { ...p };
      SEGMENT_FIELDS[seg].forEach((f) => (next[f.key] = value));
      return next;
    });

  const saveRequirements = () => {
    setRequirements(draft);
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(draft));
    } catch {}
    setReqOpen(false);
    toast.success("Field requirements saved for this project");
  };

  const includedCount = Object.values(requirements).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2 -ml-3">
          <Link to="/projects">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Link>
        </Button>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{integration.name}</h1>
          <Badge variant="outline" className="bg-success/15 text-success border-success/30">
            {integration.status}
          </Badge>
          <div className="ml-auto">
            <Dialog open={reqOpen} onOpenChange={(o) => { setReqOpen(o); if (o) setDraft(requirements); }}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Settings2 className="h-4 w-4" />
                  Requirements
                  <Badge variant="outline" className="ml-1 bg-background/20 border-primary-foreground/30 text-primary-foreground text-[10px]">
                    {includedCount}/{allFields.length}
                  </Badge>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Project field requirements</DialogTitle>
                  <DialogDescription>
                    Choose which HL7 fields are sent for the entire {integration.name} project.
                  </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-1">
                  {(Object.keys(SEGMENT_FIELDS) as SegmentKey[]).map((seg) => {
                    const segFields = SEGMENT_FIELDS[seg];
                    const onCount = segFields.filter((f) => draft[f.key]).length;
                    return (
                      <div key={seg} className="border border-border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="font-mono">{seg}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {onCount}/{segFields.length} included
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setAllInSegment(seg, true)}>All</Button>
                            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setAllInSegment(seg, false)}>None</Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {segFields.map((f) => {
                            const on = draft[f.key];
                            return (
                              <button
                                key={f.key}
                                type="button"
                                onClick={() => toggleDraft(f.key)}
                                className={`flex items-center gap-2 p-2 rounded border text-left transition-colors ${
                                  on ? "border-primary/50 bg-primary/10" : "border-border bg-muted/20 opacity-70"
                                }`}
                              >
                                <div className={`h-4 w-4 rounded flex items-center justify-center shrink-0 ${on ? "bg-primary text-primary-foreground" : "border border-border"}`}>
                                  {on && <Check className="h-3 w-3" />}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-xs font-mono text-muted-foreground">{f.key}</div>
                                  <div className="text-sm truncate">{f.label}</div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReqOpen(false)}>Cancel</Button>
                  <Button onClick={saveRequirements}>Save requirements</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {integration.source} → {integration.destination}
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Messages / day"
          value={platformMetrics.messagesPerDay}
          icon={Activity}
          accent="primary"
        />
        <StatCard
          label="Success rate"
          value={platformMetrics.successRate}
          icon={CheckCircle2}
          accent="success"
        />
        <StatCard label="Avg latency" value={platformMetrics.avgLatency} icon={Zap} accent="info" />
        <StatCard
          label="Readiness"
          value={`${integration.health}%`}
          icon={Database}
          accent="success"
        />
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Segments
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Per-segment field filters applied to every message in this project.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-md bg-muted/40 border border-border">
            <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1.5" />
            {(["all", "included", "excluded"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setSegmentFilter(v)}
                className={`px-2.5 py-1 text-xs rounded capitalize transition-colors ${
                  segmentFilter === v ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {(Object.keys(SEGMENT_FIELDS) as SegmentKey[]).map((seg) => {
            const segFields = SEGMENT_FIELDS[seg];
            const visible = segFields.filter((f) =>
              segmentFilter === "all" ? true : segmentFilter === "included" ? requirements[f.key] : !requirements[f.key],
            );
            const onCount = segFields.filter((f) => requirements[f.key]).length;
            const isOpen = expanded[seg];
            return (
              <div key={seg} className="border border-border rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-3 hover:bg-muted/30"
                  onClick={() => setExpanded((p) => ({ ...p, [seg]: !p[seg] }))}
                >
                  <div className="flex items-center gap-3">
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                    <Badge variant="outline" className="font-mono">{seg}</Badge>
                    <span className="text-sm font-medium">
                      {seg === "MSH" && "Message Header"}
                      {seg === "PID" && "Patient Identification"}
                      {seg === "PV1" && "Patient Visit"}
                      {seg === "DG1" && "Diagnosis"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
                      {onCount}/{segFields.length} sent
                    </Badge>
                  </div>
                </button>
                {isOpen && (
                  <div className="border-t border-border p-3 bg-muted/10">
                    {visible.length === 0 ? (
                      <div className="text-xs text-muted-foreground py-2 text-center">No fields match this filter.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {visible.map((f) => {
                          const on = requirements[f.key];
                          return (
                            <div
                              key={f.key}
                              className={`flex items-center gap-3 p-2 rounded border text-sm ${
                                on ? "border-primary/30 bg-primary/5" : "border-border bg-muted/20 opacity-70"
                              }`}
                            >
                              <div className={`h-2 w-2 rounded-full shrink-0 ${on ? "bg-success" : "bg-muted-foreground/40"}`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs text-info">{f.key}</span>
                                  <span className="truncate">{f.label}</span>
                                </div>
                                <div className="text-[11px] font-mono text-muted-foreground truncate">→ {f.fhir}</div>
                              </div>
                              <Badge variant="outline" className={`text-[10px] ${on ? "bg-success/15 text-success border-success/30" : "bg-muted text-muted-foreground"}`}>
                                {on ? "Sent" : "Skipped"}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>



      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold">Validation summary</h3>
          <div className="mt-4 space-y-3">
            {[
              { label: "Schema validation", value: platformMetrics.schemaValidation, ok: true },
              { label: "Terminology binding", value: platformMetrics.terminologyBinding, ok: true },
              { label: "Required elements", value: platformMetrics.requiredElements, ok: false },
              { label: "UK Core profile", value: platformMetrics.ukCoreProfile, ok: true },
            ].map((v) => (
              <div key={v.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  {v.ok ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-warning" />
                  )}
                  {v.label}
                </span>
                <span className="font-mono text-xs">{v.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Transformation statistics</h3>
          <div className="mt-4 space-y-4">
            {[
              { label: "Parsed segments", val: platformMetrics.parsedSegments },
              { label: "Mapped fields", val: platformMetrics.mappedFields },
              { label: "Resources created", val: platformMetrics.resourcesCreated },
              { label: "Errors", val: platformMetrics.errors },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-mono tabular-nums">{s.val.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Readiness score</h3>
          <div className="mt-6 flex items-center justify-center">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="-rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="var(--color-muted)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="var(--color-success)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(integration.health / 100) * 264} 264`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold">{integration.health}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  ready
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold mb-3">Mapping preview</h3>
          <div className="space-y-2 font-mono text-xs">
            {[
              ["PID-3", "Patient.identifier"],
              ["PID-5", "Patient.name"],
              ["PID-7", "Patient.birthDate"],
              ["PID-8", "Patient.gender"],
              ["PID-11", "Patient.address"],
              ["PV1-3", "Encounter.location"],
            ].map(([a, b]) => (
              <div key={a} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                <span className="text-info">{a}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-success">{b}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-3">Transformation logs</h3>
          <div className="space-y-1 font-mono text-xs max-h-72 overflow-auto">
            {transformationLogs.map((l) => (
              <div key={l.id} className="flex gap-3 p-2 rounded hover:bg-muted/30">
                <span className="text-muted-foreground tabular-nums">{l.time}</span>
                <span
                  className={
                    l.level === "WARN"
                      ? "text-warning"
                      : l.level === "ERROR"
                        ? "text-destructive"
                        : "text-info"
                  }
                >
                  {l.level}
                </span>
                <span className="text-foreground/80">{l.message}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Recent Messages</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 border-b border-border">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-medium">Message ID</th>
                <th className="px-5 py-3 font-medium">Message Type</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Timestamp</th>
                <th className="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-muted/30 group">
                  <td className="px-5 py-3.5 font-medium">{msg.id}</td>
                  <td className="px-5 py-3.5">
                    <Badge variant="outline">{msg.type}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={
                        msg.status === "Success"
                          ? "text-success"
                          : msg.status === "Warning"
                            ? "text-warning"
                            : "text-destructive"
                      }
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground tabular-nums">
                    {msg.timestamp}
                  </td>
                  <td className="px-5 py-3.5">
                    <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                      <Link to="/reasoning/$messageId" params={{ messageId: msg.id }}>
                        View
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
