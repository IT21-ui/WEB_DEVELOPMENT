import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Mail, Phone, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  grade: string;
  section: string;
  subjects: string[];
  gpa: number;
  attendance: number;
  status: "active" | "inactive" | "on-leave";
  avatar?: string;
}

const MyStudents = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const students: Student[] = [
    {
      id: 1,
      name: "Jannine Mae Gella",
      email: "jannine.gella@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU001",
      grade: "10th Grade",
      section: "A",
      subjects: ["Mathematics", "Science", "Filipino"],
      gpa: 3.8,
      attendance: 95,
      status: "active",
    },
    {
      id: 2,
      name: "Kim Belco",
      email: "Kim.Belco@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU002",
      grade: "10th Grade",
      section: "A",
      subjects: ["Mathematics", "Science"],
      gpa: 3.2,
      attendance: 87,
      status: "active",
    },
    {
      id: 3,
      name: "Triah Gamier",
      email: "Triah.Gamier@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU003",
      grade: "10th Grade",
      section: "B",
      subjects: ["Science", "Filipino"],
      gpa: 3.9,
      attendance: 92,
      status: "active",
    },
    {
      id: 4,
      name: "John Zedrick Manguiat",
      email: "Zedrick.Manguiat@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU004",
      grade: "9th Grade",
      section: "B",
      subjects: ["Mathematics", "Science"],
      gpa: 3.5,
      attendance: 78,
      status: "active",
    },
    {
      id: 5,
      name: "Kathriz Edorot",
      email: "kathriz.Edorot@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU005",
      grade: "8th Grade",
      section: "C",
      subjects: ["Filipino", "ESP"],
      gpa: 3.7,
      attendance: 94,
      status: "active",
    },
        {
      id: 6,
      name: "Grace Tocmohan",
      email: "grace.Tocmohan@email.com",
      phone: "+63 2 8123-4567",
      studentId: "STU006",
      grade: "8th Grade",
      section: "C",
      subjects: ["Filipino", "ESP"],
      gpa: 3.9,
      attendance: 94,
      status: "active",
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === "all" || student.section === selectedSection;
    const matchesSubject = selectedSubject === "all" || student.subjects.includes(selectedSubject);

    return matchesSearch && matchesSection && matchesSubject;
  });

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "on-leave":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">On Leave</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600";
    if (gpa >= 3.0) return "text-blue-600";
    if (gpa >= 2.5) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const handleContactStudent = (student: Student, method: "email" | "phone") => {
    if (method === "email") {
      window.open(`mailto:${student.email}`);
    } else {
      window.open(`tel:${student.phone}`);
    }
    toast({
      title: "Contact Initiated",
      description: `Opening ${method} client for ${student.name}`,
    });
  };

  const handleViewProfile = (student: Student) => {
    toast({
      title: "View Profile",
      description: `Opening profile for ${student.name}`,
    });
  };

  const handleEditStudent = (student: Student) => {
    toast({
      title: "Edit Student",
      description: `Opening edit form for ${student.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Students</h1>
        <Button>Add New Student</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by name or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Section Filter */}
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>

            {/* Subject Filter */}
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="Filipino">Filipino</SelectItem>
                <SelectItem value="ESP">ESP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grid / List Tabs */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback>{student.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.studentId}</p>
                    </div>
                    {getStatusBadge(student.status)}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Grade:</span>
                      <span className="text-sm font-medium">{student.grade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Section:</span>
                      <span className="text-sm font-medium">{student.section}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">GPA:</span>
                      <span className={`text-sm font-medium ${getGPAColor(student.gpa)}`}>
                        {student.gpa.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Attendance:</span>
                      <span className={`text-sm font-medium ${getAttendanceColor(student.attendance)}`}>
                        {student.attendance}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Subjects:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactStudent(student, "email")}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContactStudent(student, "phone")}
                    >
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(student)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Student</th>
                      <th className="text-left p-4">ID</th>
                      <th className="text-left p-4">Grade</th>
                      <th className="text-left p-4">Section</th>
                      <th className="text-left p-4">GPA</th>
                      <th className="text-left p-4">Attendance</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={student.avatar} />
                              <AvatarFallback>
                                {student.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-gray-600">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-mono text-sm">{student.studentId}</td>
                        <td className="p-4">{student.grade}</td>
                        <td className="p-4">{student.section}</td>
                        <td className="p-4">
                          <span className={`font-medium ${getGPAColor(student.gpa)}`}>
                            {student.gpa.toFixed(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="p-4">{getStatusBadge(student.status)}</td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleContactStudent(student, "email")}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewProfile(student)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStudent(student)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-sm text-gray-600">
        Showing {filteredStudents.length} of {students.length} students
      </div>
    </div>
  );
};

export default MyStudents;
