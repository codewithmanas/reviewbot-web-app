import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { Toaster } from "@/components/ui/sonner";
import DashboardPage from "./pages/DashboardPage";
import { RequireAuth } from "./hooks/useAuth";
import PullRequestsPage from "./pages/PullRequestsPage";
import PRDetailPage from "./pages/PRDetailPage";
import RepositoriesPage from "./pages/RepositoriesPage";
import TeamPage from "./pages/TeamPage";
import SettingsPage from "./pages/SettingsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import VerifyEmailPage from "./pages/VerifyEmailPage";


// Create a tanstack query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
          <Route path="/dashboard/pulls" element={<RequireAuth><PullRequestsPage /></RequireAuth>} />
          <Route path="/dashboard/pulls/:id" element={<RequireAuth><PRDetailPage /></RequireAuth>} />
          <Route path="/dashboard/repos" element={<RequireAuth><RepositoriesPage /></RequireAuth>} />
          <Route path="/dashboard/team" element={<RequireAuth><TeamPage /></RequireAuth>} />
          <Route path="/dashboard/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;