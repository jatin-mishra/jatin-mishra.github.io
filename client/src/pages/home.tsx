import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronRight,
  Copy,
  FileText,
  Link as LinkIcon,
  Mail,
  MessageCircle,
  Database,
  Cpu,
  Layers,
  Terminal,
  Shield,
  Target,
  Zap,
  TrendingUp,
  Award,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Import the professional headshot
import profileImg from "@assets/ChatGPT_Image_Jan_29_2026_Professional_Themes_1769690807455.png";

/**
 * REVIEWS & EDITS GUIDE:
 * 
 * 1. LINKS & CONTACT: Update the constants below to change URLs or contact info.
 * 2. IMAGES: The profile headshot is imported from @assets.
 * 3. STYLE: This page uses Tailwind v4 classes. Custom textures (grain) are in index.css.
 * 4. SECTIONS: Most sections are modular. Search for 'section' tags to find specific blocks.
 */

const LINKS = {
  topmate: "https://topmate.io/jatin_mishra/",
  resume: "https://jatin-mishra.github.io/Jatin_Resume.pdf",
  linkedin: "https://www.linkedin.com/in/jatin-mishra/",
};

const CONTACT = {
  email: "jatinm1shra10cr@gmail.com",
  whatsappPhoneE164: "+919696658203",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(Boolean(mq.matches));
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function formatWhatsAppHref(phoneE164: string, text: string) {
  const clean = phoneE164.replace(/[^\d+]/g, "").replace("+", "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
}

export default function HomePage() {
  const reducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState<null | "email" | "whatsapp">(null);

  const waHref = useMemo(
    () =>
      formatWhatsAppHref(
        CONTACT.whatsappPhoneE164,
        "Discussing backend engineering opportunities.",
      ),
    [],
  );

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), 1200);
    return () => window.clearTimeout(t);
  }, [copied]);

  const fadeUp = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0 },
  };

  async function copyToClipboard(text: string, kind: "email" | "whatsapp") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      toast({
        title: "Copied",
        description: kind === "email" ? "Email copied." : "WhatsApp number copied.",
      });
    } catch {
      toast({
        title: "Copy failed",
        description: "Please copy manually.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-dvh bg-hero grain selection:bg-primary selection:text-primary-foreground">
      <header className="mx-auto w-full max-w-6xl px-5 pt-8 md:px-8 md:pt-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-primary to-accent opacity-20 blur-sm"></div>
              <img
                src={profileImg}
                alt="Jatin Mishra"
                className="relative size-14 rounded-full border-2 border-background object-cover shadow-card"
                data-testid="img-avatar"
              />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight" data-testid="text-name">
                Jatin Mishra
              </h2>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest" data-testid="text-tagline">
                Backend Engineer (SDE-2) | Systems, Trade-offs, Failures
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#expertise" className="text-sm font-medium hover:text-primary transition-colors">Experience</a>
            <a href="#philosophy" className="text-sm font-medium hover:text-primary transition-colors">Approach</a>
            <a href="#hire" className="text-sm font-medium hover:text-primary transition-colors">Work Together</a>
            <Button asChild size="sm" className="rounded-full px-6" data-testid="link-nav-topmate">
              <a href={LINKS.topmate} target="_blank" rel="noreferrer">Contact</a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 py-12 md:px-8 md:py-20">
        {/* Hero Section */}
        <section className="max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl" data-testid="text-hero-title">
              Senior Software Engineer specializing in financial guarantees, correctness, and zero-downtime operations.
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed md:text-2xl font-medium" data-testid="text-hero-subtitle">
              Architected financial systems processing <span className="text-foreground">50K+ SKUs</span> with <span className="text-foreground">zero-downtime migrations</span>, designed <span className="text-foreground">0→1 wealth platforms</span> serving portfolio computations at scale, and built <span className="text-foreground">Kafka Streams pipelines cutting infrastructure costs 45%</span>. Deep expertise in <span className="text-foreground">consistency models, concurrency patterns, and AI agent orchestration</span>. Mentored engineers and consulted for US clients on production-grade distributed systems.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-base font-bold shadow-soft" data-testid="button-hire-hero">
                <a href="#hire">Work With Me</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-2xl px-8 text-base font-bold bg-card/40 backdrop-blur-xl border-border/50 shadow-card" data-testid="link-resume-hero">
                <a href={LINKS.resume} target="_blank" rel="noreferrer">
                  Resume
                  <FileText className="ml-2 size-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Core Impact Metrics */}
        <section className="mt-24 grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Technical Profile</h3>
            <p className="text-xl leading-relaxed font-medium" data-testid="text-narrative">
              Systems architect with 3+ years building production-grade financial systems at CRED. 
              Design-driven approach focused on <span className="text-primary italic">non-functional requirements, correctness guarantees, and operational resiliency</span>.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              <span className="text-foreground font-semibold">DSA Expert</span> (CodeChef Rank 74, Codeforces 983/20K+). 
              Deep expertise in distributed systems internals, event-driven architectures, and zero-downtime migrations. 
              <span className="text-foreground font-semibold">Mentored junior engineers</span> and provided <span className="text-foreground font-semibold">technical consultancy to US clients</span> on system design and problem-solving.
              Previous experience at <span className="text-foreground font-semibold">Innovaccer</span> building job schedulers and backup systems with durability guarantees.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">100K+</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Users Reactivated</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">50%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Pricing Errors Cut</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Inventory Failures Eliminated</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">45%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Infra Cost Reduced</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">p99 Latency Improved</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">5%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">GMV Unlocked</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">70%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Faster Onboarding</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">66%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Escalations Cut</div>
            </div>
          </div>
        </section>

        {/* Design Philosophy */}
        <section id="philosophy" className="mt-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Design Philosophy</h3>
            <h2 className="text-4xl font-bold tracking-tight">Requirements-Driven System Design</h2>
            <p className="mt-4 text-muted-foreground text-lg">Engineering systems based on explicit guarantees, correctness levels, and resiliency requirements.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="rounded-3xl border bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-card">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Shield className="size-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Guarantees First</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Define system guarantees upfront: idempotency for financial ops, exactly-once processing, eventual vs strong consistency, durability SLAs.
              </p>
            </Card>
            
            <Card className="rounded-3xl border bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-card">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Target className="size-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Correctness Level</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Explicit correctness requirements: race condition elimination, row-level locking, state machine validation, deduplication strategies.
              </p>
            </Card>
            
            <Card className="rounded-3xl border bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-card">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Zap className="size-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Resiliency Patterns</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Fault-tolerant architectures: retry-safe callbacks, circuit breakers, graceful degradation, zero-downtime migrations, coordinated traffic draining.
              </p>
            </Card>
            
            <Card className="rounded-3xl border bg-gradient-to-br from-primary/5 to-transparent p-8 shadow-card">
              <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <TrendingUp className="size-6" />
              </div>
              <h4 className="text-xl font-bold mb-3">Simplest Solution</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Meet functional requirements through simplest architecture satisfying non-functional constraints. Optimize for maintainability and operational clarity.
              </p>
            </Card>
          </div>
        </section>

        {/* Expertise Grid */}
        <section id="expertise" className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Production Systems</h3>
              <h2 className="text-4xl font-bold tracking-tight">Key Projects & Quantifiable Impact</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExpertiseCard 
              icon={<Database className="size-6" />}
              title="Pricing & Deal Engine"
              items={[
                "Re-architected pricing: 50% error reduction",
                "Migrated 50K+ SKUs, zero downtime",
                "40% campaign bandwidth reduction",
                "Config-driven Golang deal engine",
                "Safeguards against price leakage"
              ]}
            />
            <ExpertiseCard 
              icon={<Layers className="size-6" />}
              title="Wealth & Payments (0→1)"
              items={[
                "Idempotent financial APIs",
                "UPI Autopay: mandate + reconciliation",
                "40% p99 latency improvement (450→270ms)",
                "Real-time portfolio computation",
                "Generic batching framework (40%+ surfaces)"
              ]}
            />
            <ExpertiseCard 
              icon={<Cpu className="size-6" />}
              title="Kafka Streams Architecture"
              items={[
                "Windowed aggregations + state stores",
                "44% Elasticsearch node reduction",
                "45% infrastructure cost savings",
                "Materialized KTable for real-time views",
                "Event-driven consistency patterns"
              ]}
            />
            <ExpertiseCard 
              icon={<Terminal className="size-6" />}
              title="Inventory & Catalog Systems"
              items={[
                "95% reduction in inventory failures",
                "Race condition elimination",
                "4-level hierarchy: 70% faster onboarding",
                "5% incremental GMV unlock",
                "Row-level locking for returns APIs"
              ]}
            />
            <ExpertiseCard 
              icon={<Users className="size-6" />}
              title="Zombie Resurrection Platform"
              items={[
                "100K dormant user reactivation",
                "5-7% total reactivations contributed",
                "20% via non-intent channels",
                "S2S + offline QR redemption flows",
                "Idempotent gift claim APIs"
              ]}
            />
            <ExpertiseCard 
              icon={<Shield className="size-6" />}
              title="Zero-Downtime Operations"
              items={[
                "Coordinated DB maintenance system",
                "Traffic draining across microservices",
                "No service restarts during upgrades",
                "83% alert false positive reduction",
                "20+ production dashboards (Apdex-tuned)"
              ]}
            />
            <ExpertiseCard 
              icon={<Terminal className="size-6" />}
              title="Innovaccer: Job Scheduling & Backups"
              items={[
                "End-to-end job scheduler (Cron + ad-hoc)",
                "Durability guarantees & execution tracking",
                "Snapshot-based backup system",
                "Safe schema and data migrations",
                "Rollback support for production safety"
              ]}
            />
          </div>
        </section>

        {/* Database & Systems Internals */}
        <section className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Deep Technical Expertise</h3>
            <h2 className="text-4xl font-bold tracking-tight">Core Engineering Competencies</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Database className="size-6 text-primary" />
                Database Engineering
              </h4>
              <ul className="space-y-3">
                {[
                  "Consistency models: strong, eventual, tunable quorum",
                  "Availability vs consistency tradeoffs (CAP)",
                  "Indexing strategies and sharding for scale",
                  "MySQL internals: row-level locking, MVCC",
                  "Redis persistence models and eviction policies",
                  "Elasticsearch scoring and query optimization",
                  "Cassandra tuning and partition design"
                ].map(item => (
                  <li key={item} className="text-sm text-muted-foreground font-medium flex items-start gap-3">
                    <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Cpu className="size-6 text-primary" />
                Distributed Systems
              </h4>
              <ul className="space-y-3">
                {[
                  "Message queue delivery semantics (at-most/least/exactly-once)",
                  "Partition management and hot partition mitigation",
                  "Concurrency primitives: locks, semaphores, barriers",
                  "Kafka Streams: windowed agg, KTable, state stores",
                  "Idempotency and deduplication patterns",
                  "Circuit breakers and graceful degradation",
                  "Coordinated traffic draining for zero-downtime"
                ].map(item => (
                  <li key={item} className="text-sm text-muted-foreground font-medium flex items-start gap-3">
                    <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Layers className="size-6 text-primary" />
                AI Agent Orchestration
              </h4>
              <ul className="space-y-3">
                {[
                  "RAG pipelines for knowledge retrieval",
                  "Model Context Protocol (MCP) integration",
                  "Short-term and long-term memory systems",
                  "Information retrieval and vector search",
                  "Agent reasoning and decision workflows",
                  "Context-aware prompt engineering",
                  "Multi-agent coordination patterns"
                ].map(item => (
                  <li key={item} className="text-sm text-muted-foreground font-medium flex items-start gap-3">
                    <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Technical Stack */}
        <section className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Technical Stack</h3>
            <h2 className="text-4xl font-bold tracking-tight">Technologies & Tools</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">Core Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {["Java", "Golang", "DSA (Rank 74 CodeChef)", "System Design", "Distributed Systems"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">Frameworks & Patterns</h4>
              <div className="flex flex-wrap gap-2">
                {["Spring Boot", "Micronaut", "Dropwizard", "Gin", "Event-Driven", "CQRS"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">Datastores</h4>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "Redis", "Elasticsearch", "Cassandra", "ClickHouse", "DynamoDB", "Aerospike"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">Streaming & Messaging</h4>
              <div className="flex flex-wrap gap-2">
                {["Kafka", "Kafka Streams", "KTable", "SQS", "Windowed Agg"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">Cloud & Infrastructure</h4>
              <div className="flex flex-wrap gap-2">
                {["AWS", "ECS", "Lambda", "S3", "Planned Rollouts", "Gradual Deployments"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
            <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm">
              <h4 className="text-lg font-bold mb-4">AI & Orchestration</h4>
              <div className="flex flex-wrap gap-2">
                {["RAG Pipelines", "MCP", "Vector Search", "Agent Orchestration", "LLM Integration"].map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs font-medium">{tech}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Mentorship & Consulting */}
        <section className="mt-32">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border p-12 md:p-16 shadow-soft">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6">
                  <Award className="size-4" />
                  Mentorship & Consulting
                </div>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Technical Leadership & Guidance</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mentored junior engineers on distributed systems design, consistency guarantees, and operational best practices. 
                  Provided technical consultancy to <span className="text-foreground font-semibold">US-based clients</span> on system architecture, 
                  problem-solving, and engineering team workflows.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4">
                  <span className="text-foreground font-semibold">LinkedIn content creator</span> regularly sharing insights on distributed systems, database internals, and backend engineering. 
                  Available for <span className="text-foreground font-semibold">corporate training programs</span> and institutional workshops.
                </p>
              </div>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
                  <h4 className="font-bold mb-2">Engineering Mentorship</h4>
                  <p className="text-sm text-muted-foreground">Guided juniors on API design, Kafka internals, database correctness, and production debugging.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
                  <h4 className="font-bold mb-2">US Client Consulting</h4>
                  <p className="text-sm text-muted-foreground">Technical consultancy on distributed systems architecture, non-functional requirements, and resiliency patterns.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
                  <h4 className="font-bold mb-2">Corporate Training & Workshops</h4>
                  <p className="text-sm text-muted-foreground">Available for institutional training on backend systems, database internals, Kafka, and distributed architecture. LinkedIn educator sharing systems knowledge.</p>
                </div>
                <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border">
                  <h4 className="font-bold mb-2">DSA & Competitive Programming</h4>
                  <p className="text-sm text-muted-foreground">CodeChef Global Rank 74 • Codeforces Rank 983/20K+ • Strong algorithmic problem-solving foundation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section id="hire" className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Collaboration</h3>
            <h2 className="text-4xl font-bold tracking-tight">How We Can Work Together</h2>
            <p className="mt-4 text-muted-foreground text-lg">Contract work, full-time roles, technical consulting, corporate training, and mentorship.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <HireCard 
              title="System Design Consulting"
              desc="Architecture reviews, non-functional requirements analysis, consistency model design, and distributed systems guidance."
              cta="Schedule Call"
              href={LINKS.topmate}
            />
            <HireCard 
              title="Contract Engineering"
              desc="Short to medium-term engagements for backend development, zero-downtime migrations, or performance optimization."
              cta="Discuss Projects"
              href={LINKS.topmate}
              variant="secondary"
            />
            <HireCard 
              title="Corporate Training"
              desc="Institutional workshops on distributed systems, database internals, Kafka architectures, and backend engineering best practices."
              cta="Training Inquiry"
              href={`mailto:${CONTACT.email}?subject=Corporate Training Inquiry`}
              variant="outline"
            />
            <HireCard 
              title="Technical Mentorship"
              desc="Engineering mentorship on database internals, Kafka architectures, API design, and production system reliability."
              cta="WhatsApp Direct"
              href={waHref}
              variant="ghost"
            />
          </div>
        </section>

        {/* Contact Strip */}
        <section className="mt-32">
          <div className="rounded-[2.5rem] bg-foreground p-8 md:p-16 text-background shadow-soft overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-primary/20 to-transparent blur-3xl"></div>
            <div className="relative z-10 grid gap-12 md:grid-cols-[1fr_auto]">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Let's discuss your backend engineering requirements.</h2>
                <p className="mt-6 text-xl text-background/70 font-medium max-w-xl">
                  Whether you need distributed systems expertise, financial API design, production infrastructure, technical consulting, corporate training, or exploring full-time roles—I architect solutions based on your specific guarantees, correctness, and resiliency requirements.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 rounded-2xl px-10 text-base font-bold bg-background text-foreground hover:bg-background/90">
                    <a href={`mailto:${CONTACT.email}`}>Email Me</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl px-10 text-base font-bold border-background/20 hover:bg-background/10">
                    <a href={waHref} target="_blank" rel="noreferrer">WhatsApp</a>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <ContactLink label="Topmate" href={LINKS.topmate} />
                <ContactLink label="LinkedIn" href={LINKS.linkedin} />
                <ContactLink label="Resume" href={LINKS.resume} />
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-32 py-12 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <img
                src={profileImg}
                alt="Jatin Mishra"
                className="size-10 rounded-full border grayscale opacity-60"
              />
            <span className="text-sm font-medium text-muted-foreground">© {new Date().getFullYear()} Jatin Mishra</span>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-muted-foreground">
             <a href={LINKS.linkedin} className="hover:text-primary transition-colors">LinkedIn</a>
             <a href={LINKS.resume} className="hover:text-primary transition-colors">Resume</a>
             <a href={LINKS.topmate} className="hover:text-primary transition-colors">Topmate</a>
          </div>
        </footer>
      </main>
    </div>
  );
}

function ExpertiseCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: string[] }) {
  return (
    <Card className="rounded-3xl border bg-card/50 p-8 shadow-card backdrop-blur-sm group hover:border-primary/50 transition-all duration-300">
      <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="text-sm text-muted-foreground font-medium flex items-center gap-2">
            <div className="size-1 rounded-full bg-primary/40" />
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function HireCard({ title, desc, cta, href, variant = "primary" }: { title: string, desc: string, cta: string, href: string, variant?: any }) {
  return (
    <Card className="rounded-3xl border bg-card p-6 shadow-card flex flex-col h-full hover:shadow-soft transition-all duration-300">
      <div className="mb-4">
        <h4 className="text-xl font-bold">{title}</h4>
      </div>
      <p className="text-sm text-muted-foreground font-medium flex-grow mb-6">
        {desc}
      </p>
      <Button asChild variant={variant} className="w-full h-11 rounded-xl font-bold">
        <a href={href} target="_blank" rel="noreferrer">
          {cta}
          <ArrowUpRight className="ml-2 size-4" />
        </a>
      </Button>
    </Card>
  );
}

function ContactLink({ label, href }: { label: string, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="group flex items-center justify-between gap-8 py-2 border-b border-background/10 hover:border-background/30 transition-colors"
    >
      <span className="text-lg font-bold">{label}</span>
      <ArrowUpRight className="size-5 opacity-40 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
