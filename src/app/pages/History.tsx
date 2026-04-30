import { useState } from "react";
import { CalendarClock, Target, FileText } from "lucide-react";
import { historyTimeline, teamMembers, timelineTypeColors } from "../data/mockData";
import {
  FilterPill,
  GlassPanel,
  MemberChip,
  PageHeader,
  PageTransition,
  SectionTitle,
} from "../components/ui";

const typeLabels = {
  post: "Posts",
  goal: "Metas",
  schedule: "Agendados",
};

export function HistoryPage() {
  const [view, setView] = useState<"Timeline" | "Tabela">("Timeline");
  const [personFilter, setPersonFilter] = useState<number | "todos">("todos");
  const [typeFilter, setTypeFilter] = useState<"todos" | "post" | "goal" | "schedule">("todos");

  const items = historyTimeline.filter((item) => {
    const matchesPerson = personFilter === "todos" || item.authorId === personFilter;
    const matchesType = typeFilter === "todos" || item.type === typeFilter;

    return matchesPerson && matchesType;
  });

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Audit Trail"
        title="Histórico completo da operação"
        description="Acompanhe publicações, metas e movimentações do calendário em ordem cronológica ou em formato de tabela."
        actions={
          <div className="flex flex-wrap gap-2">
            {(["Timeline", "Tabela"] as const).map((item) => (
              <FilterPill key={item} label={item} active={view === item} onClick={() => setView(item)} />
            ))}
          </div>
        }
      />

      <GlassPanel index={1}>
        <SectionTitle title="Filtros" />
        <div className="mt-5 flex flex-col gap-4 lg:flex-row">
          <label className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
            Pessoa
            <select
              value={personFilter}
              onChange={(event) =>
                setPersonFilter(event.target.value === "todos" ? "todos" : Number(event.target.value))
              }
              className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-foreground outline-none"
            >
              <option value="todos">Todos</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-1 flex-col gap-2 text-sm text-muted-foreground">
            Tipo
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as "todos" | "post" | "goal" | "schedule")
              }
              className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-foreground outline-none"
            >
              <option value="todos">Todos</option>
              <option value="post">Posts</option>
              <option value="goal">Metas</option>
              <option value="schedule">Agendados</option>
            </select>
          </label>
        </div>
      </GlassPanel>

      {view === "Timeline" ? (
        <div className="grid gap-4">
          {items.map((item, index) => {
            const member = teamMembers.find((person) => person.id === item.authorId)!;
            const icon =
              item.type === "post" ? FileText : item.type === "goal" ? Target : CalendarClock;

            const Icon = icon;

            return (
              <GlassPanel key={item.id} index={index + 2}>
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: `${timelineTypeColors[item.type]}18`,
                        color: timelineTypeColors[item.type],
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                        <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                          {typeLabels[item.type]}
                        </span>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.date}</span>
                        <span>{item.result}</span>
                        {item.metrics ? <span>{item.metrics}</span> : null}
                      </div>
                    </div>
                  </div>
                  <MemberChip name={member.name} role={member.role} color={member.color} />
                </div>
              </GlassPanel>
            );
          })}
        </div>
      ) : (
        <GlassPanel index={2} className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-muted/60 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <tr>
                  <th className="px-5 py-4">Título / Descrição</th>
                  <th className="px-5 py-4">Tipo</th>
                  <th className="px-5 py-4">Responsável</th>
                  <th className="px-5 py-4">Data</th>
                  <th className="px-5 py-4">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const member = teamMembers.find((person) => person.id === item.authorId)!;

                  return (
                    <tr key={item.id} className="border-t border-border/60">
                      <td className="px-5 py-4">
                        <p className="font-medium text-foreground">{item.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{typeLabels[item.type]}</td>
                      <td className="px-5 py-4">
                        <MemberChip name={member.name} role={member.role} color={member.color} />
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{item.date}</td>
                      <td className="px-5 py-4 text-sm text-foreground">{item.result}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassPanel>
      )}
    </PageTransition>
  );
}
