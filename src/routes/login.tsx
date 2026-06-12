import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { useAuth } from "../lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
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

      <div
        className="flex items-center justify-center p-8"
        style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 40%, #bfdbfe 100%)" }}
      >
        <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur border border-blue-100 shadow-xl">
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <Activity className="h-5 w-5 text-primary" />
            <span className="font-bold">Interop Intelligence 2.0</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Sign in</h2>
          <p className="text-sm text-slate-500 mt-1">
            Enterprise healthcare interoperability platform
          </p>
          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Work email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70 border-blue-200 text-slate-800 placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">
                  Password
                </Label>
                <span className="text-xs text-slate-400 cursor-default hover:text-slate-600 transition-colors">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            <p className="text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 hover:underline font-medium"
              >
                Create account
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
