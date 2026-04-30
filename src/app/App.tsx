import { ThemeProvider, useTheme } from "next-themes";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Sidebar } from "./components/Sidebar";
import { CalendarPage } from "./pages/Calendar";
import { DashboardPage } from "./pages/Dashboard";
import { GoalsPage } from "./pages/Goals";
import { HistoryPage } from "./pages/History";
import { IdeasPage } from "./pages/Ideas";
import { InsightsPage } from "./pages/Insights";
import { MemberProfilePage } from "./pages/MemberProfile";
import { MetaInsightsPage } from "./pages/MetaInsights";
import { PostDetailPage } from "./pages/PostDetail";
import { ReportsPage } from "./pages/Reports";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <div className="flex min-h-screen w-full bg-background text-foreground">
            <Sidebar />
            <main className="min-h-screen flex-1 overflow-y-auto xl:pl-0">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/meta-insights" element={<MetaInsightsPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/post/:id" element={<PostDetailPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/ideas" element={<IdeasPage />} />
                <Route path="/member/:id" element={<MemberProfilePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Routes>
            </main>
          </div>
          <AppToaster />
        </BrowserRouter>
      </DndProvider>
    </ThemeProvider>
  );
}

function AppToaster() {
  const { resolvedTheme } = useTheme();

  return <Toaster position="top-right" richColors theme={resolvedTheme === "dark" ? "dark" : "light"} />;
}
