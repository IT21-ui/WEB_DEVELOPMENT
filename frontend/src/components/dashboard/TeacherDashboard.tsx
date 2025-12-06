import React, { useEffect, useState } from "react";
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

interface Schedule {
  courseTitle: string;
  section: string;
  day: string;
  time: string;
  room: string;
  remark: string;
}

interface Stats {
  dtr: number;
  courseLoad: number;
  downloadableForms: number;
  studentFeedback: number;
}

interface Announcement {
  title: string;
  date: string;
}

const TeacherDashboard: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([]);
  const [stats, setStats] = useState<Stats>({
    dtr: 0,
    courseLoad: 0,
    downloadableForms: 0,
    studentFeedback: 0,
  });
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);

  // Fetch schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teachers");
        const data = await response.json();
        const formattedData: Schedule[] = data.map((item: any) => ({
          courseTitle: item.course_title || "N/A",
          section: item.section || "N/A",
          day: item.day || "N/A",
          time: item.time || "N/A",
          room: item.room || "N/A",
          remark: item.remark || "",
        }));
        setScheduleData(formattedData);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoadingSchedule(false);
      }
    };
    fetchSchedule();
  }, []);

  // Fetch stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/teacher/stats");
        const data = await response.json();
        setStats({
          dtr: data.dtr || 0,
          courseLoad: data.courseLoad || 0,
          downloadableForms: data.downloadableForms || 0,
          studentFeedback: data.studentFeedback || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Fetch announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/teacher/announcements"
        );
        const data = await response.json();
        const formatted: Announcement[] = data.map((a: any) => ({
          title: a.title || "Untitled",
          date: a.date || "",
        }));
        setAnnouncements(formatted);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoadingAnnouncements(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Compute today's classes
  const today = new Date()
    .toLocaleString("en-US", { weekday: "short" })
    .toUpperCase();
  const todaysClasses = scheduleData.filter(
    (cls) => cls.day.toUpperCase() === today
  );

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--cyan))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <Clock className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {loadingStats ? "..." : stats.dtr}
            </h2>
            <p className="text-sm mb-4 opacity-90">DTR - Time Log</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--green))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <BookOpen className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {loadingStats ? "..." : stats.courseLoad}
            </h2>
            <p className="text-sm mb-4 opacity-90">Course Load</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--amber))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <FileText className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {loadingStats ? "..." : stats.downloadableForms}
            </h2>
            <p className="text-sm mb-4 opacity-90">Downloadable Forms</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden bg-[hsl(var(--red))] text-white">
          <CardContent className="p-6 relative">
            <div className="absolute right-4 top-4 opacity-20">
              <MessageSquare className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-bold mb-2">
              {loadingStats ? "..." : stats.studentFeedback}
            </h2>
            <p className="text-sm mb-4 opacity-90">Student Feedback</p>
            <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-all">
              More info →
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Class Schedule and Right Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Schedule */}
        <Card className="lg:col-span-2 border-none shadow-lg bg-white">
          <CardHeader className="bg-[hsl(var(--info))] text-white">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" /> Class Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loadingSchedule ? (
              <p className="text-center p-4">Loading schedule...</p>
            ) : scheduleData.length === 0 ? (
              <p className="text-center p-4">No classes scheduled.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Course Title</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Remark</TableHead>
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
            )}
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Today's Class */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-base">
                <CalendarIcon className="w-4 h-4" /> Today's Class
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {todaysClasses.length === 0 ? (
                <p className="text-muted-foreground text-center">
                  No class today.
                </p>
              ) : (
                <ul className="space-y-2">
                  {todaysClasses.map((cls, i) => (
                    <li key={i} className="border p-2 rounded-md">
                      <p className="font-medium">{cls.courseTitle}</p>
                      <p>
                        {cls.section} - {cls.time}
                      </p>
                      <p>Room: {cls.room}</p>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="border-none shadow-lg bg-white">
            <CardHeader className="bg-[hsl(var(--info))] text-white">
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone className="w-4 h-4" /> Announcement(s)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {loadingAnnouncements ? (
                <p className="text-center">Loading announcements...</p>
              ) : announcements.length === 0 ? (
                <p className="text-center">No announcements.</p>
              ) : (
                announcements.map((a, i) => (
                  <div key={i} className="border-b pb-2 last:border-b-0">
                    <p className="font-medium">{a.title}</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4" /> {a.date}
                    </p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
