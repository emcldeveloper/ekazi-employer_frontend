import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { TooltipProvider } from "./components/ui/tooltip";

import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetails from "./pages/jobs/JobDetails";
import CreateJob from "./pages/jobs/CreateJob";
import JobApplications from "./pages/applications/JobApplications";
import UsersPage from "./pages/users/UsersPage";
import ClientsPage from "./pages/clients/ClientsPage";
import ClientDetails from "./pages/clients/components/ClientDetails";
import TasksPage from "./pages/tasks/TasksPage";
import TaskDetails from "./pages/tasks/components/TaskDetails";
import AccountProfile from "./pages/account/AccountProfile";
import CreateProfile from "./pages/account/components/CreateProfile";
import AuthCallback from "./pages/auth/AuthCallback";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SubscriptionPage from "./pages/subscriptions/SubscriptionPage";
import CandidatePage from "./pages/candidates/CandidatePage";
import SettingsPage from "./pages/settings/SettingsPage";

const App = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />

          <Route element={<ProtectedRoutes />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/profile" element={<AccountProfile />} />
              <Route path="/profile/create" element={<CreateProfile />} />
              <Route path="/profile/edit" element={<CreateProfile />} />

              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route
                path="/jobs/:id/applications"
                element={<JobApplications />}
              />
              <Route path="/jobs/create" element={<CreateJob />} />

              <Route path="/candidates" element={<CandidatePage />} />

              <Route path="/clients" element={<ClientsPage />} />
              <Route path="/clients/:id" element={<ClientDetails />} />

              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/tasks/:id" element={<TaskDetails />} />

              <Route path="/users" element={<UsersPage />} />

              <Route path="/subscription" element={<SubscriptionPage />} />

              <Route path="/reports" element={<Dashboard />} />

              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};

export default App;
