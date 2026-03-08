import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import UserDetailPage from "./pages/UserDetailPage";
import PricingPage from "./pages/PricingPage";
import FinancePage from "./pages/FinancePage";
import SupportPage from "./pages/SupportPage";
import SecurityPage from "./pages/SecurityPage";
import EmailTemplatesPage from "./pages/EmailTemplatesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/security" element={<SecurityPage />} />
            <Route path="/email-templates" element={<EmailTemplatesPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
