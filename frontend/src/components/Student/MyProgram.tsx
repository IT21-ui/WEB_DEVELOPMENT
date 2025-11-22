import React from "react";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  Hash,
  Settings,
} from "lucide-react";
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

const MyProgram: React.FC = () => {
  const programHistory = [
    {
      level: "2nd",
      term: "2025-2026 1st",
      program: "BSIT",
      totalUnits: 20,
      termGWA: "0.00",
    },
    {
      level: "1st",
      term: "2024-2025 2nd",
      program: "BSIT",
      totalUnits: 17,
      termGWA: "1.30",
    },
    {
      level: "1st",
      term: "2024-2025 1st",
      program: "BSIT",
      totalUnits: 17,
      termGWA: "1.39",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">My Program</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <a href="#" className="text-primary hover:underline">
              Home
            </a>
            <span>/</span>
            <span>My Program</span>
          </div>
        </div>
        <Button className="bg-[hsl(var(--red))] hover:bg-[hsl(var(--red))]/90 text-white">
          <BookOpen className="w-4 h-4 mr-2" />
          Course History
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Program Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Level
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Term
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Program
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Total Units
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Term GWA
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Tools
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {programHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.level}</TableCell>
                    <TableCell>{item.term}</TableCell>
                    <TableCell>{item.program}</TableCell>
                    <TableCell>{item.totalUnits}</TableCell>
                    <TableCell>{item.termGWA}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        className="bg-[hsl(var(--cyan))] hover:bg-[hsl(var(--cyan))]/90 text-white"
                      >
                        <BookOpen className="w-4 h-4 mr-1" />
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">GWA: 0.85</span>
        </p>
      </div>
    </div>
  );
};

export default MyProgram;
