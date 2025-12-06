import React, { useEffect, useState } from "react";
import {
  Settings,
  Save,
  Shield,
  Bell,
  Database,
  Mail,
  Lock,
  Globe,
  Palette,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/settings");
        const data = await res.json();
        setSettings(data);
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (loading) return <p>Loading settings...</p>;
  if (!settings) return <p>Failed to load settings.</p>;

  const handleSave = async (section: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      console.log("Saved:", data);
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings");
    }
  };

  const SettingRow = ({
    label,
    description,
    children,
  }: {
    label: string;
    description?: string;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium text-primary">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">System Settings</h1>
        </div>
        <Button className="hero-button">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) =>
                      handleSettingChange("siteName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) =>
                      handleSettingChange("adminEmail", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) =>
                    handleSettingChange("siteDescription", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) =>
                      handleSettingChange("timezone", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">
                        Eastern Time
                      </SelectItem>
                      <SelectItem value="America/Chicago">
                        Central Time
                      </SelectItem>
                      <SelectItem value="America/Denver">
                        Mountain Time
                      </SelectItem>
                      <SelectItem value="America/Los_Angeles">
                        Pacific Time
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={settings.dateFormat}
                    onValueChange={(value) =>
                      handleSettingChange("dateFormat", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave("general")}>
                  Save General Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) =>
                      handleSettingChange("sessionTimeout", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      handleSettingChange("maxLoginAttempts", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Min Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={settings.passwordMinLength}
                    onChange={(e) =>
                      handleSettingChange("passwordMinLength", e.target.value)
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <SettingRow
                  label="Require Two-Factor Authentication"
                  description="Enforce 2FA for all admin users"
                >
                  <Switch
                    checked={settings.requireTwoFactor}
                    onCheckedChange={(checked) =>
                      handleSettingChange("requireTwoFactor", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Auto Logout on Inactivity"
                  description="Automatically log out users after session timeout"
                >
                  <Switch
                    checked={settings.autoLogout}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoLogout", checked)
                    }
                  />
                </SettingRow>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave("security")}>
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <SettingRow
                  label="Email Notifications"
                  description="Send notifications via email"
                >
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailNotifications", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Push Notifications"
                  description="Send browser push notifications"
                >
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("pushNotifications", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Daily Reports"
                  description="Receive daily system reports"
                >
                  <Switch
                    checked={settings.dailyReports}
                    onCheckedChange={(checked) =>
                      handleSettingChange("dailyReports", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Weekly Digest"
                  description="Receive weekly summary emails"
                >
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      handleSettingChange("weeklyDigest", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="System Alerts"
                  description="Receive critical system alerts"
                >
                  <Switch
                    checked={settings.systemAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("systemAlerts", checked)
                    }
                  />
                </SettingRow>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave("notifications")}>
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <SettingRow
                  label="Maintenance Mode"
                  description="Enable maintenance mode to prevent user access"
                >
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("maintenanceMode", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Debug Mode"
                  description="Enable debug mode for development"
                >
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("debugMode", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Cache Enabled"
                  description="Enable system caching for better performance"
                >
                  <Switch
                    checked={settings.cacheEnabled}
                    onCheckedChange={(checked) =>
                      handleSettingChange("cacheEnabled", checked)
                    }
                  />
                </SettingRow>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupInterval">Backup Interval</Label>
                  <Select
                    value={settings.backupInterval}
                    onValueChange={(value) =>
                      handleSettingChange("backupInterval", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={settings.maxFileSize}
                    onChange={(e) =>
                      handleSettingChange("maxFileSize", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave("system")}>
                  Save System Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                User Management Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <SettingRow
                  label="Allow Self Registration"
                  description="Allow users to register new accounts"
                >
                  <Switch
                    checked={settings.allowSelfRegistration}
                    onCheckedChange={(checked) =>
                      handleSettingChange("allowSelfRegistration", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Require Email Verification"
                  description="Require email verification for new accounts"
                >
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      handleSettingChange("requireEmailVerification", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Auto-approve Students"
                  description="Automatically approve student registrations"
                >
                  <Switch
                    checked={settings.autoApproveStudents}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoApproveStudents", checked)
                    }
                  />
                </SettingRow>

                <SettingRow
                  label="Auto-approve Teachers"
                  description="Automatically approve teacher registrations"
                >
                  <Switch
                    checked={settings.autoApproveTeachers}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoApproveTeachers", checked)
                    }
                  />
                </SettingRow>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="defaultUserRole">Default User Role</Label>
                <Select
                  value={settings.defaultUserRole}
                  onValueChange={(value) =>
                    handleSettingChange("defaultUserRole", value)
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => handleSave("users")}>
                  Save User Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
