// Limites do plano gratuito e mensagens do modal de upgrade, compartilhados entre verificações no servidor e UI do cliente.
// Limites pagos vêm das features dos planos do Clerk (veja lib/billing.ts).

export const FREE_WORKSPACE_LIMIT = 3;
export const FREE_MONTHLY_PROMPTS = 20;

// Retornado por /api/agent quando os prompts mensais do proprietário se esgotam.
export const PROMPT_LIMIT_ERROR = "prompt_limit_reached";

export const UPGRADE_REASONS = {
  prompts: {
    title: "Você atingiu o limite de prompts do agente",
    description: "O plano deste workspace utilizou todos os prompts deste mês. Faça upgrade para ter mais.",
  },
  workspaces: {
    title: `Você atingiu o limite de ${FREE_WORKSPACE_LIMIT} workspaces`,
    description: `O plano gratuito inclui ${FREE_WORKSPACE_LIMIT} workspaces. Faça upgrade para ter workspaces ilimitados.`,
  },
  sharing: {
    title: "Links públicos são um recurso pago",
    description: "Faça upgrade para compartilhar um link somente leitura deste workspace com qualquer pessoa.",
  },
  pdfExport: {
    title: "Exportar em PDF é um recurso pago",
    description: "Faça upgrade para exportar o documento e o canvas deste workspace em PDF.",
  },
};

export type LimitError = keyof typeof UPGRADE_REASONS;