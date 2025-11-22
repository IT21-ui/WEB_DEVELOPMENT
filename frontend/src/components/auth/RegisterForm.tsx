import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Shield, GraduationCap, Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

interface Department {
  id: number;
  name: string;
}

interface YearLevel {
  id: number;
  name: string;
  department_id: number; // link to department
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [yearLevel, setYearLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [yearLevelsList, setYearLevelsList] = useState<YearLevel[]>([]);

  // Fetch departments for the course dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/departments"
        );
        setDepartmentsList(response.data);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // Fetch year levels
  useEffect(() => {
    const fetchYearLevels = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/year-levels"
        );
        setYearLevelsList(response.data);
      } catch (error) {
        console.error("Failed to fetch year levels:", error);
      }
    };
    fetchYearLevels();
  }, []);

  // Filter year levels based on selected department
  const filteredYearLevels = yearLevelsList.filter(
    (yr) => Number(yr.department_id) === Number(department)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();

    if (!trimmedName) return alert("Full name is required!");
    if (!trimmedEmail) return alert("Email is required!");
    if (!password) return alert("Password is required!");
    if (password !== confirmPassword) return alert("Passwords do not match!");
    if (!role) return alert("Please select a role.");
    if ((role === "teacher" || role === "student") && !trimmedMobile)
      return alert("Mobile number is required.");

    if (role === "student" && (!department || isNaN(Number(department))))
      return alert("Please select a course.");

    if (role === "student" && (!yearLevel || isNaN(Number(yearLevel))))
      return alert("Please select a year level.");

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/api/register", {
        name: trimmedName,
        email: trimmedEmail,
        password,
        password_confirmation: confirmPassword,
        role,
        mobile: trimmedMobile,

        // Include department_id for both students and teachers
        ...(role === "student" || role === "teacher"
          ? {
              department_id: Number(department),
            }
          : {}),

        // Only include these for students
        ...(role === "student" && {
          year_level_id: Number(yearLevel),
          section_id: null, // section is NULL until assigned later
        }),
      });

      alert("Registration successful! You can now log in.");
      onSwitchToLogin();
    } catch (error: any) {
      console.error("Registration error:", error);
      alert(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl dashboard-card mx-auto">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">
          Create an Account
        </CardTitle>
        <CardDescription>Sign up to start using TrackEd</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-9"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Register as</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrator">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Admin
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" /> Teacher
                    </div>
                  </SelectItem>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Student
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile */}
            {(role === "teacher" || role === "student") && (
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="text"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            )}

            {/* Course / Department */}
            {(role === "teacher" || role === "student") && (
              <div className="space-y-2">
                <Label htmlFor="department">
                  {role === "student" ? "Course" : "Department"}
                </Label>

                <Select
                  value={department}
                  onValueChange={(val) => setDepartment(val)} // val is string
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        role === "student"
                          ? "Select your course"
                          : "Select your department"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {departmentsList.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id.toString()}>
                        {dept.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Year Level */}
            {role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="yearLevel">Year Level</Label>
                <Select
                  value={yearLevel}
                  onValueChange={setYearLevel}
                  disabled={!department}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select year level" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearLevelsList
                      .filter(
                        (yr) => Number(yr.department_id) === Number(department)
                      )
                      .map((yr) => (
                        <SelectItem key={yr.id} value={yr.id.toString()}>
                          {yr.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full hero-button"
            disabled={loading}
          >
            {loading ? "Registering..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={onSwitchToLogin}
            >
              Log in
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
