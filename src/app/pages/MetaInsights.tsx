import { useState } from "react";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import { apiStatus, goals, metaPeriods, teamMembers } from "../data/mockData";
import {
  ActionButton,
  Avatar,
  FilterPill,
  GlassPanel,
  PageHeader,
  PageTransition,
  ProgressBar,
  SectionTitle,
} from "../components/ui";

export function MetaInsightsPage() {
  const [period, setPeriod] = useState<(typeof metaPeriods)[number]>("Mês");

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Goals"
        title="Meta Insights conectados à operação"
        description="Compare objetivo e resultado real para cada iniciativa e identifique rápido onde acelerar ou corrigir a rota."
        actions={
          <div className="flex flex-wrap gap-2">
            {metaPeriods.map((item) => (
              <FilterPill key={item} label={item} active={period === item} onClick={() => setPeriod(item)} />
            ))}
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {goals.map((goal, index) => {
          const member = teamMembers.find((item) => item.id === goal.responsibleId)!;
          const progress = (goal.current / goal.target) * 100;
          const healthy = progress >= 100;
          const caution = progress >= 70 && progress < 100;

          return (
            <GlassPanel key={goal.id} index={index + 1}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{goal.category}</p>
                  <h2 className="mt-2 text-xl font-semibold text-foreground">{goal.name}</h2>
                </div>
                <Avatar name={member.name} color={member.color} />
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/55 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Meta definida</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{goal.target}</p>
                </div>
                <div className="rounded-2xl bg-muted/55 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Resultado real</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{goal.current}</p>
                </div>
              </div>

              <div className="mt-6">
                <ProgressBar value={goal.current} max={goal.target} label={`${progress.toFixed(0)}% da meta`} />
              </div>

              <div
                className="mt-5 rounded-2xl px-4 py-3 text-sm font-medium"
                style={{
                  backgroundColor: healthy ? "#34C75918" : caution ? "#FFCC0018" : "#FF3B3018",
                  color: healthy ? "#34C759" : caution ? "#9A7A00" : "#FF3B30",
                }}
              >
                {healthy
                  ? "Meta superada. Vale replicar este padrão nas próximas semanas."
                  : caution
                    ? "Meta em bom ritmo, mas ainda exige ajustes finos para fechar acima do esperado."
                    : "Alerta: performance abaixo de 70%. Priorize revisão de formato, CTA ou distribuição."}
              </div>
            </GlassPanel>
          );
        })}
      </div>

      <GlassPanel index={7}>
        <SectionTitle
          title="Status da API Meta"
          description={`Visão do conector simulado para o período: ${period}.`}
          action={
            <ActionButton
              variant="secondary"
              onClick={() => toast.success("Dados mockados atualizados com sucesso.")}
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar dados
            </ActionButton>
          }
        />
        <div className="mt-5 flex flex-col gap-4 rounded-3xl bg-muted/45 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative inline-flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-success" />
            </span>
            <div>
              <p className="text-base font-semibold text-foreground">
                {apiStatus.connected ? "Conectado" : "Desconectado"}
              </p>
              <p className="text-sm text-muted-foreground">Última atualização: {apiStatus.lastUpdated}</p>
            </div>
          </div>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            A integração está simulando a sincronização do Instagram Insights via token da Meta para demonstrar o fluxo final do produto.
          </p>
        </div>
      </GlassPanel>
    </PageTransition>
  );
}
