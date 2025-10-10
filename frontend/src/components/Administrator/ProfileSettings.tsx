import React, { useState } from 'react';
import { User, Mail, Lock, Camera, Save, Edit3, Shield, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const ProfileSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'admin@egmail.com',
    phone: '09977502588',
    bio: 'System Administrator for TrackEd. Passionate about education technology and improving student outcomes.',
    location: 'Tagoloan, Philippines',
    department: '',
    joinDate: '2025-08-15',
    lastLogin: '2025-09-21 09:30 AM',
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
    sessionTimeout: '30',
    passwordChangeRequired: false,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSecurityChange = (key: string, value: any) => {
    setSecurity(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', profile);
    setIsEditing(false);
  };

  const handleSavePreferences = () => {
    console.log('Saving preferences:', preferences);
  };

  const handleSaveSecurity = () => {
    console.log('Saving security settings:', security);
  };

  const SettingRow = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3">
      <div className="space-y-0.5">
        <Label className="text-sm font-medium text-primary">{label}</Label>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="space-y-6">
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
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/placeholder-avatar.png" alt={`${profile.firstName} ${profile.lastName}`} />
                    <AvatarFallback className="text-lg">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
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
                    Member since {new Date(profile.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Profile Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => handleProfileChange('location', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => handleProfileChange('department', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileChange('bio', e.target.value)}
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

        <TabsContent value="preferences">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium text-primary">Notifications</h4>
                
                <SettingRow
                  label="Email Notifications"
                  description="Receive notifications via email"
                >
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Push Notifications"
                  description="Receive browser push notifications"
                >
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Weekly Reports"
                  description="Receive weekly summary reports"
                >
                  <Switch
                    checked={preferences.weeklyReports}
                    onCheckedChange={(checked) => handlePreferenceChange('weeklyReports', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Security Alerts"
                  description="Receive security-related notifications"
                >
                  <Switch
                    checked={preferences.securityAlerts}
                    onCheckedChange={(checked) => handlePreferenceChange('securityAlerts', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Maintenance Notifications"
                  description="Receive system maintenance updates"
                >
                  <Switch
                    checked={preferences.maintenanceNotifications}
                    onCheckedChange={(checked) => handlePreferenceChange('maintenanceNotifications', checked)}
                  />
                </SettingRow>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium text-primary">Display</h4>
                
                <SettingRow
                  label="Dark Mode"
                  description="Use dark theme"
                >
                  <Switch
                    checked={preferences.darkMode}
                    onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Compact View"
                  description="Use compact layout for data tables"
                >
                  <Switch
                    checked={preferences.compactView}
                    onCheckedChange={(checked) => handlePreferenceChange('compactView', checked)}
                  />
                </SettingRow>

                <SettingRow
                  label="Auto Save"
                  description="Automatically save changes"
                >
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => handlePreferenceChange('autoSave', checked)}
                  />
                </SettingRow>
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
                      onCheckedChange={(checked) => handleSecurityChange('twoFactorEnabled', checked)}
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
                    onCheckedChange={(checked) => handleSecurityChange('loginAlerts', checked)}
                  />
                </SettingRow>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="w-32"
                  />
                </div>

                <div className="space-y-4">
                  <Button variant="outline">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                  
                  <Button variant="outline">
                    Download Account Data
                  </Button>
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

        <TabsContent value="activity">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 border border-border/50 rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">Profile updated</p>
                    <p className="text-xs text-muted-foreground">Changed profile information</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border border-border/50 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">Successful login</p>
                    <p className="text-xs text-muted-foreground">Logged in from Chrome on Windows</p>
                    <p className="text-xs text-muted-foreground">Today at 9:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 border border-border/50 rounded-lg">
                  <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-primary">Password changed</p>
                    <p className="text-xs text-muted-foreground">Account password was updated</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 3:45 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;