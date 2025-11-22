import React from "react";
import { Download, Calendar, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudyLoad: React.FC = () => {
  const classSchedule = [
    {
      course: "PATH FIT 3",
      section: "BSIT 2A",
      day: "MON",
      time: "09:00-11:00AM",
      room: "FIELD",
      instructor: "MENDOZA, EUSEBIA",
      remark: "",
      highlight: false,
    },
    {
      course: "GEC 3",
      section: "BSIT 2A",
      day: "TUE",
      time: "07:00-10:00AM",
      room: "IT 105",
      instructor: "Rivera, Edison",
      remark: "",
      highlight: false,
    },
    {
      course: "IT 107",
      section: "BSIT 2A",
      day: "FRI",
      time: "05:30-07:30PM",
      room: "Online",
      instructor: "Del Rosario, Roberto",
      remark: "",
      highlight: false,
    },
    {
      course: "IT 107",
      section: "BSIT 2A",
      day: "SAT",
      time: "07:00-10:00AM",
      room: "CompLab1",
      instructor: "Del Rosario, Roberto",
      remark: "Class of the Day",
      highlight: true,
    },
    {
      course: "IT 108",
      section: "BSIT 2A",
      day: "THU",
      time: "08:00-10:00AM",
      room: "Online",
      instructor: "PEREZ, NIKKO",
      remark: "",
      highlight: false,
    },
    {
      course: "IT 108",
      section: "BSIT 2A",
      day: "FRI",
      time: "07:00-10:00AM",
      room: "CompLab1",
      instructor: "PEREZ, NIKKO",
      remark: "",
      highlight: false,
    },
    {
      course: "IT 109",
      section: "BSIT 2A",
      day: "MON",
      time: "01:00-03:00PM",
      room: "ONLINE",
      instructor: "EDUAVE, MA.GELEEN",
      remark: "",
      highlight: false,
    },
    {
      course: "IT 109",
      section: "BSIT 2A",
      day: "MON",
      time: "03:00-06:00PM",
      room: "ONLINE",
      instructor: "EDUAVE, MA.GELEEN",
      remark: "",
      highlight: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Study Load</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <a href="#" className="text-primary hover:underline">
              Home
            </a>
            <span>/</span>
            <span>Study Load</span>
          </div>
        </div>
        <Button className="bg-[hsl(var(--red))] hover:bg-[hsl(var(--red))]/90 text-white">
          <Download className="w-4 h-4 mr-2" />
          Download CoR
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader className="bg-[hsl(var(--info))] text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Class Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">
                      Course Title
                    </TableHead>
                    <TableHead className="font-semibold">Section</TableHead>
                    <TableHead className="font-semibold">Day</TableHead>
                    <TableHead className="font-semibold">Time</TableHead>
                    <TableHead className="font-semibold">Room</TableHead>
                    <TableHead className="font-semibold">Instructor</TableHead>
                    <TableHead className="font-semibold">Remark</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classSchedule.map((item, index) => (
                    <TableRow
                      key={index}
                      className={
                        item.highlight
                          ? "bg-[hsl(var(--amber))]/20 hover:bg-[hsl(var(--amber))]/30"
                          : ""
                      }
                    >
                      <TableCell className="font-medium">
                        {item.course}
                      </TableCell>
                      <TableCell>{item.section}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell>{item.room}</TableCell>
                      <TableCell>{item.instructor}</TableCell>
                      <TableCell>
                        {item.remark && (
                          <span className="text-[hsl(var(--amber))] font-medium">
                            ⭐ {item.remark}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Class */}
          <Card>
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5" />
                Today's Class
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[hsl(var(--cyan))]">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold text-lg">
                    IT 107 (BSIT 2A)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>07:00-10:00AM</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-lg">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" />
                </svg>
                Announcement(s)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    AY 2025-2026 1st Term
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <h5 className="font-medium">Semi-Final Examination</h5>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        November 05-08, 2025
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium">Final Examination</h5>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        December 09-13, 2025
                      </p>
                    </div>
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

export default StudyLoad;
