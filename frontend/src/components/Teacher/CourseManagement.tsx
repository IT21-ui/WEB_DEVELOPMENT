import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  BookOpen,
  UserCircle2,
  Printer,
  Upload,
  Calendar,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Interfaces
interface Student {
  id: string;
  name: string;
  sex: string;
  mobile: string;
  email: string;
}

interface Course {
  code: string;
  section: string;
  title: string;
  schedule: string;
}

interface AttendanceRecord {
  studentId: string;
  status: "present" | "absent" | "late";
}

const CourseManagement: React.FC = () => {
  const teacher = {
    name: "Padilla J.",
    semester: "2025-2026 1st",
    courses: [
      {
        code: "IT 111",
        section: "BSIT 2A",
        title: "Social Issues & Professional Issues",
        schedule: "(Lec) WED 10:00-01:00PM",
      },
      {
        code: "IT 111",
        section: "BSIT 2B",
        title: "Social Issues & Professional Issues",
        schedule: "(Lec) THU 07:00-10:00AM",
      },
      {
        code: "IT 121",
        section: "BSIT 3A",
        title: "Database Management Systems",
        schedule: "(Lec) FRI 01:00-04:00PM",
      },
      {
        code: "IT 121",
        section: "BSIT 3B",
        title: "Database Management Systems",
        schedule: "(Lec) MON 09:00-12:00PM",
      },
    ],
  };

  const [isCoursesOpen, setIsCoursesOpen] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  const students: Student[] = [
    {
      id: "20241757",
      name: "Anislag, Alliah M",
      sex: "F",
      mobile: "09702907303",
      email: "kishouardd@gmail.com",
    },
    {
      id: "20243064",
      name: "Asiñero, Francine Mae D",
      sex: "F",
      mobile: "09362155051",
      email: "asinerofrancinemae@gmail.com",
    },
    {
      id: "20233152",
      name: "Bajao, Krischa Mia L",
      sex: "F",
      mobile: "09056928687",
      email: "krischabajao@gmail.com",
    },
    {
      id: "20242419",
      name: "Belco, Kim V",
      sex: "M",
      mobile: "09659723626",
      email: "kimbelco2006@gmail.com",
    },
    {
      id: "20243343",
      name: "Buyan, Ira Clark P",
      sex: "M",
      mobile: "09362565282",
      email: "iraclarkbuyan16@gmail.com",
    },
  ];

  // Course selection
  const handleSelectCourse = (course: Course) => {
    if (selectedCourse?.section === course.section) return;
    setIsLoading(true);
    setTimeout(() => {
      setSelectedCourse(course);
      setIsLoading(false);
    }, 600);
  };

  // Attendance functions
  const getAttendanceStatus = (studentId: string) => {
    const record = attendance.find((a) => a.studentId === studentId);
    return record?.status;
  };

  const updateAttendance = (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => {
    setAttendance((prev) => {
      const filtered = prev.filter((a) => a.studentId !== studentId);
      return [...filtered, { studentId, status }];
    });
  };

  const stats = {
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
    total: students.length,
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <UserCircle2 className="w-10 h-10 text-white" />
          <div>
            <h2 className="font-semibold">{teacher.name}</h2>
            <p className="text-xs text-gray-400">{teacher.semester}</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-200 hover:bg-gray-800 mb-1"
          >
            <BookOpen className="w-4 h-4 mr-2" /> Dashboard
          </Button>

          <div>
            <Button
              variant="ghost"
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="w-full justify-between text-gray-200 hover:bg-gray-800"
            >
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Courses
              </span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform ${
                  isCoursesOpen ? "rotate-180" : ""
                }`}
              />
            </Button>

            {isCoursesOpen && (
              <div className="ml-6 mt-2 space-y-1">
                {teacher.courses.map((course) => (
                  <Button
                    key={course.section}
                    variant="ghost"
                    onClick={() => handleSelectCourse(course)}
                    className={`w-full justify-start text-sm ${
                      selectedCourse?.section === course.section
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    {course.section} - {course.code}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          // Shimmer Loading
          <div className="space-y-4 animate-pulse">
            <div className="h-8 w-64 bg-gray-300 rounded-md"></div>
            <div className="h-6 w-48 bg-gray-200 rounded-md"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        ) : selectedCourse ? (
          <div className="space-y-6">
            {/* Header */}
            <h1 className="text-3xl font-bold">
              {selectedCourse.code} - {selectedCourse.section}
            </h1>
            <p className="text-muted-foreground">Home / Course Management</p>

            {/* Course Info */}
            <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--cyan))] text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {selectedCourse.title}
                </h2>
                <p className="text-white/90">{selectedCourse.schedule}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="students" className="space-y-4">
              <TabsList>
                <TabsTrigger value="students">Students & Grades</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              {/* Students */}
              <TabsContent value="students" className="space-y-4">
                <div className="flex gap-4">
                  <Button className="bg-[hsl(var(--cyan))] hover:bg-[hsl(var(--cyan))]/90 text-white">
                    <Printer className="w-4 h-4 mr-2" />
                    Print LOS
                  </Button>
                  <Button className="bg-[hsl(var(--red))] hover:bg-[hsl(var(--red))]/90 text-white">
                    <Upload className="w-4 h-4 mr-2" />
                    Post Midterm Grade
                  </Button>
                </div>

                <Card className="border-none shadow-lg">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Sex</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Midterm</TableHead>
                          <TableHead>Remark</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.id}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.sex}</TableCell>
                            <TableCell>{student.mobile}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                placeholder="--"
                                className="w-20"
                              />
                            </TableCell>
                            <TableCell>
                              <Select>
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="--" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="passed">Passed</SelectItem>
                                  <SelectItem value="failed">Failed</SelectItem>
                                  <SelectItem value="incomplete">
                                    Incomplete
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Attendance */}
              <TabsContent value="attendance" className="space-y-4">
                <Card className="border-none shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <label>Date:</label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-48"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const allPresent = students.map((s) => ({
                          studentId: s.id,
                          status: "present" as const,
                        }));
                        setAttendance(allPresent);
                      }}
                    >
                      Mark All Present
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-green-500 text-white">
                    <CardContent className="p-6">
                      <p>Present</p>
                      <p className="text-3xl font-bold">{stats.present}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-red-500 text-white">
                    <CardContent className="p-6">
                      <p>Absent</p>
                      <p className="text-3xl font-bold">{stats.absent}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-500 text-white">
                    <CardContent className="p-6">
                      <p>Late</p>
                      <p className="text-3xl font-bold">{stats.late}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-cyan-500 text-white">
                    <CardContent className="p-6">
                      <p>Total</p>
                      <p className="text-3xl font-bold">{stats.total}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Attendance List */}
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-[hsl(var(--info))] text-white">
                    <CardTitle>Mark Attendance - {selectedDate}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => {
                          const status = getAttendanceStatus(student.id);
                          return (
                            <TableRow key={student.id}>
                              <TableCell>{student.id}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>
                                {status === "present" && (
                                  <span className="text-green-700 font-semibold">
                                    <Check className="inline w-4 h-4 mr-1" />
                                    Present
                                  </span>
                                )}
                                {status === "absent" && (
                                  <span className="text-red-700 font-semibold">
                                    <X className="inline w-4 h-4 mr-1" />
                                    Absent
                                  </span>
                                )}
                                {status === "late" && (
                                  <span className="text-amber-700 font-semibold">
                                    <Clock className="inline w-4 h-4 mr-1" />
                                    Late
                                  </span>
                                )}
                                {!status && (
                                  <span className="text-gray-500">
                                    Not marked
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={
                                      status === "present"
                                        ? "default"
                                        : "outline"
                                    }
                                    onClick={() =>
                                      updateAttendance(student.id, "present")
                                    }
                                  >
                                    Present
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      status === "late" ? "default" : "outline"
                                    }
                                    onClick={() =>
                                      updateAttendance(student.id, "late")
                                    }
                                  >
                                    Late
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={
                                      status === "absent"
                                        ? "default"
                                        : "outline"
                                    }
                                    onClick={() =>
                                      updateAttendance(student.id, "absent")
                                    }
                                  >
                                    Absent
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Select a course to manage.
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseManagement;
