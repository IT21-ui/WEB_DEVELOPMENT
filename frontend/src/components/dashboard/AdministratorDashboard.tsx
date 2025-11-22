import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  UserCheck,
  AlertCircle,
  FileText,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  registrationDate: string;
}

interface AdminDashboardProps {
  onItemClick?: (item: string) => void;
}

interface Stats {
  total_users: number;
  systemReports: number;
  pending_users: number;
  approved_students: number;
  approved_teachers: number;
}

interface Activity {
  id: number;
  action: string;
  user: string;
  time: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onItemClick }) => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    total_users: 0,
    pending_users: 0,
    systemReports: 0,
    approved_students: 0,
    approved_teachers: 0,
  });
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token"); // must store your login token here

  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  // Fetch dashboard statistics
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  // Fetch pending users
  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/pending-users");
      const pending = res.data.filter((u: any) => u.status === "pending");
      setPendingUsers(pending);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent activities
  const fetchRecentActivity = async () => {
    try {
      const res = await api.get("/admin/recent-activities");
      setRecentActivity(res.data);
    } catch (err) {
      console.error("Error fetching activity:", err);
    }
  };

  const handleUserAction = async (id: number, action: "approve" | "deny") => {
    if (!window.confirm(`Are you sure you want to ${action} this user?`))
      return;

    try {
      await api.post(`/admin/approve-user/${id}`, { action });
      alert(`User ${action}d successfully.`);
      fetchPendingUsers();
      fetchStats();
    } catch (err) {
      console.error(err);
      alert(`Error trying to ${action} user.`);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchPendingUsers();
    fetchRecentActivity();
  }, []);

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value={String(stats.total_users)}
          icon={<Users className="w-16 h-16" />}
          gradient="from-cyan-500 to-blue-500"
          onClick={() => onItemClick?.("totalusers")}
        />
        <StatCard
          title="System Reports"
          value={String(stats.systemReports)}
          icon={<FileText className="w-16 h-16" />}
          gradient="from-amber-500 to-yellow-400"
          onClick={() => onItemClick?.("reports")}
        />
        <StatCard
          title="Pending"
          value={String(stats.pending_users)}
          icon={<AlertCircle className="w-16 h-16" />}
          gradient="from-yellow-500 to-amber-400"
          onClick={() => onItemClick?.("users")}
        />
        <StatCard
          title="Total Students"
          value={String(stats.approved_students)}
          icon={<Users className="w-16 h-16" />}
          gradient="from-red-500 to-rose-400"
          onClick={() => onItemClick?.("totalusers")}
        />
        <StatCard
          title="Total Teachers"
          value={String(stats.approved_teachers)}
          icon={<UserCheck className="w-16 h-16" />}
          gradient="from-blue-500 to-indigo-400"
          onClick={() => onItemClick?.("totalusers")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-card">
            {loading ? (
              <p className="text-center text-muted-foreground py-4">
                Loading...
              </p>
            ) : pendingUsers.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No pending approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-accent/50 transition"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {user.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                        <Badge
                          variant={
                            user.role === "teacher" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Registered on {user.registrationDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white"
                        onClick={() => handleUserAction(user.id, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserAction(user.id, "deny")}
                      >
                        Deny
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-none shadow-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-card">
            {recentActivity.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No recent activity
              </p>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 border border-border rounded-xl hover:bg-accent/50 transition"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        by {activity.user}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reusable StatCard Component
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  gradient,
  onClick,
}) => (
  <Card
    className={`relative overflow-hidden border-none shadow-lg bg-gradient-to-br ${gradient} text-white cursor-pointer`}
    onClick={onClick}
  >
    <CardContent className="p-6 relative">
      <div className="absolute right-4 top-4 opacity-20">{icon}</div>
      <h2 className="text-4xl font-bold mb-2">{value}</h2>
      <p className="text-sm mb-4 opacity-90">{title}</p>
      <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition">
        More info →
      </button>
    </CardContent>
  </Card>
);

export default AdminDashboard;
