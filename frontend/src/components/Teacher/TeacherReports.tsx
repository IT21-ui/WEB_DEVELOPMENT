import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Download, TrendingUp, TrendingDown, Users, BookOpen, Clock, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TeacherReports = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock data for reports
  const gradeDistributionData = [
    { section: 'A', count: 15, percentage: 30 },
    { section: 'B', count: 20, percentage: 40 },
    { section: 'C', count: 10, percentage: 20 },
    { section: 'D', count: 3, percentage: 6 },
    { section: 'F', count: 2, percentage: 4 },
  ];

  const attendanceTrendData = [
    { week: 'Week 1', attendance: 95 },
    { week: 'Week 2', attendance: 92 },
    { week: 'Week 3', attendance: 88 },
    { week: 'Week 4', attendance: 91 },
    { week: 'Week 5', attendance: 94 },
    { week: 'Week 6', attendance: 87 },
    { week: 'Week 7', attendance: 93 },
    { week: 'Week 8', attendance: 96 },
  ];

  const subjectPerformanceData = [
    { subject: 'Mathematics', avgGrade: 3.4, passRate: 85, enrollment: 45 },
    { subject: 'Physics', avgGrade: 3.2, passRate: 78, enrollment: 38 },
    { subject: 'Chemistry', avgGrade: 3.6, passRate: 92, enrollment: 42 },
    { subject: 'Biology', avgGrade: 3.5, passRate: 88, enrollment: 40 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d084d0'];

  const chartConfig = {
    grade: {
      label: "Grade",
      color: "hsl(var(--chart-1))",
    },
    count: {
      label: "Students",
      color: "hsl(var(--chart-2))",
    },
  };

  const handleExportReport = (reportType: string) => {
    toast({
      title: 'Report Exported',
      description: `${reportType} report has been exported successfully.`,
    });
  };

  const getGradeColor = (section: string) => {
    switch (section) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-blue-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'F': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPassRateColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 80) return 'text-blue-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teacher Reports</h1>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semester">This Semester</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold">165</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+5% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average GPA</p>
                <p className="text-2xl font-bold">3.42</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
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
                <p className="text-sm font-medium text-gray-600">Pass Rate</p>
                <p className="text-2xl font-bold">86%</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600">-2% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
                <p className="text-2xl font-bold">91%</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+3% from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="detailed">Detailed</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Section Distribution</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportReport('Section Distribution')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={gradeDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="section
                      " />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#60a5fa" /> 
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Section Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gradeDistributionData.map((item) => (
                    <div key={item.section} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getGradeColor(item.section)}`} />
                        <span className="font-medium">Grade {item.section}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Progress value={item.percentage} className="w-20" />
                        <span className="text-sm text-gray-600 w-12">{item.count} students</span>
                        <Badge variant="outline">{item.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Attendance Trend</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('Attendance Trend')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={attendanceTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[75, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Subject Performance Overview</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('Subject Performance')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Subject</th>
                      <th className="text-left p-4">Enrollment</th>
                      <th className="text-left p-4">Avg GPA</th>
                      <th className="text-left p-4">Pass Rate</th>
                      <th className="text-left p-4">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectPerformanceData.map((subject) => (
                      <tr key={subject.subject} className="border-b">
                        <td className="p-4 font-medium">{subject.subject}</td>
                        <td className="p-4">{subject.enrollment} students</td>
                        <td className="p-4">
                          <Badge variant="outline">{subject.avgGrade.toFixed(1)}</Badge>
                        </td>
                        <td className="p-4">
                          <span className={`font-medium ${getPassRateColor(subject.passRate)}`}>
                            {subject.passRate}%
                          </span>
                        </td>
                        <td className="p-4">
                          <Progress value={subject.passRate} className="w-24" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Students at Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">GPA: 2.1, Attendance: 65%</p>
                    </div>
                    <Badge variant="destructive">High Risk</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-gray-600">GPA: 2.8, Attendance: 78%</p>
                    </div>
                    <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                      Moderate Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <p className="text-sm text-gray-600">GPA: 2.5, Attendance: 72%</p>
                    </div>
                    <Badge variant="outline" className="border-orange-500 text-orange-600">
                      Moderate Risk
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Wilson</p>
                      <p className="text-sm text-gray-600">GPA: 3.95, Attendance: 98%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">David Brown</p>
                      <p className="text-sm text-gray-600">GPA: 3.87, Attendance: 96%</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Emily Davis</p>
                      <p className="text-sm text-gray-600">GPA: 3.72, Attendance: 94%</p>
                    </div>
                    <Badge variant="outline" className="border-blue-500 text-blue-600">
                      High Achiever
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Class Comparison</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportReport('Class Comparison')}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Class</th>
                      <th className="text-left p-4">Students</th>
                      <th className="text-left p-4">Avg GPA</th>
                      <th className="text-left p-4">Attendance</th>
                      <th className="text-left p-4">Pass Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Mathematics A</td>
                      <td className="p-4">32</td>
                      <td className="p-4">3.4</td>
                      <td className="p-4">92%</td>
                      <td className="p-4">87%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Mathematics B</td>
                      <td className="p-4">28</td>
                      <td className="p-4">3.2</td>
                      <td className="p-4">89%</td>
                      <td className="p-4">82%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-medium">Physics A</td>
                      <td className="p-4">25</td>
                      <td className="p-4">3.1</td>
                      <td className="p-4">88%</td>
                      <td className="p-4">78%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherReports;