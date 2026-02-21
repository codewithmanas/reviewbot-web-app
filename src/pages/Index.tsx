import { motion } from "motion/react"
import { ArrowRight, Bot, GitPullRequest, Shield, Zap, Users, Clock, Code, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Reviews",
    description: "Gemini AI analyzes every PR for security vulnerabilities, performance issues, and code quality — instantly.",
  },
  {
    icon: GitPullRequest,
    title: "GitHub Native",
    description: "Comments posted directly on your PRs. No context switching, no new tools to learn.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Catch SQL injections, XSS vulnerabilities, and auth bypasses before they reach production.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description: "Reviews complete in seconds, not hours. Every PR gets reviewed the moment it's opened.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Shared dashboards, team settings, and unified review history across your organization.",
  },
  {
    icon: Code,
    title: "Best Practices",
    description: "Enforce naming conventions, error handling patterns, and architectural standards automatically.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    description: "For individual developers",
    features: ["5 repos", "50 reviews/month", "Basic rules", "GitHub integration"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For growing teams",
    features: ["Unlimited repos", "Unlimited reviews", "Custom rules", "Priority support", "Team dashboard"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Everything in Pro", "SSO / SAML", "SLA guarantee", "Dedicated support", "Self-hosted option"],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const stats = [
  { value: "10x", label: "Faster Reviews" },
  { value: "95%", label: "Issues Caught" },
  { value: "2min", label: "Avg Review Time" },
  { value: "500+", label: "Teams Trust Us" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">ReviewBot</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/auth?signup=true">
              <Button size="sm" className="gap-1.5">
                Get Started <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-6 px-4 py-1.5 text-xs font-mono border-primary/30 text-primary">
                AI-POWERED CODE REVIEWS
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Stop spending hours on{" "}
              <span className="text-gradient">code reviews</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
            >
              ReviewBot automatically reviews every pull request for security, performance, and code quality — then posts feedback directly on GitHub.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth?signup=true">
                <Button size="lg" className="gap-2 text-base px-8 glow-primary">
                  Start Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="text-base px-8">
                  See How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Code preview mockup */}
          <motion.div
            className="mt-16 md:mt-24 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass rounded-xl overflow-hidden glow-primary">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
                <span className="ml-3 text-xs text-muted-foreground font-mono">PR #142 — Add user authentication</span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="w-3.5 h-3.5 text-destructive" />
                  </div>
                  <div>
                    <span className="text-destructive font-semibold">Security</span>
                    <span className="text-muted-foreground"> · src/auth/login.ts:24</span>
                    <p className="text-foreground/80 text-xs mt-1 font-sans">
                      Password is stored in plain text. Use bcrypt or argon2 for hashing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-warning/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Zap className="w-3.5 h-3.5 text-warning" />
                  </div>
                  <div>
                    <span className="text-warning font-semibold">Performance</span>
                    <span className="text-muted-foreground"> · src/db/queries.ts:89</span>
                    <p className="text-foreground/80 text-xs mt-1 font-sans">
                      Missing index on user_email column. This query will cause full table scans.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div>
                    <span className="text-primary font-semibold">Suggestion</span>
                    <span className="text-muted-foreground"> · src/utils/validate.ts:12</span>
                    <p className="text-foreground/80 text-xs mt-1 font-sans">
                      Consider using Zod schema validation instead of manual checks for type safety.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-extrabold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 font-mono text-xs border-primary/30 text-primary">FEATURES</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Everything your team needs
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-xl mx-auto">
              From automatic reviews to team dashboards, ReviewBot handles the heavy lifting so you can focus on building.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="glass rounded-xl p-6 hover:border-primary/30 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 md:py-32 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 font-mono text-xs border-primary/30 text-primary">HOW IT WORKS</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Three steps to better reviews
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Connect GitHub", desc: "Install the ReviewBot app and select repositories to monitor.", icon: GitPullRequest },
              { step: "02", title: "Open a PR", desc: "Push code as usual. ReviewBot detects new pull requests automatically.", icon: Clock },
              { step: "03", title: "Get AI Feedback", desc: "Review comments appear directly on your PR within seconds.", icon: Bot },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-5xl font-extrabold text-primary/20 mb-4 font-mono">{item.step}</div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Badge variant="outline" className="mb-4 font-mono text-xs border-primary/30 text-primary">PRICING</Badge>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Simple, transparent pricing
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg">
              Start free. Scale as your team grows.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                className={`rounded-xl p-8 ${
                  tier.highlighted
                    ? "glass border-primary/40 glow-primary relative"
                    : "glass"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {tier.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <h3 className="font-semibold text-lg mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  {tier.period && <span className="text-muted-foreground">{tier.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth?signup=true">
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center glass rounded-2xl p-12 glow-primary"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
              Ready to automate your code reviews?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join hundreds of teams shipping better code, faster.
            </p>
            <Link to="/auth?signup=true">
              <Button size="lg" className="gap-2 text-base px-10">
                Get Started Free <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">ReviewBot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ReviewBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
