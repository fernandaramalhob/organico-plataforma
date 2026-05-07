import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { CalendarPage } from "./pages/Calendar";
import { DashboardPage } from "./pages/Dashboard";
import { GoalsPage } from "./pages/Goals";
import { HistoryPage } from "./pages/History";
import { IdeasPage } from "./pages/Ideas";
import { InsightsPage } from "./pages/Insights";
import { MemberProfilePage } from "./pages/MemberProfile";
import { MetaInsightsPage } from "./pages/MetaInsights";
import { MyProfilePage } from "./pages/MyProfile";
import { LoginPage } from "./pages/Login";
import { PostDetailPage } from "./pages/PostDetail";
import { ReportsPage } from "./pages/Reports";
import { SettingsPage } from "./pages/Settings";
import { StoriesPage } from "./pages/Stories";
import { isAuthenticated, signOut } from "./auth";
import { ThemeModeProvider } from "./theme";

export default function App() {
  const [authenticated, setAuthenticated] = useState(() => isAuthenticated());

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <ThemeModeProvider>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          {authenticated ? (
            <AppShell
              onLogout={() => {
                signOut();
                setAuthenticated(false);
              }}
            />
          ) : (
            <Routes>
              <Route
                path="/login"
                element={
                  <LoginPage
                    onLogin={() => {
                      setAuthenticated(true);
                    }}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
        <AppToaster />
      </DndProvider>
    </ThemeModeProvider>
  );
}

function AppShell({ onLogout }: { onLogout: () => void }) {
  return (
    <div
      className="flex min-h-screen w-full overflow-x-hidden text-foreground"
      style={{
        background: "linear-gradient(180deg, rgb(246,247,250) 0%, rgb(241,243,247) 100%)",
      }}
    >
      <Sidebar onLogout={onLogout} />
      <div className="flex min-h-screen w-full flex-col xl:pl-[276px] xl:pr-4 xl:py-4">
        <div
          className="flex min-h-screen flex-1 flex-col bg-white/80 xl:min-h-0 xl:rounded-[36px]"
          style={{ boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}
        >
          <TopBar />
          <main className="relative min-h-0 flex-1 p-4 sm:p-6 xl:p-7" tabIndex={0}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/login" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/meta-insights" element={<MetaInsightsPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/goals" element={<GoalsPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/ideas" element={<IdeasPage />} />
              <Route path="/member/:id" element={<MemberProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

function AppToaster() {
  return <Toaster position="top-right" richColors theme="light" />;
}
