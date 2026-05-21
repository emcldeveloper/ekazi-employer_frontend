import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import { TooltipProvider } from "./components/ui/tooltip";

import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetails from "./pages/jobs/components/JobDetails";
import CreateJob from "./pages/jobs/components/CreateJob";

const App = () => {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/jobs/create" element={<CreateJob />} />

            <Route path="/clients" element={<Dashboard />} />
            <Route path="/tasks" element={<Dashboard />} />
            <Route path="/users" element={<Dashboard />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  );
};

export default App;
