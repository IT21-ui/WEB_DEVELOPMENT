"use client";

import React from "react";
import StatCard from "./StatCard";
import { Users, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const TeacherDashboard: React.FC = () => {
  const classData = [
    { subject: "Mathematics", totalStudents: 35, averageGPA: 87.5, attendanceRate: 92 },
    { subject: "Science", totalStudents: 28, averageGPA: 84.2, attendanceRate: 89 },
    { subject: "Filipino", totalStudents: 31, averageGPA: 90.1, attendanceRate: 94 },
  ];

  const recentGrades = [
    { student: "Manguiat John Zedrick", subject: "Mathematics", grade: 85, date: "2025-09-12" },
    { student: "Edorot Kathriz", subject: "Science", grade: 88, date: "2025-09-14" },
    { student: "Gella Jannine", subject: "Filipino", grade: 88, date: "2025-09-12" },
    { student: "Belco Kim", subject: "Mathematics", grade: 85, date: "2025-09-14" },
  ];

  const upcomingClasses = [
    { subject: "Mathematics", time: "09:00 AM", room: "Room 201", students: 35 },
    { subject: "Science", time: "11:00 AM", room: "Lab 105", students: 28 },
    { subject: "Filipino", time: "02:00 PM", room: "Room 203", students: 31 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" value={94} subtitle="Across all classes" icon={Users} />
        <StatCard title="Classes Today" value={3} subtitle="Scheduled classes" icon={Calendar} color="success" />
        <StatCard title="Average GPA" value={87.3} subtitle="All subjects" icon={BookOpen} trend={{ value: 2.1, isPositive: true }} />
        <StatCard title="Attendance Rate" value="91.7%" subtitle="This week" icon={TrendingUp} color="primary" />
      </div>

      {/* Class Performance + Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Performance */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Class Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {classData.map((classItem, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-primary">{classItem.subject}</h4>
                    <span className="text-sm text-muted-foreground">{classItem.totalStudents} students</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Average GPA: {classItem.averageGPA}%</span>
                      <span>Attendance: {classItem.attendanceRate}%</span>
                    </div>
                    <Progress value={classItem.averageGPA} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">{classItem.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {classItem.room} • {classItem.students} students
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{classItem.time}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      Take Attendance
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Grades */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Recent Grades Entered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentGrades.map((grade, index) => (
              <div key={index} className="p-3 border border-border/50 rounded-lg">
                <h4 className="font-medium text-primary">{grade.student}</h4>
                <p className="text-sm text-muted-foreground">{grade.subject}</p>
                <div className="flex items-center justify-between mt-2">
                  <span
                    className={`text-lg font-bold ${
                      grade.grade >= 90 ? "text-success" : grade.grade >= 75 ? "text-primary" : "text-warning"
                    }`}
                  >
                    {grade.grade}%
                  </span>
                  <span className="text-xs text-muted-foreground">{grade.date}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;
