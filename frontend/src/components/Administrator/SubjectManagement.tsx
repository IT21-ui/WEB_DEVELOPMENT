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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, ChevronRight, ArrowLeft } from "lucide-react";

// ============================
// Interfaces
// ============================
interface AlertModalProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

interface Department {
  id: number;
  name: string;
  code: string;
}

interface YearLevel {
  id: number;
  department_id: number;
  name: string;
  level: number;
}

interface Section {
  id: number;
  name: string;
  department_id: number;
  year_level_id: number;
}

interface Teacher {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile?: string;
  department_id: number;
  name?: string;
}

interface Subject {
  id: number;
  code: string;
  title: string;
  units?: number;
  semester?: string;
  curriculum_year?: string;
  section_id?: number;
  teacher_id?: number;
  day?: string;
  time?: string;
  room?: string;
  department_id?: number;
  year_level_id?: number;

  section?: Section;
  teacher?: Teacher;

  section_name?: string;
  teacher_name?: string;
}

// ============================
// Alert Modal
// ============================
const AlertModal: React.FC<AlertModalProps> = ({ message, open, onClose }) => {
  return (
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
};

// ============================
// Main Component
// ============================
const SubjectManagement: React.FC = () => {
  // ============================
  // Navigation State
  // ============================
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null
  );
  const [currentYearLevel, setCurrentYearLevel] = useState<YearLevel | null>(
    null
  );
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  // ============================
  // Data State
  // ============================
  const [departments, setDepartments] = useState<Department[]>([]);
  const [yearLevels, setYearLevels] = useState<YearLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [days] = useState(["MON", "TUE", "WED", "THU", "FRI", "SAT"]);

  // Dialog & form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<Subject | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({
    code: "",
    title: "",
    units: undefined,
    semester: "1st",
    curriculum_year: new Date().getFullYear().toString(),
    department_id: undefined,
    year_level_id: undefined,
    section_id: undefined,
    teacher_id: undefined,
  });

  // Alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setIsAlertOpen(true);
  };

  // ============================
  // Fetch Data
  // ============================
  useEffect(() => {
    setCurrentYearLevel(null);
    setCurrentSection(null);
  }, [currentDepartment]);

  useEffect(() => {
    setCurrentSection(null);
  }, [currentYearLevel]);

  useEffect(() => {
    fetchDepartments();
    fetchYearLevels();
    fetchSections();
    fetchTeachers();
    fetchSubjects();
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

  const fetchTeachers = async () => {
    try {
      const res = await axios.get<Teacher[]>(
        "http://localhost:8000/api/teachers"
      );
      setTeachers(
        res.data.map((t) => ({ ...t, name: `${t.first_name} ${t.last_name}` }))
      );
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch teachers.");
    }
  };

  const fetchSubjects = async () => {
    try {
      const res = await axios.get<Subject[]>(
        "http://localhost:8000/api/subjects"
      );
      const mapped: Subject[] = res.data.map((s) => ({
        ...s,
        department_id: s.department_id ?? s.section?.department_id,
        year_level_id: s.year_level_id ?? s.section?.year_level_id,
        section_name: s.section?.name ?? "—",
        teacher_name: s.teacher
          ? `${s.teacher.first_name} ${s.teacher.last_name}`
          : "—",
      }));
      setSubjects(mapped);
    } catch (err) {
      console.error(err);
      showAlert("Failed to fetch subjects.");
    }
  };

  // ============================
  // Filtered Data
  // ============================
  const filteredSections = useMemo(() => {
    if (!currentDepartment || !currentYearLevel) return [];
    const filtered = sections.filter(
      (s) =>
        Number(s.department_id) === Number(currentDepartment.id) &&
        Number(s.year_level_id) === Number(currentYearLevel.id)
    );
    if (currentSection && !filtered.some((s) => s.id === currentSection.id)) {
      setCurrentSection(null);
    }
    return filtered;
  }, [sections, currentDepartment, currentYearLevel, currentSection]);

  const filteredSubjects = useMemo(() => {
    if (!currentYearLevel || !currentDepartment) return [];
    return subjects.filter(
      (s) =>
        Number(s.department_id) === Number(currentDepartment.id) &&
        Number(s.year_level_id) === Number(currentYearLevel.id)
    );
  }, [subjects, currentDepartment, currentYearLevel]);

  // ============================
  // Handlers
  // ============================
  const handleAddSubject = async () => {
    if (
      !newSubject.code ||
      !newSubject.title ||
      !newSubject.units ||
      !newSubject.semester ||
      !newSubject.department_id ||
      !newSubject.year_level_id
    ) {
      showAlert("Please fill in all required fields.");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8000/api/subjects",
        newSubject
      );
      const added: Subject = {
        ...res.data,
        section_name: res.data.section?.name ?? "—",
        teacher_name: res.data.teacher
          ? `${res.data.teacher.first_name} ${res.data.teacher.last_name}`
          : "—",
      };
      setSubjects((prev) => [...prev, added]);
      setIsAddDialogOpen(false);
      showAlert("Subject added successfully.");
    } catch (err: any) {
      console.error(err);
      showAlert(err.response?.data?.message || "Failed to add subject.");
    }
  };

  const handleSaveAssignment = async () => {
    if (!selectedSubject) return;
    try {
      await axios.put(
        `http://localhost:8000/api/subjects/${selectedSubject.id}`,
        selectedSubject
      );
      setSubjects((prev) =>
        prev.map((s) => (s.id === selectedSubject.id ? selectedSubject : s))
      );
      setIsEditDialogOpen(false);
      showAlert("Assignment saved successfully.");
    } catch (err: any) {
      console.error(err);
      showAlert(err.response?.data?.message || "Failed to save changes.");
    }
  };

  const handleBackNavigation = () => {
    if (currentSection) {
      setCurrentSection(null);
    } else if (currentYearLevel) {
      setCurrentYearLevel(null);
    } else if (currentDepartment) {
      setCurrentDepartment(null);
    }
  };

  const openAddDialog = () => {
    setNewSubject({
      code: "",
      title: "",
      units: undefined,
      semester: "1st",
      curriculum_year: new Date().getFullYear().toString(),
      department_id: currentDepartment?.id,
      year_level_id: currentYearLevel?.id,
      teacher_id: undefined,
    });
    setIsAddDialogOpen(true);
  };

  // ============================
  // Breadcrumb
  // ============================
  const renderBreadcrumb = () => {
    const items = [];
    items.push(
      <button
        key="home"
        onClick={() => {
          setCurrentDepartment(null);
          setCurrentYearLevel(null);
        }}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Departments
      </button>
    );
    if (currentDepartment) {
      items.push(
        <ChevronRight
          key="chevron1"
          className="w-4 h-4 text-muted-foreground"
        />
      );
      items.push(
        <button
          key="dept"
          onClick={() => setCurrentYearLevel(null)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {currentDepartment.name}
        </button>
      );
    }
    if (currentYearLevel) {
      items.push(
        <ChevronRight
          key="chevron2"
          className="w-4 h-4 text-muted-foreground"
        />
      );
      items.push(
        <span key="year" className="text-sm font-medium">
          {currentYearLevel.name}
        </span>
      );
    }
    return <div className="flex items-center gap-2">{items}</div>;
  };

  // ============================
  // Render Views
  // ============================
  if (!currentDepartment) {
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentYearLevel) {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />
        <Card>
          <CardHeader className="flex items-center justify-between">
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {yearLevels
                .filter((y) => y.department_id === currentDepartment.id)
                .map((year) => (
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
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentSection) {
    return (
      <div className="space-y-6">
        <AlertModal
          message={alertMessage}
          open={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
        />

        <Card>
          <CardHeader className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBackNavigation}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            {renderBreadcrumb()}
            <Button onClick={openAddDialog} className="bg-blue-600 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add New Subject
            </Button>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Select Section</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sections
                .filter(
                  (s) =>
                    s.department_id === currentDepartment!.id &&
                    s.year_level_id === currentYearLevel!.id
                )
                .map((sec) => (
                  <Card
                    key={sec.id}
                    className="cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setCurrentSection(sec)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{sec.name}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Add Subject Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label>Subject Code *</Label>
                <Input
                  value={newSubject.code || ""}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, code: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Title / Description *</Label>
                <Input
                  value={newSubject.title || ""}
                  onChange={(e) =>
                    setNewSubject({ ...newSubject, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Units *</Label>
                <Input
                  type="number"
                  value={newSubject.units || ""}
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      units: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Semester *</Label>
                <Select
                  value={newSubject.semester || ""}
                  onValueChange={(value) =>
                    setNewSubject({ ...newSubject, semester: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st</SelectItem>
                    <SelectItem value="2nd">2nd</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Curriculum Year *</Label>
                <Input
                  value={
                    newSubject.curriculum_year ||
                    new Date().getFullYear().toString()
                  }
                  onChange={(e) =>
                    setNewSubject({
                      ...newSubject,
                      curriculum_year: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Department *</Label>
                <Select
                  value={String(newSubject.department_id || "")}
                  onValueChange={(value) =>
                    setNewSubject({
                      ...newSubject,
                      department_id: Number(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={String(d.id)}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Year Level *</Label>
                <Select
                  value={String(newSubject.year_level_id || "")}
                  onValueChange={(value) =>
                    setNewSubject({
                      ...newSubject,
                      year_level_id: Number(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Year Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearLevels
                      .filter(
                        (y) => y.department_id === newSubject.department_id
                      )
                      .map((y) => (
                        <SelectItem key={y.id} value={String(y.id)}>
                          {y.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Teacher</Label>
                <Select
                  value={String(newSubject.teacher_id || "")}
                  onValueChange={(value) =>
                    setNewSubject({ ...newSubject, teacher_id: Number(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddSubject}>Add Subject</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ============================
  // Subject List View
  // ============================
  return (
    <div className="space-y-6">
      <AlertModal
        message={alertMessage}
        open={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
      />

      <Card>
        <CardHeader className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={handleBackNavigation}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {renderBreadcrumb()}
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Subjects</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredSubjects.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No subjects found. Add a new subject to get started.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.code}</TableCell>
                    <TableCell>{subject.title}</TableCell>
                    <TableCell>
                      {subject.day && subject.time
                        ? `${subject.day} ${subject.time}`
                        : "—"}
                    </TableCell>
                    <TableCell>{subject.teacher_name || "—"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedSubject(subject);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSubjectToDelete(subject)}
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

      {/* Add Subject Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label>Subject Code *</Label>
              <Input
                value={newSubject.code || ""}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, code: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Title / Description *</Label>
              <Input
                value={newSubject.title || ""}
                onChange={(e) =>
                  setNewSubject({ ...newSubject, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Units *</Label>
              <Input
                type="number"
                value={newSubject.units || ""}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    units: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Semester *</Label>
              <Select
                value={newSubject.semester || ""}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, semester: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Curriculum Year *</Label>
              <Input
                value={
                  newSubject.curriculum_year ||
                  new Date().getFullYear().toString()
                }
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    curriculum_year: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label>Department *</Label>
              <Select
                value={String(newSubject.department_id || "")}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, department_id: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Year Level *</Label>
              <Select
                value={String(newSubject.year_level_id || "")}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, year_level_id: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Year Level" />
                </SelectTrigger>
                <SelectContent>
                  {yearLevels
                    .filter((y) => y.department_id === newSubject.department_id)
                    .map((y) => (
                      <SelectItem key={y.id} value={String(y.id)}>
                        {y.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Teacher</Label>
              <Select
                value={String(newSubject.teacher_id || "")}
                onValueChange={(value) =>
                  setNewSubject({ ...newSubject, teacher_id: Number(value) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher" />
                </SelectTrigger>
                <SelectContent>
                  {teachers.map((t) => (
                    <SelectItem key={t.id} value={String(t.id)}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubject}>Add Subject</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          {selectedSubject && (
            <div className="grid gap-4 py-4">
              <div>
                <Label>Teacher</Label>
                <Select
                  value={String(selectedSubject.teacher_id || "")}
                  onValueChange={(value) =>
                    setSelectedSubject({
                      ...selectedSubject,
                      teacher_id: Number(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>
                        {t.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Day</Label>
                <Select
                  value={selectedSubject.day || ""}
                  onValueChange={(value) =>
                    setSelectedSubject({ ...selectedSubject, day: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  value={selectedSubject.time || ""}
                  onChange={(e) =>
                    setSelectedSubject({
                      ...selectedSubject,
                      time: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Room</Label>
                <Input
                  value={selectedSubject.room || ""}
                  onChange={(e) =>
                    setSelectedSubject({
                      ...selectedSubject,
                      room: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveAssignment}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ============================ */}
      {/* Delete Confirmation Dialog */}
      {/* ============================ */}

      <Dialog
        open={!!subjectToDelete}
        onOpenChange={() => setSubjectToDelete(null)}
      >
        <DialogContent className="max-w-sm mx-auto text-center">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete "{subjectToDelete?.title}"?
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex justify-center gap-4">
            <Button variant="outline" onClick={() => setSubjectToDelete(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white"
              onClick={async () => {
                if (!subjectToDelete) return;
                try {
                  await axios.delete(
                    `http://localhost:8000/api/subjects/${subjectToDelete.id}`
                  );
                  setSubjects((prev) =>
                    prev.filter((s) => s.id !== subjectToDelete.id)
                  );
                  setSubjectToDelete(null);
                  showAlert("Subject removed successfully.");
                } catch (err: any) {
                  console.error(err);
                  showAlert(
                    err.response?.data?.message || "Failed to delete subject."
                  );
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SubjectManagement;
