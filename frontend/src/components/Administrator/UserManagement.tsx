import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trash2,
  AlertCircle,
  Loader2,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "administrator" | "teacher" | "student";
  status: "pending" | "approved" | "denied";
  registrationDate: string;
}

const UserManagement: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("pending");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8000/api/admin/pending-users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: "Failed to load users",
        description:
          error.response?.data?.message || "Please check your backend connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAction = async (
    userId: number,
    action: "approve" | "deny" | "reset" | "delete"
  ) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:8000/api/admin/approve-user/${userId}`;
      const res = await axios.post(
        url,
        { action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (action === "delete") {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } else {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  status:
                    action === "approve"
                      ? "approved"
                      : action === "deny"
                      ? "denied"
                      : "pending",
                }
              : u
          )
        );
      }

      toast({
        title: "Success",
        description: res.data.message || `User ${action}d successfully.`,
      });
    } catch (error: any) {
      console.error("Action failed:", error);
      toast({
        title: "Action failed",
        description: error.response?.data?.message || "Could not perform action.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = (status: string) =>
    users.filter((user) => {
      const matchesStatus = user.status === status;
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesStatus && matchesSearch && matchesRole;
    });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
      case "denied":
        return <Badge className="bg-red-100 text-red-700">Denied</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => (
    <Badge variant={role === "teacher" ? "default" : "secondary"}>
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );

  return (
    <div className="space-y-6">
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="administrator">Administrators</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="student">Students</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs for Pending / Approved / Denied */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending ({users.filter((u) => u.status === "pending").length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved ({users.filter((u) => u.status === "approved").length})
              </TabsTrigger>
              <TabsTrigger value="denied">
                Denied ({users.filter((u) => u.status === "denied").length})
              </TabsTrigger>
            </TabsList>

            {["pending", "approved", "denied"].map((status) => (
              <TabsContent key={status} value={status}>
                {loading ? (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    <span className="ml-3 text-muted-foreground">
                      Loading users...
                    </span>
                  </div>
                ) : filteredUsers(status).length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    <AlertCircle className="w-10 h-10 mx-auto mb-3" />
                    No {status} users found.
                  </div>
                ) : (
                  <div className="rounded-md border mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Registered</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers(status).map((user) => (
                          <TableRow key={user.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{getRoleBadge(user.role)}</TableCell>
                            <TableCell>{getStatusBadge(user.status)}</TableCell>
                            <TableCell>{user.registrationDate}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {user.status === "pending" && (
                                    <>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleUserAction(user.id, "approve")
                                        }
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleUserAction(user.id, "deny")
                                        }
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Deny
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {user.status !== "pending" && (
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleUserAction(user.id, "reset")
                                      }
                                    >
                                      <RotateCcw className="w-4 h-4 mr-2" />
                                      Reset
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleUserAction(user.id, "delete")
                                    }
                                    className="text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
