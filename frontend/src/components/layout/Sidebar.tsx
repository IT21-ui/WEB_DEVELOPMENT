import React from 'react';
import { 
  Users, Calendar, BarChart3, FileText, Settings, 
  Shield, GraduationCap, BookOpen 
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  collapsed = false
}) => {
  // ✅ Normalize the role for consistency
  const normalizedRole =
    userRole === 'administrator' ? 'admin' : userRole;

  const getMenuItems = () => {
    switch (normalizedRole) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'classes-and-subjects', label: 'Classes & Subjects', icon: Shield },
          { id: 'reports', label: 'System Reports', icon: FileText },
          { id: 'settings', label: 'Settings', icon: Settings },
        ];
      case 'teacher':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'my-subjects', label: 'My Subjects', icon: BookOpen },
          { id: 'my-students', label: 'My Students', icon: Users },
          { id: 'attendance', label: 'Attendance', icon: Calendar },
          { id: 'grades', label: 'Grade Management', icon: FileText },
          { id: 'reports', label: 'Reports', icon: FileText },
        ];
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { id: 'attendance', label: 'My Attendance', icon: Calendar },
          { id: 'grades', label: 'My Grades', icon: BookOpen },
          { id: 'reports', label: 'My Reports', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div 
      className={cn(
        "gradient-sidebar h-screen transition-all duration-300 border-r border-primary/20",
        collapsed ? "w-16" : "w-64"
      )}
    >
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

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth",
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
