import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Clock3, Lightbulb, TrendingDown, TrendingUp, Zap } from "lucide-react";
import { contentDistribution, insights } from "../data/mockData";
import {
  GlassPanel,
  PageHeader,
  PageTransition,
  SectionTitle,
} from "../components/ui";

export function InsightsPage() {
  const cards = [
    {
      title: "Melhor horário",
      icon: Clock3,
      value: `${insights.bestTime.day}, ${insights.bestTime.hour}`,
      detail: `${insights.bestTime.engagement}% mais engajamento do que a média`,
      color: "#007AFF",
    },
    {
      title: "Melhor tipo de conteúdo",
      icon: TrendingUp,
      value: insights.bestContent.type,
      detail: `${insights.bestContent.avgEngagement} de engajamento médio e ${insights.bestContent.avgReach} de alcance`,
      color: "#34C759",
    },
    {
      title: "Pior desempenho",
      icon: TrendingDown,
      value: insights.worstContent.type,
      detail: `${insights.worstContent.avgEngagement} de engajamento médio e ${insights.worstContent.avgReach} de alcance`,
      color: "#FF3B30",
    },
    {
      title: "Tendência de crescimento",
      icon: Zap,
      value: insights.growthTrend.rate,
      detail: insights.growthTrend.prediction,
      color: "#D10000",
    },
  ];

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Signals"
        title="Insights acionáveis para o próximo ciclo"
        description="O produto transforma dados do Instagram em pistas práticas de horário, formato e alavancas criativas para o time."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <GlassPanel key={card.title} index={index + 1}>
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${card.color}18`, color: card.color }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{card.title}</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{card.value}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{card.detail}</p>
            </GlassPanel>
          );
        })}
      </div>

      <div className="grid gap-6 2xl:grid-cols-[0.9fr_1.1fr]">
        <GlassPanel index={5}>
          <SectionTitle
            title="Distribuição de conteúdo"
            description="Percentual de publicações por formato dentro do mês."
          />
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contentDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={108}
                  paddingAngle={4}
                >
                  {contentDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 18,
                    border: "1px solid rgb(var(--border) / 0.65)",
                    backgroundColor: "rgb(var(--card) / 0.96)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {contentDistribution.map((item) => (
              <div key={item.name} className="rounded-2xl bg-muted/45 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <p className="font-medium text-foreground">{item.name}</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.value}% do volume total</p>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel
          index={6}
          className="overflow-hidden bg-[linear-gradient(135deg,rgba(209,0,0,0.95),rgba(255,122,89,0.85))] text-white"
        >
          <SectionTitle
            title="Recomendações de alto impacto"
            description="Prioridades sugeridas a partir do comportamento recente dos conteúdos."
          />
          <div className="mt-6 grid gap-4">
            {insights.recommendations.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-3xl bg-white/10 p-4 backdrop-blur"
              >
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-white/14">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 text-white/92">{item}</p>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
