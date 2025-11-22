import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import AdminDashboard from "../dashboard/AdministratorDashboard";
import TeacherDashboard from "../dashboard/TeacherDashboard";
import StudentDashboard from "../dashboard/StudentDashboard";

interface DashboardLayoutProps {
  userRole: string;
  userEmail: string;
  userName: string;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  userRole,
  userName,
  onLogout,
}) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Normalize role names
  const normalizedRole = userRole === "administrator" ? "admin" : userRole;

  const handleItemClick = (item: string) => setActiveItem(item);
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  // Lazy load helper
  const lazyLoad = (
    importFunc: () => Promise<{ default: React.ComponentType<any> }>
  ) => {
    const LazyComponent = React.lazy(importFunc);
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
    );
  };

  const renderDashboardContent = () => {
    const normalizedItem = activeItem
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/_/g, "-");

    // ---------- ADMIN ROUTES ----------
    if (normalizedRole === "admin") {
      switch (normalizedItem) {
        case "dashboard":
          return <AdminDashboard onItemClick={handleItemClick} />;
        case "totalusers":
          return lazyLoad(() => import("../Administrator/TotalUsers"));
        case "users":
          return lazyLoad(() => import("../Administrator/UserManagement"));
        case "classes-and-subjects":
          return lazyLoad(() => import("../Administrator/SubjectManagement"));
        case "sections":
          return lazyLoad(() => import("../Administrator/SectionManagement"));
        case "reports":
          return lazyLoad(() => import("../Administrator/SystemReports"));
        case "settings":
          return lazyLoad(() => import("../Administrator/AdminSettings"));
        case "profile":
          return lazyLoad(() => import("../Administrator/ProfileSettings"));
        default:
          return renderComingSoon(normalizedItem);
      }
    }

    // ---------- TEACHER ROUTES ----------
    if (normalizedRole === "teacher") {
      switch (normalizedItem) {
        case "dashboard":
          return <TeacherDashboard />;
        case "courses":
          return lazyLoad(() => import("../Teacher/CourseManagement"));
        case "students":
          return lazyLoad(() => import("../Teacher/MyStudents"));
        case "reports":
          return lazyLoad(() => import("../Teacher/TeacherReports"));
        case "analytics":
          return lazyLoad(() => import("../Teacher/AnalyticsDashboard"));
        case "profile":
          return lazyLoad(() => import("../Teacher/ProfileSettings"));
        default:
          return renderComingSoon(normalizedItem);
      }
    }

    // ---------- STUDENT ROUTES ----------
    if (normalizedRole === "student") {
      switch (normalizedItem) {
        case "dashboard":
          return <StudentDashboard />;
        case "studyload":
          return lazyLoad(() => import("../Student/StudyLoad"));
        case "program":
          return lazyLoad(() => import("../Student/MyProgram"));
        case "evaluation":
          return lazyLoad(() => import("../Student/FacultyEvaluation"));
        case "grades":
          return lazyLoad(() => import("../Student/MyGrades"));
        case "attendance":
          return lazyLoad(() => import("../Student/MyAttendance"));
        case "reports":
          return lazyLoad(() => import("../Student/StudentReports"));
        case "profile":
          return lazyLoad(() => import("../Student/ProfileSettings"));
        default:
          return renderComingSoon(normalizedItem);
      }
    }

    return <div>Invalid role</div>;
  };

  // ---------- REUSABLE COMING SOON ----------
  const renderComingSoon = (item: string) => (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-primary mb-2">
          {item.charAt(0).toUpperCase() + item.slice(1)} Module
        </h3>
        <p className="text-muted-foreground">This feature is coming soon!</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-accent/30">
      <Sidebar
        userRole={normalizedRole}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        collapsed={sidebarCollapsed}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          userName={userName}
          userRole={normalizedRole}
          onToggleSidebar={toggleSidebar}
          onLogout={onLogout}
          onItemClick={handleItemClick}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
