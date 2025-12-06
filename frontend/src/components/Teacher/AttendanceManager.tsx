"use client";

import React, { useState } from "react";
import { Calendar, Users, Save, Download } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: number;
  name: string;
  studentId: string;
  section: string;
}

interface AttendanceRecord {
  studentId: number;
  status: "present" | "absent" | "late";
}

// ================== MAIN COMPONENT ==================
const AttendanceManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const subjects = ["Mathematics", "Science", "Filipino", "English", "History"];
  const sections = ["Section A", "Section B", "Section C"];

  const students: Student[] = [
    { id: 1, name: "Gahai Hahe", studentId: "STU001", section: "Section A" },
    { id: 2, name: "Kim Belco", studentId: "STU002", section: "Section A" },
    { id: 3, name: "Triah Gamier", studentId: "STU003", section: "Section B" },
    {
      id: 4,
      name: "John Zedrick Manguiat",
      studentId: "STU004",
      section: "Section B",
    },
    {
      id: 5,
      name: "Kathriz Edorot",
      studentId: "STU005",
      section: "Section C",
    },
    {
      id: 6,
      name: "Grace Tocmohan",
      studentId: "STU006",
      section: "Section C",
    },
  ];

  // ====== HELPER FUNCTIONS ======
  const getAttendanceStatus = (
    studentId: number
  ): "present" | "absent" | "late" => {
    const record = attendance.find((a) => a.studentId === studentId);
    return record?.status || "absent";
  };

  const updateAttendance = (
    studentId: number,
    status: "present" | "absent" | "late"
  ) => {
    setAttendance((prev) => {
      const existing = prev.find((a) => a.studentId === studentId);
      if (existing) {
        return prev.map((a) =>
          a.studentId === studentId ? { ...a, status } : a
        );
      } else {
        return [...prev, { studentId, status }];
      }
    });
  };

  const handleSaveAttendance = () => {
    if (!selectedSubject || !selectedSection) {
      toast({
        title: "Missing Fields",
        description: "Please select both subject and section before saving.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Attendance Saved",
      description: `Attendance for ${selectedSubject} (${selectedSection}) on ${selectedDate} saved successfully.`,
    });
  };

  const handleExportAttendance = () => {
    if (!selectedSubject || !selectedSection) {
      toast({
        title: "Missing Fields",
        description: "Please select both subject and section before exporting.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Attendance Exported",
      description: `Attendance report for ${selectedSubject} (${selectedSection}) exported successfully.`,
    });
  };

  const markAllPresent = () => {
    const filtered = students.filter((s) => s.section === selectedSection);
    const allPresentAttendance = filtered.map((student) => ({
      studentId: student.id,
      status: "present" as const,
    }));
    setAttendance(allPresentAttendance);
  };

  const getStatusBadge = (status: "present" | "absent" | "late") => {
    switch (status) {
      case "present":
        return (
          <Badge className="bg-success/10 text-success hover:bg-success/20">
            Present
          </Badge>
        );
      case "late":
        return (
          <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
            Late
          </Badge>
        );
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
    }
  };

  // ====== FILTER STUDENTS BY SECTION ======
  const filteredStudents = selectedSection
    ? students.filter((s) => s.section === selectedSection)
    : [];

  const attendanceStats = {
    present: attendance.filter((a) => a.status === "present").length,
    absent:
      filteredStudents.length -
      attendance.filter((a) => a.status === "present" || a.status === "late")
        .length,
    late: attendance.filter((a) => a.status === "late").length,
    total: filteredStudents.length,
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Attendance Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Subject Select */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Section Select */}
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date */}
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
              max={new Date().toISOString().split("T")[0]}
            />

            <Button onClick={markAllPresent} variant="outline">
              Mark All Present
            </Button>
          </div>

          {/* Stats */}
          {selectedSubject && selectedSection && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">
                  {attendanceStats.present}
                </p>
                <p className="text-sm text-muted-foreground">Present</p>
              </div>
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <p className="text-2xl font-bold text-destructive">
                  {attendanceStats.absent}
                </p>
                <p className="text-sm text-muted-foreground">Absent</p>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <p className="text-2xl font-bold text-warning">
                  {attendanceStats.late}
                </p>
                <p className="text-sm text-muted-foreground">Late</p>
              </div>
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">
                  {attendanceStats.total}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student List */}
      {selectedSubject && selectedSection && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Student Attendance - {selectedSubject} ({selectedSection})
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveAttendance} className="hero-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Attendance
                </Button>
                <Button onClick={handleExportAttendance} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => {
                const status = getAttendanceStatus(student.id);
                return (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-primary">
                          {student.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {student.studentId} • {student.section}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {getStatusBadge(status)}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={status === "present" ? "default" : "outline"}
                          onClick={() =>
                            updateAttendance(student.id, "present")
                          }
                          className={
                            status === "present"
                              ? "bg-success hover:bg-success/90"
                              : ""
                          }
                        >
                          Present
                        </Button>
                        <Button
                          size="sm"
                          variant={status === "late" ? "default" : "outline"}
                          onClick={() => updateAttendance(student.id, "late")}
                          className={
                            status === "late"
                              ? "bg-warning hover:bg-warning/90"
                              : ""
                          }
                        >
                          Late
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            status === "absent" ? "destructive" : "outline"
                          }
                          onClick={() => updateAttendance(student.id, "absent")}
                        >
                          Absent
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceManager;
