// Index.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Users,
  BarChart3,
  Shield,
  Calendar,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import homepage from "@/assets/homepage.jpg";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // State for testing backend connection
  const [apiMessage, setApiMessage] = useState("Connecting to backend...");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/test")
      .then((res) => setApiMessage(res.data.message))
      .catch((err) =>
        setApiMessage("Error connecting to backend: " + err.message)
      );
  }, []);

  const handleLogin = (role: string, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    setIsAuthenticated(true);
    setOpenAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    setUserEmail("");
  };

  if (isAuthenticated) {
    return (
      <DashboardLayout
        userRole={userRole}
        userEmail={userEmail}
        onLogout={handleLogout}
      />
    );
  }

  const features = [
    {
      icon: Calendar,
      title: "Smart Attendance Tracking",
      description:
        "Real-time attendance monitoring with automated notifications and detailed analytics.",
    },
    {
      icon: BookOpen,
      title: "Grade Management",
      description:
        "Comprehensive grading system with GPA calculations and performance insights.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Interactive charts and reports to track student progress and class performance.",
    },
    {
      icon: Users,
      title: "Multi-Role Support",
      description:
        "Dedicated dashboards for administrators, teachers, and students.",
    },
    {
      icon: Shield,
      title: "Secure Access",
      description:
        "JWT-based authentication with role-based permissions and approval workflows.",
    },
    {
      icon: TrendingUp,
      title: "Performance Insights",
      description:
        "Track trends, identify at-risk students, and optimize educational outcomes.",
    },
  ];

  return (
    <>
      {/* SEO Metadata */}
      <title>TrackEd - Student Attendance & Grade Management System</title>
      <meta
        name="description"
        content="Modern, secure student attendance and grade tracking system with role-based dashboards for administrators, teachers, and students."
      />

      <div className="min-h-screen bg-gradient-to-br from-background to-accent/30">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-border/50">
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-primary">TrackEd</h1>
                  <p className="text-[10px] text-muted-foreground">
                    Education Management System
                  </p>
                </div>
              </div>
              <Button
                className="hero-button text-sm px-4 py-2"
                onClick={() => {
                  setAuthMode("login");
                  setOpenAuthModal(true);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main>
          <section className="relative py-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h1 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
                      Modern Student{" "}
                      <span className="block bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Management System
                      </span>
                    </h1>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Streamline attendance tracking, grade management, and
                      academic analytics with our comprehensive education
                      platform designed for the digital age.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="sm"
                      className="hero-button text-sm px-5 py-3"
                      onClick={() => {
                        setAuthMode("register");
                        setOpenAuthModal(true);
                      }}
                    >
                      Start Free Trial
                    </Button>
                  </div>
                  <div className="flex items-center gap-6 pt-6 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">10,000+</p>
                      <p className="text-xs text-muted-foreground">
                        Active Students
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">500+</p>
                      <p className="text-xs text-muted-foreground">Schools</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">99.9%</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                  </div>

                  {/* Show Laravel backend connection message */}
                  <p className="text-xs text-muted-foreground mt-4 italic">
                    {apiMessage}
                  </p>
                </div>

                <div className="relative">
                  <img
                    src={homepage}
                    alt="TrackEd Dashboard Interface"
                    className="w-full h-auto rounded-xl shadow-md dashboard-card"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 bg-white/50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center space-y-3 mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  Everything You Need for Academic Success
                </h2>
                <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed to simplify education management
                  and improve student outcomes.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="dashboard-card p-6 text-center hover:scale-105 transition-bounce"
                  >
                    <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-primary/5 border-t border-border/50 py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 mb-3 md:mb-0">
                <div className="w-6 h-6 gradient-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">TrackEd</p>
                  <p className="text-[10px] text-muted-foreground">
                    © 2025 All rights reserved
                  </p>
                </div>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <a href="#" className="hover:text-primary transition-smooth">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary transition-smooth">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary transition-smooth">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <Dialog open={openAuthModal} onOpenChange={setOpenAuthModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {authMode === "login" ? "Login to TrackEd" : "Create an Account"}
            </DialogTitle>
          </DialogHeader>
          {authMode === "login" ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setAuthMode("register")}
            />
          ) : (
            <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Index;
