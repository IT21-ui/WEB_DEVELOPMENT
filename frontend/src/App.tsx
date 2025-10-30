import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import UserManagement from "./components/Administrator/UserManagement";

const queryClient = new QueryClient();

// PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

// Optional hook to restore session on mount
const useAuthRestore = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/", { replace: true });
    }
    setLoading(false);
  }, [navigate]);

  return loading;
};

const AppRoutes = () => {
  const loading = useAuthRestore(); // ensure redirect happens before rendering
  const role = localStorage.getItem("role") || "administrator";
  const email = localStorage.getItem("email") || "admin@example.com";

  if (loading) return null; // or a spinner

  return (
    <Routes>
      {/* Login / Landing */}
      <Route path="/" element={<Index />} />

      {/* Admin Dashboard */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <DashboardLayout
              userRole={role}
              userEmail={email}
              onLogout={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
