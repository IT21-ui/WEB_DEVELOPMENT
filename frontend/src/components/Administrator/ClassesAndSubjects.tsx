import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  Layers,
  Plus,
  Trash2,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface SchoolClass {
  id: number;
  grade_level: string;
  section: string;
}

interface Subject {
  id: number;
  name: string;
  grade_level: string;
  teacher?: string;
  teacher_id?: number;
}

interface Teacher {
  id: number;
  name: string;
  email: string;
}

const ClassesAndSubjects: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("classes");

  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [newGrade, setNewGrade] = useState("");
  const [newSection, setNewSection] = useState("");

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  /** ===========================
   * FETCH DATA
   ============================ */
  const fetchAll = async () => {
    try {
      setLoading(true);
      const [classRes, subjectRes, teacherRes] = await Promise.all([
        axios.get("http://localhost:8000/api/admin/classes", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/admin/subjects", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/admin/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setClasses(classRes.data);
      setSubjects(subjectRes.data);
      setTeachers(teacherRes.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /** ===========================
   * CLASS FUNCTIONS
   ============================ */
  const addClass = async () => {
    if (!newGrade || !newSection) {
      toast({ title: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/classes",
        { grade_level: newGrade, section: newSection },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClasses([...classes, res.data]);
      setNewGrade("");
      setNewSection("");
      toast({ title: "Class added successfully." });
    } catch {
      toast({ title: "Failed to add class", variant: "destructive" });
    }
  };

  const deleteClass = async (id: number) => {
    if (!confirm("Are you sure you want to delete this class?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClasses(classes.filter((c) => c.id !== id));
      toast({ title: "Class deleted successfully." });
    } catch {
      toast({ title: "Failed to delete class", variant: "destructive" });
    }
  };

  /** ===========================
   * SUBJECT FUNCTIONS
   ============================ */
  const addSubject = async () => {
    if (!newSubject || !selectedGrade) {
      toast({ title: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/admin/subjects",
        { name: newSubject, grade_level: selectedGrade },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubjects([...subjects, res.data]);
      setNewSubject("");
      setSelectedGrade("");
      toast({ title: "Subject added successfully." });
    } catch {
      toast({ title: "Failed to add subject", variant: "destructive" });
    }
  };

  const deleteSubject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this subject?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/admin/subjects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubjects(subjects.filter((s) => s.id !== id));
      toast({ title: "Subject deleted successfully." });
    } catch {
      toast({ title: "Failed to delete subject", variant: "destructive" });
    }
  };

  const assignTeacher = async (subjectId: number, teacherId: string) => {
    if (!teacherId) return;
    try {
      await axios.post(
        "http://localhost:8000/api/admin/assign-teacher",
        { subject_id: subjectId, teacher_id: teacherId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === subjectId
            ? {
                ...s,
                teacher: teachers.find((t) => t.id === Number(teacherId))?.name,
                teacher_id: Number(teacherId),
              }
            : s
        )
      );
      toast({ title: "Teacher assigned successfully." });
    } catch {
      toast({ title: "Failed to assign teacher", variant: "destructive" });
    }
  };

  /** ===========================
   * UI RENDER
   ============================ */
  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="ml-3">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-destructive">
        <AlertCircle className="w-10 h-10 mx-auto mb-2" />
        <p>{error}</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>

        {/* CLASSES TAB */}
        <TabsContent value="classes">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Manage Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Input
                  placeholder="Grade Level (e.g. Grade 8)"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                />
                <Input
                  placeholder="Section (e.g. Section A)"
                  value={newSection}
                  onChange={(e) => setNewSection(e.target.value)}
                />
                <Button onClick={addClass}>
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {classes.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                  No classes found.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classes.map((c) => (
                    <Card
                      key={c.id}
                      className="p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-primary">
                          {c.grade_level}
                        </h3>
                        <p className="text-muted-foreground">{c.section}</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteClass(c.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* SUBJECTS TAB */}
        <TabsContent value="subjects">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Manage Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-3 mb-4">
                <Input
                  placeholder="Subject Name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                />
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Grade Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...new Set(classes.map((c) => c.grade_level))].map(
                      (g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Button onClick={addSubject}>
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </div>

              {subjects.length === 0 ? (
                <p className="text-muted-foreground text-center py-6">
                  No subjects found.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map((s) => (
                    <Card key={s.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-primary">
                            {s.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {s.grade_level}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span>{s.teacher ? s.teacher : "Unassigned"}</span>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => deleteSubject(s.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="mt-3">
                        <Select
                          value={s.teacher_id?.toString() || ""}
                          onValueChange={(v) => assignTeacher(s.id, v)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Assign Teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map((t) => (
                              <SelectItem key={t.id} value={t.id.toString()}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassesAndSubjects;
