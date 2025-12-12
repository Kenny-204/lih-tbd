import {
  ArrowUpRight,
  Droplets,
  AlertTriangle,
  Sprout,
  Wind,
  Sun,
  CloudRain,
  MoreHorizontal,
  Plus,
  ArrowRight,
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

export default function DashboardPage() {
  // --- Mock Data ---
  const recentAnalyses = [
    {
      id: "FLD-001",
      field: "North Sector A",
      date: "Today, 10:23 AM",
      issue: "Nitrogen Deficiency",
      severity: "High",
      status: "Completed",
    },
    {
      id: "FLD-002",
      field: "East River Plot",
      date: "Yesterday, 4:15 PM",
      issue: "Healthy",
      severity: "None",
      status: "Completed",
    },
    {
      id: "FLD-003",
      field: "Green Valley",
      date: "Oct 24, 2023",
      issue: "Water Stress",
      severity: "Medium",
      status: "Processing",
    },
    {
      id: "FLD-004",
      field: "Sector 7G",
      date: "Oct 23, 2023",
      issue: "Pest Damage",
      severity: "Low",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* --- Page Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Overview of your crop health and recent AI insights.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden sm:flex">
            Download Report
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Plus className="h-4 w-4" /> New Scan
          </Button>
        </div>
      </div>

      {/* --- KPI Cards --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Acreage */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total Acreage Monitored
            </CardTitle>
            <Sprout className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,450 ac</div>
            <p className="text-xs text-slate-500 mt-1">
              <span className="text-emerald-600 font-medium flex items-center inline-block">
                +12% <ArrowUpRight className="h-3 w-3 inline ml-0.5" />
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Critical Alerts */}
        <Card className="border-l-4 border-l-rose-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Critical Alerts
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">3 Fields</div>
            <p className="text-xs text-slate-500 mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Avg Health Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avg. Health Index
            </CardTitle>
            <div className="h-4 w-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-emerald-600"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84/100</div>
            <Progress
              value={84}
              className="h-2 mt-2 bg-slate-100"
              //   ="bg-emerald-500"
            />
          </CardContent>
        </Card>

        {/* Card 4: Water/Resource */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Soil Moisture Avg
            </CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28%</div>
            <p className="text-xs text-slate-500 mt-1">Optimal range: 25-35%</p>
          </CardContent>
        </Card>
      </div>

      {/* --- Main Content Split --- */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Column: Recent Activity Table (Span 4) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Analysis</CardTitle>
            <CardDescription>
              Latest AI scans processed from drone and satellite imagery.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] pl-6">ID</TableHead>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Detected Issue</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right pr-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAnalyses.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium pl-6">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.field}</TableCell>
                    <TableCell>
                      {item.severity === "High" ? (
                        <Badge
                          variant="destructive"
                          className="bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200"
                        >
                          {item.issue}
                        </Badge>
                      ) : item.severity === "Medium" ? (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200"
                        >
                          {item.issue}
                        </Badge>
                      ) : item.issue === "Healthy" ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 border-emerald-200"
                        >
                          {item.issue}
                        </Badge>
                      ) : (
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-700"
                        >
                          {item.issue}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-slate-500 text-sm">
                      {item.date}
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
                          <DropdownMenuItem>View Report</DropdownMenuItem>
                          <DropdownMenuItem>Download Map</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button
              variant="ghost"
              className="w-full text-slate-500 hover:text-emerald-700"
            >
              View All History <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Right Column: Widgets (Span 3) */}
        <div className="col-span-3 space-y-4">
          {/* Weather Widget */}
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

          {/* Quick Upload Widget (Mini-CTA) */}
          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-base">Quick Upload</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6 text-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <Plus className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Drop field images here</p>
                <p className="text-xs text-slate-500">
                  Supports .jpg, .png, .tiff
                </p>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                Select Files
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
