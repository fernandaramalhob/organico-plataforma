import { Calendar, Plus, Target } from "lucide-react";
import { toast } from "sonner";
import { goals, teamMembers } from "../data/mockData";
import {
  ActionButton,
  GlassPanel,
  MemberChip,
  PageHeader,
  PageTransition,
  ProgressBar,
} from "../components/ui";

export function GoalsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Execution"
        title="Metas vivas e conectadas ao time"
        description="Cada meta reúne responsável, contexto, progresso e o status operacional para a Great agir antes do resultado final."
        actions={
          <ActionButton onClick={() => toast.message("Fluxo de nova meta pronto para integrar com backend.")}>
            <Plus className="h-4 w-4" />
            Nova Meta
          </ActionButton>
        }
      />

      <div className="grid gap-6">
        {goals.map((goal, index) => {
          const member = teamMembers.find((item) => item.id === goal.responsibleId)!;
          const progress = (goal.current / goal.target) * 100;

          return (
            <GlassPanel key={goal.id} index={index + 1}>
              <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground">{goal.name}</h2>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {goal.category}
                    </span>
                  </div>
                  <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{goal.description}</p>
                  <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {goal.period}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Prazo: {goal.deadline}
                    </span>
                  </div>
                </div>
                <MemberChip name={member.name} role={member.role} color={member.color} />
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Meta</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{goal.target}</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Atual</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{goal.current}</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Progresso</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">{progress.toFixed(0)}%</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <ProgressBar value={goal.current} max={goal.target} />
                <p className="text-sm text-muted-foreground">
                  {progress >= 100
                    ? "Meta atingida. Vale transformar este resultado em benchmark interno."
                    : `Faltam ${(goal.target - goal.current).toFixed(goal.target > 100 ? 0 : 1)} para concluir esta meta.`}
                </p>
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </PageTransition>
  );
}
