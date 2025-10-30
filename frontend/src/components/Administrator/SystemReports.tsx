import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Download,
  Filter,
  Calendar,
  BarChart3,
  Users,
  TrendingUp,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

//Backend URL
const API_URL = "http://localhost:8000/api/reports";

const SystemReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedReport, setSelectedReport] = useState("all");
  const [reportStats, setReportStats] = useState<any[]>([]);
  const [recentReports, setRecentReports] = useState<any[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load data on mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [summary, recent, metrics] = await Promise.all([
        axios.get(`${API_URL}/summary`),
        axios.get(`${API_URL}/recent`),
        axios.get(`${API_URL}/metrics`),
      ]);
      setReportStats(summary.data);
      setRecentReports(recent.data);
      setSystemMetrics(metrics.data);
    } catch (error) {
      console.error("Error fetching report data:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate Report
  const generateReport = async (reportType: string) => {
    try {
      await axios.post(`${API_URL}/generate`, { type: reportType });
      alert(`Report generation started: ${reportType}`);
      fetchAllData();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  // 🔹 Download Report
  const downloadReport = async (reportId: number) => {
    try {
      const res = await axios.get(`${API_URL}/download/${reportId}`);
      alert(res.data.message);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  const getStatusBadge = (
    status: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      completed: "default",
      processing: "secondary",
      failed: "destructive",
    };
    return variants[status] || "secondary";
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return "text-green-500";
    if (value >= 70) return "text-yellow-500";
    return "text-red-500";
  };

  if (loading)
    return (
      <p className="text-center text-muted-foreground">
        Loading system reports...
      </p>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Reports</h1>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Monthly" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="hero-button"
            onClick={() => generateReport(selectedPeriod)}
          >
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => {
          const Icon = [Users, TrendingUp, FileText, Clock][index % 4];
          return (
            <Card key={index} className="stat-widget">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <Badge variant="outline" className="text-green-500">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="dashboard-card lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Reports
              </CardTitle>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-3 border border-border/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <h4 className="font-medium text-primary">
                          {report.name}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{report.type}</span>
                          <span>
                            {new Date(report.date).toLocaleDateString()}
                          </span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  {report.status === "completed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadReport(report.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              System Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemMetrics.map((metric, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-primary">
                      {metric.metric}
                    </span>
                    <span
                      className={`text-sm font-semibold ${getMetricColor(
                        metric.value
                      )}`}
                    >
                      {metric.value}%
                    </span>
                  </div>
                  <Progress value={metric.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Report Generation */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Quick Report Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="attendance">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            {/* Attendance */}
            <TabsContent value="attendance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => generateReport("daily-attendance")}
                >
                  <Calendar className="w-4 h-4 mr-2" /> Daily Attendance
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("class-attendance")}
                >
                  <Users className="w-4 h-4 mr-2" /> Class Attendance
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("absence-trends")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> Absence Trends
                </Button>
              </div>
            </TabsContent>

            {/* Grades */}
            <TabsContent value="grades" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => generateReport("grade-distribution")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> Grade Distribution
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("performance-trends")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> Performance Trends
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("class-averages")}
                >
                  <Users className="w-4 h-4 mr-2" /> Class Averages
                </Button>
              </div>
            </TabsContent>

            {/* Users */}
            <TabsContent value="users" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => generateReport("user-activity")}
                >
                  <Users className="w-4 h-4 mr-2" /> User Activity
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("registration-stats")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> Registration Stats
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("role-distribution")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> Role Distribution
                </Button>
              </div>
            </TabsContent>

            {/* System */}
            <TabsContent value="system" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  onClick={() => generateReport("system-performance")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" /> System Performance
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("error-logs")}
                >
                  <FileText className="w-4 h-4 mr-2" /> Error Logs
                </Button>
                <Button
                  variant="outline"
                  onClick={() => generateReport("usage-statistics")}
                >
                  <TrendingUp className="w-4 h-4 mr-2" /> Usage Statistics
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemReports;
