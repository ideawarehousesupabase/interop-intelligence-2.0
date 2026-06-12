import { createFileRoute } from "@tanstack/react-router";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({ component: Settings });

function Settings() {
  const { user } = useAuth();
  if (!user) return null;
  const initials = user.fullName
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and organisation preferences.
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary/20 text-primary text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="text-lg font-semibold">{user.fullName}</div>
            <div className="text-sm text-muted-foreground">
              {user.role} · {user.organization}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full name</Label>
            <Input defaultValue={user.fullName} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue={user.email} type="email" />
          </div>
          <div className="space-y-2">
            <Label>Organisation</Label>
            <Input defaultValue={user.organization} />
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input defaultValue={user.role} />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={() => toast.success("Profile saved (mock)")}>Save changes</Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-1">Change password</h3>
        <p className="text-xs text-muted-foreground mb-4">Set a new password for your account.</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Current password</Label>
            <Input type="password" />
          </div>
          <div className="space-y-2">
            <Label>New password</Label>
            <Input type="password" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => toast.success("Password updated (mock)")}>
            Update password
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Organisation</h3>
        <div className="space-y-3 text-sm">
          {[
            ["Plan", "Enterprise"],
            ["Region", "UK (London)"],
            ["Active projects", "24"],
            ["Compliance tier", "DTAC + DCB0129"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between border-b border-border pb-2 last:border-0">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
