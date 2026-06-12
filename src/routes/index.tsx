import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Brain,
  Network,
  Sparkles,
  FileCheck2,
  Server,
  Mail,
  Phone,
  MapPin,
  Target,
  ChevronDown,
  Check,
  Activity,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Interop Intelligence — UK's First AI-Powered Interoperability Layer" },
      {
        name: "description",
        content:
          "AI-governed HL7 to FHIR modernization for the NHS. Explainable transformations, readiness gates, dependency-aware governance graphs.",
      },
      { property: "og:title", content: "Interop Intelligence 2.0" },
      {
        property: "og:description",
        content: "Ending the Legacy Debt crisis in the NHS with Explainable AI.",
      },
    ],
  }),
  component: Landing,
});

const metrics = [
  { label: "Mapping Accuracy (LIMS → FHIR)", value: "99.2%", accent: "primary" },
  { label: "Transformation Latency", value: "<100ms", accent: "primary" },
  { label: "Terminology Mismatch Detection", value: "100%", accent: "primary" },
  { label: "Manual Validation Time Saved", value: "65%", accent: "primary" },
  { label: "UK TAM Annual NHS Opportunity", value: "£71.5M", accent: "destructive" },
  { label: "Integration Failure Rate Reduction", value: "40%", accent: "destructive" },
];

const compliance = [
  "NHS DTAC Compliant",
  "DCB0129 Aligned",
  "FHIR R4 / UK Core Native",
  "Edge-Based Sovereignty",
  "99.48% Gross Margin",
  "XAI Reasoning Chains",
];

const steps = [
  {
    n: "01",
    title: "Readiness Assessment",
    body: "The Readiness Gate engine scores the maturity of every incoming legacy dataset — validating interface inventories, data quality, and SNOMED CT/LOINC terminology alignment against UK Core profiles before transformation begins.",
  },
  {
    n: "02",
    title: "Explainable Semantic Mapping",
    body: "Proprietary XAI logic translates HL7 v2 messages into FHIR R4 resources. For every element converted, a human-readable Reasoning Chain is generated — a traceable audit trail Clinical Safety Officers can verify instantly.",
  },
  {
    n: "03",
    title: "Governance Graph Analysis",
    body: "All integration components — messages, mappings, endpoints — are modelled as a dependency-aware governance graph, enabling Predictive Impact Analysis before deployment.",
  },
  {
    n: "04",
    title: "Automated Audit Evidence",
    body: "Continuous, machine-readable Audit Artefacts are generated at runtime, pre-formatted for NHS DTAC and ISO 27001 — reducing compliance burden by up to 70%.",
  },
];

const layers = [
  {
    tag: "XAI CORE",
    icon: Brain,
    title: "X-Interop Engine",
    body: "Explainable Semantic Transformation that makes every mapping transparent. 99%+ accuracy in high-volume LIMS conversions at sub-100ms latency.",
  },
  {
    tag: "READINESS",
    icon: ShieldCheck,
    title: "Readiness Gate Engine",
    body: "A real-time data-quality firewall preventing incomplete or non-compliant legacy datasets from entering modern FHIR ecosystems. Cuts project failure rates by up to 40%.",
  },
  {
    tag: "GOVERNANCE",
    icon: Network,
    title: "Transformation Governance Graph",
    body: "Dependency-aware graph linking messages, mappings, endpoints, and FHIR resources into a single queryable structure for Predictive Impact Analysis.",
  },
  {
    tag: "ADAPTIVE AI",
    icon: Sparkles,
    title: "Conformance Learning Engine",
    body: "Self-healing AI that learns from engineer corrections — especially across non-standard HL7 Z-segments — and continuously improves mapping accuracy.",
  },
  {
    tag: "COMPLIANCE",
    icon: FileCheck2,
    title: "DTAC Audit Engine",
    body: "Continuous machine-readable evidence generation. Pre-formatted for NHS DTAC, ISO 27001, and DCB0129 — reducing compliance workload by up to 70%.",
  },
  {
    tag: "EDGE AI",
    icon: Server,
    title: "Edge Sovereignty Node",
    body: "On-premise data processing within hospital infrastructure. Patient-identifiable data never leaves the local firewall — full UK GDPR compliance.",
  },
];

const tiers = [
  {
    tag: "Essential Tier",
    title: "Readiness Only",
    price: "£499",
    note: "per month · billed annually",
    desc: "For small private clinics or specialized laboratories starting their FHIR transition journey.",
    features: [
      "Readiness Gate access & maturity scoring",
      "Interface inventory auditing",
      "Basic data-quality dashboards",
      "GDPR & UK DTAC compliance reports",
      "Edge Node local processing",
      "Email support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    tag: "Professional Tier",
    title: "Explainable Mapping",
    price: "£1,450",
    note: "per month · billed annually",
    desc: "For medium-sized hospital groups, regional diagnostic centres, and NHS Trust departments.",
    features: [
      "Everything in Essential, plus:",
      "Reasoning Chain module (XAI)",
      "Automated HL7-to-FHIR transformation",
      "DTAC-ready audit logs",
      "DCB0129 clinical safety alignment",
      "Adaptive learning pipeline",
      "Priority compliance support",
    ],
    cta: "Request Pilot",
    featured: true,
  },
  {
    tag: "Enterprise Tier",
    title: "NHS Trust / ICB",
    price: "Custom",
    note: "avg £3,500+/month · bespoke SLA",
    desc: "For large Acute Trusts and Integrated Care Boards managing complex regional data ecosystems.",
    features: [
      "Everything in Professional, plus:",
      "Full Governance Graph deployment",
      "Predictive impact analysis",
      "Unlimited transformation streams",
      "NHS G-Cloud 14 / HSSF ready",
      "24/7 priority integration support",
    ],
    cta: "Enquire Now",
    featured: false,
  },
];

const faqs = [
  {
    q: "What is the Legacy Debt Crisis that Interop Intelligence solves?",
    a: "Over 80% of frontline clinical data remains trapped in HL7 v2 formats and proprietary silos. With 215 NHS Trusts and 42 ICSs facing a mandatory 2026 FHIR deadline, every Trust is a forced buyer of interoperability governance. Interop Intelligence closes this gap as an intelligent governance system rather than a passive data pipe.",
  },
  {
    q: "How do Reasoning Chains improve clinical safety over traditional engines?",
    a: "Traditional engines are black boxes — Clinical Safety Officers can't verify mapping integrity. Reasoning Chains generate a human-readable explanation for every element converted, satisfying DCB0129/DCB0160. We are the only UK platform offering this transparency for AI-driven clinical data transformation.",
  },
  {
    q: "Do we need to replace existing engines like Mirth or Rhapsody?",
    a: "No. Interop Intelligence is a Governance Wrapper that sits on top of Mirth Connect, Rhapsody, and InterSystems HealthShare via standard APIs. No rip-and-replace required. Edge nodes are available for on-premise hospital deployments.",
  },
  {
    q: "How does the platform comply with DTAC 2.0, DCB0129, and UK GDPR?",
    a: "Compliant by design across all five DTAC domains. PII stays within the provider's secure network via Edge Node processing; only anonymized metadata leaves the firewall. Aligned with ISO/IEC 27001 and NCSC Cyber Essentials Plus. Registered with the ICO as a data processor.",
  },
  {
    q: "What is the current development status and validation?",
    a: "TRL 7 — System Prototype Demonstration in Operational Environment. Validated 99.2% mapping accuracy across 100,000 test messages, sub-100ms latency on ADT feeds, 100% terminology mismatch flagging. Both cloud-native and Edge versions are ready for full-scale pilot deployment.",
  },
];

const team = [
  {
    role: "Founder & CEO",
    name: "Babita Kumari",
    body: "14+ years as a Principal Integration Engineer and Lead Interface Architect within the NHS and private healthcare sectors. MSc in Data Science (Kingston University) with deep expertise in HL7 V2.x, FHIR R4, Mirth, Rhapsody, and Cerner.",
  },
  {
    role: "Co-Founder & Data Lead",
    name: "Hooreya Najeeb",
    body: "7+ years as a Governance Data Analyst, designing automated reporting and strengthening data quality across regulated financial and enterprise environments. MSc in Data Science (Kingston University); expertise in Power BI, Snowflake, SQL, and Power Automate.",
  },
];

function Landing() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav loggedIn={!!user} />
      <Hero loggedIn={!!user} />
      <SectionDivider label="About Interop Intelligence" id="about" />
      <About />
      <SectionDivider label="Leadership" />
      <Team />
      <SectionDivider label="How It Works" id="how-it-works" />
      <HowItWorks />
      <SectionDivider label="Core Technology" id="technology" />
      <Layers />
      <SectionDivider label="Licensing & Pricing" id="pricing" />
      <Pricing />
      <SectionDivider label="FAQ" id="faq" />
      <FAQ />
      <SectionDivider label="Get In Touch" id="contact" />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <div
            className="h-7 w-7 rounded-md flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight">
            <span className="text-primary">Interop</span> Intelligence
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm mono uppercase tracking-wider text-muted-foreground">
          {[
            ["About", "about"],
            ["How It Works", "how-it-works"],
            ["Technology", "technology"],
            ["Pricing", "pricing"],
            ["FAQ", "faq"],
            ["Contact", "contact"],
          ].map(([l, h]) => (
            <a key={h} href={`#${h}`} className="hover:text-primary transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {loggedIn ? (
            <Button asChild size="sm">
              <Link to="/dashboard">
                Launch Dashboard <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">Get Access</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Hero({ loggedIn }: { loggedIn: boolean }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[40rem] h-[40rem] -translate-y-1/3 translate-x-1/4 opacity-30 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg, var(--primary), transparent, var(--accent), transparent)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 mono text-xs uppercase tracking-widest text-primary px-3 py-1.5 rounded border border-primary/30 bg-primary/5">
            « TRL 7 Validated · UK Healthcare Innovation
          </div>
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            The UK's First <span className="text-primary">AI-Powered</span>
            <br />
            <span className="text-primary">Interoperability</span>
            <br />
            Intelligence
            <br />
            <span className="text-primary">Layer</span>
          </h1>
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-primary to-transparent" />
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            Interop Intelligence bridges the "Legacy Debt" gap — governing the transition from
            legacy HL7 v2 standards to modern FHIR R4 ecosystems with Explainable AI, Readiness
            Gates, and a Dependency-Aware Governance Graph built specifically for the NHS.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="mono uppercase tracking-wider">
              <a href="#contact">
                Request a Demo <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="mono uppercase tracking-wider border-primary/40 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <a href="#technology">Explore Technology</a>
            </Button>
            {loggedIn && (
              <Button asChild size="lg" variant="ghost" className="mono uppercase tracking-wider">
                <Link to="/dashboard">Open Dashboard</Link>
              </Button>
            )}
          </div>
        </div>

        <Card className="card-accent p-6 lg:p-7 bg-card/60 backdrop-blur border-border/60">
          <div className="mono text-xs text-primary mb-5">// TRL 7 PERFORMANCE METRICS</div>
          <div className="space-y-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between gap-4 py-1.5 border-b border-border/40 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${m.accent === "destructive" ? "bg-destructive" : "bg-primary"}`}
                  />
                  <span className="text-sm text-foreground/90">{m.label}</span>
                </div>
                <span
                  className={`mono font-bold tabular-nums ${m.accent === "destructive" ? "text-destructive" : "text-primary"}`}
                >
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function SectionDivider({ label, id }: { label: string; id?: string }) {
  return (
    <div id={id} className="max-w-7xl mx-auto px-6 pt-20 scroll-mt-20">
      <div className="mono text-xs uppercase tracking-widest text-primary">// {label}</div>
    </div>
  );
}

function About() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4 pb-4">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Ending the Legacy <span className="text-primary">Debt Crisis</span> in the NHS
      </h2>
      <div className="mt-8 grid lg:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
        <p>
          Interop Intelligence introduces a pioneering Interoperability Intelligence Layer designed
          to govern and accelerate the transition of healthcare data from legacy standards (HL7 v2)
          to modern, API-led FHIR ecosystems. By combining proprietary Explainable AI, automated
          readiness assessment, and graph-based dependency modelling, the platform bridges the gap
          that hinders the UK healthcare sector's digital transformation.
        </p>
        <p>
          Unlike traditional integration engines that act as passive "black-box" pipes, Interop
          Intelligence functions as an{" "}
          <span className="text-foreground font-medium">intelligent governance system</span> —
          interpreting legacy data streams, validating them against UK Core profiles in real-time,
          and generating human-readable Reasoning Chains to explain every transformation. Fully
          aligned with NHS Digital, DTAC, DCB0129, and the 2026 FHIR R4 mandate.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-2">
        {compliance.map((c) => (
          <span
            key={c}
            className="mono text-xs uppercase tracking-wider px-3 py-1.5 rounded border border-primary/30 bg-primary/5 text-primary"
          >
            ✓ {c}
          </span>
        ))}
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4">
      <div className="grid lg:grid-cols-2 gap-6">
        {team.map((m) => (
          <Card key={m.name} className="card-accent p-7 bg-card/60 border-border/60">
            <div className="mono text-xs uppercase tracking-wider text-primary">{m.role}</div>
            <h3 className="mt-2 text-3xl font-bold tracking-tight">{m.name}</h3>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">{m.body}</p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-1 mono text-xs uppercase tracking-wider text-primary hover:underline"
            >
              Contact <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
        The Governance Intelligence <span className="text-primary">Pipeline</span>
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground">
        Every legacy data stream passes through a four-stage governance pipeline — converting
        fragmented hospital data into real-time FHIR-ready resources with full explainability,
        readiness gating, and automated compliance evidence.
      </p>
      <div className="mt-12 grid md:grid-cols-2 gap-5">
        {steps.map((s, i) => (
          <Card
            key={s.n}
            className="card-accent p-7 bg-card/60 border-border/60 group hover:border-primary/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="mono text-xs uppercase tracking-widest text-muted-foreground">
                STEP {s.n}
              </div>
              <div className="mono text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition leading-none">
                {i + 1}
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-bold tracking-tight">{s.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Layers() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Six Proprietary <span className="text-primary">Innovation Layers</span>
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground">
        Each module is purpose-built for the UK's clinical regulatory landscape — combining
        explainability, readiness control, adaptive learning, and edge sovereignty into a single
        unified intelligence platform.
      </p>
      <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {layers.map((l) => {
          const Icon = l.icon;
          return (
            <Card
              key={l.title}
              className="card-accent p-6 bg-card/60 border-border/60 hover:border-primary/40 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-md flex items-center justify-center bg-primary/10 text-primary border border-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="mono text-[10px] uppercase tracking-widest text-primary">
                  {l.tag}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{l.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{l.body}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1 mono text-xs uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Governed Interoperability. <span className="text-primary">Fraction of the Cost.</span>
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground">
        An Interop Intelligence subscription represents a fraction of the cost of a failed NHS
        integration project — delivering continuous governance, compliance automation, and clinical
        safety year-round.
      </p>
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {tiers.map((t) => (
          <Card
            key={t.title}
            className={`card-accent p-7 bg-card/60 relative ${t.featured ? "border-primary/50 shadow-[0_0_40px_-10px_var(--color-primary)]" : "border-border/60"}`}
          >
            {t.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded bg-primary text-primary-foreground">
                Most Popular
              </div>
            )}
            <div className="mono text-xs uppercase tracking-wider text-primary">{t.tag}</div>
            <h3 className="mt-2 text-2xl font-bold tracking-tight">{t.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{t.price}</span>
            </div>
            <div className="mono text-xs text-muted-foreground mt-1">{t.note}</div>
            <ul className="mt-6 space-y-2.5">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              className="w-full mt-7 mono uppercase tracking-wider"
              variant={t.featured ? "default" : "outline"}
            >
              <a href="#contact">
                {t.cta} <ArrowRight className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="max-w-4xl mx-auto px-6 pt-4">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
        Common <span className="text-primary">Questions</span>
      </h2>
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <Card key={i} className="card-accent bg-card/60 border-border/60 overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left p-5 flex items-start gap-4 hover:bg-muted/20 transition"
            >
              <span className="mono text-xs text-primary tabular-nums mt-1">0{i + 1}</span>
              <span className="flex-1 font-semibold">{f.q}</span>
              <ChevronDown
                className={`h-5 w-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 pl-14 text-sm text-muted-foreground leading-relaxed">
                {f.a}
              </div>
            )}
          </Card>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — we'll be in touch shortly.");
  };
  return (
    <section className="max-w-7xl mx-auto px-6 pt-4 pb-24">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
        Request a Pilot or <span className="text-primary">Partnership Discussion</span>
      </h2>
      <p className="mt-6 max-w-3xl text-muted-foreground">
        Whether you are an NHS Trust, Integrated Care Board, private hospital group, diagnostic lab,
        MedTech startup, or technology integration partner — we'd like to hear from you.
      </p>

      <div className="mt-12 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon: Mail, label: "Email", val: "interopintelligenceuk@outlook.com" },
            { icon: Phone, label: "Phone", val: "+44 7442 325 376" },
            { icon: MapPin, label: "Location", val: "United Kingdom" },
            {
              icon: Target,
              label: "Target Sectors",
              val: "NHS Trusts · ICBs · Private Hospitals · Diagnostic Labs · MedTech & HealthTech Partners",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex items-start gap-4 p-4 rounded-md border border-border/60 bg-card/40"
              >
                <div className="h-9 w-9 rounded-md flex items-center justify-center bg-primary/10 text-primary border border-primary/20 shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="text-sm mt-0.5 text-foreground/90">{c.val}</div>
                </div>
              </div>
            );
          })}
        </div>

        <Card className="lg:col-span-3 card-accent p-7 bg-card/60 border-border/60">
          {sent ? (
            <div className="py-16 text-center">
              <ShieldCheck className="h-10 w-10 text-primary mx-auto" />
              <h3 className="mt-4 text-xl font-bold">Message received</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our team will respond within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </label>
                  <Input required className="mt-1.5" />
                </div>
                <div>
                  <label className="mono text-xs uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </label>
                  <Input type="email" required className="mt-1.5" />
                </div>
              </div>
              <div>
                <label className="mono text-xs uppercase tracking-wider text-muted-foreground">
                  Organisation
                </label>
                <Input required className="mt-1.5" />
              </div>
              <div>
                <label className="mono text-xs uppercase tracking-wider text-muted-foreground">
                  I am a…
                </label>
                <Select>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Chief Clinical Information Officer (CCIO)",
                      "NHS Trust / ICB CIO or IT Lead",
                      "Clinical Safety Officer (CSO)",
                      "Integration / Interoperability Engineer",
                      "Private Hospital / Diagnostic Lab Group",
                      "MedTech / Digital Health Startup CTO",
                      "HealthTech / EHR Vendor",
                      "Investor / Funder",
                      "Other",
                    ].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mono text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </label>
                <Textarea required rows={5} className="mt-1.5" />
              </div>
              <Button type="submit" size="lg" className="w-full mono uppercase tracking-wider">
                Send Message <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="h-6 w-6 rounded flex items-center justify-center"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Activity className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold">
            <span className="text-primary">Interop</span> Intelligence
          </span>
          <span className="mono text-xs text-muted-foreground ml-2">v2.0 · TRL 7</span>
        </div>
        <div className="mono text-xs text-muted-foreground uppercase tracking-wider">
          © 2026 Interop Intelligence Ltd · United Kingdom
        </div>
      </div>
    </footer>
  );
}
