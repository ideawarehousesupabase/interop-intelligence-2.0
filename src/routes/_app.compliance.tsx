import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck,
  FileText,
  Lock,
  ClipboardCheck,
  Download,
  FileDown,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { StatCard } from "../components/StatCard";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { integrations } from "../data/mock";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/compliance")({ component: Compliance });

const dtacStatuses = ["Approved", "In Review", "Approved", "Conditional", "Approved", "Approved"];
const securityStandards = [
  "ISO 27001",
  "ISO 27001",
  "Cyber Essentials+",
  "ISO 27001",
  "SOC 2 Type II",
  "ISO 27001",
];
const reportCatalog = [
  { name: "DCB0129 Clinical Risk Assessment", status: "Approved" },
  { name: "DTAC Compliance Statement", status: "Approved" },
  { name: "Security Penetration Test Report", status: "Approved" },
  { name: "Data Protection Impact Assessment", status: "In Review" },
  { name: "GDPR Processing Record", status: "Approved" },
  { name: "Information Governance Toolkit", status: "Approved" },
];
const auditCatalog = [
  { user: "dr.smith@nhs.uk", action: "Viewed integration" },
  { user: "admin@trust.nhs.uk", action: "Updated mapping" },
  { user: "data.eng@trust.nhs.uk", action: "Exported audit report" },
  { user: "compliance@nhs.uk", action: "Approved release" },
  { user: "ciso@trust.nhs.uk", action: "Reviewed alert" },
  { user: "ops@nhs.uk", action: "Rotated credentials" },
  { user: "sec.lead@nhs.uk", action: "Acknowledged finding" },
];

function Compliance() {
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(integrations[0].id);
  const selectedProject = integrations.find((p) => p.id === selectedProjectId) || integrations[0];
  const projectIndex = Math.max(
    0,
    integrations.findIndex((p) => p.id === selectedProjectId),
  );
  const seed = projectIndex + 1;
  const dcbScore = 90 + ((projectIndex + 3) % 10);
  const auditEvents = 180 + projectIndex * 24;
  const dtacStatus = dtacStatuses[projectIndex % dtacStatuses.length];
  const securityStandard = securityStandards[projectIndex % securityStandards.length];

  const complianceTrend = ["Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((month, i) => ({
    month,
    score: Math.max(60, Math.min(100, 70 + i * 3 + ((seed * 7 + i * 5) % 12))),
  }));
  const complianceReports = reportCatalog
    .slice(0, 3 + (projectIndex % 3))
    .map((r, i) => ({
      ...r,
      id: `r-${projectIndex}-${i}`,
      date: `2026-${String(5 - (i % 5)).padStart(2, "0")}-${String(((seed * 3 + i * 7) % 27) + 1).padStart(2, "0")}`,
    }));
  const auditLogs = auditCatalog
    .slice(0, 4 + (projectIndex % 3))
    .map((a, i) => ({
      ...a,
      id: `au-${projectIndex}-${i}`,
      resource: selectedProject.id,
      time: `2026-05-${String(30 - i).padStart(2, "0")} ${String(8 + ((seed + i) % 10)).padStart(2, "0")}:${String((seed * 11 + i * 7) % 60).padStart(2, "0")}`,
    }));

  const handleExportPackage = () => {
    toast.success("Compliance package exported successfully", {
      description: "Includes DTAC Status, DCB0129 Assessment, Security Summary, and Audit Logs.",
    });
  };

  const handleGenerateReport = () => {
    setGenerated(false);
    setAuditModalOpen(true);
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Compliance Center</h1>
          <p className="text-sm text-muted-foreground">
            DTAC, DCB0129, and security posture for{" "}
            <span className="font-medium text-foreground">{selectedProject.name}</span>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
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
          <Button variant="outline" className="gap-2" onClick={handleExportPackage}>
            <FileDown className="h-4 w-4" />
            Export Compliance Package
          </Button>
          <Button className="gap-2" onClick={handleGenerateReport}>
            <FileCheck className="h-4 w-4" />
            Generate Audit Report
          </Button>
        </div>
      </div>

      {/* Audit Report Modal */}
      <Dialog open={auditModalOpen} onOpenChange={setAuditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-primary" />
              {generating ? "Generating Audit Report…" : "Audit Report Generated"}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            {generating ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">Compiling compliance data…</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  The following compliance components have been included in the report:
                </p>
                {[
                  {
                    label: "DTAC Assessment",
                    desc: "Digital Technology Assessment Criteria — full status review",
                  },
                  {
                    label: "DCB0129 Clinical Risk",
                    desc: "Clinical safety case report and hazard log summary",
                  },
                  {
                    label: "Security Controls",
                    desc: "ISO 27001 controls, pen-test results, and encryption status",
                  },
                  {
                    label: "Audit Logs",
                    desc: "Complete audit trail with 248 events for the current period",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 p-3 rounded-md border border-border bg-muted/20"
                  >
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">{item.label}</div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4 p-3 rounded-md bg-success/10 border border-success/20">
                  <p className="text-xs text-success font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Report ready — generated on{" "}
                    {new Date().toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    at{" "}
                    {new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </>
            )}
          </div>
          {!generating && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setAuditModalOpen(false)}>
                Close
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  toast.success("Audit report downloaded (mock)");
                  setAuditModalOpen(false);
                }}
              >
                <Download className="h-4 w-4" />
                Download Report
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="DTAC Status"
          value={dtacStatus}
          icon={ShieldCheck}
          accent={dtacStatus === "Approved" ? "success" : dtacStatus === "In Review" ? "warning" : "info"}
        />
        <StatCard
          label="DCB0129"
          value={`${dcbScore}%`}
          icon={ClipboardCheck}
          accent="primary"
          delta="Clinical risk assessed"
        />
        <StatCard label="Security" value={securityStandard} icon={Lock} accent="info" />
        <StatCard
          label="Audit Health"
          value="A+"
          icon={FileText}
          accent="success"
          delta={`${auditEvents} events logged`}
        />
      </div>

      <Card className="p-5">
        <h3 className="font-semibold">Compliance timeline</h3>
        <p className="text-xs text-muted-foreground mb-4">Overall posture trend</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={complianceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis domain={[70, 100]} stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="var(--color-chart-2)"
              strokeWidth={2.5}
              dot={{ r: 4, fill: "var(--color-chart-2)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold mb-4">Audit logs</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="pb-2 font-medium">User</th>
                <th className="pb-2 font-medium">Action</th>
                <th className="pb-2 font-medium">Resource</th>
                <th className="pb-2 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {auditLogs.map((l) => (
                <tr key={l.id} className="hover:bg-muted/30">
                  <td className="py-3 font-mono text-xs">{l.user}</td>
                  <td className="py-3">{l.action}</td>
                  <td className="py-3">
                    <code className="text-xs text-info">{l.resource}</code>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground tabular-nums">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">Compliance reports</h3>
          <div className="space-y-2">
            {complianceReports.map((r) => (
              <div
                key={r.id}
                className="flex items-start gap-3 p-3 rounded-md border border-border hover:bg-muted/30"
              >
                <FileText className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{r.date}</span>
                    <Badge
                      variant="outline"
                      className={
                        r.status === "Approved"
                          ? "bg-success/15 text-success border-success/30 text-[10px]"
                          : "bg-warning/15 text-warning border-warning/30 text-[10px]"
                      }
                    >
                      {r.status}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => toast.success("Report downloaded (mock)")}
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
