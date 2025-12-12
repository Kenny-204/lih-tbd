import { useState } from "react";
import {
  Search,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  Leaf,
  Microscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// --- Mock Data: UPDATED for Leaf Analysis ---
const HISTORY_RECORDS = [
  {
    id: "L-1005",
    date: "2025-10-30",
    field: "North Sector A",
    crop: "Maize",
    diagnosis: "Nitrogen Deficiency",
    severity: "Critical",
    status: "Analyzed",
  },
  {
    id: "L-1004",
    date: "2025-10-25",
    field: "East River Plot",
    crop: "Soybean",
    diagnosis: "Water Stress",
    severity: "Medium",
    status: "Analyzed",
  },
  {
    id: "L-1003",
    date: "2025-10-20",
    field: "South Hills Farm",
    crop: "Wheat",
    diagnosis: "Healthy",
    severity: "None",
    status: "Analyzed",
  },
  {
    id: "L-1002",
    date: "2025-10-15",
    field: "West Valley",
    crop: "Potato",
    diagnosis: "Potassium Deficiency",
    severity: "Low",
    status: "AnalyAnalyzedzed",
  },
  {
    id: "L-1001",
    date: "2025-10-10",
    field: "North Sector A",
    crop: "Maize",
    diagnosis: "Processing",
    severity: "None",
    status: "Processing",
  },
];

export default function HistoryPage() {
  const [data, setData] = useState(HISTORY_RECORDS);
  const [filters, setFilters] = useState({
    search: "",
    severity: "all",
    crop: "all",
  });

  console.log(setData);
  // Utility to get the correct badge style
  interface BadgeStyle {
    variant: string;
    color: string;
  }

  type Severity = "Critical" | "Medium" | "Low" | "None" | string;

  const getBadgeStyle = (severity: Severity, diagnosis: string): BadgeStyle => {
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

  // Filter function
  const applyFilters = (record: {
    field: string;
    diagnosis: string;
    id: string;
    severity: string;
    crop: string;
  }) => {
    const searchTerm = filters.search.toLowerCase();

    // Search Filter
    if (
      searchTerm &&
      !(
        record.field.toLowerCase().includes(searchTerm) ||
        record.diagnosis.toLowerCase().includes(searchTerm) ||
        record.id.toLowerCase().includes(searchTerm)
      )
    ) {
      return false;
    }

    // Severity Filter
    if (filters.severity !== "all" && record.severity !== filters.severity) {
      return false;
    }

    // Crop Filter
    if (filters.crop !== "all" && record.crop !== filters.crop) {
      return false;
    }

    return true;
  };

  const filteredData = data.filter(applyFilters);

  return (
    <div className="space-y-6">
      {/* --- Page Header --- */}
      <div className="flex items-center gap-3">
        <Microscope className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Leaf Sample History
        </h1>
      </div>
      <p className="text-slate-500">
        Review all close-up leaf diagnoses and recommended treatments.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID, Field, or Diagnosis..."
            className="pl-10 w-full"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search}
          />
        </div>

        {/* Date Picker (Placeholder) */}
        <Button
          variant="outline"
          className="w-full sm:w-auto gap-2 text-slate-600"
        >
          <Calendar className="h-4 w-4" />
          Filter by Date
        </Button>

        {/* Severity Filter */}
        <Select
          onValueChange={(value) => setFilters({ ...filters, severity: value })}
          defaultValue={filters.severity}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <Filter className="h-4 w-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Critical">Critical</SelectItem>
            <SelectItem value="Medium">Warning</SelectItem>
            <SelectItem value="Low">Minor</SelectItem>
            <SelectItem value="None">Healthy</SelectItem>
          </SelectContent>
        </Select>

        {/* Crop Filter (New Focus) */}
        <Select
          onValueChange={(value) => setFilters({ ...filters, crop: value })}
          defaultValue={filters.crop}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <Leaf className="h-4 w-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Crop Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Crops</SelectItem>
            <SelectItem value="Maize">Maize</SelectItem>
            <SelectItem value="Soybean">Soybean</SelectItem>
            <SelectItem value="Wheat">Wheat</SelectItem>
            <SelectItem value="Potato">Potato</SelectItem>
          </SelectContent>
        </Select>

        {/* Export Button */}
        <Button variant="secondary" className="w-full sm:w-auto gap-2">
          <Download className="h-4 w-4" /> Export (.CSV)
        </Button>
      </div>

      {/* --- Data Table --- */}
      <Card>
        <div className="p-4 border-b">
          <p className="text-sm font-medium">
            Found {filteredData.length} relevant leaf samples
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Sample ID</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Field Name</TableHead>
                <TableHead className="w-[120px]">Crop</TableHead>
                <TableHead>AI Diagnosis</TableHead>
                <TableHead className="text-right w-[100px] pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => {
                const badge = getBadgeStyle(record.severity, record.diagnosis);
                return (
                  <TableRow
                    key={record.id}
                    className="hover:bg-emerald-50/50 cursor-pointer"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {record.id}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell>{record.field}</TableCell>
                    <TableCell className="text-slate-600">
                      {record.crop}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${badge.color} text-sm font-medium`}>
                        {record.diagnosis}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open actions</span>
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>
                            Sample {record.id}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            View Full Diagnosis
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Log Treatment Details
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Download Photo
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-slate-500"
                  >
                    No leaf samples found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
