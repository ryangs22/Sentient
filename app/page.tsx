import Link from "next/link";
import { ArrowRight, Brain, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapAnnotations } from "./_components/MapAnnotations";
import { HeroDemo } from "./_components/HeroDemo";
import { PricingPlans } from "@/components/PricingPlans";
import { AUDIENCES, STEPS, SURFACES } from "./_data/landing";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero, sobre as curvas de nível topográficas */}
      <section className="topo-bg px-6 pt-10 pb-24 md:px-10 md:pt-16">
        <MapAnnotations />
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <SectionLabel>SENTIENT</SectionLabel>

          <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Um espaço <span className="text-primary">senciente</span> para tudo que você constrói
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Converse com um agente de IA que desenha no seu canvas e escreve
            seus docs, enquanto toda a sua equipe trabalha ao lado dele em
            tempo real.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/sign-up">
                Comece a criar de graça <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="#how-it-works">Veja como funciona</Link>
            </Button>
          </div>
        </div>

        {/* Demonstração do produto: um mock animado feito em código (veja HeroDemo) */}
        <div className="survey-frame scroll-tilt mx-auto mt-16 max-w-5xl">
          <div className="relative aspect-16/9.25 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl shadow-black/40">
            <HeroDemo />
          </div>
        </div>
      </section>

      {/* Para quem é: curto e objetivo, já que ainda não há logos de clientes */}
      <section className="border-t border-white/10 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            Feito para
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            {AUDIENCES.map((audience) => (
              <li
                key={audience}
                className="flex items-center gap-2.5 text-foreground/85"
              >
                <span className="size-1.5 rotate-45 bg-primary" />
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Uma linha por superfície: canvas, docs, quadro da equipe. Os textos ficam em _data/landing.ts */}
      <section
        id="product"
        className="border-t border-white/10 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>O workspace</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Um agente, um workspace, toda a sua equipe
            </h2>
          </div>

          <div className="mt-20 flex flex-col gap-24">
            {SURFACES.map(({ icon: Icon, visual: Visual, ...surface }, i) => (
              <SurfaceRow
                key={surface.title}
                reverse={i % 2 === 1}
                icon={<Icon className="size-5" />}
                visual={<Visual />}
                {...surface}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section
        id="how-it-works"
        className="border-t border-white/10 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionLabel>02 · O caminho</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Veja o agente pensar, não só o resultado
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Step
                key={step.title}
                number={String(i + 1).padStart(2, "0")}
                title={step.title}
              >
                {step.body}
              </Step>
            ))}
          </div>
        </div>
      </section>

      {/* Preços */}
      <section
        id="pricing"
        className="border-t border-white/10 px-6 py-24 md:px-10"
      >
        <div className="mx-auto mb-12 max-w-5xl text-center">
          <SectionLabel>03 · Preços</SectionLabel>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Comece de graça, faça upgrade quando fizer sentido
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Faça upgrade só para você ou para toda a sua equipe, com cobrança por membro.
          </p>
        </div>
        <PricingPlans />
      </section>

      {/* CTA final, de volta sobre o mapa, para a página abrir e fechar com ele */}
      <section className="topo-bg border-t border-white/10 px-6 py-28 md:px-10">
        <MapAnnotations />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <Brain className="size-10 text-primary/90" />
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Dê ao seu workspace um colaborador
          </h2>
          <Button asChild size="lg" className="gap-2 text-base">
            <Link href="/sign-up">
              Comece de graça <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-muted-foreground md:px-10">
        Desenvolvido por Ryan Gabriel - 2026
      </footer>
    </div>
  );
}

function SurfaceRow({
  icon,
  title,
  description,
  bullets,
  reverse,
  visual,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  visual: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-12 md:flex-row md:items-center md:gap-16 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          {icon}
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h3>
        <p className="mt-3 text-muted-foreground">{description}</p>
        <ul className="mt-6 space-y-3">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-sm text-foreground/90"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
      {/* Mock estático de interface para cada superfície */}
      <div className="flex-1">{visual}</div>
    </div>
  );
}

// Rótulo no estilo de legenda de mapa acima de um título, combinando com as anotações dos cantos.
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
      <span className="size-1.5 rotate-45 bg-primary" />
      {children}
    </p>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Ponto de passagem em uma trilha tracejada, para os passos parecerem uma única rota */}
      <div className="flex items-center gap-3">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-primary/60 font-mono text-[10px] text-primary">
          {number}
        </span>
        <span className="h-px flex-1 border-t border-dashed border-white/15" />
      </div>
      <h3 className="mt-4 font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}