import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, TrendingUp, TrendingDown, Target, Award, AlertTriangle, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const MyGrades = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock grades data
  const gradesOverview = {
    overallGPA: 3.42,
    totalCredits: 18,
    completedCredits: 16,
    averageGrade: 85.6
  };

  const subjectGrades = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      credits: 4,
      currentGrade: 88,
      letterGrade: 'B+',
      gpa: 3.3,
      assignments: [
        { name: 'Midterm Exam', grade: 92, weight: 30, date: '2024-01-10' },
        { name: 'Quiz 1', grade: 85, weight: 15, date: '2024-01-05' },
        { name: 'Assignment 1', grade: 90, weight: 20, date: '2024-01-03' },
        { name: 'Quiz 2', grade: 82, weight: 15, date: '2024-01-12' }
      ],
      trend: 'up'
    },
    {
      subject: 'Science',
      teacher: 'Prof. Johnson',
      credits: 4,
      currentGrade: 76,
      letterGrade: 'C+',
      gpa: 2.3,
      assignments: [
        { name: 'Lab Report 1', grade: 88, weight: 25, date: '2024-01-08' },
        { name: 'Midterm Exam', grade: 72, weight: 35, date: '2024-01-11' },
        { name: 'Quiz 1', grade: 78, weight: 20, date: '2024-01-04' }
      ],
      trend: 'down'
    },
    {
      subject: 'Filipino',
      teacher: 'Dr. Brown',
      credits: 4,
      currentGrade: 94,
      letterGrade: 'A',
      gpa: 4.0,
      assignments: [
        { name: 'Assignment', grade: 96, weight: 30, date: '2024-01-09' },
        { name: 'Midterm Exam', grade: 93, weight: 35, date: '2024-01-10' },
        { name: 'Quiz Series', grade: 92, weight: 25, date: '2024-01-07' }
      ],
      trend: 'up'
    },
    {
      subject: 'English',
      teacher: 'Ms. Davis',
      credits: 3,
      currentGrade: 81,
      letterGrade: 'B-',
      gpa: 2.7,
      assignments: [
        { name: 'Research Paper', grade: 85, weight: 40, date: '2024-01-13' },
        { name: 'Quiz', grade: 79, weight: 30, date: '2024-01-06' },
        { name: 'Presentation', grade: 88, weight: 30, date: '2024-01-02' }
      ],
      trend: 'stable'
    }
  ];

  const gradesTrend = [
    { week: 'Week 1', gpa: 3.2 },
    { week: 'Week 2', gpa: 3.3 },
    { week: 'Week 3', gpa: 3.1 },
    { week: 'Week 4', gpa: 3.4 },
    { week: 'Week 5', gpa: 3.3 },
    { week: 'Week 6', gpa: 3.5 },
    { week: 'Week 7', gpa: 3.4 },
    { week: 'Week 8', gpa: 3.42 }
  ];

  const performanceRadar = [
    { subject: 'Math', current: 88, target: 90 },
    { subject: 'Science', current: 76, target: 85 },
    { subject: 'Filipino', current: 94, target: 92 },
    { subject: 'English', current: 81, target: 85 }
  ];

  const chartConfig = {
    gpa: {
      label: "GPA",
      color: "hsl(var(--primary))",
    },
    current: {
      label: "Current Grade",
      color: "hsl(var(--primary))",
    },
    target: {
      label: "Target Grade",
      color: "hsl(var(--secondary))",
    },
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return <Badge className="bg-green-100 text-green-800">A</Badge>;
    if (grade >= 80) return <Badge className="bg-blue-100 text-blue-800">B</Badge>;
    if (grade >= 70) return <Badge className="bg-yellow-100 text-yellow-800">C</Badge>;
    if (grade >= 60) return <Badge className="bg-orange-100 text-orange-800">D</Badge>;
    return <Badge variant="destructive">F</Badge>;
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    if (grade >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const handleExportGrades = () => {
    toast({
      title: 'Grades Exported',
      description: 'Your grade report has been exported successfully.',
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Grades</h1>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportGrades}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall GPA</p>
                <p className="text-2xl font-bold text-primary">{gradesOverview.overallGPA}</p>
              </div>
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+0.12 from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-blue-600">{gradesOverview.averageGrade}%</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2.3% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Completed</p>
                <p className="text-2xl font-bold">{gradesOverview.completedCredits}/{gradesOverview.totalCredits}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-500" />
            </div>
            <Progress 
              value={(gradesOverview.completedCredits / gradesOverview.totalCredits) * 100} 
              className="mt-2" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{subjectGrades.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">Currently enrolled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {subjectGrades.map((subject) => (
              <Card key={subject.subject}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{subject.subject}</CardTitle>
                      <p className="text-sm text-gray-600">{subject.teacher}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getGradeColor(subject.currentGrade)}`}>
                        {subject.currentGrade}%
                      </div>
                      <div className="flex items-center gap-2">
                        {getGradeBadge(subject.currentGrade)}
                        {getTrendIcon(subject.trend)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Credits: {subject.credits}</span>
                      <span>GPA: {subject.gpa}</span>
                    </div>
                    <Progress value={subject.currentGrade} className="h-2" />
                    <div className="border-t pt-3">
                      <p className="text-sm font-medium mb-2">Recent Assignments:</p>
                      <div className="space-y-1">
                        {subject.assignments.slice(0, 3).map((assignment, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="truncate">{assignment.name}</span>
                            <span className={getGradeColor(assignment.grade)}>
                              {assignment.grade}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          {subjectGrades.map((subject) => (
            <Card key={subject.subject}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{subject.subject} - Assignments</span>
                  <Badge variant="outline">{subject.letterGrade}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Assignment</th>
                        <th className="text-left p-2">Grade</th>
                        <th className="text-left p-2">Weight</th>
                        <th className="text-left p-2">Date</th>
                        <th className="text-left p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subject.assignments.map((assignment, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{assignment.name}</td>
                          <td className="p-2">
                            <span className={`font-medium ${getGradeColor(assignment.grade)}`}>
                              {assignment.grade}%
                            </span>
                          </td>
                          <td className="p-2">{assignment.weight}%</td>
                          <td className="p-2 text-gray-600">{assignment.date}</td>
                          <td className="p-2">{getGradeBadge(assignment.grade)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GPA Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={gradesTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[2.5, 4]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="gpa" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectGrades}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="currentGrade" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance vs Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={performanceRadar}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar 
                        name="Current" 
                        dataKey="current" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.3} 
                      />
                      <Radar 
                        name="Target" 
                        dataKey="target" 
                        stroke="hsl(var(--secondary))" 
                        fill="transparent" 
                        strokeDasharray="5 5"
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                    <div>
                      <p className="font-medium text-red-800">Physics - Needs Attention</p>
                      <p className="text-sm text-red-600">
                        Current grade: 76%. Consider extra study sessions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <Target className="w-5 h-5 text-yellow-500 mr-3" />
                    <div>
                      <p className="font-medium text-yellow-800">Biology - Improvement Opportunity</p>
                      <p className="text-sm text-yellow-600">
                        Close to target but can reach higher performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Award className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium text-green-800">Chemistry - Excellent Work</p>
                      <p className="text-sm text-green-600">
                        Exceeding expectations! Keep up the great work.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <div className="text-sm text-green-600">A grades</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-blue-600">B grades</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-yellow-600">C grades</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-600">D grades</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-red-600">F grades</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyGrades;