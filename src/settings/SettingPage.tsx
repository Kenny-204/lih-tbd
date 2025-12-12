import { useState } from "react";
import {
  Settings,
  User,
  Map,
  CreditCard,
  Bell,
  ExternalLink,
  Plus,
} from "lucide-react";

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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

// --- Configuration ---
const SETTINGS_TABS = [
  { id: "profile", icon: User, label: "Profile & Account" },
  { id: "farm", icon: Map, label: "Farm Settings & Integrations" },
  { id: "billing", icon: CreditCard, label: "Billing & Subscription" },
  { id: "notifications", icon: Bell, label: "Notifications" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  // --- Tab Content Components ---

  const ProfileSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Profile & Account</h2>
      <p className="text-slate-500">Manage your name, email, and password.</p>

      <Separator />

      <div className="grid gap-4 py-4 max-w-lg">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" defaultValue="agronomist@farm.co" disabled />
        </div>
      </div>

      <Button className="bg-emerald-600 hover:bg-emerald-700">
        Update Profile
      </Button>

      <Separator />

      <Card className="border-rose-200 bg-rose-50">
        <CardHeader>
          <CardTitle className="text-lg text-rose-700">
            Change Password
          </CardTitle>
          <CardDescription className="text-rose-500">
            Ensure your account is using a long, random password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm New Password" />
          <Button variant="destructive">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );

  const FarmIntegrationsSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Farm Settings & Integrations
      </h2>
      <p className="text-slate-500">
        Configure default units, primary farm location, and connect VRA systems.
      </p>

      <Separator />

      <div className="grid gap-4 py-4 max-w-lg">
        {/* Unit Settings */}
        <div className="space-y-2">
          <Label>Default Area Unit</Label>
          <Select defaultValue="ha">
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ha">Hectares (Ha)</SelectItem>
              <SelectItem value="ac">Acres (Ac)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Default Fertilizer Unit</Label>
          <Select defaultValue="kg_ha">
            <SelectTrigger>
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="kg_ha">
                Kilograms per Hectare (kg/Ha)
              </SelectItem>
              <SelectItem value="lb_ac">Pounds per Acre (lb/Ac)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Integration Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            VRA System Integration{" "}
            <ExternalLink className="h-4 w-4 text-slate-400" />
          </CardTitle>
          <CardDescription>
            Connect your tractor's Variable Rate Application system to push
            prescription maps directly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="text-sm bg-green-50 text-green-700 border-green-200"
            >
              Connected
            </Badge>
            <p className="text-sm text-slate-500">
              John Deere Operations Center
            </p>
          </div>
          <Button variant="outline" className="text-rose-600">
            Disconnect
          </Button>
        </CardContent>
        <CardContent className="pt-0">
          <Button variant="outline" className="w-full mt-2 gap-2">
            <Plus className="h-4 w-4" /> Add New Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const BillingSubscriptionSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Billing & Subscription
      </h2>
      <p className="text-slate-500">
        View your plan details, payment methods, and invoices.
      </p>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Current Plan: Professional Tier
          </CardTitle>
          <CardDescription>
            Unlimited Scans, Multi-spectral Index Support, 5 Team Users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold text-slate-900">
            $199.00 / month
          </div>
          <p className="text-sm text-slate-600">
            Next renewal: December 15, 2025
          </p>
          <Button
            variant="outline"
            className="text-emerald-600 border-emerald-300"
          >
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        <p className="text-sm text-slate-500">Visa ending in 4242</p>
        <Button variant="outline">Update Payment Info</Button>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="text-xl font-semibold">Invoice History</h3>
        <Button variant="ghost" className="p-0 text-emerald-600">
          Download Latest Invoice (PDF)
        </Button>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">
        Notification Preferences
      </h2>
      <p className="text-slate-500">
        Control how and when you receive alerts about your farm.
      </p>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="email-alerts" className="flex flex-col space-y-1">
            <span className="font-medium">Critical Deficiency Alerts</span>
            <span className="text-xs text-slate-500">
              Email notification when severity is "High".
            </span>
          </Label>
          <Switch id="email-alerts" defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Label htmlFor="scan-complete" className="flex flex-col space-y-1">
            <span className="font-medium">Scan Completion Status</span>
            <span className="text-xs text-slate-500">
              In-app alert when a drone/satellite scan finishes processing.
            </span>
          </Label>
          <Switch id="scan-complete" defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Label htmlFor="marketing" className="flex flex-col space-y-1">
            <span className="font-medium">Product Updates & News</span>
            <span className="text-xs text-slate-500">
              Occasional emails about new features.
            </span>
          </Label>
          <Switch id="marketing" />
        </div>
      </div>
    </div>
  );

  // --- Main Render ---
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "farm":
        return <FarmIntegrationsSettings />;
      case "billing":
        return <BillingSubscriptionSettings />;
      case "notifications":
        return <NotificationSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Top Header --- */}
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Application Settings
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row lg:space-x-10">
        {/* --- Left Navigation --- */}
        <aside className="lg:w-60 shrink-0 mb-6 lg:mb-0">
          <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 overflow-x-auto pb-2 lg:pb-0">
            {SETTINGS_TABS.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "secondary" : "ghost"}
                className={`justify-start gap-3 w-full text-left h-10 ${
                  activeTab === tab.id
                    ? "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 font-semibold"
                    : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon
                  className={`h-4 w-4 ${
                    activeTab === tab.id ? "text-emerald-600" : "text-slate-400"
                  }`}
                />
                {tab.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* --- Right Content Pane --- */}
        <div className="flex-1 min-w-0">
          <Card className="p-6 lg:p-10">{renderContent()}</Card>
        </div>
      </div>
    </div>
  );
}
