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
        "If you need someone who can own backend systems end-to-end, reach out.",
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
                Senior Backend Engineer
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#expertise" className="text-sm font-medium hover:text-primary transition-colors">Expertise</a>
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Systems</a>
            <a href="#hire" className="text-sm font-medium hover:text-primary transition-colors">Engagement</a>
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
              Engineering high-stakes backend systems at scale.
            </h1>
            <p className="mt-8 text-xl text-muted-foreground leading-relaxed md:text-2xl font-medium" data-testid="text-hero-subtitle">
              Expert in <span className="text-foreground">distributed systems</span>, 
              <span className="text-foreground"> pricing engines</span>, and 
              <span className="text-foreground"> fintech infrastructure</span>. I build systems where failure isn't an option.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-base font-bold shadow-soft" data-testid="button-hire-hero">
                <a href="#hire">Hire for Execution</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 rounded-2xl px-8 text-base font-bold bg-card/40 backdrop-blur-xl border-border/50 shadow-card" data-testid="link-resume-hero">
                <a href={LINKS.resume} target="_blank" rel="noreferrer">
                  System Specs (Resume)
                  <FileText className="ml-2 size-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Core Narrative */}
        <section className="mt-24 grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary">The Approach</h3>
            <p className="text-xl leading-relaxed font-medium" data-testid="text-narrative">
              I don't just write code; I design, build, and operate production-grade distributed systems. 
              My focus is on <span className="text-primary italic">real traffic, real money, and real failure modes</span>.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With deep experience in Java and AWS, I bridge the gap between technical complexity and business velocity. 
              From re-architecting pricing platforms to building consistent wealth platforms, I own the critical path.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">50k+</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">SKUs Migrated</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">40%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Latency Reduction</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Failure Decrease</div>
            </div>
            <div className="rounded-3xl border bg-card/50 p-6 shadow-card backdrop-blur-sm">
              <div className="text-3xl font-bold">Zero</div>
              <div className="text-sm text-muted-foreground font-medium mt-1 uppercase tracking-wider">Downtime Goals</div>
            </div>
          </div>
        </section>

        {/* Expertise Grid */}
        <section id="expertise" className="mt-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Core Competencies</h3>
              <h2 className="text-4xl font-bold tracking-tight">System Expertise</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ExpertiseCard 
              icon={<Database className="size-6" />}
              title="Backend Engineering"
              items={["Java Performance", "Spring Boot", "Micronaut", "Concurrency", "High-throughput APIs"]}
            />
            <ExpertiseCard 
              icon={<Layers className="size-6" />}
              title="Distributed Systems"
              items={["Consistency Models", "Event-Driven Architecture", "Kafka Streams", "Idempotency", "Fault Tolerance"]}
            />
            <ExpertiseCard 
              icon={<Cpu className="size-6" />}
              title="AI & Automation"
              items={["Tool-using AI Agents", "Workflow Orchestration", "Engineering Productivity", "Reliable Integrations"]}
            />
            <ExpertiseCard 
              icon={<Terminal className="size-6" />}
              title="Infrastructure"
              items={["AWS (ECS, Lambda, S3)", "Observability", "Zero-Downtime DB Maint", "Infrastructure as Code"]}
            />
            <ExpertiseCard 
              icon={<Briefcase className="size-6" />}
              title="Domain Knowledge"
              items={["Pricing Engines", "Inventory Sync", "Payment Reconciliation", "UPI Autopay Flows"]}
            />
            <div className="rounded-3xl border bg-primary p-8 text-primary-foreground shadow-soft flex flex-col justify-between">
              <div>
                <h4 className="text-2xl font-bold mb-2">Available for High-Impact Work</h4>
                <p className="text-primary-foreground/80 font-medium">Remote • Contract • Advisory</p>
              </div>
              <Button asChild variant="secondary" className="mt-8 w-full h-12 rounded-xl font-bold">
                <a href="#hire">View Models</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Engagement Models */}
        <section id="hire" className="mt-32">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Availability</h3>
            <h2 className="text-4xl font-bold tracking-tight">Engagement Models</h2>
            <p className="mt-4 text-muted-foreground text-lg">Premium availability for teams that value technical ownership and execution reliability.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <HireCard 
              title="Contract"
              desc="Short/medium-term execution on critical backend systems and infrastructure."
              cta="Book Topmate"
              href={LINKS.topmate}
            />
            <HireCard 
              title="Mentorship"
              desc="Architecture reviews, backend guidance, and deep system thinking for engineers."
              cta="Schedule Chat"
              href={LINKS.topmate}
              variant="secondary"
            />
            <HireCard 
              title="Full-Time"
              desc="Full ownership of backend platforms and critical infrastructure paths."
              cta="Email Intent"
              href={`mailto:${CONTACT.email}?subject=Full-time role`}
              variant="outline"
            />
            <HireCard 
              title="Advisory"
              desc="High-impact technical consulting or AI system delivery for startups."
              cta="WhatsApp"
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
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Need someone to own the system?</h2>
                <p className="mt-6 text-xl text-background/70 font-medium max-w-xl">
                  If you require an engineer who understands business constraints as well as distributed systems, let's talk.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="h-14 rounded-2xl px-10 text-base font-bold bg-background text-foreground hover:bg-background/90">
                    <a href={`mailto:${CONTACT.email}`}>Email Me</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-14 rounded-2xl px-10 text-base font-bold border-background/20 hover:bg-background/10">
                    <a href={waHref} target="_blank" rel="noreferrer">WhatsApp Direct</a>
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

