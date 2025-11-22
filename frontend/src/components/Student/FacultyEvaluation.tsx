import React from "react";
import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FacultyEvaluation: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Faculty Evaluation</h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <a href="#" className="text-primary hover:underline">
            Home
          </a>
          <span>/</span>
          <span>Faculty Evaluation</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Faculty Evaluation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                Faculty Evaluation Module
              </h3>
              <p className="text-muted-foreground">
                This feature is coming soon!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyEvaluation;
