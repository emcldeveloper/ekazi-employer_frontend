import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { ThemeProvider } from "./components/theme-provider";
import ScrollToTop from "./components/scroll-top";

import LandingPage from "./pages/landing/LandingPage";
import ContactPage from "./pages/landing/ContactPage";
import AboutPage from "./pages/landing/AboutPage";
import PricingPage from "./pages/landing/PricingPage";

import RegisterPage from "./pages/auth/RegisterPage";
import VerifyPage from "./pages/auth/VerifyPage";
import SigninPage from "./pages/auth/SigninPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ResetPassword from "./pages/auth/ResetPassword";

import ProtectedRoutes from "./routes/ProtectedRoutes";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/app/dashboard/Dashboard";
import JobsPage from "./pages/app/jobs/JobsPage";
import JobDetails from "./pages/app/jobs/JobDetails";
import CreateJob from "./pages/app/jobs/CreateJob";
import JobApplications from "./pages/app/applications/JobApplications";
import ClientsPage from "./pages/app/clients/ClientsPage";
import ClientDetails from "./pages/app/clients/components/ClientDetails";
import TasksPage from "./pages/app/tasks/TasksPage";
import AccountProfile from "./pages/app/profile/AccountProfile";
import CreateProfile from "./pages/app/profile/components/CreateProfile";
import SubscriptionPage from "./pages/app/subscriptions/SubscriptionPage";
import SettingsPage from "./pages/app/settings/SettingsPage";
import JobseekersPage from "./pages/app/jobseekers/JobseekersPage";
import ApplicantsPage from "./pages/app/applicants/ApplicantsPage";
import PotentialCandidates from "./pages/app/jobs/actions/PotentialCandidates";
import StaffPage from "./pages/app/staff/StaffPage";

import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
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
import Countries from "./pages/admin/universals/countries/Countries";
import Regions from "./pages/admin/universals/regions/Regions";
import Industries from "./pages/admin/universals/industries/Industries";
import Languages from "./pages/admin/universals/languages/Languages";
import LanguageRead from "./pages/admin/universals/language-reads/LanguageRead";
import LanguageSpeak from "./pages/admin/universals/language-speaks/LanguageSpeak";
import LanguageWrite from "./pages/admin/universals/language-writes/LanguageWrite";
import LanguageUnderstand from "./pages/admin/universals/language-understands/LanguageUnderstand";
import Institutions from "./pages/admin/universals/institutions/Institutions";
import EducationLevels from "./pages/admin/universals/education-levels/EducationLevels";
import Courses from "./pages/admin/universals/courses/Courses";
import Majors from "./pages/admin/universals/majors/Majors";
import Skills from "./pages/admin/universals/skills/Skills";
import Softwares from "./pages/admin/universals/softwares/Softwares";
import Tools from "./pages/admin/universals/tools/Tools";
import Cultures from "./pages/admin/universals/cultures/Cultures";
import Personalities from "./pages/admin/universals/personalities/Personalities";
import Proficiencies from "./pages/admin/universals/proficiencies/Proficiencies";
import Genders from "./pages/admin/universals/genders/Genders";
import Positions from "./pages/admin/universals/positions/Positions";
import PositionLevels from "./pages/admin/universals/position-levels/PositionLevels";
import JobTypes from "./pages/admin/universals/job-types/JobTypes";
import ExperienceLevels from "./pages/admin/universals/experience-levels/ExperienceLevels";
import SalaryRanges from "./pages/admin/universals/salary-ranges/SalaryRanges";
import EmployerDetails from "./pages/admin/employers/components/EmployerDetails";

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
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Auth */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verification" element={<VerifyPage />} />
              <Route path="/login" element={<SigninPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              <Route element={<ProtectedRoutes />}>
                <Route element={<AppLayout />}>
                  <Route path="/app">
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="profile" element={<AccountProfile />} />
                    <Route path="profile/create" element={<CreateProfile />} />
                    <Route path="profile/edit" element={<CreateProfile />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="jobs/create" element={<CreateJob />} />
                    <Route path="jobs/:id" element={<JobDetails />} />
                    <Route
                      path="jobs/:id/applications"
                      element={<JobApplications />}
                    />
                    <Route
                      path="jobs/:id/applications/:stage"
                      element={<JobApplications />}
                    />
                    <Route
                      path="jobs/:id/potential-candidates"
                      element={<PotentialCandidates />}
                    />
                    <Route path="job-seekers" element={<JobseekersPage />} />
                    <Route path="applicants" element={<ApplicantsPage />} />
                    <Route path="clients" element={<ClientsPage />} />
                    <Route path="clients/:id" element={<ClientDetails />} />
                    <Route path="tasks" element={<TasksPage />} />
                    <Route path="staff" element={<StaffPage />} />
                    <Route path="subscription" element={<SubscriptionPage />} />
                    <Route path="reports" element={<Dashboard />} />
                    <Route path="settings" element={<SettingsPage />} />
                  </Route>
                </Route>

                {/* Admin routes */}
                <Route element={<AdminLayout />}>
                  <Route path="/admin">
                    <Route path="dashboard" element={<AdminDashboard />} />

                    <Route path="employers" element={<AdminEmployersPage />} />
                    <Route path="employers/:id" element={<EmployerDetails />} />

                    <Route
                      path="recruiters"
                      element={<AdminRecruitersPage />}
                    />
                    <Route
                      path="recruiters/:id"
                      element={<EmployerDetails />}
                    />

                    <Route
                      path="jobseekers"
                      element={<AdminJobseekersPage />}
                    />
                    <Route
                      path="freelancers"
                      element={<AdminFreelancersPage />}
                    />
                    <Route
                      path="applicants"
                      element={<AdminApplicantsPage />}
                    />

                    <Route path="jobs" element={<AdminJobsPage />} />

                    <Route path="articles" element={<AdminArticlesPage />} />
                    <Route
                      path="subscriptions"
                      element={<AdminSubscriptionsPage />}
                    />
                    <Route path="reports" element={<AdminReportsPage />} />

                    <Route path="settings" element={<AdminSettingsPage />}>
                      <Route index element={<Countries />} />
                      <Route path="countries" element={<Countries />} />
                      <Route path="regions" element={<Regions />} />
                      <Route path="industries" element={<Industries />} />
                      <Route path="languages" element={<Languages />} />
                      <Route path="language-read" element={<LanguageRead />} />
                      <Route
                        path="language-speak"
                        element={<LanguageSpeak />}
                      />
                      <Route
                        path="language-write"
                        element={<LanguageWrite />}
                      />
                      <Route
                        path="language-understand"
                        element={<LanguageUnderstand />}
                      />
                      <Route path="institutions" element={<Institutions />} />
                      <Route
                        path="education-level"
                        element={<EducationLevels />}
                      />
                      <Route path="courses" element={<Courses />} />
                      <Route path="majors" element={<Majors />} />
                      <Route path="skills" element={<Skills />} />
                      <Route path="softwares" element={<Softwares />} />
                      <Route path="tools" element={<Tools />} />
                      <Route path="cultures" element={<Cultures />} />
                      <Route path="personalities" element={<Personalities />} />
                      <Route path="proficiencies" element={<Proficiencies />} />
                      <Route path="genders" element={<Genders />} />
                      <Route path="positions" element={<Positions />} />
                      <Route
                        path="position-level"
                        element={<PositionLevels />}
                      />
                      <Route path="job-types" element={<JobTypes />} />
                      <Route
                        path="experience-levels"
                        element={<ExperienceLevels />}
                      />
                      <Route path="salary-ranges" element={<SalaryRanges />} />
                    </Route>
                  </Route>
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
