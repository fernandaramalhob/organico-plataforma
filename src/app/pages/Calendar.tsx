import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  calendarEvents,
  calendarHours,
  daysOfWeek,
  teamMembers,
  weekLabel,
  type CalendarEvent,
} from "../data/mockData";
import {
  ActionButton,
  Avatar,
  FilterPill,
  GlassPanel,
  PageHeader,
  PageTransition,
  StatusBadge,
  TypeBadge,
  cn,
} from "../components/ui";

const viewModes = ["Dia", "Semana", "Mês"] as const;
const dragType = "calendar-event";
const referenceDate = new Date("2026-04-30T12:00:00");

function addDays(date: Date, value: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + value);
  return nextDate;
}

function startOfWeek(date: Date) {
  const nextDate = new Date(date);
  const offset = (nextDate.getDay() + 6) % 7;
  nextDate.setDate(nextDate.getDate() - offset);
  nextDate.setHours(0, 0, 0, 0);
  return nextDate;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatWeekRange(date: Date) {
  const weekStart = startOfWeek(date);
  const weekEnd = addDays(weekStart, 6);

  return `${new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(weekStart)} - ${new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(weekEnd)}`;
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(date);
}

function formatDayLabel(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit" }).format(date);
}

function buildMonthCells(date: Date) {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const gridStart = startOfWeek(monthStart);

  return Array.from({ length: 35 }, (_, index) => addDays(gridStart, index));
}

function EventCard({
  event,
  compact = false,
}: {
  event: CalendarEvent;
  compact?: boolean;
}) {
  const member = teamMembers.find((item) => item.id === event.responsibleId)!;
  const [, drag] = useDrag(() => ({
    type: dragType,
    item: { id: event.id },
  }));
  const attachDragRef = (node: HTMLButtonElement | null) => {
    drag(node);
  };

  return (
    <button
      ref={attachDragRef}
      type="button"
      className={cn(
        "w-full rounded-2xl p-3 text-left shadow-sm transition hover:-translate-y-0.5",
        compact ? "bg-card/80" : "bg-card shadow-[var(--shadow-card)]",
      )}
      style={{
        borderLeft: `4px solid ${member.color}`,
      }}
    >
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{event.title}</p>
          <TypeBadge value={event.type} />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>{event.time}</span>
          <StatusBadge value={event.status} />
        </div>
        {!compact ? (
          <div className="mt-2 flex items-center gap-3">
            <Avatar name={member.name} color={member.color} size="sm" />
            <span className="text-xs text-muted-foreground">{member.name}</span>
          </div>
        ) : null}
      </div>
    </button>
  );
}

function DropSlot({
  date,
  time,
  events,
  onDropEvent,
}: {
  date: string;
  time: string;
  events: CalendarEvent[];
  onDropEvent: (eventId: number, nextDate: string, nextTime: string) => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: dragType,
    drop: (item: { id: number }) => onDropEvent(item.id, date, time),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const attachDropRef = (node: HTMLDivElement | null) => {
    drop(node);
  };

  return (
    <div
      ref={attachDropRef}
      className={cn(
        "min-h-20 rounded-2xl border border-border/55 bg-muted/25 p-2 transition",
        isOver && "border-primary bg-primary/8",
      )}
    >
      <div className="space-y-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </div>
    </div>
  );
}

export function CalendarPage() {
  const [view, setView] = useState<(typeof viewModes)[number]>("Semana");
  const [currentDate, setCurrentDate] = useState(referenceDate);
  const [events, setEvents] = useState(calendarEvents);

  const weekDates = Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(currentDate), index));
  const monthCells = buildMonthCells(currentDate);

  const handleNavigate = (direction: -1 | 1) => {
    if (view === "Dia") {
      setCurrentDate((previous) => addDays(previous, direction));
      return;
    }

    if (view === "Semana") {
      setCurrentDate((previous) => addDays(previous, direction * 7));
      return;
    }

    setCurrentDate((previous) => new Date(previous.getFullYear(), previous.getMonth() + direction, 1));
  };

  const handleDropEvent = (eventId: number, nextDate: string, nextTime: string) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === eventId ? { ...event, date: nextDate, time: nextTime } : event,
      ),
    );
    toast.success("Post reagendado com sucesso.");
  };

  return (
    <PageTransition>
      <PageHeader
        eyebrow="Planner"
        title="Calendário editorial com visão operacional"
        description="A semana vira um painel vivo para redistribuir a produção, enxergar carga de trabalho e reagendar conteúdos com fluidez."
        actions={
          <ActionButton onClick={() => toast.message("Fluxo de criação de post pronto para integrar.")}>
            <Plus className="h-4 w-4" />
            Novo Post
          </ActionButton>
        }
      />

      <GlassPanel index={1}>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {viewModes.map((mode) => (
              <FilterPill key={mode} label={mode} active={view === mode} onClick={() => setView(mode)} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-muted px-2 py-2">
              <button
                type="button"
                onClick={() => handleNavigate(-1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition hover:bg-background"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleNavigate(1)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition hover:bg-background"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {view === "Semana"
                  ? formatWeekRange(currentDate)
                  : view === "Dia"
                    ? new Intl.DateTimeFormat("pt-BR", {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                      }).format(currentDate)
                    : formatMonthLabel(currentDate)}
              </p>
              <p className="text-sm text-muted-foreground">{weekLabel}</p>
            </div>
          </div>
        </div>
      </GlassPanel>

      {view === "Semana" ? (
        <GlassPanel index={2} className="overflow-hidden">
          <div className="grid grid-cols-[72px_repeat(7,minmax(0,1fr))] gap-3">
            <div />
            {weekDates.map((date, index) => (
              <div key={formatDateKey(date)} className="px-1 pb-2 text-center">
                <p className="text-sm font-semibold text-foreground">{daysOfWeek[index]}</p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(date)}
                </p>
              </div>
            ))}

            {calendarHours.map((hour) => (
              <FragmentRow
                key={hour}
                hour={hour}
                dates={weekDates}
                events={events}
                onDropEvent={handleDropEvent}
              />
            ))}
          </div>
        </GlassPanel>
      ) : null}

      {view === "Dia" ? (
        <div className="grid gap-4">
          {calendarHours.map((hour, index) => {
            const currentKey = formatDateKey(currentDate);
            const currentEvents = events.filter((event) => event.date === currentKey && event.time === hour);

            return (
              <GlassPanel key={hour} index={index + 2}>
                <div className="grid gap-4 lg:grid-cols-[120px_minmax(0,1fr)] lg:items-start">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{hour}</p>
                    <p className="text-sm text-muted-foreground">{formatDayLabel(currentDate)}</p>
                  </div>
                  <DropSlot
                    date={currentKey}
                    time={hour}
                    events={currentEvents}
                    onDropEvent={handleDropEvent}
                  />
                </div>
              </GlassPanel>
            );
          })}
        </div>
      ) : null}

      {view === "Mês" ? (
        <GlassPanel index={2}>
          <div className="grid grid-cols-7 gap-3">
            {daysOfWeek.map((day) => (
              <div key={day} className="px-2 pb-1 text-sm font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            {monthCells.map((date) => {
              const dateKey = formatDateKey(date);
              const monthEvents = events.filter((event) => event.date === dateKey);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();

              return (
                <div
                  key={dateKey}
                  className={cn(
                    "min-h-36 rounded-3xl border border-border/60 bg-muted/35 p-3",
                    !isCurrentMonth && "opacity-45",
                  )}
                >
                  <p className="text-sm font-semibold text-foreground">{date.getDate()}</p>
                  <div className="mt-3 space-y-2">
                    {monthEvents.slice(0, 2).map((event) => (
                      <div key={event.id} className="rounded-2xl bg-card px-3 py-2 text-xs">
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="mt-1 text-muted-foreground">
                          {event.time} • {event.type}
                        </p>
                      </div>
                    ))}
                    {monthEvents.length > 2 ? (
                      <p className="text-xs font-medium text-primary">+{monthEvents.length - 2} mais</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassPanel>
      ) : null}
    </PageTransition>
  );
}

function FragmentRow({
  hour,
  dates,
  events,
  onDropEvent,
}: {
  hour: string;
  dates: Date[];
  events: CalendarEvent[];
  onDropEvent: (eventId: number, nextDate: string, nextTime: string) => void;
}) {
  return (
    <>
      <div className="pt-3 text-xs font-medium text-muted-foreground">{hour}</div>
      {dates.map((date) => {
        const dateKey = formatDateKey(date);
        const slotEvents = events.filter((event) => event.date === dateKey && event.time === hour);

        return (
          <DropSlot
            key={`${dateKey}-${hour}`}
            date={dateKey}
            time={hour}
            events={slotEvents}
            onDropEvent={onDropEvent}
          />
        );
      })}
    </>
  );
}
