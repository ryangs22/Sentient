"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { CheckoutButton, usePlans, useSubscription } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";

type PayerType = "user" | "organization";
type Plan = NonNullable<ReturnType<typeof usePlans>["data"]>[number];

const TABS: { value: PayerType; label: string }[] = [
  { value: "user", label: "Pessoal" },
  { value: "organization", label: "Equipe" },
];

// Planos por assento cobram por membro; todos os demais têm uma mensalidade fixa.
function planPrice(plan: Plan) {
  const seatFee = plan.unitPrices?.find((u) => u.name === "seats")?.tiers[0]?.feePerBlock;
  if (seatFee && seatFee.amount > 0) {
    return { amount: `${seatFee.currencySymbol}${seatFee.amountFormatted}`, unit: "por membro / mês" };
  }
  if (plan.fee && plan.fee.amount > 0) {
    return { amount: `${plan.fee.currencySymbol}${plan.fee.amountFormatted}`, unit: "por mês" };
  }
  return { amount: "$0", unit: "para sempre" };
}

// Primeiro o plano gratuito, depois os pagos, do mais barato ao mais caro.
function sortPlans(plans: Plan[]) {
  const cost = (plan: Plan) =>
    plan.isDefault ? -1 : (plan.unitPrices?.[0]?.tiers[0]?.feePerBlock.amount ?? plan.fee?.amount ?? 0);
  return [...plans].sort((a, b) => cost(a) - cost(b));
}

// Compartilhado entre a landing page e o diálogo de upgrade. Planos, preços e features
// vêm do painel do Clerk. Os cards pagos abrem o checkout do Clerk; os planos de equipe
// cobram a organização ativa. `onCheckoutStart` permite que um contêiner (como um diálogo) feche antes de abrir.
export function PricingPlans({
  title,
  description,
  onCheckoutStart,
}: {
  title?: string;
  description?: string;
  onCheckoutStart?: () => void;
}) {
  const { isSignedIn, orgId } = useAuth();
  const [tab, setTab] = useState<PayerType | null>(null);
  // Até o visitante escolher uma aba, mostra os planos de acordo com onde ele está agora.
  const payerType = tab ?? (orgId ? "organization" : "user");

  const { data: plans, isLoading } = usePlans({ for: payerType, pageSize: 10 });
  const { data: subscription } = useSubscription({
    for: payerType,
    enabled: !!isSignedIn && (payerType === "user" || !!orgId),
  });
  const activePlanIds = new Set(
    subscription?.subscriptionItems.filter((item) => item.status === "active").map((item) => item.plan.id)
  );
  const sortedPlans = sortPlans(plans ?? []);
  // Apenas o plano pago de entrada (Pro ou Team) é destacado, não todos os planos pagos.
  const featuredPlanId = sortedPlans.find((plan) => !plan.isDefault)?.id;

  return (
    // w-full: dentro de um grid (como no diálogo), só o mx-auto faria isto encolher até o tamanho do conteúdo.
    <div className="mx-auto w-full max-w-5xl">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          {description && <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{description}</p>}
        </div>
      )}

      <div className="mx-auto mb-10 flex w-fit rounded-full border border-white/10 bg-white/3 p-1">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-full px-5 py-1.5 text-sm transition-colors ${
              payerType === value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={`grid gap-6 ${sortedPlans.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {isLoading
          ? [0, 1].map((i) => <div key={i} className="h-96 animate-pulse rounded-2xl border border-white/8 bg-white/3" />)
          : sortedPlans.map((plan) => {
              const price = planPrice(plan);
              const isCurrent =
                activePlanIds.has(plan.id) || (!!isSignedIn && plan.isDefault && activePlanIds.size === 0);
              const isFeatured = plan.id === featuredPlanId;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border p-7 ${
                    isFeatured
                      ? "border-primary/40 bg-primary/4 shadow-2xl shadow-primary/5"
                      : "border-white/10 bg-white/2"
                  }`}
                >
                  {/* Fica centralizado na borda superior do card. */}
                  {isFeatured && payerType === "organization" && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/20">
                      Popular
                    </span>
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {isCurrent && (
                      <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs text-muted-foreground">
                        Plano atual
                      </span>
                    )}
                  </div>
                  {plan.description && <p className="mt-1.5 text-sm text-muted-foreground">{plan.description}</p>}

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-heading text-4xl font-semibold tracking-tight">{price.amount}</span>
                    <span className="text-sm text-muted-foreground">{price.unit}</span>
                  </div>

                  <ul className="mt-6 mb-8 flex-1 space-y-2.5">
                    {plan.features.length === 0 ? (
                      <li className="text-sm text-muted-foreground">O workspace essencial: docs, canvas e o agente</li>
                    ) : (
                      plan.features.map((feature) => (
                        <li key={feature.id} className="flex items-start gap-2.5 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                          {feature.name}
                        </li>
                      ))
                    )}
                  </ul>

                  <PlanAction
                    plan={plan}
                    payerType={payerType}
                    isFeatured={isFeatured}
                    isCurrent={isCurrent}
                    onCheckoutStart={onCheckoutStart}
                  />
                </div>
              );
            })}
      </div>
    </div>
  );
}

function PlanAction({
  plan,
  payerType,
  isFeatured,
  isCurrent,
  onCheckoutStart,
}: {
  plan: Plan;
  payerType: PayerType;
  isFeatured: boolean;
  isCurrent: boolean;
  onCheckoutStart?: () => void;
}) {
  const { isSignedIn, orgId, has } = useAuth();
  const { organization } = useOrganization();
  const isPaid = !plan.isDefault;

  if (!isSignedIn) {
    return (
      <Button asChild size="lg" variant={isFeatured ? "default" : "outline"} className="w-full">
        <Link href="/sign-up">{isPaid ? `Assinar ${plan.name}` : "Começar"}</Link>
      </Button>
    );
  }

  if (isCurrent || !isPaid) {
    return (
      <Button size="lg" variant="outline" className="w-full" disabled>
        {isCurrent ? "Plano atual" : "Incluído"}
      </Button>
    );
  }

  if (payerType === "organization") {
    if (!orgId) {
      return <Note>Selecione ou crie uma equipe no cabeçalho para fazer o upgrade.</Note>;
    }
    // O Clerk só permite que membros com a permissão de cobrança (administradores, por padrão) gerenciem o plano.
    if (!has?.({ permission: "org:sys_billing:manage" })) {
      return <Note>Peça a um administrador de {organization?.name ?? "sua equipe"} para fazer o upgrade.</Note>;
    }
  }

  return (
    <div className="space-y-2">
      {payerType === "organization" && organization && (
        <p className="text-center text-xs text-muted-foreground">
          Fazendo upgrade de <span className="text-foreground">{organization.name}</span>
        </p>
      )}
      {/* O CheckoutButton executa primeiro o onClick deste botão e depois abre o checkout do Clerk. */}
      <CheckoutButton planId={plan.id} planPeriod="month" for={payerType}>
        <Button size="lg" variant={isFeatured ? "default" : "outline"} className="w-full" onClick={onCheckoutStart}>
          Fazer upgrade para {plan.name}
        </Button>
      </CheckoutButton>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-lg border border-white/10 bg-white/3 px-4 py-3 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}