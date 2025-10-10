import React from 'react';
import StatCard from './StatCard';
import { Calendar, BookOpen, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const StudentDashboard: React.FC = () => {
  const studentGrades = [
    { subject: 'Mathematics', grade: 92, gpa: 4.0, teacher: 'Dr. Smith', credits: 3 },
    { subject: 'Science', grade: 88, gpa: 3.7, teacher: 'Prof. Johnson', credits: 4 },
    { subject: 'Filipino', grade: 95, gpa: 4.0, teacher: 'Dr. Brown', credits: 3 },
    { subject: 'English', grade: 85, gpa: 3.3, teacher: 'Ms. Davis', credits: 3 },
    { subject: 'History', grade: 90, gpa: 3.8, teacher: 'Mr. Wilson', credits: 2 },
  ];

  const attendanceData = [
    { subject: 'Mathematics', present: 28, total: 30, percentage: 93.3 },
    { subject: 'Science', present: 25, total: 30, percentage: 83.3 },
    { subject: 'Filipino', present: 29, total: 30, percentage: 96.7 },
    { subject: 'English', present: 27, total: 30, percentage: 90.0 },
    { subject: 'History', present: 24, total: 26, percentage: 92.3 },
  ];

  const upcomingAssignments = [
    { subject: 'Mathematics', title: 'Calculus Problem Set', dueDate: '2024-01-20', priority: 'high' },
    { subject: 'Science', title: 'Lab Report - Motion', dueDate: '2024-01-22', priority: 'medium' },
    { subject: 'Filipino', title: 'Molecular Structure Essay', dueDate: '2024-01-25', priority: 'low' },
  ];

  const overallGPA = studentGrades.reduce((acc, grade) => acc + (grade.gpa * grade.credits), 0) / 
                    studentGrades.reduce((acc, grade) => acc + grade.credits, 0);
  
  const overallAttendance = attendanceData.reduce((acc, attendance) => acc + attendance.percentage, 0) / attendanceData.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 75) return 'text-primary';
    return 'text-warning';
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall GPA"
          value={overallGPA.toFixed(2)}
          subtitle="Current semester"
          icon={Award}
          trend={{ value: 0.3, isPositive: true }}
        />
        <StatCard
          title="Attendance Rate"
          value={`${overallAttendance.toFixed(1)}%`}
          subtitle="All subjects"
          icon={Calendar}
          color={overallAttendance >= 90 ? 'success' : overallAttendance >= 75 ? 'warning' : 'destructive'}
        />
        <StatCard
          title="Enrolled Subjects"
          value={studentGrades.length}
          subtitle="Active courses"
          icon={BookOpen}
          color="primary"
        />
        <StatCard
          title="Average Grade"
          value={`${(studentGrades.reduce((acc, grade) => acc + grade.grade, 0) / studentGrades.length).toFixed(1)}%`}
          subtitle="Current semester"
          icon={TrendingUp}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Overview */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Current Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studentGrades.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">{subject.subject}</h4>
                    <p className="text-sm text-muted-foreground">{subject.teacher} • {subject.credits} credits</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getGradeColor(subject.grade)}`}>
                      {subject.grade}%
                    </p>
                    <p className="text-sm text-muted-foreground">GPA: {subject.gpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Attendance Record</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((subject, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-primary">{subject.subject}</h4>
                    <span className="text-sm text-muted-foreground">
                      {subject.present}/{subject.total} classes
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={subject.percentage} className="flex-1 h-2" />
                    <span className={`text-sm font-medium ${
                      subject.percentage >= 90 ? 'text-success' : 
                      subject.percentage >= 75 ? 'text-primary' : 'text-destructive'
                    }`}>
                      {subject.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assignments */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Upcoming Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="p-4 border border-border/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-primary">{assignment.subject}</h4>
                  <Badge variant={getPriorityColor(assignment.priority)}>
                    {assignment.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{assignment.title}</p>
                <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;