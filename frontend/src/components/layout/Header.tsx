import React from "react";
import { Bell, Menu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  userName: string;
  userRole: string;
  onToggleSidebar: () => void;
  onLogout: () => void;
  onItemClick: (item: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  userName,
  userRole,
  onToggleSidebar,
  onLogout,
  onItemClick,
}) => {
  const getInitials = (name: string) => {
    if (!name) return "??";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-600 bg-red-100";
      case "teacher":
        return "text-blue-600 bg-blue-100";
      case "student":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* ---------- LEFT SIDE ---------- */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="text-primary hover:bg-primary/10"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h2 className="text-xl font-semibold text-primary">Dashboard</h2>
            <p className="text-sm text-muted-foreground">Welcome back!</p>
          </div>
        </div>

        {/* ---------- RIGHT SIDE ---------- */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-primary/10 relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 hover:bg-primary/10"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-primary bg-primary/10">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-primary">{userName}</p>
                  <p
                    className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getRoleColor(
                      userRole
                    )}`}
                  >
                    {userRole}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => onItemClick("profile")}>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
