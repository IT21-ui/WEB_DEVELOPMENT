import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, BarChart3, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const SystemReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('all');

  const reportStats = [
    { title: 'Total Users', value: 247, change: '+12%', icon: Users },
    { title: 'Active Sessions', value: 89, change: '+8%', icon: TrendingUp },
    { title: 'Generated Reports', value: 156, change: '+24%', icon: FileText },
    { title: 'System Uptime', value: '99.8%', change: '+0.2%', icon: Clock },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Attendance Report', type: 'Attendance', date: '2024-01-15', status: 'completed', size: '2.4 MB' },
    { id: 2, name: 'Grade Distribution Analysis', type: 'Academic', date: '2024-01-14', status: 'completed', size: '1.8 MB' },
    { id: 3, name: 'User Activity Summary', type: 'System', date: '2024-01-13', status: 'processing', size: '3.1 MB' },
    { id: 4, name: 'Performance Metrics Q1', type: 'Performance', date: '2024-01-12', status: 'completed', size: '4.2 MB' },
  ];

  const systemMetrics = [
    { metric: 'Database Performance', value: 94, status: 'excellent' },
    { metric: 'API Response Time', value: 87, status: 'good' },
    { metric: 'User Satisfaction', value: 92, status: 'excellent' },
    { metric: 'System Load', value: 76, status: 'good' },
  ];

  const generateReport = (reportType: string) => {
    console.log('Generating report:', reportType);
  };

  const downloadReport = (reportId: number) => {
    console.log('Downloading report:', reportId);
  };

  const getStatusBadge = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: 'default',
      processing: 'secondary',
      failed: 'destructive'
    };
    return variants[status] || 'secondary';
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-success';
    if (value >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Reports</h1>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button className="hero-button">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="stat-widget">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <Badge variant="outline" className="text-success">
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
                  <SelectValue />
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
                <div key={report.id} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-primary" />
                      <div>
                        <h4 className="font-medium text-primary">{report.name}</h4>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{report.type}</span>
                          <span>{report.date}</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      <Badge variant={getStatusBadge(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  {report.status === 'completed' && (
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
                    <span className="text-sm font-medium text-primary">{metric.metric}</span>
                    <span className={`text-sm font-semibold ${getMetricColor(metric.value)}`}>
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
            
            <TabsContent value="attendance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => generateReport('daily-attendance')}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Daily Attendance
                </Button>
                <Button variant="outline" onClick={() => generateReport('class-attendance')}>
                  <Users className="w-4 h-4 mr-2" />
                  Class Attendance
                </Button>
                <Button variant="outline" onClick={() => generateReport('absence-trends')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Absence Trends
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="grades" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => generateReport('grade-distribution')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Grade Distribution
                </Button>
                <Button variant="outline" onClick={() => generateReport('performance-trends')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Trends
                </Button>
                <Button variant="outline" onClick={() => generateReport('class-averages')}>
                  <Users className="w-4 h-4 mr-2" />
                  Class Averages
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => generateReport('user-activity')}>
                  <Users className="w-4 h-4 mr-2" />
                  User Activity
                </Button>
                <Button variant="outline" onClick={() => generateReport('registration-stats')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Registration Stats
                </Button>
                <Button variant="outline" onClick={() => generateReport('role-distribution')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Role Distribution
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="system" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" onClick={() => generateReport('system-performance')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  System Performance
                </Button>
                <Button variant="outline" onClick={() => generateReport('error-logs')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Error Logs
                </Button>
                <Button variant="outline" onClick={() => generateReport('usage-statistics')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Usage Statistics
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