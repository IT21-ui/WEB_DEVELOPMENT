import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, TrendingUp, TrendingDown, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, ResponsiveContainer } from 'recharts';

const MyAttendance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock attendance data
  const attendanceOverview = {
    overall: 87,
    present: 156,
    absent: 12,
    late: 15,
    totalClasses: 183
  };

  const subjectAttendance = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Smith',
      present: 42,
      absent: 3,
      late: 2,
      total: 47,
      percentage: 89,
      status: 'good'
    },
    {
      subject: 'Physics',
      teacher: 'Prof. Johnson',
      present: 38,
      absent: 4,
      late: 3,
      total: 45,
      percentage: 84,
      status: 'warning'
    },
    {
      subject: 'Chemistry',
      teacher: 'Dr. Brown',
      present: 41,
      absent: 2,
      late: 3,
      total: 46,
      percentage: 89,
      status: 'good'
    },
    {
      subject: 'Biology',
      teacher: 'Ms. Davis',
      present: 35,
      absent: 3,
      late: 7,
      total: 45,
      percentage: 78,
      status: 'critical'
    }
  ];

  const attendanceTrend = [
    { week: 'Week 1', attendance: 95 },
    { week: 'Week 2', attendance: 92 },
    { week: 'Week 3', attendance: 85 },
    { week: 'Week 4', attendance: 88 },
    { week: 'Week 5', attendance: 90 },
    { week: 'Week 6', attendance: 82 },
    { week: 'Week 7', attendance: 87 },
    { week: 'Week 8', attendance: 91 }
  ];

  const recentAttendance = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'present', time: '09:00 AM' },
    { date: '2024-01-15', subject: 'Physics', status: 'late', time: '11:00 AM' },
    { date: '2024-01-14', subject: 'Chemistry', status: 'present', time: '10:00 AM' },
    { date: '2024-01-14', subject: 'Biology', status: 'absent', time: '02:00 PM' },
    { date: '2024-01-13', subject: 'Mathematics', status: 'present', time: '09:00 AM' },
  ];

  const chartConfig = {
    attendance: {
      label: "Attendance %",
      color: "hsl(var(--primary))",
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Absent
          </Badge>
        );
      case 'late':
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-600 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Late
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSubjectStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-100 text-green-800">Good</Badge>;
      case 'warning':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-600">Warning</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Attendance</h1>
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
              <SelectValue placeholder="All Subjects" />
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

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Attendance</p>
                <p className={`text-2xl font-bold ${getAttendanceColor(attendanceOverview.overall)}`}>
                  {attendanceOverview.overall}%
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">+2% from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes Attended</p>
                <p className="text-2xl font-bold text-green-600">{attendanceOverview.present}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Out of {attendanceOverview.totalClasses} total classes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Arrivals</p>
                <p className="text-2xl font-bold text-yellow-600">{attendanceOverview.late}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600">-3 from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absences</p>
                <p className="text-2xl font-bold text-red-600">{attendanceOverview.absent}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex items-center mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600">+2 from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Present</span>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(attendanceOverview.present / attendanceOverview.totalClasses) * 100} 
                        className="w-24" 
                      />
                      <span className="text-sm text-green-600 font-medium">
                        {attendanceOverview.present}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Late</span>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(attendanceOverview.late / attendanceOverview.totalClasses) * 100} 
                        className="w-24" 
                      />
                      <span className="text-sm text-yellow-600 font-medium">
                        {attendanceOverview.late}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Absent</span>
                    <div className="flex items-center space-x-2">
                      <Progress 
                        value={(attendanceOverview.absent / attendanceOverview.totalClasses) * 100} 
                        className="w-24" 
                      />
                      <span className="text-sm text-red-600 font-medium">
                        {attendanceOverview.absent}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">90%</div>
                    <p className="text-gray-600">Target Attendance</p>
                  </div>
                  <Progress value={attendanceOverview.overall} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>Current: {attendanceOverview.overall}%</span>
                    <span className={attendanceOverview.overall >= 90 ? 'text-green-600' : 'text-red-600'}>
                      {attendanceOverview.overall >= 90 ? 'Goal Achieved!' : `${90 - attendanceOverview.overall}% to go`}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectAttendance.map((subject) => (
                  <div key={subject.subject} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{subject.subject}</h3>
                        <p className="text-sm text-gray-600">{subject.teacher}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${getAttendanceColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </div>
                        {getSubjectStatusBadge(subject.status)}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-green-600 font-semibold">{subject.present}</div>
                        <div className="text-xs text-gray-600">Present</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-600 font-semibold">{subject.late}</div>
                        <div className="text-xs text-gray-600">Late</div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-600 font-semibold">{subject.absent}</div>
                        <div className="text-xs text-gray-600">Absent</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">{subject.total}</div>
                        <div className="text-xs text-gray-600">Total</div>
                      </div>
                    </div>
                    
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[70, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
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
              <CardTitle>Monthly Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { month: 'Sep', attendance: 92 },
                    { month: 'Oct', attendance: 89 },
                    { month: 'Nov', attendance: 85 },
                    { month: 'Dec', attendance: 87 },
                    { month: 'Jan', attendance: 90 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="attendance" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-600">{record.date}</div>
                      <div className="font-medium">{record.subject}</div>
                      <div className="text-sm text-gray-600">{record.time}</div>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="font-medium text-red-800">Low Attendance Warning</p>
                    <p className="text-sm text-red-600">
                      Your Biology attendance is below 80%. Consider attending more classes.
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="font-medium text-yellow-800">Frequent Late Arrivals</p>
                    <p className="text-sm text-yellow-600">
                      You've been late 7 times this month in Biology class.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyAttendance;