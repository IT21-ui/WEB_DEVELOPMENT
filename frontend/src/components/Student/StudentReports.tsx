import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Download, FileText, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const StudentReports: React.FC = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('semester');

  // Mock data
  const gradeData = [
    { subject: 'Mathematics', grade: 92, gpa: 4.0, credits: 3 },
    { subject: 'Science', grade: 88, gpa: 3.7, credits: 4 },
    { subject: 'Filipino', grade: 95, gpa: 4.0, credits: 3 },
    { subject: 'English', grade: 85, gpa: 3.3, credits: 3 },
    { subject: 'History', grade: 90, gpa: 3.8, credits: 2 },
  ];

  const attendanceData = [
    { subject: 'Mathematics', present: 28, total: 30, percentage: 93.3 },
    { subject: 'Science', present: 25, total: 30, percentage: 83.3 },
    { subject: 'Filipino', present: 29, total: 30, percentage: 96.7 },
    { subject: 'English', present: 27, total: 30, percentage: 90.0 },
    { subject: 'History', present: 24, total: 26, percentage: 92.3 },
  ];

  const progressData = [
    { month: 'Jan', gpa: 3.2, attendance: 85 },
    { month: 'Feb', gpa: 3.4, attendance: 87 },
    { month: 'Mar', gpa: 3.6, attendance: 89 },
    { month: 'Apr', gpa: 3.5, attendance: 88 },
    { month: 'May', gpa: 3.8, attendance: 91 },
    { month: 'Jun', gpa: 3.7, attendance: 90 },
  ];

  const COLORS = {
    primary: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    destructive: '#ef4444',
    secondary: '#64748b'
  };

  const overallGPA = gradeData.reduce((acc, subject) => acc + (subject.gpa * subject.credits), 0) / 
                    gradeData.reduce((acc, subject) => acc + subject.credits, 0);
  
  const overallAttendance = attendanceData.reduce((acc, subject) => acc + subject.percentage, 0) / attendanceData.length;

  const handleExportReport = (type: 'grades' | 'attendance' | 'complete') => {
    toast({
      title: "Report Exported",
      description: `Your ${type} report has been exported successfully as PDF.`,
    });
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return COLORS.success;
    if (grade >= 80) return COLORS.primary;
    if (grade >= 70) return COLORS.warning;
    return COLORS.destructive;
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return COLORS.success;
    if (percentage >= 75) return COLORS.warning;
    return COLORS.destructive;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Academic Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Select Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button onClick={() => handleExportReport('grades')} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Grades
              </Button>
              <Button onClick={() => handleExportReport('attendance')} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Attendance
              </Button>
              <Button onClick={() => handleExportReport('complete')} className="hero-button">
                <Download className="w-4 h-4 mr-2" />
                Complete Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{overallGPA.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Overall GPA</p>
              <Badge className="mt-2 bg-success/10 text-success hover:bg-success/20">
                {overallGPA >= 3.5 ? 'Excellent' : overallGPA >= 3.0 ? 'Good' : 'Needs Improvement'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{overallAttendance.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
              <Badge className={`mt-2 ${overallAttendance >= 90 ? 'bg-success/10 text-success hover:bg-success/20' : 
                                   overallAttendance >= 75 ? 'bg-warning/10 text-warning hover:bg-warning/20' : 
                                   'bg-destructive/10 text-destructive hover:bg-destructive/20'}`}>
                {overallAttendance >= 90 ? 'Excellent' : overallAttendance >= 75 ? 'Good' : 'At Risk'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{gradeData.length}</div>
              <p className="text-sm text-muted-foreground">Enrolled Subjects</p>
              <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Performance Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Grade Performance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="grade" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Chart */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Attendance by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill={COLORS.success} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Progress Trend */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Academic Progress Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="gpa" 
                stroke={COLORS.primary} 
                strokeWidth={3}
                name="GPA"
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

      {/* Detailed Grade Table */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Detailed Grade Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium">Subject</th>
                  <th className="text-center py-3 px-2 font-medium">Grade</th>
                  <th className="text-center py-3 px-2 font-medium">GPA</th>
                  <th className="text-center py-3 px-2 font-medium">Credits</th>
                  <th className="text-center py-3 px-2 font-medium">Attendance</th>
                  <th className="text-center py-3 px-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {gradeData.map((subject, index) => {
                  const attendance = attendanceData.find(a => a.subject === subject.subject);
                  return (
                    <tr key={index} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-2 font-medium text-primary">{subject.subject}</td>
                      <td className="py-3 px-2 text-center">
                        <span style={{ color: getGradeColor(subject.grade) }} className="font-medium">
                          {subject.grade}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center font-medium">{subject.gpa}</td>
                      <td className="py-3 px-2 text-center">{subject.credits}</td>
                      <td className="py-3 px-2 text-center">
                        <span style={{ color: getAttendanceColor(attendance?.percentage || 0) }} className="font-medium">
                          {attendance?.percentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <Badge 
                          className={
                            subject.grade >= 75 && (attendance?.percentage || 0) >= 75
                              ? 'bg-success/10 text-success hover:bg-success/20' 
                              : 'bg-warning/10 text-warning hover:bg-warning/20'
                          }
                        >
                          {subject.grade >= 75 && (attendance?.percentage || 0) >= 75 ? 'Passing' : 'At Risk'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentReports;