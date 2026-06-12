import type { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface Props {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  accent?: "primary" | "success" | "warning" | "destructive" | "info";
}

const accentMap = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10",
  warning: "text-warning bg-warning/10",
  destructive: "text-destructive bg-destructive/10",
  info: "text-info bg-info/10",
};

export function StatCard({
  label,
  value,
  delta,
  trend = "neutral",
  icon: Icon,
  accent = "primary",
}: Props) {
  return (
    <Card className="p-5 hover:shadow-[var(--shadow-card)] transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </div>
          <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
          {delta && (
            <div
              className={`mt-1 text-xs font-medium ${
                trend === "up"
                  ? "text-success"
                  : trend === "down"
                    ? "text-destructive"
                    : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? "▲" : trend === "down" ? "▼" : "•"} {delta}
            </div>
          )}
        </div>
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${accentMap[accent]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
