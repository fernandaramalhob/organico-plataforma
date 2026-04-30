import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Eye, BarChart3, Sparkles, Rocket, Printer } from "lucide-react";
import {
  dashboardMetrics,
  dashboardSummary,
  evolutionData,
  goals,
  insights,
  teamMembers,
  topPosts,
} from "../data/mockData";
import {
  ActionButton,
  GlassPanel,
  PageHeader,
  PageTransition,
  ProgressBar,
  SectionTitle,
} from "../components/ui";

const reportIcons = [Eye, BarChart3, Sparkles, Rocket];

export function ReportsPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Report"
        title="Relatório executivo da Great Orgânico"
        description="Uma versão pronta para impressão com os principais sinais da operação criativa, performance do Instagram e leitura estratégica do período."
        actions={
          <ActionButton onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Gerar PDF
          </ActionButton>
        }
      />

      <div className="print:block hidden rounded-3xl border border-border bg-white p-6 text-black">
        <h2 className="text-2xl font-semibold">Great Orgânico</h2>
        <p className="mt-2 text-sm text-neutral-600">Relatório de performance | 30 Abr 2026</p>
      </div>

      <GlassPanel
        index={1}
        className="overflow-hidden bg-[linear-gradient(135deg,rgba(209,0,0,0.95),rgba(255,122,89,0.88))] text-white"
      >
        <h2 className="text-2xl font-semibold">Resumo executivo</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/88">
          O perfil mantém saúde alta, acelera crescimento de alcance e encontra melhor eficiência quando combina reels educativos com repertório prático de operação.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Saúde do Instagram", value: String(dashboardSummary.healthScore) },
            { label: "Alcance total", value: "125.400" },
            { label: "Engajamento", value: "18.750" },
            { label: "Metas completas", value: "4/6" },
          ].map((item) => (
            <div key={item.label} className="rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = reportIcons[index];

          return (
            <GlassPanel key={metric.id} index={index + 2}>
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold text-foreground">{metric.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {metric.change > 0 ? "+" : ""}
                {metric.change}% no período
              </p>
            </GlassPanel>
          );
        })}
      </div>

      <GlassPanel index={6}>
        <SectionTitle title="Evolução de alcance" description="Curva de crescimento do período." />
        <div className="mt-6 h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
              <defs>
                <linearGradient id="reportReach" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D10000" stopOpacity={0.36} />
                  <stop offset="100%" stopColor="#D10000" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgb(var(--border) / 0.5)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="reach" stroke="#D10000" strokeWidth={3} fill="url(#reportReach)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>

      <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel index={7}>
          <SectionTitle title="Top 5 conteúdos" />
          <div className="mt-5 space-y-3">
            {topPosts.map((post, index) => {
              const member = teamMembers.find((item) => item.id === post.authorId)!;

              return (
                <div key={post.id} className="flex items-center justify-between gap-4 rounded-2xl bg-muted/45 p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {post.type} • {member.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-foreground">{post.engagement} eng.</p>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel index={8}>
          <SectionTitle title="Progresso de metas" />
          <div className="mt-5 space-y-5">
            {goals.slice(0, 4).map((goal) => (
              <div key={goal.id}>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{goal.name}</p>
                    <p className="text-sm text-muted-foreground">{goal.category}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {goal.current}/{goal.target}
                  </p>
                </div>
                <ProgressBar value={goal.current} max={goal.target} />
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GlassPanel index={9}>
          <SectionTitle title="Insights principais" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-muted/45 p-5">
              <p className="text-sm text-muted-foreground">Melhor horário</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {insights.bestTime.day}, {insights.bestTime.hour}
              </p>
            </div>
            <div className="rounded-3xl bg-muted/45 p-5">
              <p className="text-sm text-muted-foreground">Melhor conteúdo</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{insights.bestContent.type}</p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel index={10}>
          <SectionTitle title="Conclusão" />
          <p className="mt-5 text-sm leading-7 text-muted-foreground">
            A Great Orgânico encontra sua melhor resposta quando combina repertório aplicado, bastidores reais
            e clareza de CTA. O próximo ciclo deve preservar o ritmo de reels educativos, elevar a taxa de
            engajamento em stories e reduzir publicações institucionais com pouco contexto.
          </p>
        </GlassPanel>
      </div>

      <div className="print:block hidden rounded-3xl border border-border bg-white p-6 text-sm text-neutral-600">
        Relatório gerado automaticamente em 30 Abr 2026, 09:12.
      </div>
    </PageTransition>
  );
}
