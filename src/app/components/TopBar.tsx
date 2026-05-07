import { NavLink } from "react-router-dom";
import {
  MoonStar,
  SunMedium,
} from "lucide-react";
import { Avatar } from "./ui";
import { useCurrentTeamMember } from "../data/profiles";
import { useThemeMode } from "../theme";

export function TopBar() {
  const { member } = useCurrentTeamMember();
  const { isDark, setTheme } = useThemeMode();

  return (
    <header className="sticky top-0 z-40 bg-transparent">
      <div className="flex w-full items-center justify-end gap-2 px-4 pb-2 pt-4 sm:px-6 xl:px-7">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={isDark ? "Trocar para modo claro" : "Trocar para modo escuro"}
            title={isDark ? "Modo claro" : "Modo escuro"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-foreground shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:bg-white/90"
          >
            {isDark ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
          </button>

          <NavLink
            to="/profile"
            aria-label="Meu Perfil"
            title="Meu Perfil"
            className="inline-flex items-center gap-3 rounded-full bg-white/70 px-2.5 py-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition hover:bg-white/90"
          >
            <Avatar
              name={member?.name ?? "G"}
              color={member?.color ?? "rgb(var(--primary) / 1)"}
              src={member?.avatarUrl}
              size="sm"
            />
            <div className="hidden min-w-0 lg:block">
              <p className="truncate text-sm font-semibold text-foreground">{member?.name ?? "Meu perfil"}</p>
              <p className="truncate text-xs text-muted-foreground">{member?.role ?? "Abrir perfil"}</p>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
