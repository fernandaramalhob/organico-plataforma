import {
  Bar,
  BarChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate, useParams } from "react-router-dom";
import { goals, teamMembers } from "../data/mockData";
import {
  Avatar,
  DetailGrid,
  FilterPill,
  GlassPanel,
  PageHeader,
  PageTransition,
  ProgressBar,
  SectionTitle,
} from "../components/ui";

export function MemberProfilePage() {
  const navigate = useNavigate();
  const params = useParams();
  const member = teamMembers.find((item) => String(item.id) === params.id) ?? teamMembers[0];
  const memberGoals = goals.filter((goal) => goal.responsibleId === member.id);

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Team"
        title="Performance individual do time criativo"
        description="Visualize especialidades, produção recente e evolução de qualidade para cada membro da operação."
        actions={
          <div className="flex flex-wrap gap-2">
            {teamMembers.map((item) => (
              <FilterPill
                key={item.id}
                label={item.name}
                active={item.id === member.id}
                onClick={() => navigate(`/member/${item.id}`)}
              />
            ))}
          </div>
        }
      />

      <GlassPanel index={1}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <Avatar name={member.name} color={member.color} size="lg" />
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">{member.name}</h2>
              <p className="text-base text-muted-foreground">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.specialty}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-muted/50 px-6 py-5 text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Performance Score</p>
            <p className="mt-2 text-5xl font-semibold text-foreground">{member.stats.performance}</p>
          </div>
        </div>

        <div className="mt-6">
          <DetailGrid
            items={[
              { label: "Posts Criados", value: String(member.stats.postsCreated) },
              { label: "Engajamento Médio", value: `${member.stats.avgEngagement}%` },
              { label: "Metas Completadas", value: String(member.stats.goalsCompleted) },
              { label: "Pontualidade", value: `${member.stats.punctuality}%` },
            ]}
          />
        </div>
      </GlassPanel>

      <div className="grid gap-6 2xl:grid-cols-2">
        <GlassPanel index={2}>
          <SectionTitle
            title="Performance geral"
            description="Leitura de capacidade criativa, execução e consistência."
          />
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={member.radar}>
                <PolarGrid stroke="rgb(var(--border) / 0.5)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "rgb(var(--muted-foreground) / 1)" }} />
                <Radar dataKey="value" stroke={member.color} fill={member.color} fillOpacity={0.32} strokeWidth={2} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel index={3}>
          <SectionTitle
            title="Posts por mês"
            description="Volume recente de entregas por ciclo."
          />
          <div className="mt-6 h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={member.monthlyPosts} margin={{ top: 10, right: 12, left: -16, bottom: 0 }}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "rgb(var(--muted-foreground) / 1)", fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="posts" radius={[12, 12, 4, 4]} fill={member.color} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>
      </div>

      <GlassPanel index={4}>
        <SectionTitle
          title="Metas atribuídas"
          description="Panorama das metas sob responsabilidade deste membro."
        />
        <div className="mt-5 grid gap-4">
          {memberGoals.map((goal) => (
            <div key={goal.id} className="rounded-3xl bg-muted/45 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">Prazo: {goal.deadline}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Atual {goal.current} / Meta {goal.target}
                </p>
              </div>
              <div className="mt-4">
                <ProgressBar value={goal.current} max={goal.target} />
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </PageTransition>
  );
}
