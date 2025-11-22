import React, { useState } from "react";
import {
  Users,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  Shield,
  GraduationCap,
  BookOpen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  userRole: string;
  activeItem: string;
  onItemClick: (item: string) => void;
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  userRole,
  activeItem,
  onItemClick,
  collapsed = false,
}) => {
  const normalizedRole = userRole === "administrator" ? "admin" : userRole;

  // ✅ For dropdown toggle
  const [coursesOpen, setCoursesOpen] = useState(false);

  // ✅ Example subjects (replace later with API call)
  const subjects = [
    "BSIT 2A - IT 111",
    "BSIT 2B - IT 111",
    "BSIT 2C - IT 121",
    "BSIT 3A - IT 121",
    "BSIT 3B - IT 121",
    "BSIT 3C - IT 121",
    "BSIT 3D - IT 121",
    "BSIT 3E - IT 121",
    "BSIT 4Z - IT Elec 4",
  ];

  const getMenuItems = () => {
    switch (normalizedRole) {
      case "admin":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "totalusers", label: "Total Users", icon: Users },
          { id: "users", label: "User Management", icon: Users },
          {
            id: "classes-and-subjects",
            label: "Subject Management",
            icon: Shield,
          },
          { id: "sections", label: "Section Management", icon: Users },
          { id: "reports", label: "System Reports", icon: FileText },
          { id: "settings", label: "Settings", icon: Settings },
        ];

      case "teacher":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          {
            id: "courses",
            label: "Courses",
            icon: BookOpen,
            hasDropdown: true,
          },
          { id: "students", label: "My Students", icon: Users },
          { id: "reports", label: "Reports", icon: FileText },
        ];

      case "student":
        return [
          { id: "dashboard", label: "Dashboard", icon: BarChart3 },
          { id: "attendance", label: "My Attendance", icon: Calendar },
          { id: "studyload", label: "Study Load", icon: BookOpen },
          { id: "program", label: "My Program", icon: Users },
          { id: "evaluation", label: "Faculty Evaluation", icon: FileText },
          { id: "grades", label: "My Grades", icon: BookOpen },
          { id: "reports", label: "My Reports", icon: FileText },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={cn(
        "gradient-sidebar h-screen transition-all duration-300 border-r border-primary/20 overflow-y-auto",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-white font-bold text-lg">TrackEd</h1>
              <p className="text-white/70 text-sm capitalize">
                {normalizedRole} Portal
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          // Special handling for Courses dropdown
          if (item.hasDropdown) {
            return (
              <div key={item.id}>
                <button
                  onClick={() => setCoursesOpen(!coursesOpen)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    coursesOpen
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {!collapsed && <span>{item.label}</span>}
                  </span>
                  {!collapsed &&
                    (coursesOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {/* Submenu for Courses */}
                {coursesOpen && !collapsed && (
                  <div className="ml-10 mt-1 space-y-1">
                    {subjects.map((subject) => (
                      <button
                        key={subject}
                        onClick={() => onItemClick(subject)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm text-white/80 hover:bg-white/10 hover:text-white",
                          activeItem === subject && "bg-white/20 text-white"
                        )}
                      >
                        {subject}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Normal menu items
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/20 text-white shadow-glow"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
