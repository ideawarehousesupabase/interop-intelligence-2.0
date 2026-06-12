import { createFileRoute } from "@tanstack/react-router";
import { Activity, ShieldCheck, AlertTriangle, Heart, XCircle, TrendingUp } from "lucide-react";
import ReactFlow, { Background, Controls } from "reactflow";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { StatCard } from "../components/StatCard";
import {
  integrations,
  alerts,
  complianceTrend,
  transformationSuccess,
  governanceNodes,
  governanceEdges,
  platformMetrics,
} from "../data/mock";

export const Route = createFileRoute("/_app/dashboard")({ component: Dashboard });

const statusColor: Record<string, string> = {
  Ongoing: "bg-info/15 text-info border-info/30",
  Completed: "bg-success/15 text-success border-success/30",
};

const severityColor: Record<string, string> = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-info/15 text-info border-info/30",
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Interoperability Overview</h1>
        <p className="text-sm text-muted-foreground">
          Real-time governance of HL7 → FHIR pipelines across your organisation.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          label="Active Projects"
          value={platformMetrics.activeIntegrations}
          delta="+3 this month"
          trend="up"
          icon={Activity}
          accent="primary"
        />
        <StatCard
          label="Readiness Score"
          value={`${platformMetrics.readinessScore}%`}
          delta="+2.1%"
          trend="up"
          icon={TrendingUp}
          accent="success"
        />
        <StatCard
          label="Compliance"
          value="DCB0129"
          delta="Approved"
          trend="up"
          icon={ShieldCheck}
          accent="info"
        />
        <StatCard
          label="Failed Mappings"
          value={platformMetrics.failedMappings}
          delta="-23%"
          trend="up"
          icon={XCircle}
          accent="destructive"
        />
        <StatCard
          label="System Health"
          value={platformMetrics.systemHealth}
          delta="30d uptime"
          trend="up"
          icon={Heart}
          accent="success"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Transformation throughput</h3>
              <p className="text-xs text-muted-foreground">
                HL7 messages successfully transformed to FHIR (last 7 days)
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={transformationSuccess}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="success" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="failed" fill="var(--color-chart-5)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Readiness score</h3>
          <p className="text-xs text-muted-foreground">NHS UK Core conformance</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[
                {
                  name: "Readiness",
                  value: platformMetrics.readinessScore,
                  fill: "var(--color-chart-1)",
                },
              ]}
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
              <RadialBar background dataKey="value" cornerRadius={20} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="text-center -mt-32 mb-12">
            <div className="text-4xl font-bold">
              {platformMetrics.readinessScore}
              <span className="text-xl text-muted-foreground">%</span>
            </div>
            <div className="text-xs text-muted-foreground">Ready for production</div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Project activity</h3>
            <span className="text-xs text-muted-foreground">{integrations.length} active</span>
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Project</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium">Last Sync</th>
                  <th className="px-4 py-2.5 font-medium">Health</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {integrations.slice(0, 5).map((i) => (
                  <tr key={i.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{i.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={statusColor[i.status]}>
                        {i.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{i.lastSync}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${i.health}%`,
                              background:
                                i.health > 90
                                  ? "var(--color-success)"
                                  : i.health > 60
                                    ? "var(--color-warning)"
                                    : "var(--color-destructive)",
                            }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {i.health}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Live alerts
            </h3>
            <span className="text-xs text-muted-foreground">{alerts.length}</span>
          </div>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="p-3 rounded-md border border-border bg-card/50 hover:bg-muted/30 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className={severityColor[a.severity]}>
                    {a.type}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-xs mt-2 text-foreground/90">{a.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-semibold mb-1">Governance graph</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Live topology of data flows across systems
          </p>
          <div className="h-[360px] rounded-md border border-border overflow-hidden bg-background/50">
            <ReactFlow
              nodes={governanceNodes}
              edges={governanceEdges}
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <Background color="var(--color-border)" gap={20} />
              <Controls className="!bg-card !border-border" />
            </ReactFlow>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Compliance trend</h3>
          <p className="text-xs text-muted-foreground mb-4">6-month readiness trajectory</p>
          <ResponsiveContainer width="100%" height={280}>
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
                stroke="var(--color-chart-1)"
                strokeWidth={2.5}
                dot={{ fill: "var(--color-chart-1)", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
