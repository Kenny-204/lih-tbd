import { useState } from "react";
import {
  Search,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  Leaf,
  Microscope,
  Zap, // Added Zap for 'Processing' visual
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
  DropdownMenuItem, // Changed CheckboxItem to simple Item for actions
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

// --- Mock Data: Field removed and diagnosis types streamlined ---
const HISTORY_RECORDS = [
  {
    id: "L-1005",
    date: "2025-10-30",
    crop: "Maize",
    diagnosis: "Nitrogen Deficiency",
    severity: "Critical",
    status: "Analyzed",
  },
  {
    id: "L-1004",
    date: "2025-10-25",
    crop: "Soybean",
    diagnosis: "Spider Mite Damage",
    severity: "Medium",
    status: "Analyzed",
  },
  {
    id: "L-1003",
    date: "2025-10-20",
    crop: "Wheat",
    diagnosis: "Healthy",
    severity: "None",
    status: "Analyzed",
  },
  {
    id: "L-1002",
    date: "2025-10-15",
    crop: "Potato",
    diagnosis: "Early Blight",
    severity: "Low",
    status: "Analyzed",
  },
  {
    id: "L-1001",
    date: "2025-10-10",
    crop: "Maize",
    diagnosis: "Processing",
    severity: "None",
    status: "Processing",
  },
];

export default function HistoryPage() {
  const [data] = useState(HISTORY_RECORDS); // Removed setData as it's not being used for mutations
  const [filters, setFilters] = useState({
    search: "",
    severity: "all",
    crop: "all",
  });

  // Utility to get the correct badge style
  interface BadgeStyle {
    color: string;
    icon?: React.ReactNode;
  }

  type Severity = "Critical" | "Medium" | "Low" | "None" | string;

  const getBadgeStyle = (severity: Severity, diagnosis: string): BadgeStyle => {
    if (diagnosis === "Processing")
      return {
        color: "bg-slate-100 text-slate-700",
        icon: <Zap className="h-3 w-3 animate-spin mr-1" />,
      };
    switch (severity) {
      case "Critical":
        return {
          color: "bg-rose-100 text-rose-700 border-rose-200",
        };
      case "Medium":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "Low":
        return {
          color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        };
      case "None":
        return {
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return { color: "bg-slate-100 text-slate-700" };
    }
  };

  // Filter function
  const applyFilters = (record: {
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
        Review all close-up leaf diagnoses and recommended treatments. Click on
        a row to view the full analysis.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID or Diagnosis..."
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
          Filter by Date Range
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

        {/* Crop Filter */}
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
                    // Placeholder for navigation/detail view
                    onClick={() =>
                      console.log(
                        `Navigating to analysis detail for ${record.id}`
                      )
                    }
                    className="hover:bg-emerald-50/50 cursor-pointer"
                  >
                    <TableCell className="font-medium text-slate-900">
                      {record.id}
                    </TableCell>
                    <TableCell className="text-slate-500 text-sm">
                      {record.date}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {record.crop}
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-sm font-medium ${badge.color}`}>
                        {badge.icon}
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
                          {/* Changed to DropdownMenuItem */}
                          <DropdownMenuItem>
                            View Full Diagnosis
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            Log Treatment Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>Download Photo</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
              {filteredData.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5} // Updated colSpan to 5 (was 6)
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
