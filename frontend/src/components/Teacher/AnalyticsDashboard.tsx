import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Users, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StatCard from '../dashboard/StatCard';

const AnalyticsDashboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('semester');

  const subjects = ['All Subjects', 'Mathematics', 'Science', 'Filipino', 'English', 'History'];

  // Mock data for sections instead of grades
  const sectionDistributionData = [
    { section: 'Section A', count: 20, percentage: 25 },
    { section: 'Section B', count: 25, percentage: 31 },
    { section: 'Section C', count: 15, percentage: 19 },
    { section: 'Section D', count: 12, percentage: 15 },
    { section: 'Section E', count: 8, percentage: 10 },
  ];

  const attendanceData = [
    { subject: 'Mathematics', present: 85, absent: 15, late: 8 },
    { subject: 'Science', present: 78, absent: 22, late: 12 },
    { subject: 'Filipino', present: 92, absent: 8, late: 5 },
    { subject: 'English', present: 88, absent: 12, late: 7 },
    { subject: 'History', present: 80, absent: 20, late: 10 },
  ];

  const performanceTrendData = [
    { month: 'Jan', avgGrade: 82, attendance: 85 },
    { month: 'Feb', avgGrade: 84, attendance: 87 },
    { month: 'Mar', avgGrade: 86, attendance: 89 },
    { month: 'Apr', avgGrade: 85, attendance: 88 },
    { month: 'May', avgGrade: 88, attendance: 91 },
    { month: 'Jun', avgGrade: 87, attendance: 90 },
  ];

  const subjectPerformanceData = [
    { subject: 'Mathematics', avgGPA: 3.2, avgGrade: 87, students: 35 },
    { subject: 'Science', avgGPA: 2.9, avgGrade: 84, students: 28 },
    { subject: 'Filipino', avgGPA: 3.5, avgGrade: 90, students: 31 },
    { subject: 'English', avgGPA: 3.1, avgGrade: 85, students: 40 },
    { subject: 'History', avgGPA: 3.0, avgGrade: 83, students: 25 },
  ];

  const COLORS = {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    destructive: '#ef4444',
    secondary: '#64748b',
  };

  const pieColors = [COLORS.success, COLORS.primary, COLORS.warning, '#f97316', COLORS.destructive];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '-')}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Average Class GPA" value="3.1" subtitle="All subjects" icon={Target} trend={{ value: 0.2, isPositive: true }} />
        <StatCard title="Overall Attendance" value="86.8%" subtitle="This semester" icon={Users} color="success" />
        <StatCard title="Students at Risk" value="8" subtitle="GPA < 2.0" icon={BookOpen} color="warning" />
        <StatCard title="Top Performers" value="15" subtitle="GPA > 3.5" icon={TrendingUp} color="primary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Distribution (Bar) */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Section Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectionDistributionData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="section" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="subject" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" stackId="a" fill={COLORS.success} name="Present" />
                <Bar dataKey="late" stackId="a" fill={COLORS.warning} name="Late" />
                <Bar dataKey="absent" stackId="a" fill={COLORS.destructive} name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="avgGrade"
                  stroke={COLORS.primary}
                  strokeWidth={3}
                  name="Average Grade"
                  dot={{ fill: COLORS.primary, strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke={COLORS.success}
                  strokeWidth={3}
                  name="Attendance %"
                  dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Section Distribution Pie Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Section Distribution Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectionDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.section}: ${entry.percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {sectionDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Subject Performance Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Subject Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Subject</th>
                  <th className="text-center py-3 px-2 font-medium">Students</th>
                  <th className="text-center py-3 px-2 font-medium">Average Grade</th>
                  <th className="text-center py-3 px-2 font-medium">Average GPA</th>
                  <th className="text-center py-3 px-2 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {subjectPerformanceData.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2 font-medium text-primary">{subject.subject}</td>
                    <td className="py-3 px-2 text-center">{subject.students}</td>
                    <td className="py-3 px-2 text-center">{subject.avgGrade}%</td>
                    <td className="py-3 px-2 text-center">{subject.avgGPA}</td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center">
                        {subject.avgGPA >= 3.5 ? (
                          <div className="w-3 h-3 bg-success rounded-full"></div>
                        ) : subject.avgGPA >= 3.0 ? (
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                        ) : subject.avgGPA >= 2.5 ? (
                          <div className="w-3 h-3 bg-warning rounded-full"></div>
                        ) : (
                          <div className="w-3 h-3 bg-destructive rounded-full"></div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
