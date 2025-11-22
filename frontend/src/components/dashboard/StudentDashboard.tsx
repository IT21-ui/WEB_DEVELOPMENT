import React, { useState } from "react";
import {
  User,
  BookOpen,
  TrendingUp,
  Megaphone,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StudentDashboard: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10)); // November 2025

  const upcomingEvents = [
    {
      title: "New Year's Day",
      date: "Jan 1, 2025",
      endDate: "Jan 1, 2025",
      color: "bg-[hsl(var(--red))]",
    },
    {
      title: "Chinese New Year",
      date: "Jan 29, 2025",
      endDate: "Jan 29, 2025",
      color: "bg-[hsl(var(--amber))]",
    },
    {
      title: "Araw ng Kagitingan (Day of Valor)",
      date: "Apr 9, 2025",
      endDate: "Apr 9, 2025",
      color: "bg-[hsl(var(--red))]",
    },
    {
      title: "Maundy Thursday",
      date: "Apr 17, 2025",
      endDate: "Apr 17, 2025",
      color: "bg-[hsl(var(--red))]",
    },
    {
      title: "Good Friday",
      date: "Apr 18, 2025",
      endDate: "Apr 18, 2025",
      color: "bg-[hsl(var(--red))]",
    },
  ];

  const calendarEvents = [
    { date: 1, title: "All Saints Day", color: "bg-[hsl(var(--red))]" },
    { date: 2, title: "All Souls Day", color: "bg-[hsl(var(--amber))]" },
    {
      date: 3,
      title: "Faculty Evaluation",
      color: "bg-[hsl(var(--green))]",
      span: 5,
    },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date(2025, 10));
  };

  const renderCalendarDays = () => {
    const days = [];
    const prevMonthDays = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      0
    ).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="h-20 p-2 border border-border/50 bg-muted/30"
        >
          <span className="text-sm text-muted-foreground">
            {prevMonthDays - i}
          </span>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const event = calendarEvents.find((e) => e.date === day);
      days.push(
        <div
          key={`curr-${day}`}
          className="h-20 p-2 border border-border/50 bg-background hover:bg-accent/50 transition-colors relative"
        >
          <span className="text-sm font-medium text-foreground">{day}</span>
          {event && (
            <div
              className={`mt-1 text-xs text-white p-1 rounded ${event.color}`}
            >
              {event.title}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Units Earned Card */}
        <Card className="bg-[hsl(var(--cyan))] text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <User className="w-12 h-12 opacity-30" />
            </div>
            <h3 className="text-4xl font-bold mb-2">54</h3>
            <p className="text-white/90 mb-4">Units Earned</p>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white p-0 h-auto font-medium"
            >
              More info →
            </Button>
          </CardContent>
        </Card>

        {/* Study Load Card */}
        <Card className="bg-[hsl(var(--green))] text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <BookOpen className="w-12 h-12 opacity-30" />
            </div>
            <h3 className="text-4xl font-bold mb-2">100%</h3>
            <p className="text-white/90 mb-4">Study Load</p>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white p-0 h-auto font-medium"
            >
              More info →
            </Button>
          </CardContent>
        </Card>

        {/* GWA Card */}
        <Card className="bg-[hsl(var(--amber))] text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <TrendingUp className="w-12 h-12 opacity-30" />
            </div>
            <h3 className="text-4xl font-bold mb-2">0.85</h3>
            <p className="text-white/90 mb-4">General Weighted Average</p>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white p-0 h-auto font-medium"
            >
              More info →
            </Button>
          </CardContent>
        </Card>

        {/* Announcements Card */}
        <Card className="bg-[hsl(var(--red))] text-white border-none shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full -mr-16 -mt-16"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
              <Megaphone className="w-12 h-12 opacity-30" />
            </div>
            <h3 className="text-4xl font-bold mb-2">0</h3>
            <p className="text-white/90 mb-4">Announcements</p>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 hover:text-white p-0 h-auto font-medium"
            >
              More info →
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar of Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Calendar of Activities
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Events, deadlines and important dates
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-[hsl(var(--green))] rounded"></div>
                  <span>School Activities</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-[hsl(var(--red))] rounded"></div>
                  <span>Non-working Holidays</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-[hsl(var(--amber))] rounded"></div>
                  <span>Working/Non-working Holidays</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={previousMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" onClick={goToToday}>
                    today
                  </Button>
                </div>
                <h3 className="text-2xl font-semibold flex-1 text-center">
                  {monthName}
                </h3>
              </div>

              <div className="grid grid-cols-7 gap-0">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="h-12 flex items-center justify-center font-semibold text-primary border border-border/50 bg-muted/50"
                    >
                      {day}
                    </div>
                  )
                )}
                {renderCalendarDays()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border border-border/50 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div
                    className={`w-1 h-full rounded ${event.color} flex-shrink-0`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {event.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {event.date} — {event.endDate}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
