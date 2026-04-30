import { Plus, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { ideas, teamMembers } from "../data/mockData";
import {
  ActionButton,
  GlassPanel,
  MemberChip,
  PageHeader,
  PageTransition,
  StatusBadge,
} from "../components/ui";

export function IdeasPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Pipeline"
        title="Banco de ideias pronto para produção"
        description="Temas, roteiros e responsáveis ficam organizados para a operação girar com mais velocidade e menos retrabalho."
        actions={
          <ActionButton onClick={() => toast.message("Pronto para conectar um modal de criação de ideia.")}>
            <Plus className="h-4 w-4" />
            Nova Ideia
          </ActionButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {ideas.map((idea, index) => {
          const member = teamMembers.find((item) => item.id === idea.responsibleId)!;

          return (
            <GlassPanel key={idea.id} index={index + 1}>
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <StatusBadge value={idea.status} />
              </div>

              <div className="mt-5">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-foreground">{idea.title}</h2>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {idea.theme}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{idea.description}</p>
              </div>

              {idea.script ? (
                <div className="mt-5 rounded-3xl bg-muted/45 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Roteiro</p>
                  <p className="mt-2 text-sm leading-6 text-foreground">{idea.script}</p>
                </div>
              ) : null}

              <div className="mt-6 border-t border-border/60 pt-5">
                <MemberChip name={member.name} role={member.role} color={member.color} />
              </div>
            </GlassPanel>
          );
        })}
      </div>
    </PageTransition>
  );
}
