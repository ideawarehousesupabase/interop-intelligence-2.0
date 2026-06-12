import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Radio, Server, AlertCircle, Activity, XCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { StatCard } from "../components/StatCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { latencyData, alerts, platformMetrics } from "../data/mock";

export const Route = createFileRoute("/_app/monitoring")({ component: Monitoring });

const sevColor: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-info/15 text-info border-info/30",
};

const services = [
  { name: "Interop Engine", status: "Operational", uptime: "99.99%" },
  { name: "FHIR API Gateway", status: "Operational", uptime: "99.97%" },
  { name: "NHS Spine Connector", status: "Operational", uptime: "99.95%" },
  { name: "Validation Service", status: "Degraded", uptime: "98.12%" },
  { name: "Audit Logger", status: "Operational", uptime: "100%" },
  { name: "Terminology Server", status: "Operational", uptime: "99.91%" },
];

const failedMessages = [
  { id: "MSG-8821", type: "ADT^A01", source: "Epic EHR", error: "Missing PID-3 identifier", time: "10:42" },
  { id: "MSG-8830", type: "ORU^R01", source: "Cerner Lab", error: "Unsupported LOINC code 99999-9", time: "10:48" },
  { id: "MSG-8845", type: "ADT^A04", source: "Meditech", error: "Invalid DOB format", time: "10:55" },
  { id: "MSG-8851", type: "ORM^O01", source: "Sunquest", error: "Schema validation failed (PV1-39)", time: "11:02" },
  { id: "MSG-8867", type: "ADT^A08", source: "Epic EHR", error: "Mapping rule timeout", time: "11:14" },
  { id: "MSG-8872", type: "SIU^S12", source: "PACS", error: "Required field Patient.identifier missing", time: "11:21" },
  { id: "MSG-8889", type: "ADT^A01", source: "Cerner Lab", error: "Duplicate message ID", time: "11:33" },
  { id: "MSG-8901", type: "ORU^R01", source: "Epic EHR", error: "Terminology binding rejected", time: "11:47" },
];

function Monitoring() {
  const [failedOpen, setFailedOpen] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Monitoring & Alerts</h1>
        <p className="text-sm text-muted-foreground">
          Real-time platform health, latency, and incident feed.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Uptime (30d)"
          value={platformMetrics.uptime}
          icon={Activity}
          accent="success"
          delta="SLA met"
          trend="up"
        />
        <StatCard
          label="Active systems"
          value={platformMetrics.activeIntegrations}
          icon={Server}
          accent="primary"
        />
        <button
          type="button"
          onClick={() => setFailedOpen(true)}
          className="text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        >
          <StatCard
            label="Failed transforms"
            value={platformMetrics.failedMappings}
            icon={AlertCircle}
            accent="warning"
            delta="last 24h — click to view"
            trend="down"
          />
        </button>
        <StatCard
          label="API health"
          value="A+"
          icon={Radio}
          accent="info"
          delta={`P95 ${platformMetrics.apiHealthP95}`}
        />
      </div>

      <Dialog open={failedOpen} onOpenChange={setFailedOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-destructive" />
              Failed transforms ({failedMessages.length})
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="pb-2 font-medium">Message</th>
                  <th className="pb-2 font-medium">Type</th>
                  <th className="pb-2 font-medium">Source</th>
                  <th className="pb-2 font-medium">Error</th>
                  <th className="pb-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {failedMessages.map((m) => (
                  <tr key={m.id} className="hover:bg-muted/30">
                    <td className="py-2 font-mono text-xs">{m.id}</td>
                    <td className="py-2 text-xs">{m.type}</td>
                    <td className="py-2 text-xs">{m.source}</td>
                    <td className="py-2 text-xs text-destructive">{m.error}</td>
                    <td className="py-2 text-xs text-muted-foreground tabular-nums">{m.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>


      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold">Transformation latency</h3>
          <p className="text-xs text-muted-foreground mb-4">Avg ms / hour (last 24h)</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="lat" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Area
                type="monotone"
                dataKey="ms"
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                fill="url(#lat)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold mb-4">Live alerts</h3>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.id} className="p-3 rounded-md border border-border bg-card/50">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="outline" className={sevColor[a.severity]}>
                    {a.type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-xs text-foreground/90">{a.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-semibold mb-4">Service status</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between p-3 rounded-md border border-border"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${s.status === "Operational" ? "bg-success animate-pulse" : "bg-warning"}`}
                />
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.status}</div>
                </div>
              </div>
              <span className="text-xs font-mono tabular-nums text-muted-foreground">
                {s.uptime}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
