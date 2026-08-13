import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/scroll-top";

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
import AccountProfile from "./pages/account/AccountProfile";
import CreateProfile from "./pages/account/components/CreateProfile";
import AuthCallback from "./pages/auth/AuthCallback";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SubscriptionPage from "./pages/subscriptions/SubscriptionPage";
import SettingsPage from "./pages/settings/SettingsPage";
import JobseekersPage from "./pages/jobseekers/JobseekersPage";
import ApplicantsPage from "./pages/applicants/ApplicantsPage";
import LandingPage from "./pages/landing/LandingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyPage from "./pages/auth/VerifyPage";
import ContactPage from "./pages/landing/ContactPage";
import AboutPage from "./pages/landing/AboutPage";
import PotentialCandidates from "./pages/jobs/actions/PotentialCandidates";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import AdminLayout from "./layout/AdminLayout";
import AdminEmployersPage from "./pages/admin/employers/AdminEmployersPage";
import AdminRecruitersPage from "./pages/admin/recruiters/AdminRecruitersPage";
import AdminJobseekersPage from "./pages/admin/jobseekers/AdminJobseekersPage";
import AdminFreelancersPage from "./pages/admin/freelancers/AdminFreelancersPage";
import AdminApplicantsPage from "./pages/admin/applicants/AdminApplicantsPage";
import AdminJobsPage from "./pages/admin/jobs/AdminJobsPage";
import AdminArticlesPage from "./pages/admin/articles/AdminArticlesPage";
import AdminSubscriptionsPage from "./pages/admin/subscriptions/AdminSubscriptionsPage";
import AdminSettingsPage from "./pages/admin/settings/AdminSettingsPage";
import AdminReportsPage from "./pages/admin/reports/AdminReportsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster position="top-center" richColors />

          <BrowserRouter>
            <ScrollToTop />

            <Routes>
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verification" element={<VerifyPage />} />
              <Route path="/login" element={<SigninPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<ProtectedRoutes />}>
                <Route element={<AppLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />

                  <Route path="/profile" element={<AccountProfile />} />
                  <Route path="/profile/create" element={<CreateProfile />} />
                  <Route path="/profile/edit" element={<CreateProfile />} />

                  <Route path="/jobs" element={<JobsPage />} />
                  <Route path="/jobs/create" element={<CreateJob />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route
                    path="/jobs/:id/applications"
                    element={<JobApplications />}
                  />
                  <Route
                    path="/jobs/:id/applications/:stage"
                    element={<JobApplications />}
                  />
                  <Route
                    path="/jobs/:id/potential-candidates"
                    element={<PotentialCandidates />}
                  />

                  <Route path="/job-seekers" element={<JobseekersPage />} />

                  <Route path="/applicants" element={<ApplicantsPage />} />

                  <Route path="/clients" element={<ClientsPage />} />
                  <Route path="/clients/:id" element={<ClientDetails />} />

                  <Route path="/tasks" element={<TasksPage />} />

                  <Route path="/users" element={<UsersPage />} />

                  <Route path="/subscription" element={<SubscriptionPage />} />

                  <Route path="/reports" element={<Dashboard />} />

                  <Route path="/settings" element={<SettingsPage />} />
                </Route>
              </Route>

              {/* Admin routes */}
              {/* <Route element={<AdminRoutes />}>
                
              </Route> */}

              <Route element={<AdminLayout />}>
                <Route path="/admin">
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="employers" element={<AdminEmployersPage />} />
                  <Route path="recruiters" element={<AdminRecruitersPage />} />
                  <Route path="jobseekers" element={<AdminJobseekersPage />} />
                  <Route
                    path="freelancers"
                    element={<AdminFreelancersPage />}
                  />
                  <Route path="applicants" element={<AdminApplicantsPage />} />
                  <Route path="jobs" element={<AdminJobsPage />} />
                  <Route path="articles" element={<AdminArticlesPage />} />
                  <Route
                    path="subscriptions"
                    element={<AdminSubscriptionsPage />}
                  />
                  <Route path="settings" element={<AdminSettingsPage />} />
                  <Route path="reports" element={<AdminReportsPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
