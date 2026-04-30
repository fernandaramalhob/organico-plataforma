import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Eye, Rocket, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  dashboardMetrics,
  dashboardSummary,
  evolutionData,
  goals,
  teamMembers,
  topPosts,
  worstPosts,
} from "../data/mockData";
import {
  GlassPanel,
  HealthScoreRing,
  MemberChip,
  MetricStat,
  PageHeader,
  PageTransition,
  ProgressBar,
  SectionTitle,
  StatusBadge,
  TypeBadge,
  formatCompactNumber,
  formatLongNumber,
} from "../components/ui";

const metricIcons = [Eye, BarChart3, Sparkles, Rocket];

export function DashboardPage() {
  return (
    <PageTransition>
      <PageHeader
        eyebrow="Overview"
        title="Saúde completa do Instagram da Great"
        description="Uma leitura executiva da operação criativa, com performance, metas e alertas de conteúdo em um único lugar."
      />

      <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
        <GlassPanel className="flex flex-col items-center justify-center p-6" index={1}>
          <HealthScoreRing score={dashboardSummary.healthScore} />
          <div className="mt-5 grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-2xl bg-muted/65 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Metas concluídas</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{dashboardSummary.completedGoals}/6</p>
            </div>
            <div className="rounded-2xl bg-muted/65 p-4 text-center">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Engajamento total</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{formatLongNumber(dashboardSummary.totalEngagement)}</p>
            </div>
          </div>
        </GlassPanel>

        <div className="grid gap-6 md:grid-cols-2">
          {dashboardMetrics.map((metric, index) => {
            const Icon = metricIcons[index];

            return (
              <MetricStat
                key={metric.id}
                icon={Icon}
                label={metric.label}
                value={metric.value}
                change={metric.change}
                detail={metric.highlight}
              />
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel index={2}>
          <SectionTitle
            title="Top 5 conteúdos"
            description="Os posts que mais puxaram alcance, saves e conversa nas últimas semanas."
          />
          <div className="mt-5 space-y-3">
            {topPosts.map((post, index) => {
              const member = teamMembers.find((item) => item.id === post.authorId)!;

              return (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="flex flex-col gap-4 rounded-3xl bg-muted/45 p-4 transition duration-200 hover:bg-muted/80 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                      #{index + 1}
                    </div>
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="hidden h-16 w-24 rounded-2xl object-cover sm:block"
                    />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground sm:text-base">{post.title}</h3>
                        <TypeBadge value={post.type} />
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground sm:text-sm">
                        <span>{member.name}</span>
                        <span>{post.date}</span>
                        <span>{formatCompactNumber(post.reach)} de alcance</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Engajamento</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{formatLongNumber(post.engagement)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel index={3}>
          <SectionTitle
            title="Conteúdos com baixa performance"
            description="Peças que pedem ajuste imediato de gancho, CTA ou proposta editorial."
          />
          <div className="mt-5 grid gap-4">
            {worstPosts.map((post) => {
              const member = teamMembers.find((item) => item.id === post.authorId)!;

              return (
                <div
                  key={post.id}
                  className="rounded-3xl border border-destructive/20 bg-destructive/6 p-5"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <TypeBadge value={post.type} />
                    <StatusBadge value="Atenção" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{post.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span>{member.name}</span>
                    <span>{formatLongNumber(post.engagement)} de engajamento</span>
                    <span>{formatCompactNumber(post.reach)} de alcance</span>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]">
        <GlassPanel index={4}>
          <SectionTitle
            title="Comparação meta vs resultado"
            description="As três metas mais críticas do ciclo atual."
          />
          <div className="mt-5 space-y-5">
            {goals.slice(0, 3).map((goal) => {
              const member = teamMembers.find((item) => item.id === goal.responsibleId)!;
              const progress = (goal.current / goal.target) * 100;

              return (
                <div key={goal.id} className="rounded-3xl bg-muted/45 p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-foreground">{goal.name}</h3>
                      <MemberChip name={member.name} role={member.role} color={member.color} />
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-muted-foreground">
                        {goal.current} / {goal.target}
                      </p>
                      <p className="text-2xl font-semibold text-foreground">{progress.toFixed(0)}%</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={goal.current} max={goal.target} />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>

        <GlassPanel index={5}>
          <SectionTitle
            title="Evolução nos últimos 30 dias"
            description="A curva conjunta de alcance e engajamento mostra aceleração sustentável."
          />
          <div className="mt-6 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData} margin={{ top: 10, right: 18, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="reachGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#D10000" stopOpacity={0.38} />
                    <stop offset="100%" stopColor="#D10000" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="engagementGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#007AFF" stopOpacity={0.34} />
                    <stop offset="100%" stopColor="#007AFF" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgb(var(--border) / 0.5)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 18,
                    border: "1px solid rgb(var(--border) / 0.65)",
                    backgroundColor: "rgb(var(--card) / 0.96)",
                  }}
                />
                <Area type="monotone" dataKey="reach" stroke="#D10000" fill="url(#reachGradient)" strokeWidth={3} />
                <Area type="monotone" dataKey="engagement" stroke="#007AFF" fill="url(#engagementGradient)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </div>
    </PageTransition>
  );
}
