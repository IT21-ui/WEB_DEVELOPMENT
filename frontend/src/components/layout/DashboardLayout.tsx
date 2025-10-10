import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AdminDashboard from '../dashboard/AdministratorDashboard';
import TeacherDashboard from '../dashboard/TeacherDashboard';
import StudentDashboard from '../dashboard/StudentDashboard';

interface DashboardLayoutProps {
  userRole: string;
  userEmail: string;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ userRole, userEmail, onLogout }) => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // ✅ Normalize roles so "administrator" maps to "admin"
  const normalizedRole =
    userRole === 'administrator' ? 'admin' : userRole;

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

const renderDashboardContent = () => {
  // Normalize active item: lowercase, trim, replace spaces or underscores with hyphens
  const normalizedItem = activeItem
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-');

  // ✅ Use normalizedRole instead of userRole
  if (normalizedRole === 'admin') {
    switch (normalizedItem) {
      case 'dashboard':
        return <AdminDashboard />;

      case 'users':
        const UserManagement = React.lazy(() => import('../Administrator/UserManagement'));
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <UserManagement />
          </React.Suspense>
        );

      case 'classes-and-subjects':
        const ClassesAndSubjects = React.lazy(() => import('../Administrator/ClassesAndSubjects'));
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ClassesAndSubjects />
          </React.Suspense>
        );

      case 'reports':
        const SystemReports = React.lazy(() => import('../Administrator/SystemReports'));
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <SystemReports />
          </React.Suspense>
        );

      case 'settings':
        const AdminSettings = React.lazy(() => import('../Administrator/AdminSettings'));
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <AdminSettings />
          </React.Suspense>
        );

      case 'profile':
        const ProfileSettings = React.lazy(() => import('../Administrator/ProfileSettings'));
        return (
          <React.Suspense fallback={<div>Loading...</div>}>
            <ProfileSettings />
          </React.Suspense>
        );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-primary mb-2">
                {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} Module
              </h3>
              <p className="text-muted-foreground">This feature is coming soon!</p>
            </div>
          </div>
        );
    }
  }

    // ✅ Teacher routes
    if (normalizedRole === 'teacher') {
      switch (activeItem) {
        case 'dashboard':
          return <TeacherDashboard />;
        case 'students':
          const MyStudents = React.lazy(() => import('../Teacher/MyStudents'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <MyStudents />
            </React.Suspense>
          );
        case 'mysubjects':
          const MySubjects = React.lazy(() => import('../Teacher/MySubjects'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <MySubjects />
            </React.Suspense>
          );
        case 'attendance':
          const AttendanceManager = React.lazy(() => import('../Teacher/AttendanceManager'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <AttendanceManager />
            </React.Suspense>
          );
        case 'grades':
          const GradeManager = React.lazy(() => import('../Teacher/GradeManager'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <GradeManager />
            </React.Suspense>
          );
        case 'reports':
          const TeacherReports = React.lazy(() => import('../Teacher/TeacherReports'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <TeacherReports />
            </React.Suspense>
          );
        case 'analytics':
          const AnalyticsDashboard = React.lazy(() => import('../Teacher/AnalyticsDashboard'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <AnalyticsDashboard />
            </React.Suspense>
          );
        default:
          return (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} Module
                </h3>
                <p className="text-muted-foreground">This feature is coming soon!</p>
              </div>
            </div>
          );
      }
    }

    // ✅ Student routes
    if (normalizedRole === 'student') {
      switch (activeItem) {
        case 'dashboard':
          return <StudentDashboard />;
        case 'grades':
          const MyGrades = React.lazy(() => import('../Student/MyGrades'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <MyGrades />
            </React.Suspense>
          );
        case 'attendance':
          const MyAttendance = React.lazy(() => import('../Student/MyAttendance'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <MyAttendance />
            </React.Suspense>
          );
        case 'reports':
          const StudentReports = React.lazy(() => import('../Student/StudentReports'));
          return (
            <React.Suspense fallback={<div>Loading...</div>}>
              <StudentReports />
            </React.Suspense>
          );
        default:
          return (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {activeItem.charAt(0).toUpperCase() + activeItem.slice(1)} Module
                </h3>
                <p className="text-muted-foreground">This feature is coming soon!</p>
              </div>
            </div>
          );
      }
    }

    return <div>Invalid role</div>;
  };

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
          userEmail={userEmail}
          userRole={normalizedRole}
          onToggleSidebar={toggleSidebar}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
