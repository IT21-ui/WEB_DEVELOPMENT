import React, { useState } from "react";
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
interface LoginFormProps {
  onLogin: (role: string, name: string) => void;
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fallback for testing UI (when backend is down)
  const [fallbackRole, setFallbackRole] = useState("administrator");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const data = res.data;
      localStorage.setItem("token", data.access_token);
      onLogin(data.user.role, data.user.email);

      alert("Login successful!");
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.response?.data?.message) {
        alert(`${error.response.data.message}`);
      } else {
        alert("Login failed. Please check your email or password.");
      }

      // Optional fallback for UI testing (when backend is off)
      if (!error.response) {
        console.warn("Backend not reachable — using fake login.");
        localStorage.setItem("token", "FAKE_TOKEN");
        onLogin(fallbackRole, email || `${fallbackRole}@example.com`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md dashboard-card">
      <CardHeader className="text-center space-y-1">
        <img
          src="/LOGO.png"
          alt="Logo"
          className="mx-auto w-40 h-40 object-contain"
        />
        <CardTitle className="text-2xl font-bold text-primary">Login</CardTitle>
        <CardDescription>Access your TrackEd dashboard</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full hero-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-primary"
              onClick={onSwitchToRegister}
            >
              Sign Up
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
