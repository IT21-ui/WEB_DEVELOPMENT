import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Account Profile</h1>
        <div className="text-sm text-muted-foreground">
          <a href="#" className="text-[hsl(var(--cyan))] hover:underline">
            Home
          </a>
          <span className="mx-2">/</span>
          <span>Profile</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Profile Picture */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-48 h-48 border-4 border-border rounded-full flex items-center justify-center bg-background">
                <User className="w-32 h-32 text-muted-foreground" />
              </div>
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input defaultValue="Padilla" className="mt-1" />
              </div>
              <div>
                <Label>
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input defaultValue="Joniel" className="mt-1" />
              </div>
              <div>
                <Label>Middle Name</Label>
                <Input defaultValue="Emst" className="mt-1" />
              </div>
            </div>

            {/* Name Extension & Birthday */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>Name Ext. (Jr, I,II,III)</Label>
                <Input placeholder="Jr, Sr, I, II, III" className="mt-1" />
              </div>
              <div>
                <Label>
                  Birthday (mm/dd/yyyy) <span className="text-red-500">*</span>
                </Label>
                <Input type="date" defaultValue="1995-02-21" className="mt-1" />
              </div>
              <div>
                <Label>Blood Type</Label>
                <Input defaultValue="2019017" className="mt-1" />
              </div>
            </div>

            {/* Sex, Civil Status, Account ID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>
                  Sex <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="male">
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
                    <SelectItem value="divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Account ID No.</Label>
                <Input defaultValue="2019017" className="mt-1" disabled />
              </div>
            </div>
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  Municipal/City Address <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="cagayan-de-oro">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cagayan-de-oro">
                      CAGAYAN DE ORO CITY (Capital)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>
                  Barangay Address <span className="text-red-500">*</span>
                </Label>
                <Select defaultValue="igpit">
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="igpit">Igpit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>House/Bldg No. | Street | Zone</Label>
                <Input
                  defaultValue="Block 21 Lot 9 Kasanta Subdivision"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label>
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  defaultValue="nielzkie1995@gmail.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>
                  Mobile Number (09 xxx xxxx xx){" "}
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  defaultValue="09 161 613 78 39"
                  className="mt-1"
                />
              </div>
            </div>

            {/* Email Validation Alert */}
            <Alert className="bg-red-500 text-white border-red-600 mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span className="font-semibold">
                  ⚠ Email Account is not yet Validated
                </span>
                <Button
                  variant="secondary"
                  className="bg-green-500 hover:bg-green-600 text-white ml-4"
                  size="sm"
                >
                  Validate Now
                </Button>
              </AlertDescription>
            </Alert>

            {/* Update Button */}
            <div className="flex justify-start">
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                💾 Update Information
              </Button>
            </div>
          </Card>

          {/* Update Account Password */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Update Account Password
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label>
                  Old Password <span className="text-red-500">*</span>
                </Label>
                <Input type="password" className="mt-1" />
              </div>
              <div>
                <Label>
                  New Password <span className="text-red-500">*</span>
                </Label>
                <Input type="password" className="mt-1" />
              </div>
              <div>
                <Label>
                  Retype Password <span className="text-red-500">*</span>
                </Label>
                <Input type="password" className="mt-1" />
              </div>
            </div>

            {/* Update Password Button */}
            <div className="flex justify-start mb-4">
              <Button className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90">
                💾 Update Password
              </Button>
            </div>

            {/* Password Requirements Note */}
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-2">
                Note: Password should contain(s) the following:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>At least 8 characters in length.</li>
                <li>
                  Contain both upper and lowercase alphabetic characters (e.g.
                  A-Z, a-z).
                </li>
                <li>Have at least one numerical character (e.g. 0-9).</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
