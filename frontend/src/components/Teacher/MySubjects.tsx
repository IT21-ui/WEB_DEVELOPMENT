import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Eye, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


interface Subject {
  id: number;
  name: string;
  code: string;
  section: string;
  teacher: string;
  students: number;
  status: "active" | "archived";
}

const MySubjects = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSection, setSelectedSection] = useState("all");

  // Sample subjects
  const subjects: Subject[] = [
    { id: 1, name: "Mathematics", code: "MATH101", section: "Section A", teacher: "Mr. Anderson", students: 32, status: "active" },
    { id: 2, name: "Science", code: "SCI201", section: "Section B", teacher: "Dr. Brown", students: 28, status: "active" },
    { id: 3, name: "Filipino", code: "FIL301", section: "Section C", teacher: "Ms. Green", students: 30, status: "active" },
    { id: 4, name: "ESP", code: "ESP202", section: "Section A", teacher: "Dr. Wilson", students: 25, status: "archived" },
  ];

  // Filtering
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = selectedSection === "all" || subject.section === selectedSection;

    return matchesSearch && matchesSection;
  });

  const getStatusBadge = (status: Subject["status"]) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge variant="secondary">Archived</Badge>
    );
  };

  const handleViewSubject = (subject: Subject) => {
    toast({
      title: "View Subject",
      description: `Opening details for ${subject.name}`,
    });
  };

  const handleEditSubject = (subject: Subject) => {
    toast({
      title: "Edit Subject",
      description: `Editing details for ${subject.name}`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Subjects</h1>
        <Button>Add New Subject</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by subject name or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                <SelectItem value="Section A">Section A</SelectItem>
                <SelectItem value="Section B">Section B</SelectItem>
                <SelectItem value="Section C">Section C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Grid/List */}
      <Tabs defaultValue="grid" className="w-full">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* ✅ Grid View */}
        <TabsContent value="grid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubjects.map((subject) => (
              <Card key={subject.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">{subject.name}</h3>
                    {getStatusBadge(subject.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{subject.code}</p>
                  <p className="text-sm">Section: <span className="font-medium">{subject.section}</span></p>
                  <p className="text-sm">Teacher: <span className="font-medium">{subject.teacher}</span></p>
                  <div className="flex items-center gap-2 text-sm mt-2">
                    <Users className="w-4 h-4" />
                    {subject.students} students
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" onClick={() => handleViewSubject(subject)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEditSubject(subject)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ✅ List View */}
        <TabsContent value="list">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Subject</th>
                      <th className="text-left p-4">Code</th>
                      <th className="text-left p-4">Section</th>
                      <th className="text-left p-4">Teacher</th>
                      <th className="text-left p-4">Students</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubjects.map((subject) => (
                      <tr key={subject.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{subject.name}</td>
                        <td className="p-4 font-mono text-sm">{subject.code}</td>
                        <td className="p-4">{subject.section}</td>
                        <td className="p-4">{subject.teacher}</td>
                        <td className="p-4">{subject.students}</td>
                        <td className="p-4">{getStatusBadge(subject.status)}</td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" onClick={() => handleViewSubject(subject)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditSubject(subject)}>
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
        Showing {filteredSubjects.length} of {subjects.length} subjects
      </div>
    </div>
  );
};

export default MySubjects;
