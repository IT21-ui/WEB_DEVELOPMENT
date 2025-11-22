import React from "react";
import {
  Clock,
  BookOpen,
  FileText,
  MessageSquare,
  Calendar as CalendarIcon,
  Megaphone,
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

const TeacherDashboard: React.FC = () => {
  const scheduleData = [
    {
      courseTitle: "IT 111",
      section: "BSIT 2A",
      day: "WED",
      time: "10:00-01:00PM",
      room: "IT 105",
      remark: "",
    },
    {
      courseTitle: "IT 111",
      section: "BSIT 2B",
      day: "FRI",
      time: "01:00-04:00PM",
      room: "LAB 4",
      remark: "",
    },
    {
      courseTitle: "IT 111",
      section: "BSIT 2C",
      day: "TUE",
      time: "10:00-01:00PM",
      room: "CompLab2",
      remark: "",
    },
    {
      courseTitle: "IT 121",
      section: "BSIT 3A",
      day: "FRI",
      time: "07:00-09:00AM",
      room: "Online",
      remark: "",
    },
    {
      courseTitle: "IT 121",
      section: "BSIT 3A",
      day: "MON",
      time: "04:00-07:00PM",
      room: "LAB 1",
      remark: "",
    },
    {
      courseTitle: "IT 121",
      section: "BSIT 3B",
      day: "FRI",
      time: "04:00-06:00PM",
      room: "ONLINE",
      remark: "",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* DTR - Time Log */}
        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--cyan))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <Clock className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">DTR</h2>
            <p className="text-sm mb-4 opacity-90">Time Log</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        {/* Course Load */}
        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--green))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <BookOpen className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">9</h2>
            <p className="text-sm mb-4 opacity-90">Course Load</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        {/* Downloadable Forms */}
        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--amber))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <FileText className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">3</h2>
            <p className="text-sm mb-4 opacity-90">Downloadable Forms</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        {/* Student Feedback */}
        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--red))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <MessageSquare className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">0</h2>
            <p className="text-sm mb-4 opacity-90">Student Feedback</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Class Schedule and Today's Class */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Schedule */}
        <Card className="lg:col-span-2 border-none shadow-lg bg-white">
          <CardHeader className="bg-[hsl(var(--info))] text-white">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Class Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Course Title</TableHead>
                  <TableHead className="font-semibold">Section</TableHead>
                  <TableHead className="font-semibold">Day</TableHead>
                  <TableHead className="font-semibold">Time</TableHead>
                  <TableHead className="font-semibold">Room</TableHead>
                  <TableHead className="font-semibold">Remark</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduleData.map((schedule, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>{schedule.courseTitle}</TableCell>
                    <TableCell>{schedule.section}</TableCell>
                    <TableCell>{schedule.day}</TableCell>
                    <TableCell>{schedule.time}</TableCell>
                    <TableCell>{schedule.room}</TableCell>
                    <TableCell>{schedule.remark}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column - Today's Class and Announcements */}
        <div className="space-y-6">
          {/* Today's Class */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarIcon className="w-4 h-4" />
                Today's Class
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center">None today.</p>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone className="w-4 h-4" />
                Announcement(s)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  AY 2025-2026 1st Term
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Final Grade Submission</p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      June 07, 2025
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">In-service Training</p>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" />
                      May 15, 2025
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
