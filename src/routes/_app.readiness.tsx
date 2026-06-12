import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, PlayCircle, Loader2 } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { integrations } from "../data/mock";

const checklistCatalog = [
  { name: "Schema Validity", detail: "All FHIR resources validate against R4 schema" },
  { name: "Terminology Compliance", detail: "SNOMED CT, LOINC, dm+d codes verified" },
  { name: "Data Completeness", detail: "Required fields populated across records" },
  { name: "NHS Readiness", detail: "UK Core profile conformance achieved" },
  { name: "Security Posture", detail: "TLS 1.3, OAuth scopes, audit logging enabled" },
  { name: "Performance SLA", detail: "P95 latency within 200ms target" },
];

const issueCatalog = [
  { title: "Missing patient DOB", resource: "Patient", severity: "high" },
  { title: "Invalid terminology code", resource: "Condition", severity: "medium" },
  { title: "Unsupported mapping (PV1-39)", resource: "Encounter", severity: "low" },
  { title: "Duplicate identifier", resource: "Patient", severity: "medium" },
  { title: "Stale reference", resource: "Observation", severity: "low" },
  { title: "Schema drift", resource: "DiagnosticReport", severity: "high" },
  { title: "Latency spike", resource: "Gateway", severity: "medium" },
];

const categories = ["Schema", "Terminology", "Completeness", "NHS", "Security"];

function buildReadinessData(projectIndex: number, health: number) {
  const seed = projectIndex + 1;
  const checklist = checklistCatalog.map((c, i) => ({
    ...c,
    passed: (seed * 7 + i * 13) % 5 !== 0 && health >= 60,
  }));
  const issueCount = health >= 95 ? 0 : health >= 90 ? 2 : health >= 80 ? 3 : health >= 60 ? 5 : 7;
  const issues = issueCatalog
    .slice(0, issueCount)
    .map((it, i) => ({ ...it, id: `i-${projectIndex}-${i}`, count: ((seed * 3 + i * 5) % 18) + 2 }));
  const scoring = categories.map((category, i) => {
    const base = Math.max(40, Math.min(99, health - 10 + ((seed * 11 + i * 17) % 20)));
    return { category, score: base };
  });
  return { checklist, issues, scoring };
}
import { toast } from "sonner";

export const Route = createFileRoute("/_app/readiness")({ component: Readiness });

const sevColor: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-info/15 text-info border-info/30",
};

function Readiness() {
  const [selectedProjectId, setSelectedProjectId] = useState(integrations[0].id);
  const selectedProject = integrations.find((p) => p.id === selectedProjectId) || integrations[0];
  const [overall, setOverall] = useState(selectedProject.health);
  const [assessing, setAssessing] = useState(false);

  const projectIndex = integrations.findIndex((p) => p.id === selectedProjectId);
  const { checklist: readinessChecklist, issues: readinessIssues, scoring: readinessScoring } =
    buildReadinessData(projectIndex < 0 ? 0 : projectIndex, selectedProject.health);

  const handleProjectChange = (id: string) => {
    setSelectedProjectId(id);
    const p = integrations.find((x) => x.id === id);
    if (p) setOverall(p.health);
  };

  const runAssessment = () => {
    setAssessing(true);
    toast.info("Running readiness assessment…");
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 15) + 85; // 85–99
      setOverall(newScore);
      setAssessing(false);
      toast.success(`Readiness assessment completed — Score: ${newScore}%`);
    }, 2500);
  };

  const readinessLabel =
    overall >= 95
      ? "Production-ready"
      : overall >= 85
        ? "Near-ready"
        : overall >= 70
          ? "Needs attention"
          : "Not ready";
  const readinessStyle =
    overall >= 95
      ? "bg-success/15 text-success border-success/30"
      : overall >= 85
        ? "bg-info/15 text-info border-info/30"
        : overall >= 70
          ? "bg-warning/15 text-warning border-warning/30"
          : "bg-destructive/15 text-destructive border-destructive/30";
  const issueCount: number = overall >= 95 ? 0 : overall >= 90 ? 2 : overall >= 85 ? 4 : 7;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Readiness Gates</h1>
          <p className="text-sm text-muted-foreground">
            Pre-production validation for{" "}
            <span className="font-medium text-foreground">{selectedProject.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedProjectId} onValueChange={handleProjectChange}>
            <SelectTrigger className="w-[260px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {integrations.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={runAssessment} disabled={assessing} className="gap-2">
            {assessing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running Assessment…
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                Run Readiness Assessment
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col items-center justify-center text-center">
          <div className="relative h-44 w-44">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="var(--color-muted)"
                strokeWidth="6"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                stroke="url(#grad)"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${(overall / 100) * 276} 276`}
                strokeLinecap="round"
                style={{ transition: "stroke-dasharray 0.8s ease-in-out" }}
              />
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold tracking-tight">{overall}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                readiness
              </div>
            </div>
          </div>
          <div className="mt-4">
            <Badge variant="outline" className={readinessStyle}>
              {readinessLabel}
            </Badge>
            <p className="text-xs text-muted-foreground mt-2">
              {issueCount === 0
                ? "No issues — all gates passed"
                : `${issueCount} advisory issue${issueCount !== 1 ? "s" : ""} to resolve`}
            </p>
          </div>
        </Card>

        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold mb-4">Validation checklist</h3>
          <div className="space-y-2">
            {readinessChecklist.map((c) => (
              <div
                key={c.name}
                className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-muted/30"
              >
                {c.passed ? (
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{c.name}</span>
                    <Badge
                      variant="outline"
                      className={
                        c.passed
                          ? "bg-success/15 text-success border-success/30 text-[10px]"
                          : "bg-destructive/15 text-destructive border-destructive/30 text-[10px]"
                      }
                    >
                      {c.passed ? "PASS" : "FAIL"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold">Readiness by category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={readinessScoring} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                type="number"
                domain={[0, 100]}
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis
                dataKey="category"
                type="category"
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="score" fill="var(--color-chart-2)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold flex items-center gap-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Open issues
          </h3>
          <div className="space-y-3">
            {readinessIssues.map((i) => (
              <div key={i.id} className="p-3 rounded-md border border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{i.title}</span>
                  <Badge variant="outline" className={sevColor[i.severity]}>
                    {i.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Resource: <code className="text-info">{i.resource}</code>
                  </span>
                  <span>{i.count} affected</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
