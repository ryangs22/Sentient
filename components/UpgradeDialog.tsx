"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PricingTable, useAuth } from "@clerk/nextjs";

type UpgradeReason = { title: string; description?: string };

const DEFAULT_REASON: UpgradeReason = {
  title: "Faça upgrade do seu plano",
  description: "Tenha mais prompts de agente, workspaces ilimitados, links compartilháveis e exportação em PDF.",
};

const UpgradeDialogContext = createContext<(reason?: UpgradeReason) => void>(() => {});

// Permite que qualquer parte da aplicação abra o modal de planos com o seu próprio motivo, ex.:
// openUpgrade({ title: "Você atingiu o limite de prompts" }) ou { title: "Exportar em PDF é um recurso pago" }.
export function UpgradeDialogProvider({ children }: { children: ReactNode }) {
  const [reason, setReason] = useState<UpgradeReason | null>(null);
  const { orgId } = useAuth();
  const close = () => setReason(null);

  return (
    <UpgradeDialogContext.Provider value={(next) => setReason(next ?? DEFAULT_REASON)}>
      {children}
      <Dialog modal={false} open={reason !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-5xl">
          <DialogHeader className="items-center text-center">
            <DialogTitle className="text-2xl">{reason?.title}</DialogTitle>
            {reason?.description && <DialogDescription>{reason.description}</DialogDescription>}
          </DialogHeader>
          {/* Feche primeiro: este dialog bloqueia cliques fora dele, incluindo a gaveta de checkout do Clerk. */}
          <PricingTable for={orgId ? "organization" : "user"} />
        </DialogContent>
      </Dialog>
    </UpgradeDialogContext.Provider>
  );
}

export function useUpgradeDialog() {
  return useContext(UpgradeDialogContext);
}