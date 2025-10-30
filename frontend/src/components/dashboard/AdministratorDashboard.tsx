import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { Users, UserCheck, AlertCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  is_approved: boolean;
}

const AdminDashboard: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  // Fetch all pending users
  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/admin/pending-users", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        setPendingUsers(data);
      } else {
        console.error("Failed to fetch pending users:", data);
      }
    } catch (err) {
      console.error("Error fetching pending users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Approve user
  const approveUser = async (id: number) => {
    if (!window.confirm("Approve this user?")) return;
    try {
      const res = await fetch(
        `http://localhost:8000/api/admin/approve-user/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert(data.message || "User approved successfully");
        fetchPendingUsers(); // refresh list
      } else {
        alert(data.message || "Failed to approve user");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving user.");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pending Approvals"
          value={pendingUsers.length}
          subtitle="Awaiting review"
          icon={AlertCircle}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : pendingUsers.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No pending approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-medium text-primary">
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
                        Registered on{" "}
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="hero-button"
                        onClick={() => approveUser(user.id)}
                      >
                        Approve
                      </Button>
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

export default AdminDashboard;
