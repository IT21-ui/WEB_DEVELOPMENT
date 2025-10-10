import React, { useState } from 'react';
import { BookOpen, Calculator, Save, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface StudentGrade {
  studentId: number;
  studentName: string;
  section: string;
  grades: { [assignment: string]: number };
  gpa: number;
}

interface Assignment {
  name: string;
  maxPoints: number;
  weight: number;
}

const GradeManager: React.FC = () => {
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  
  const [assignments] = useState<Assignment[]>([
    { name: 'Midterm Exam', maxPoints: 100, weight: 0.3 },
    { name: 'Final Exam', maxPoints: 100, weight: 0.4 },
    { name: 'Homework Average', maxPoints: 100, weight: 0.2 },
    { name: 'Participation', maxPoints: 100, weight: 0.1 },
  ]);

  const [studentGrades, setStudentGrades] = useState<StudentGrade[]>([
    {
      studentId: 1,
      studentName: 'Jannine Mae Gella',
      section: 'A',
      grades: { 'Midterm Exam': 92, 'Final Exam': 88, 'Homework Average': 95, 'Participation': 90 },
      gpa: 0
    },
    {
      studentId: 2,
      studentName: 'Kim Belco',
      section: 'A',
      grades: { 'Midterm Exam': 78, 'Final Exam': 82, 'Homework Average': 85, 'Participation': 88 },
      gpa: 0
    },
    {
      studentId: 3,
      studentName: 'Triah Gamier',
      section: 'B',
      grades: { 'Midterm Exam': 95, 'Final Exam': 93, 'Homework Average': 98, 'Participation': 95 },
      gpa: 0
    },
    {
      studentId: 4,
      studentName: 'John Zedrick Manguiat',
      section: 'B',
      grades: { 'Midterm Exam': 70, 'Final Exam': 75, 'Homework Average': 80, 'Participation': 85 },
      gpa: 0
    },
    {
      studentId: 5,
      studentName: 'Kathriz Edorot',
      section: 'C',
      grades: { 'Midterm Exam': 87, 'Final Exam': 91, 'Homework Average': 89, 'Participation': 92 },
      gpa: 0
    },
    {
      studentId: 5,
      studentName: 'Grace Tocmohan',
      section: 'C',
      grades: { 'Midterm Exam': 86, 'Final Exam': 90, 'Homework Average': 89, 'Participation': 92 },
      gpa: 0
    },
  ]);

  const [subjects, setSubjects] = useState<string[]>(['Mathematics', 'Science', 'Filipino', 'English', 'History']);
  const [sections, setSections] = useState<string[]>(['A', 'B', 'C']);

  // === SUBJECT MANAGEMENT ===
  const addSubject = (subjectName: string) => {
    if (!subjectName.trim()) return;
    if (subjects.includes(subjectName)) {
      toast({ title: "Duplicate Subject", description: "This subject already exists.", variant: "destructive" });
      return;
    }
    setSubjects([...subjects, subjectName]);
    toast({ title: "Subject Added", description: `${subjectName} added successfully.` });
  };

  const removeSubject = (subjectName: string) => {
    setSubjects(subjects.filter((s) => s !== subjectName));
    if (selectedSubject === subjectName) setSelectedSubject('');
    toast({ title: "Subject Removed", description: `${subjectName} removed successfully.` });
  };

  // === STUDENT MANAGEMENT ===
  const addStudent = (studentName: string, section: string) => {
    if (!studentName.trim() || !section.trim()) return;
    const newId = studentGrades.length ? Math.max(...studentGrades.map((s) => s.studentId)) + 1 : 1;

    const newStudent: StudentGrade = { studentId: newId, studentName, section, grades: {}, gpa: 0 };
    setStudentGrades([...studentGrades, newStudent]);

    toast({ title: "Student Added", description: `${studentName} added to Section ${section}.` });
  };

  const removeStudent = (studentId: number) => {
    const student = studentGrades.find((s) => s.studentId === studentId);
    setStudentGrades(studentGrades.filter((s) => s.studentId !== studentId));
    toast({ title: "Student Removed", description: `${student?.studentName} has been removed.` });
  };

  // === CALCULATIONS ===
  const calculateGPA = (grades: { [assignment: string]: number }): number => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach(assignment => {
      const grade = grades[assignment.name] || 0;
      totalWeightedScore += (grade / assignment.maxPoints) * assignment.weight * 100;
      totalWeight += assignment.weight;
    });

    const finalScore = totalWeightedScore / totalWeight;
    
    if (finalScore >= 97) return 1.0;
    if (finalScore >= 93) return 1.25;
    if (finalScore >= 90) return 1.5;
    if (finalScore >= 87) return 1.75;
    if (finalScore >= 83) return 2.0;
    if (finalScore >= 80) return 2.25;
    if (finalScore >= 77) return 2.5;
    if (finalScore >= 73) return 2.75;
    if (finalScore >= 70) return 3.0;
    if (finalScore >= 67) return 3.5;
    if (finalScore >= 60) return 4.0; 
    return 5.0; 
  };

  const calculateFinalGrade = (grades: { [assignment: string]: number }): number => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach(assignment => {
      const grade = grades[assignment.name] || 0;
      totalWeightedScore += (grade / assignment.maxPoints) * assignment.weight * 100;
      totalWeight += assignment.weight;
    });

    return totalWeightedScore / totalWeight;
  };

  const updateGrade = (studentId: number, assignment: string, grade: string) => {
    const numericGrade = parseFloat(grade) || 0;
    const maxPoints = assignments.find(a => a.name === assignment)?.maxPoints || 100;
    
    if (numericGrade < 0 || numericGrade > maxPoints) {
      toast({ title: "Invalid Grade", description: `Grade must be between 0 and ${maxPoints}.`, variant: "destructive" });
      return;
    }

    setStudentGrades(prev => prev.map(student => {
      if (student.studentId === studentId) {
        const updatedGrades = { ...student.grades, [assignment]: numericGrade };
        const updatedGPA = calculateGPA(updatedGrades);
        return { ...student, grades: updatedGrades, gpa: updatedGPA };
      }
      return student;
    }));
  };

  // === SAVE/EXPORT ===
  const handleSaveGrades = () => {
    if (!selectedSubject || !selectedSection) {
      toast({ title: "Missing Info", description: "Please select both a subject and section.", variant: "destructive" });
      return;
    }
    toast({ title: "Grades Saved", description: `Grades for ${selectedSubject} - Section ${selectedSection} saved.` });
  };

  const handleExportGrades = () => {
    if (!selectedSubject || !selectedSection) {
      toast({ title: "Missing Info", description: "Please select both a subject and section.", variant: "destructive" });
      return;
    }
    toast({ title: "Grades Exported", description: `Grade report for ${selectedSubject} - Section ${selectedSection} exported.` });
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return <Badge className="bg-success/10 text-success hover:bg-success/20">A</Badge>;
    if (grade >= 80) return <Badge className="bg-primary/10 text-primary hover:bg-primary/20">B</Badge>;
    if (grade >= 70) return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">C</Badge>;
    if (grade >= 60) return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">D</Badge>;
    return <Badge variant="destructive">F</Badge>;
  };

  const filteredStudents = studentGrades.filter(s => 
    (!selectedSection || s.section === selectedSection)
  );

  const classAverage = filteredStudents.reduce((acc, student) => {
    const finalGrade = calculateFinalGrade(student.grades);
    return acc + finalGrade;
  }, 0) / (filteredStudents.length || 1);

  return (
    <div className="space-y-6">
      {/* --- HEADER CARD --- */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Grade Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select Section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section} value={section}>
                    Section {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSaveGrades} className="hero-button">
              <Save className="w-4 h-4 mr-2" />
              Save Grades
            </Button>
            <Button onClick={handleExportGrades} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {selectedSubject && selectedSection && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calculator className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Class Average</span>
                </div>
                <p className="text-2xl font-bold text-primary">{classAverage.toFixed(1)}%</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-sm font-medium text-success mb-2">Students Passing</p>
                <p className="text-2xl font-bold text-success">
                  {filteredStudents.filter(s => calculateFinalGrade(s.grades) >= 75).length}
                </p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <p className="text-sm font-medium text-warning mb-2">Need Attention</p>
                <p className="text-2xl font-bold text-warning">
                  {filteredStudents.filter(s => calculateFinalGrade(s.grades) < 75).length}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedSubject && selectedSection && (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>
              Grade Entry - {selectedSubject} (Section {selectedSection})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-medium">Student</th>
                    {assignments.map((assignment) => (
                      <th key={assignment.name} className="text-center py-3 px-2 font-medium min-w-[120px]">
                        <div>{assignment.name}</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          ({assignment.maxPoints} pts, {(assignment.weight * 100)}%)
                        </div>
                      </th>
                    ))}
                    <th className="text-center py-3 px-2 font-medium">Final Grade</th>
                    <th className="text-center py-3 px-2 font-medium">GPA</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => {
                    const finalGrade = calculateFinalGrade(student.grades);
                    return (
                      <tr key={student.studentId} className="border-b hover:bg-muted/30">
                        <td className="py-3 px-2">
                          <div className="font-medium text-primary">{student.studentName}</div>
                        </td>
                        {assignments.map((assignment) => (
                          <td key={assignment.name} className="py-3 px-2 text-center">
                            <Input
                              type="number"
                              min="0"
                              max={assignment.maxPoints}
                              value={student.grades[assignment.name] || ''}
                              onChange={(e) => updateGrade(student.studentId, assignment.name, e.target.value)}
                              className="w-20 text-center mx-auto"
                              placeholder="0"
                            />
                          </td>
                        ))}
                        <td className="py-3 px-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-medium">{finalGrade.toFixed(1)}%</span>
                            {getGradeBadge(finalGrade)}
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className="font-medium text-primary">{student.gpa.toFixed(1)}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GradeManager;
