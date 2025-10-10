import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import UserManagement from "./components/Administrator/UserManagement";

const queryClient = new QueryClient();

const App = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // store this on login too
  const email = localStorage.getItem("email");

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* 🔹 Login / Landing */}
            <Route path="/" element={<Index />} />

            {/* 🔹 Admin Dashboard */}
            <Route
              path="/admin/*"
              element={
                token ? (
                  <DashboardLayout
                    userRole={role || "administrator"}
                    userEmail={email || "admin@example.com"}
                    onLogout={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            {/* 🔹 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
