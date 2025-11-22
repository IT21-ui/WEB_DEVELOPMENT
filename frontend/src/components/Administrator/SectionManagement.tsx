import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Edit,
  ChevronRight,
  ArrowLeft,
  Search,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

// --------------------------
// Interfaces
// --------------------------
interface AlertModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

// --------------------------
// AddSectionDialog component
// --------------------------
interface AddSectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

const AddSectionDialog: React.FC<AddSectionDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [sectionName, setSectionName] = useState("");

  const handleAdd = () => {
    if (!sectionName.trim()) return;
    onAdd(sectionName);
    setSectionName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Label>Section Name *</Label>
          <Input
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            placeholder="e.g., Section A"
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} className="bg-blue-600 text-white">
            Add Section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface Department {
  id: number;
  name: string;
  code: string;
}

interface YearLevel {
  id: number;
  department_id: number;
  name: string;
}

interface Section {
  id: number;
  name: string;
  department_id: number;
  year_level_id: number;
}

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  student_id: string;
  department_id: number;
  year_level_id: number;
  section_id?: number;
}

// --------------------------
// Alert Modal
// --------------------------
const AlertModal: React.FC<AlertModalProps> = ({ message, open, onClose }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-sm mx-auto text-center">
      <DialogHeader>
        <DialogTitle>{message}</DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <Button onClick={onClose}>OK</Button>
      </div>
    </DialogContent>
  </Dialog>
);

// --------------------------
// Section Management Component
// --------------------------
const SectionManagement: React.FC = () => {
  // Navigation state
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null
  );
  const [currentYearLevel, setCurrentYearLevel] = useState<YearLevel | null>(
    null
  );
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  // Data
  const [departments, setDepartments] = useState<Department[]>([]);
  const [yearLevels, setYearLevels] = useState<YearLevel[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Pagination & Search State
  const [currentStudentsPage, setCurrentStudentsPage] = useState(1);
  const [availableStudentsPage, setAvailableStudentsPage] = useState(1);
  const [currentStudentsSearch, setCurrentStudentsSearch] = useState("");
  const [availableStudentsSearch, setAvailableStudentsSearch] = useState("");

  // Dialog State
  const [isAddSectionDialogOpen, setIsAddSectionDialogOpen] = useState(false);
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);
  const [isManageStudentsDialogOpen, setIsManageStudentsDialogOpen] =
    useState(false);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);

  // Alert State
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  // Fetch data
  useEffect(() => {
    fetchDepartments();
    fetchYearLevels();
    fetchSections();
    fetchStudents();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get<Department[]>(
        "http://localhost:8000/api/departments"
      );
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch departments.");
    }
  };

  const fetchYearLevels = async () => {
    try {
      const res = await axios.get<YearLevel[]>(
        "http://localhost:8000/api/year-levels"
      );
      setYearLevels(res.data);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch year levels.");
    }
  };

  const fetchSections = async () => {
    try {
      const res = await axios.get<Section[]>(
        "http://localhost:8000/api/sections"
      );
      setSections(res.data);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch sections.");
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get<Student[]>(
        "http://localhost:8000/api/students"
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch students.");
    }
  };

  // Filtered data
  const filteredYearLevels = useMemo(
    () => yearLevels.filter((y) => y.department_id === currentDepartment?.id),
    [yearLevels, currentDepartment]
  );

  const filteredSections = useMemo(() => {
    if (!currentDepartment || !currentYearLevel) return [];
    return sections.filter(
      (s) =>
        s.department_id === currentDepartment?.id &&
        s.year_level_id === currentYearLevel?.id
    );
  }, [sections, currentDepartment, currentYearLevel]);

  const sectionStudents = useMemo(
    () => students.filter((s) => s.section_id === currentSection?.id),
    [students, currentSection]
  );

  const availableStudents = useMemo(() => {
    if (!currentDepartment || !currentYearLevel) return [];
    return students.filter(
      (s) =>
        !s.section_id &&
        s.department_id === currentDepartment.id &&
        s.year_level_id === currentYearLevel.id
    );
  }, [students, currentDepartment, currentYearLevel]);

  // Search & Pagination for Current Students
  const filteredCurrentStudents = useMemo(() => {
    if (!selectedSection) return [];
    return students.filter(
      (s) =>
        s.section_id === selectedSection.id &&
        s.department_id === currentDepartment?.id &&
        s.year_level_id === currentYearLevel?.id &&
        (s.first_name
          .toLowerCase()
          .includes(currentStudentsSearch.toLowerCase()) ||
          s.last_name
            .toLowerCase()
            .includes(currentStudentsSearch.toLowerCase()) ||
          s.student_id
            .toLowerCase()
            .includes(currentStudentsSearch.toLowerCase()))
    );
  }, [
    students,
    selectedSection,
    currentDepartment,
    currentYearLevel,
    currentStudentsSearch,
  ]);

  const paginatedCurrentStudents = useMemo(() => {
    const startIndex = (currentStudentsPage - 1) * ITEMS_PER_PAGE;
    return filteredCurrentStudents.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredCurrentStudents, currentStudentsPage]);

  const currentStudentsTotalPages = Math.ceil(
    filteredCurrentStudents.length / ITEMS_PER_PAGE
  );

  // Search & Pagination for Available Students
  const filteredAvailableStudents = useMemo(() => {
    if (!currentDepartment || !currentYearLevel) return [];
    return students.filter(
      (s) =>
        !s.section_id &&
        s.department_id === currentDepartment.id &&
        s.year_level_id === currentYearLevel.id &&
        (s.first_name
          .toLowerCase()
          .includes(availableStudentsSearch.toLowerCase()) ||
          s.last_name
            .toLowerCase()
            .includes(availableStudentsSearch.toLowerCase()) ||
          s.student_id
            .toLowerCase()
            .includes(availableStudentsSearch.toLowerCase()))
    );
  }, [students, currentDepartment, currentYearLevel, availableStudentsSearch]);

  const paginatedAvailableStudents = useMemo(() => {
    const startIndex = (availableStudentsPage - 1) * ITEMS_PER_PAGE;
    return filteredAvailableStudents.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAvailableStudents, availableStudentsPage]);

  const availableStudentsTotalPages = Math.ceil(
    filteredAvailableStudents.length / ITEMS_PER_PAGE
  );

  // Handlers
  const handleBackNavigation = () => {
    if (currentSection) setCurrentSection(null);
    else if (currentYearLevel) setCurrentYearLevel(null);
    else if (currentDepartment) setCurrentDepartment(null);
  };

  const resetNavigation = () => {
    setCurrentDepartment(null);
    setCurrentYearLevel(null);
    setCurrentSection(null);
  };

  const handleAddSection = async (name: string) => {
    if (!name.trim()) {
      showAlert("Please fill in required fields.");
      return;
    }

    if (!currentDepartment || !currentYearLevel) {
      showAlert("Please select a department and year level first.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/api/sections", {
        name,
        department_id: currentDepartment.id,
        year_level_id: currentYearLevel.id,
      });

      const added: Section = res.data;

      setSections((prev) => [...prev, added]);
      setIsAddSectionDialogOpen(false);
      showAlert("Section added successfully.");
    } catch (err: any) {
      console.error(err);
      showAlert(err.response?.data?.message || "Failed to add section.");
    }
  };

  const handleDeleteSection = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this section?"))
      return;
    try {
      await axios.delete(`http://localhost:8000/api/sections/${id}`);
      setSections((prev) => prev.filter((s) => s.id !== id));
      showAlert("Section removed successfully.");
    } catch (err) {
      console.error(err);
      showAlert("Failed to delete section.");
    }
  };

  const handleAssignStudent = async (studentId: number) => {
    if (!selectedSection) return;
    try {
      await axios.put(`http://localhost:8000/api/students/${studentId}`, {
        section_id: selectedSection.id,
      });
      fetchStudents();
      showAlert("Student assigned successfully.");
    } catch (err) {
      console.error(err);
      showAlert("Failed to assign student.");
    }
  };

  const handleRemoveStudent = async (studentId: number) => {
    try {
      await axios.put(`http://localhost:8000/api/students/${studentId}`, {
        section_id: null,
      });
      fetchStudents();
      showAlert("Student removed successfully.");
    } catch {
      showAlert("Failed to remove student.");
    }
  };

  const renderBreadcrumb = () => {
    const items = [];
    items.push(
      <button
        key="home"
        onClick={resetNavigation}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Departments
      </button>
    );
    if (currentDepartment) {
      items.push(
        <ChevronRight key="c1" className="w-4 h-4 text-muted-foreground" />,
        <button
          key="dept"
          onClick={() => {
            setCurrentYearLevel(null);
            setCurrentSection(null);
          }}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {currentDepartment.name}
        </button>
      );
    }
    if (currentYearLevel) {
      items.push(
        <ChevronRight key="c2" className="w-4 h-4 text-muted-foreground" />,
        <button
          key="year"
          onClick={() => setCurrentSection(null)}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {currentYearLevel.name}
        </button>
      );
    }
    if (currentSection) {
      items.push(
        <ChevronRight key="c3" className="w-4 h-4 text-muted-foreground" />,
        <span key="sec" className="text-sm font-medium">
          {currentSection.name}
        </span>
      );
    }
    return <div className="flex items-center gap-2">{items}</div>;
  };

  // --------------------------
  // Render Views
  // --------------------------
  if (!currentDepartment) return <DepartmentView />;
  if (!currentYearLevel) return <YearLevelView />;
  if (!currentSection) return <SectionView />;

  return <StudentView />;

  // --------------------------
  // Sub-components
  // --------------------------
  function DepartmentView() {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Card>
          <CardHeader>
            <CardTitle>Select Department</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <Card
                key={dept.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setCurrentDepartment(dept)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{dept.code}</CardTitle>
                  <p className="text-sm text-muted-foreground">{dept.name}</p>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function YearLevelView() {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Card>
          <CardHeader className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleBackNavigation}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {renderBreadcrumb()}
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Year Level</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredYearLevels.map((year) => (
              <Card
                key={year.id}
                className="cursor-pointer hover:bg-accent transition-colors"
                onClick={() => setCurrentYearLevel(year)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{year.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  function SectionView() {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Card>
          <CardHeader className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleBackNavigation}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {renderBreadcrumb()}
            <Button
              className="bg-blue-600 text-white"
              onClick={() => setIsAddSectionDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Section
            </Button>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sections</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSections.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No sections found.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSections.map((sec) => (
                  <div
                    key={sec.id}
                    className="cursor-pointer hover:bg-accent transition-colors border rounded-md p-4"
                    onClick={() => setCurrentSection(sec)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium">{sec.name}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(sec.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <AddSectionDialog
          isOpen={isAddSectionDialogOpen}
          onClose={() => setIsAddSectionDialogOpen(false)}
          onAdd={handleAddSection}
        />
      </div>
    );
  }

  function StudentView() {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Card>
          <CardHeader className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={handleBackNavigation}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {renderBreadcrumb()}
            <Button
              className="bg-blue-600 text-white"
              onClick={() => {
                setSelectedSection(currentSection);
                setIsManageStudentsDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" /> Manage Students
            </Button>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Students in {currentSection?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {sectionStudents.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No students in this section. Add students to get started.
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sectionStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>{s.student_id}</TableCell>
                      <TableCell>
                        {s.first_name} {s.last_name}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRemoveStudent(s.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Manage Students Dialog */}
        <Dialog
          open={isManageStudentsDialogOpen}
          onOpenChange={setIsManageStudentsDialogOpen}
        >
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                Manage Students - {selectedSection?.name}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-6">
              {/* Current Students */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    Current Students ({filteredCurrentStudents.length})
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search students..."
                      value={currentStudentsSearch}
                      onChange={(e) => {
                        setCurrentStudentsSearch(e.target.value);
                        setCurrentStudentsPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                <ScrollArea className="h-[400px] border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedCurrentStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="text-sm">
                            {student.student_id}
                          </TableCell>
                          <TableCell className="text-sm">
                            {student.first_name} {student.last_name}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleRemoveStudent(student.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>

                {currentStudentsTotalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentStudentsPage((p) => Math.max(1, p - 1))
                          }
                          className={
                            currentStudentsPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {[...Array(currentStudentsTotalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentStudentsPage(i + 1)}
                            isActive={currentStudentsPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentStudentsPage((p) =>
                              Math.min(currentStudentsTotalPages, p + 1)
                            )
                          }
                          className={
                            currentStudentsPage === currentStudentsTotalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>

              {/* Available Students */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    Available Students ({filteredAvailableStudents.length})
                  </h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search students..."
                      value={availableStudentsSearch}
                      onChange={(e) => {
                        setAvailableStudentsSearch(e.target.value);
                        setAvailableStudentsPage(1);
                      }}
                      className="pl-10"
                    />
                  </div>
                </div>

                <ScrollArea className="h-[400px] border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAvailableStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="text-sm">
                            {student.student_id}
                          </TableCell>
                          <TableCell className="text-sm">
                            {student.first_name} {student.last_name}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleAssignStudent(student.id)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>

                {availableStudentsTotalPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setAvailableStudentsPage((p) => Math.max(1, p - 1))
                          }
                          className={
                            availableStudentsPage === 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                      {[...Array(availableStudentsTotalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setAvailableStudentsPage(i + 1)}
                            isActive={availableStudentsPage === i + 1}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setAvailableStudentsPage((p) =>
                              Math.min(availableStudentsTotalPages, p + 1)
                            )
                          }
                          className={
                            availableStudentsPage ===
                            availableStudentsTotalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};

export default SectionManagement;
