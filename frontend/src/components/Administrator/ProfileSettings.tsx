import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Camera,
  Save,
  Edit3,
  Shield,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "admin@egmail.com",
    phone: "09977502588",
    bio: "System Administrator for TrackEd. Passionate about education technology and improving student outcomes.",
    location: "Tagoloan, Philippines",
    department: "",
    joinDate: "2025-08-15",
    lastLogin: "2025-09-21 09:30 AM",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
    securityAlerts: true,
    maintenanceNotifications: true,
    darkMode: false,
    compactView: false,
    autoSave: true,
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
    passwordChangeRequired: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  // Change password modal state
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Handlers
  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: any) => {
    setSecurity((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile);
    setIsEditing(false);
  };

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences);
  };

  const handleSaveSecurity = () => {
    console.log("Saving security settings:", security);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert("Please fill in all password fields.");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match.");
      return;
    }

    console.log("Password updated:", passwords);
    alert("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
    setIsChangePasswordOpen(false);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Profile Settings</h1>
        </div>
        <Badge variant="outline" className="px-4 py-2">
          <Shield className="w-4 h-4 mr-2" />
          Administrator
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* ---------------- PROFILE TAB ---------------- */}
        <TabsContent value="profile">
          <Card className="dashboard-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile Information
                </CardTitle>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src="/placeholder-avatar.png"
                      alt={`${profile.firstName} ${profile.lastName}`}
                    />
                    <AvatarFallback className="text-lg">
                      {profile.firstName.charAt(0)}
                      {profile.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold text-primary">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-muted-foreground">{profile.department}</p>
                  <p className="text-sm text-muted-foreground">
                    Member since{" "}
                    {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email Address"],
                  ["phone", "Phone Number"],
                  ["location", "Location"],
                  ["department", "Department"],
                ].map(([id, label]) => (
                  <div key={id} className="space-y-2">
                    <Label htmlFor={id}>{label}</Label>
                    <Input
                      id={id}
                      type={id === "email" ? "email" : "text"}
                      value={(profile as any)[id]}
                      onChange={(e) => handleProfileChange(id, e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange("bio", e.target.value)}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="hero-button">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- PREFERENCES TAB ---------------- */}
        <TabsContent value="preferences">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notifications */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Notifications</h4>
                {[
                  [
                    "emailNotifications",
                    "Email Notifications",
                    "Receive notifications via email",
                  ],
                  [
                    "pushNotifications",
                    "Push Notifications",
                    "Receive browser push notifications",
                  ],
                  [
                    "weeklyReports",
                    "Weekly Reports",
                    "Receive weekly summary reports",
                  ],
                  [
                    "securityAlerts",
                    "Security Alerts",
                    "Receive security-related notifications",
                  ],
                  [
                    "maintenanceNotifications",
                    "Maintenance Notifications",
                    "Receive system maintenance updates",
                  ],
                ].map(([key, label, desc]) => (
                  <SettingRow key={key} label={label} description={desc}>
                    <Switch
                      checked={(preferences as any)[key]}
                      onCheckedChange={(checked) =>
                        handlePreferenceChange(key, checked)
                      }
                    />
                  </SettingRow>
                ))}
              </div>

              <Separator />

              {/* Display */}
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Display</h4>
                {[
                  ["darkMode", "Dark Mode", "Use dark theme"],
                  [
                    "compactView",
                    "Compact View",
                    "Use compact layout for data tables",
                  ],
                  ["autoSave", "Auto Save", "Automatically save changes"],
                ].map(([key, label, desc]) => (
                  <SettingRow key={key} label={label} description={desc}>
                    <Switch
                      checked={(preferences as any)[key]}
                      onCheckedChange={(checked) =>
                        handlePreferenceChange(key, checked)
                      }
                    />
                  </SettingRow>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSavePreferences} className="hero-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- SECURITY TAB ---------------- */}
        <TabsContent value="security">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <SettingRow
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                >
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={security.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        handleSecurityChange("twoFactorEnabled", checked)
                      }
                    />
                    {security.twoFactorEnabled && (
                      <Badge variant="secondary">Enabled</Badge>
                    )}
                  </div>
                </SettingRow>

                <SettingRow
                  label="Login Alerts"
                  description="Get notified when someone logs into your account"
                >
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) =>
                      handleSecurityChange("loginAlerts", checked)
                    }
                  />
                </SettingRow>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">
                    Session Timeout (minutes)
                  </Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) =>
                      handleSecurityChange("sessionTimeout", e.target.value)
                    }
                    className="w-32"
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsChangePasswordOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Change Password
                  </Button>

                  <Button variant="outline">Download Account Data</Button>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveSecurity} className="hero-button">
                  <Save className="w-4 h-4 mr-2" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ---------------- ACTIVITY TAB ---------------- */}
        <TabsContent value="activity">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    color: "bg-primary",
                    title: "Profile updated",
                    desc: "Changed profile information",
                    time: "2 hours ago",
                  },
                  {
                    color: "bg-success",
                    title: "Successful login",
                    desc: "Logged in from Chrome on Windows",
                    time: "Today at 9:30 AM",
                  },
                  {
                    color: "bg-warning",
                    title: "Password changed",
                    desc: "Account password was updated",
                    time: "Yesterday at 3:45 PM",
                  },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 border border-border/50 rounded-lg"
                  >
                    <div className={`w-2 h-2 ${a.color} rounded-full mt-2`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-primary">
                        {a.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ---------------- CHANGE PASSWORD MODAL ---------------- */}
      <Dialog
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      >
        <DialogContent className="sm:max-w-md backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-primary">Change Password</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {["current", "new", "confirm"].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field === "current"
                    ? "Current Password"
                    : field === "new"
                    ? "New Password"
                    : "Confirm Password"}
                </Label>
                <Input
                  id={field}
                  type="password"
                  placeholder={
                    field === "confirm"
                      ? "Re-enter new password"
                      : `Enter ${field} password`
                  }
                  value={(passwords as any)[field]}
                  onChange={(e) =>
                    setPasswords((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsChangePasswordOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="hero-button">
              <Save className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileSettings;
