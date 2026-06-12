import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({ component: Register });

const roles = [
  "Clinical Lead",
  "Integration Engineer",
  "Compliance Officer",
  "Data Architect",
  "IT Director",
  "Other",
];

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    role: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.role) {
      toast.error("Please select a role");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Hero Panel — same as login */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="flex items-center gap-2 text-foreground">
          <Activity className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight">Interop Intelligence 2.0</span>
        </div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            AI-governed <span className="gradient-text">HL7 → FHIR</span> modernization for
            NHS-grade healthcare.
          </h1>
          <p className="text-muted-foreground max-w-md">
            Explainable transformations, readiness gates, and DCB0129/DTAC compliance — in a single
            governance plane.
          </p>
          <div className="flex gap-3 pt-4">
            {["DCB0129", "DTAC", "UK Core FHIR", "ISO 27001"].map((b) => (
              <div
                key={b}
                className="glass rounded-md px-3 py-1.5 text-xs flex items-center gap-1.5"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-success" />
                {b}
              </div>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">© 2026 Interop Intelligence</div>
      </div>

      {/* Right Form Panel — ice blue */}
      <div
        className="flex items-center justify-center p-8"
        style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 40%, #bfdbfe 100%)" }}
      >
        <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur border border-blue-100 shadow-xl">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <span className="font-bold">Interop Intelligence 2.0</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Create your account</h2>
          <p className="text-sm text-slate-500 mt-1">
            Join your organization's interoperability workspace.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700">
                Full name
              </Label>
              <Input
                id="fullName"
                required
                value={form.fullName}
                onChange={update("fullName")}
                className="bg-white/70 border-blue-200 text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization" className="text-slate-700">
                Organization name
              </Label>
              <Input
                id="organization"
                required
                value={form.organization}
                onChange={update("organization")}
                placeholder="e.g. Royal London NHS Trust"
                className="bg-white/70 border-blue-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Role</Label>
              <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                <SelectTrigger className="bg-white/70 border-blue-200 text-slate-800">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Work email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                className="bg-white/70 border-blue-200 text-slate-800"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={form.password}
                  onChange={update("password")}
                  className="pr-10 bg-white/70 border-blue-200 text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-400">6 characters minimum</p>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </Button>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
