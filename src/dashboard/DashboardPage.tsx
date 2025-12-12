import {
  ArrowUpRight,
  Leaf,
  AlertTriangle,
  Microscope,
  Wind,
  Sun,
  CloudRain,
  MoreHorizontal,
  ArrowRight,
  Droplets,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UploadWizard from "./UploadWizard";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  // --- Mock Data (Updated for Leaf Samples) ---
  const recentAnalyses = [
    {
      id: "L-1005",
      field: "North Sector A",
      crop: "Maize",
      date: "Today, 10:23 AM",
      diagnosis: "Nitrogen Deficiency",
      severity: "Critical",
      status: "Analyzed",
    },
    {
      id: "L-1004",
      field: "East River Plot",
      crop: "Soybean",
      date: "Today, 9:15 AM",
      diagnosis: "Healthy",
      severity: "None",
      status: "Analyzed",
    },
    {
      id: "L-1003",
      field: "South Hills Farm",
      crop: "Wheat",
      date: "Yesterday, 4:15 PM",
      diagnosis: "Water Stress",
      severity: "Medium",
      status: "Processing",
    },
    {
      id: "L-1002",
      field: "West Valley",
      crop: "Potato",
      date: "Oct 24, 2023",
      diagnosis: "Pest Damage",
      severity: "Low",
      status: "Analyzed",
    },
  ];

  // Utility to get the correct badge style (reused from History)
  const getBadgeStyle = (severity: string, diagnosis: string) => {
    if (diagnosis === "Processing")
      return { variant: "secondary", color: "bg-slate-100 text-slate-700" };
    switch (severity) {
      case "Critical":
        return {
          variant: "destructive",
          color: "bg-rose-100 text-rose-700 border-rose-200",
        };
      case "Medium":
        return {
          variant: "outline",
          color: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "Low":
        return {
          variant: "outline",
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
      case "None":
        return {
          variant: "outline",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return { variant: "secondary", color: "bg-slate-100 text-slate-700" };
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Diagnosis Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of your leaf sample analyses and critical diagnoses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">
            Download Report
          </Button>
          <UploadWizard />
        </div>
      </div>

      {/* --- KPI Cards (Updated) --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Samples Analyzed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Samples Analyzed
            </CardTitle>
            <Microscope className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145 Samples</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-medium flex items-center inline-block">
                +25 <ArrowUpRight className="h-3 w-3 inline ml-0.5" />
              </span>{" "}
              in the last 7 days
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Critical Diagnoses */}
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Critical Diagnoses
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">3 Samples</div>
            <p className="text-xs text-slate-500 mt-1">
              Requires immediate treatment
            </p>
          </CardContent>
        </Card>

        {/* Card 3: N Deficiency Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              N Deficiency Rate
            </CardTitle>
            <Leaf className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18%</div>
            <Progress
              value={18}
              className="h-2 mt-2 bg-slate-100"
              // indicatorClassName="bg-yellow-500"
            />
            <p className="text-xs text-slate-500 mt-1">
              Percentage of total samples
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Most Affected Crop */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Most Affected Crop
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Leaf className="h-3 w-3 text-slate-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Maize (Corn)</div>
            <p className="text-xs text-slate-500 mt-1">
              45% of critical samples
            </p>
          </CardContent>
        </Card>
      </div>

      {/* --- Main Content Split --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Column: Recent Activity Table (Span 4) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Diagnoses</CardTitle>
            <CardDescription>
              Latest leaf samples processed and classified by the AI.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] pl-6">Sample ID</TableHead>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Crop</TableHead>
                  <TableHead>AI Diagnosis</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAnalyses.map((item) => {
                  const badge = getBadgeStyle(item.severity, item.diagnosis);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium pl-6">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.field}</TableCell>
                      <TableCell className="text-slate-600">
                        {item.crop}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            badge.color
                          } hover:${badge.color.replace("bg-", "bg-")}`}
                        >
                          {item.diagnosis}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              View Full Diagnosis
                            </DropdownMenuItem>
                            <DropdownMenuItem>Log Treatment</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Link to="/dashboard/history">
              <Button
                variant="ghost"
                className="w-full text-slate-500 hover:text-emerald-700"
              >
                View All History <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Right Column: Widgets (Span 3) - Keeping Weather as it's universally relevant */}
        <div className="col-span-3 space-y-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium opacity-90">
                Local Weather
              </CardTitle>
              <CardDescription className="text-blue-100">
                Field Station A (Lagos)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4">
                  <Sun className="h-12 w-12 text-yellow-300" />
                  <div>
                    <div className="text-4xl font-bold">28°C</div>
                    <div className="text-sm opacity-90">Sunny</div>
                  </div>
                </div>
                <div className="space-y-1 text-right text-sm opacity-90">
                  <div className="flex items-center justify-end gap-2">
                    <Wind className="h-4 w-4" /> 12 km/h
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Droplets className="h-4 w-4" /> 45% Hum
                  </div>
                </div>
              </div>
            </CardContent>
            {/* Forecast Mini-row */}
            <div className="bg-blue-700/30 p-4 grid grid-cols-3 gap-2 text-center text-sm rounded-b-xl">
              <div>
                <div className="opacity-70 text-xs">Mon</div>
                <CloudRain className="h-4 w-4 mx-auto my-1 opacity-90" />
                <div>24°</div>
              </div>
              <div>
                <div className="opacity-70 text-xs">Tue</div>
                <Sun className="h-4 w-4 mx-auto my-1 opacity-90" />
                <div>29°</div>
              </div>
              <div>
                <div className="opacity-70 text-xs">Wed</div>
                <Sun className="h-4 w-4 mx-auto my-1 opacity-90" />
                <div>30°</div>
              </div>
            </div>
          </Card>

          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-base">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Leaf className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Drop new leaf photos here</p>
                <p className="text-xs text-slate-500">Supports .jpg, .png</p>
              </div>

              {/* === START INTEGRATION 2: Widget Button === */}
              <UploadWizard />
              {/* We can use the wizard here, but it will render its own button.
               If you want the specific styling, you'd wrap the <Button> tag inside <DialogTrigger> 
               within the UploadWizard component. For simplicity, we reuse the component. */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
