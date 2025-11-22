import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Upload } from "lucide-react";

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <div className="text-sm text-muted-foreground">
          <a href="#" className="text-[hsl(var(--cyan))] hover:underline">
            Home
          </a>
          <span className="mx-2">/</span>
          <span>User Profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Photo Card */}
          <Card className="p-6">
            <div className="bg-[hsl(var(--primary))] text-white p-3 -m-6 mb-4 rounded-t-lg">
              <h3 className="font-semibold">Photo</h3>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-32 h-32 border-2 border-border rounded-lg flex items-center justify-center bg-background">
                <User className="w-20 h-20 text-muted-foreground" />
              </div>
              <Button className="bg-[hsl(var(--cyan))] hover:bg-[hsl(var(--cyan))]/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </Card>

          {/* LINK Information Card */}
          <Card className="p-6">
            <div className="bg-[hsl(var(--primary))] text-white p-3 -m-6 mb-4 rounded-t-lg">
              <h3 className="font-semibold">LINK Information</h3>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-foreground">📧</span> LINK ID
                </Label>
                <p className="text-sm mt-1">20241169</p>
              </div>
              <div>
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-foreground">📧</span> TCC GMail
                </Label>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-[hsl(var(--primary))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10"
                >
                  <span className="text-[hsl(var(--primary))] mr-2">G</span>
                  Request GMail
                </Button>
              </div>
              <div>
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <span className="text-foreground">🔑</span> Link Access
                </Label>
                <ul className="list-disc list-inside text-sm mt-1 text-muted-foreground">
                  <li>student</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger
                  value="basic"
                  className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white"
                >
                  Contact Information
                </TabsTrigger>
                <TabsTrigger
                  value="account"
                  className="data-[state=active]:bg-[hsl(var(--primary))] data-[state=active]:text-white"
                >
                  Account Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>
                      Last Name <span className="text-red-500">*</span>
                    </Label>
                    <Input defaultValue="Tagolimot" className="mt-1" />
                  </div>
                  <div>
                    <Label>
                      First Name <span className="text-red-500">*</span>
                    </Label>
                    <Input defaultValue="Mia" className="mt-1" />
                  </div>
                  <div>
                    <Label>Middle Name</Label>
                    <Input defaultValue="Pasoc" className="mt-1" />
                  </div>
                  <div>
                    <Label>Name Extension</Label>
                    <Input placeholder="Eg Jr, Sr, II, III" className="mt-1" />
                  </div>
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>
                      Sex <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="female">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Civil Status <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="single">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Birthdate <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="date"
                      defaultValue="2005-09-21"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>
                      Religion <span className="text-red-500">*</span>
                    </Label>
                    <Input defaultValue="Roman Catholic" className="mt-1" />
                  </div>
                </div>

                {/* Place of Birth */}
                <div>
                  <Label>
                    Place of Birth <span className="text-red-500">*</span>
                  </Label>
                  <Input defaultValue="Gingoog City" className="mt-1" />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>
                      Provincial Address <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="misamis-oriental">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="misamis-oriental">
                          MISAMIS ORIENTAL
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Municipal/City Address{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="tagoloan">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tagoloan">TAGOLOAN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>
                      Barangay Address <span className="text-red-500">*</span>
                    </Label>
                    <Select defaultValue="santa-ana">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="santa-ana">Santa Ana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <Label>Street Address</Label>
                  <Input placeholder="Street Address" className="mt-1" />
                </div>

                {/* Save Button */}
                <div className="flex justify-start">
                  <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                    💾 Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="Email" className="mt-1" />
                  </div>
                  <div>
                    <Label>Mobile Number</Label>
                    <Input
                      type="tel"
                      placeholder="Mobile Number"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Home Phone</Label>
                    <Input
                      type="tel"
                      placeholder="Home Phone"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Emergency Contact</Label>
                    <Input
                      type="tel"
                      placeholder="Emergency Contact"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                    💾 Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="account" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="New Password"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                    💾 Save Changes
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
