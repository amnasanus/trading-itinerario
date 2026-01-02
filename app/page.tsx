"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Compass,
  Globe,
  Lock,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { applicationSchema, type ApplicationInput } from "@/lib/application";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const baseFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: "easeOut" },
};

const content = {
  en: {
    nav: ["Residency", "Method", "Requirements", "Apply"],
    heroKicker: "Private Trading Residency",
    heroTitle: "Trading Itinerario",
    heroSubtitle:
      "An on-site 15–30 day residency blending mentorship, disciplined execution frameworks, and a discreet private-client experience.",
    heroCta: "Candidates for Residency",
    heroSecondary: "Request a Call",
    trustStrip: [
      "Discretion-first engagement",
      "Risk-defined trading routine",
      "Limited slots per quarter",
    ],
    residencyTitle: "The Residency",
    residencyBody:
      "An immersive on-site experience designed for qualified clients seeking serious trading discipline or a structured collaboration.",
    residencySteps: [
      {
        title: "Apply",
        body: "Share your location, dates, goals, and baseline requirements. Every residency is tailored.",
        icon: Compass,
      },
      {
        title: "Qualify Call",
        body: "Alignment on risk, privacy, and operating rules before any commitment.",
        icon: ShieldCheck,
      },
      {
        title: "Residency",
        body: "Setup, daily execution routines, journaling, and post-trade reviews on-site.",
        icon: Timer,
      },
    ],
    pathsTitle: "Two Possible Paths",
    pathsBody:
      "Choose mentorship or a structured collaboration depending on fit and compliance.",
    paths: [
      {
        title: "Mentorship Residency",
        body: "Learn the system live. We build your environment, routines, and decision framework with daily coaching.",
        badge: "Primary",
        icon: Award,
      },
      {
        title: "Structured Collaboration",
        body: "For qualified clients only. Collaboration frameworks are assessed case by case and require proper legal compliance.",
        badge: "Conditional",
        icon: Briefcase,
      },
    ],
    methodTitle: "Method Built on Discipline",
    methodBody:
      "The focus is never on hype. It is on process: preparation, execution, and risk control. Track record details are shared privately under NDA.",
    methodPoints: [
      "Risk-first frameworks and predefined rules",
      "Market preparation and scenario planning",
      "Daily review and journaling for accountability",
    ],
    methodCalloutTitle: "Global private-client model",
    methodCalloutBody:
      "Every residency is designed around the client’s environment, time zone, and market focus. Communication is minimal and precise.",
    methodCalloutPoints: [
      "Compliance-first engagement",
      "NDA-ready confidentiality",
      "High-touch mentorship",
    ],
    experienceTitle: "Residency Experience",
    experienceBody:
      "A concierge-level flow that respects privacy, pace, and your environment. Every engagement is designed to feel effortless.",
    experienceCards: [
      {
        title: "Daily Operating Rhythm",
        body: "Morning briefings, live execution, and structured debriefs to reinforce discipline.",
        icon: Calendar,
      },
      {
        title: "Workspace Design",
        body: "Optimized trading setup with minimal distractions and clear visibility.",
        icon: Sparkles,
      },
      {
        title: "Privacy & Discretion",
        body: "NDA-ready by default. Low footprint and high respect for confidentiality.",
        icon: Lock,
      },
    ],
    requirementsTitle: "Client Requirements",
    requirementsBody:
      "To protect the quality of the residency and deliver real outcomes, a few operating requirements are non-negotiable.",
    requirements: [
      "Private accommodation or separate suite",
      "Reliable high-speed internet",
      "Dedicated workspace with minimal interruptions",
      "Minimum engagement of 15 days",
      "Availability for daily debriefs",
    ],
    faqTitle: "FAQ",
    faqs: [
      {
        q: "Do you take custody of client funds?",
        a: "Clients retain custody in their own brokerage accounts. The residency focuses on mentorship and on-site execution support.",
      },
      {
        q: "Are results guaranteed?",
        a: "No. Trading involves risk. The residency emphasizes process, discipline, and risk control.",
      },
      {
        q: "Can you share proof or performance?",
        a: "Verified references and performance context are shared privately under NDA.",
      },
      {
        q: "How many residencies are accepted?",
        a: "A limited number each quarter to protect quality and availability.",
      },
    ],
    applyTitle: "Apply for a Residency",
    applyBody:
      "Complete the application and we will respond within 48 hours if the engagement is a fit.",
    applyNotes: [
      "Your information is handled confidentially.",
      "NDA available prior to any sensitive disclosures.",
    ],
    form: {
      name: "Full name",
      email: "Email address",
      location: "City + country",
      dates: "Preferred dates",
      goal: "Primary goal",
      capital: "Capital range",
      accommodation: "Accommodation type",
      market: "Market focus",
      notes: "Additional context",
      submit: "Submit application",
      sending: "Sending...",
      success: "Application received. We will reply shortly.",
      error: "Something went wrong. Please retry.",
    },
    footer: {
      title: "Trading Itinerario",
      body: "Private, on-site trading residencies for qualified clients. Discretion, discipline, and structure.",
      disclaimer:
        "Trading involves risk. No guarantees. Services are provided under compliance and contract.",
    },
  },
  it: {
    nav: ["Residenza", "Metodo", "Requisiti", "Candidati"],
    heroKicker: "Trading Residency Privata",
    heroTitle: "Trading Itinerario",
    heroSubtitle:
      "Un’esperienza in presenza di 15–30 giorni che unisce mentorship, disciplina operativa e un servizio riservato per clienti selezionati.",
    heroCta: "Candidati alla Residenza",
    heroSecondary: "Richiedi una Call",
    trustStrip: [
      "Massima discrezione",
      "Routine di rischio definito",
      "Posti limitati a trimestre",
    ],
    residencyTitle: "La Residenza",
    residencyBody:
      "Un’esperienza immersiva in presenza pensata per clienti di alto profilo che cercano disciplina e metodo reale.",
    residencySteps: [
      {
        title: "Candidatura",
        body: "Condividi località, date, obiettivi e requisiti. Ogni residenza è su misura.",
        icon: Compass,
      },
      {
        title: "Call di Qualifica",
        body: "Allineamento su rischio, privacy e regole operative prima di confermare.",
        icon: ShieldCheck,
      },
      {
        title: "Residenza",
        body: "Setup, routine giornaliere, journaling e review in presenza.",
        icon: Timer,
      },
    ],
    pathsTitle: "Due Possibili Percorsi",
    pathsBody:
      "Mentorship o collaborazione strutturata, in base a fit e compliance.",
    paths: [
      {
        title: "Mentorship Residency",
        body: "Apprendi il metodo dal vivo: ambiente, routine e framework decisionale con coaching quotidiano.",
        badge: "Principale",
        icon: Award,
      },
      {
        title: "Collaborazione Strutturata",
        body: "Solo per clienti qualificati. Valutata caso per caso con compliance legale.",
        badge: "Condizionato",
        icon: Briefcase,
      },
    ],
    methodTitle: "Metodo Basato sulla Disciplina",
    methodBody:
      "Zero hype. Solo processo: preparazione, esecuzione e controllo del rischio. Le prove si condividono in privato con NDA.",
    methodPoints: [
      "Framework di rischio e regole predefinite",
      "Preparazione al mercato e scenari",
      "Review quotidiane e journaling",
    ],
    methodCalloutTitle: "Modello private-client globale",
    methodCalloutBody:
      "Ogni residenza è progettata intorno all’ambiente del cliente, al fuso orario e al focus di mercato. Comunicazione essenziale e precisa.",
    methodCalloutPoints: [
      "Engagement in compliance",
      "Riservatezza con NDA",
      "Mentorship ad alto contatto",
    ],
    experienceTitle: "Esperienza di Residenza",
    experienceBody:
      "Un flusso concierge che rispetta privacy, tempi e ambiente. Ogni ingaggio è fluido e riservato.",
    experienceCards: [
      {
        title: "Routine Operativa",
        body: "Briefing mattutini, esecuzione live e debrief strutturati.",
        icon: Calendar,
      },
      {
        title: "Workspace Ottimizzato",
        body: "Setup pulito con minima distrazione e massima chiarezza.",
        icon: Sparkles,
      },
      {
        title: "Privacy & Riservatezza",
        body: "NDA su richiesta. Presenza discreta, impatto minimo.",
        icon: Lock,
      },
    ],
    requirementsTitle: "Requisiti Cliente",
    requirementsBody:
      "Per garantire risultati reali sono richiesti alcuni requisiti operativi.",
    requirements: [
      "Alloggio privato o suite separata",
      "Connessione internet stabile",
      "Spazio di lavoro dedicato",
      "Impegno minimo 15 giorni",
      "Disponibilità a debrief giornalieri",
    ],
    faqTitle: "Domande Frequenti",
    faqs: [
      {
        q: "Prendi custodia dei fondi?",
        a: "I fondi restano nel conto del cliente. La residenza è mentorship e supporto operativo in presenza.",
      },
      {
        q: "Garantisci risultati?",
        a: "No. Il trading comporta rischi. L’obiettivo è disciplina e processo.",
      },
      {
        q: "Condividi prove o performance?",
        a: "Referenze verificate e contesto performance sono condivisi in privato con NDA.",
      },
      {
        q: "Quante residenze accetti?",
        a: "Numero limitato ogni trimestre per proteggere qualità e disponibilità.",
      },
    ],
    applyTitle: "Candidati alla Residenza",
    applyBody:
      "Compila il modulo. Rispondiamo entro 48 ore se l’engagement è adatto.",
    applyNotes: [
      "Le informazioni sono trattate con riservatezza.",
      "NDA disponibile prima di ogni dettaglio sensibile.",
    ],
    form: {
      name: "Nome completo",
      email: "Email",
      location: "Città + paese",
      dates: "Date preferite",
      goal: "Obiettivo principale",
      capital: "Capitale",
      accommodation: "Tipo alloggio",
      market: "Mercato di focus",
      notes: "Note aggiuntive",
      submit: "Invia candidatura",
      sending: "Invio...",
      success: "Candidatura ricevuta. Ti risponderemo presto.",
      error: "Errore di invio. Riprova.",
    },
    footer: {
      title: "Trading Itinerario",
      body: "Trading residency in presenza per clienti qualificati. Discrezione, disciplina, struttura.",
      disclaimer:
        "Il trading comporta rischi. Nessuna garanzia. Servizi offerti in compliance e contratto.",
    },
  },
};

const capitalRanges = [
  { value: "50k-150k", label: "$50k–$150k" },
  { value: "150k-500k", label: "$150k–$500k" },
  { value: "500k-1m", label: "$500k–$1m" },
  { value: "1m+", label: "$1m+" },
];

const accommodationTypes = [
  { value: "private-suite", label: "Private suite" },
  { value: "villa", label: "Villa" },
  { value: "private-apartment", label: "Private apartment" },
  { value: "other", label: "Other" },
];

const goals = [
  { value: "mentorship", label: "Mentorship" },
  { value: "collaboration", label: "Collaboration" },
  { value: "undecided", label: "Undecided" },
];

const markets = [
  "FX",
  "Equities",
  "Futures",
  "Indices",
  "Commodities",
  "Crypto (if compliant)",
];

export default function Home() {
  const [language, setLanguage] = useState<"en" | "it">("it");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const copy = useMemo(() => content[language], [language]);
  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      location: "",
      dates: "",
      goal: "mentorship",
      capitalRange: "150k-500k",
      accommodation: "private-suite",
      marketFocus: "FX",
      notes: "",
    },
  });

  async function onSubmit(values: ApplicationInput) {
    setStatus("sending");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      form.reset();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#d6b56d]/10 blur-[90px]" />
          <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-[#5d6d75]/20 blur-[110px]" />
          <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#8f7d5f]/25 blur-[130px]" />
        </div>

        <header className="relative z-10">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-10">
            <div className="flex items-center gap-3 text-lg font-semibold tracking-[0.2em] text-[#d6b56d]">
              <span className="h-2 w-2 rounded-full bg-[#d6b56d]" />
              <span className="font-serif text-sm uppercase tracking-[0.4em] text-[#f6f1e8]">
                Trading Itinerario
              </span>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[#b6afa6] lg:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-sm text-[#b6afa6]">
                      {copy.nav[0]}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="border border-[#2b2520] bg-[#141110]/95 p-4 text-sm text-[#f6f1e8] shadow-xl">
                      <NavigationMenuLink className="block max-w-xs text-[#b6afa6]">
                        {copy.residencyBody}
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#method" className="px-4 py-2">
                      {copy.nav[1]}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#requirements" className="px-4 py-2">
                      {copy.nav[2]}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#apply" className="px-4 py-2">
                      {copy.nav[3]}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <Tabs value={language} onValueChange={(value) => setLanguage(value as "en" | "it")}>
                <TabsList className="bg-[#1a1613]">
                  <TabsTrigger value="en">EN</TabsTrigger>
                  <TabsTrigger value="it">IT</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button
                className="bg-[#d6b56d] text-[#1b140a] hover:bg-[#e1c17f]"
                asChild
              >
                <a href="#apply">{copy.heroCta}</a>
              </Button>
            </nav>
            <div className="flex items-center gap-3 lg:hidden">
              <Tabs value={language} onValueChange={(value) => setLanguage(value as "en" | "it")}>
                <TabsList className="bg-[#1a1613]">
                  <TabsTrigger value="en">EN</TabsTrigger>
                  <TabsTrigger value="it">IT</TabsTrigger>
                </TabsList>
              </Tabs>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-[#2b2520] text-[#f6f1e8]">
                    Menu
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-[#2b2520] bg-[#141110]">
                  <div className="flex flex-col gap-6 text-[#f6f1e8]">
                    {copy.nav.map((item, index) => (
                      <a key={item} href={index === 0 ? "#residency" : index === 1 ? "#method" : index === 2 ? "#requirements" : "#apply"}>
                        {item}
                      </a>
                    ))}
                    <Button className="bg-[#d6b56d] text-[#1b140a] hover:bg-[#e1c17f]" asChild>
                      <a href="#apply">{copy.heroCta}</a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#2b2520] text-[#f6f1e8] hover:bg-[#1a1613]"
                      asChild
                    >
                      <a href="mailto:d.rampinini@gmail.com?subject=Trading%20Residency%20Call">
                        {copy.heroSecondary}
                      </a>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-12 lg:px-10 lg:pb-32">
          <motion.div {...baseFade} className="flex flex-col gap-8">
            <Badge className="w-fit bg-[#1a1613] text-[#d6b56d]">
              {copy.heroKicker}
            </Badge>
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl leading-tight text-[#f6f1e8] sm:text-5xl lg:text-6xl">
                {copy.heroTitle}
              </h1>
              <p className="mt-4 text-lg text-[#b6afa6] sm:text-xl">
                {copy.heroSubtitle}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#d6b56d] text-[#1b140a] hover:bg-[#e1c17f]"
                asChild
              >
                <a href="#apply">
                  {copy.heroCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#2b2520] text-[#f6f1e8] hover:bg-[#1a1613]"
                asChild
              >
                <a href="mailto:d.rampinini@gmail.com?subject=Trading%20Residency%20Call">
                  {copy.heroSecondary}
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div {...baseFade} className="mt-16 grid gap-4 sm:grid-cols-3">
            {copy.trustStrip.map((item) => (
              <Card key={item} className="border-[#2b2520] bg-[#141110]/80 p-6 text-[#f6f1e8]">
                <div className="flex items-center gap-3 text-sm text-[#b6afa6]">
                  <CheckCircle2 className="h-4 w-4 text-[#d6b56d]" />
                  {item}
                </div>
              </Card>
            ))}
          </motion.div>
        </section>
      </div>

      <section id="residency" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <motion.div {...baseFade} className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
            {copy.residencyTitle}
          </p>
          <h2 className="font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
            {copy.residencyTitle}
          </h2>
          <p className="max-w-2xl text-lg text-[#b6afa6]">
            {copy.residencyBody}
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {copy.residencySteps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} {...baseFade}>
                <Card className="h-full border-[#2b2520] bg-[#141110] p-6">
                  <Icon className="h-6 w-6 text-[#d6b56d]" />
                  <h3 className="mt-4 text-xl text-[#f6f1e8]">{step.title}</h3>
                  <p className="mt-3 text-sm text-[#b6afa6]">{step.body}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <motion.div {...baseFade} className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
            {copy.pathsTitle}
          </p>
          <h2 className="font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
            {copy.pathsTitle}
          </h2>
          <p className="max-w-2xl text-lg text-[#b6afa6]">{copy.pathsBody}</p>
        </motion.div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {copy.paths.map((path) => {
            const Icon = path.icon;
            return (
              <motion.div key={path.title} {...baseFade}>
                <Card className="border-[#2b2520] bg-[#141110] p-6">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-[#d6b56d]" />
                    <Badge className="bg-[#1a1613] text-[#d6b56d]">
                      {path.badge}
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-xl text-[#f6f1e8]">{path.title}</h3>
                  <p className="mt-3 text-sm text-[#b6afa6]">{path.body}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="method" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...baseFade}>
            <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
              {copy.methodTitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
              {copy.methodTitle}
            </h2>
            <p className="mt-4 text-lg text-[#b6afa6]">{copy.methodBody}</p>
            <div className="mt-6 space-y-3 text-sm text-[#b6afa6]">
              {copy.methodPoints.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#d6b56d]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...baseFade}>
            <Card className="border-[#2b2520] bg-[#141110] p-8">
              <div className="flex items-center gap-3 text-sm text-[#b6afa6]">
                <Globe className="h-4 w-4 text-[#d6b56d]" />
                {copy.methodCalloutTitle}
              </div>
              <Separator className="my-4 bg-[#2b2520]" />
              <p className="text-sm text-[#b6afa6]">
                {copy.methodCalloutBody}
              </p>
              <div className="mt-6 grid gap-4 text-sm text-[#b6afa6]">
                {copy.methodCalloutPoints.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#d6b56d]" />
                    {point}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <motion.div {...baseFade} className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
            {copy.experienceTitle}
          </p>
          <h2 className="font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
            {copy.experienceTitle}
          </h2>
          <p className="max-w-2xl text-lg text-[#b6afa6]">
            {copy.experienceBody}
          </p>
        </motion.div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {copy.experienceCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.title} {...baseFade}>
                <Card className="border-[#2b2520] bg-[#141110] p-6">
                  <Icon className="h-6 w-6 text-[#d6b56d]" />
                  <h3 className="mt-4 text-xl text-[#f6f1e8]">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#b6afa6]">{card.body}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section id="requirements" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <motion.div {...baseFade}>
            <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
              {copy.requirementsTitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
              {copy.requirementsTitle}
            </h2>
            <p className="mt-4 text-lg text-[#b6afa6]">
              {copy.requirementsBody}
            </p>
          </motion.div>
          <motion.div {...baseFade} className="space-y-4">
            {copy.requirements.map((item) => (
              <Card key={item} className="border-[#2b2520] bg-[#141110] p-4">
                <div className="flex items-start gap-3 text-sm text-[#b6afa6]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#d6b56d]" />
                  <span>{item}</span>
                </div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <motion.div {...baseFade} className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
            {copy.faqTitle}
          </p>
          <h2 className="font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
            {copy.faqTitle}
          </h2>
        </motion.div>
        <motion.div {...baseFade} className="mt-8">
          <Accordion type="single" collapsible className="space-y-4">
            {copy.faqs.map((item) => (
              <AccordionItem
                key={item.q}
                value={item.q}
                className="rounded-2xl border border-[#2b2520] bg-[#141110] px-6"
              >
                <AccordionTrigger className="text-left text-[#f6f1e8]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#b6afa6]">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </section>

      <section id="apply" className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div {...baseFade}>
            <p className="text-sm uppercase tracking-[0.4em] text-[#b6afa6]">
              {copy.applyTitle}
            </p>
            <h2 className="mt-4 font-serif text-3xl text-[#f6f1e8] sm:text-4xl">
              {copy.applyTitle}
            </h2>
            <p className="mt-4 text-lg text-[#b6afa6]">{copy.applyBody}</p>
            <div className="mt-8 space-y-4 text-sm text-[#b6afa6]">
              {copy.applyNotes.map((note) => (
                <div key={note} className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-[#d6b56d]" />
                  {note}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...baseFade}>
            <Card className="border-[#2b2520] bg-[#141110] p-6">
              <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.name}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Luca B." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.email}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="you@domain.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.location}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Milan, Italy" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dates"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.dates}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Oct 5 - Nov 2" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.goal}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={copy.form.goal} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {goals.map((goal) => (
                                <SelectItem key={goal.value} value={goal.value}>
                                  {goal.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="capitalRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.capital}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={copy.form.capital} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {capitalRanges.map((range) => (
                                <SelectItem key={range.value} value={range.value}>
                                  {range.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="accommodation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.accommodation}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={copy.form.accommodation} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {accommodationTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="marketFocus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{copy.form.market}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={copy.form.market} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {markets.map((market) => (
                                <SelectItem key={market} value={market}>
                                  {market}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{copy.form.notes}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Share any additional context or preferences."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-[#d6b56d] text-[#1b140a] hover:bg-[#e1c17f]"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? copy.form.sending : copy.form.submit}
                  </Button>
                  {status === "success" && (
                    <p className="text-sm text-[#9fd4b2]">{copy.form.success}</p>
                  )}
                  {status === "error" && (
                    <p className="text-sm text-[#d9665b]">{copy.form.error}</p>
                  )}
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-[#2b2520] bg-[#0f0d0c]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <h3 className="font-serif text-xl text-[#f6f1e8]">
              {copy.footer.title}
            </h3>
            <p className="mt-3 text-sm text-[#b6afa6]">
              {copy.footer.body}
            </p>
          </div>
          <div className="text-xs text-[#7f776f]">
            {copy.footer.disclaimer}
          </div>
        </div>
      </footer>
    </div>
  );
}
