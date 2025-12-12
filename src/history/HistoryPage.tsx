import { useState } from "react";
import {
  History,
  Search,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  ListRestart,
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

// --- Mock Data ---
const HISTORY_RECORDS = [
  {
    id: "A-1005",
    date: "2025-10-25",
    field: "North Sector A",
    crop: "Maize",
    issue: "Nitrogen Deficiency",
    severity: "High",
    source: "Drone",
    status: "Completed",
  },
  {
    id: "A-1004",
    date: "2025-10-10",
    field: "North Sector A",
    crop: "Maize",
    issue: "Healthy",
    severity: "None",
    source: "Satellite",
    status: "Completed",
  },
  {
    id: "B-2012",
    date: "2025-10-28",
    field: "East River Plot",
    crop: "Soybean",
    issue: "Water Stress",
    severity: "Medium",
    source: "Drone",
    status: "Completed",
  },
  {
    id: "C-3050",
    date: "2025-11-01",
    field: "South Hills Farm",
    crop: "Wheat",
    issue: "Processing",
    severity: "None",
    source: "Mobile",
    status: "Processing",
  },
  {
    id: "D-4001",
    date: "2025-09-15",
    field: "West Valley",
    crop: "Potato",
    issue: "Pest Damage",
    severity: "Low",
    source: "Drone",
    status: "Completed",
  },
  {
    id: "E-5003",
    date: "2025-08-20",
    field: "North Sector A",
    crop: "Maize",
    issue: "Phosphorus Deficiency",
    severity: "Medium",
    source: "Satellite",
    status: "Archived",
  },
];

export default function HistoryPage() {
  const [data, setData] = useState(HISTORY_RECORDS);
  const [filters, setFilters] = useState({
    search: "",
    severity: "all",
    source: "all",
  });
  console.log(setData)

  // Utility to get the correct badge style
  const getBadgeStyle = (severity: string, issue: string) => {
    if (issue === "Processing")
      return { variant: "secondary", color: "bg-slate-100 text-slate-700" };
    switch (severity) {
      case "High":
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

  // Simplified filter function (in a real app, this would be optimized)
  const applyFilters = (record: {
    field: string;
    issue: string;
    id: string;
    severity: string;
    source: string;
  }) => {
    const searchTerm = filters.search.toLowerCase();

    // Search Filter
    if (
      searchTerm &&
      !(
        record.field.toLowerCase().includes(searchTerm) ||
        record.issue.toLowerCase().includes(searchTerm) ||
        record.id.toLowerCase().includes(searchTerm)
      )
    ) {
      return false;
    }

    // Severity Filter
    if (filters.severity !== "all" && record.severity !== filters.severity) {
      return false;
    }

    // Source Filter
    if (filters.source !== "all" && record.source !== filters.source) {
      return false;
    }

    return true;
  };

  const filteredData = data.filter(applyFilters);

  return (
    <div className="space-y-6">
      {/* --- Page Header --- */}
      <div className="flex items-center gap-3">
        <History className="h-6 w-6 text-emerald-600" />
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Analysis History
        </h1>
      </div>
      <p className="text-slate-500">
        Review all past scans, filter by field, deficiency, or date.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by ID, Field, or Issue..."
            className="pl-10 w-full"
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            value={filters.search}
          />
        </div>

        {/* Date Picker (Placeholder for a Shadcn DatePicker component) */}
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
            <SelectItem value="High">Critical (High)</SelectItem>
            <SelectItem value="Medium">Warning (Medium)</SelectItem>
            <SelectItem value="Low">Minor (Low)</SelectItem>
            <SelectItem value="None">Healthy (None)</SelectItem>
          </SelectContent>
        </Select>

        {/* Source Filter */}
        <Select
          onValueChange={(value) => setFilters({ ...filters, source: value })}
          defaultValue={filters.source}
        >
          <SelectTrigger className="w-full sm:w-[150px]">
            <ListRestart className="h-4 w-4 mr-2 text-slate-500" />
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="Drone">Drone</SelectItem>
            <SelectItem value="Satellite">Satellite</SelectItem>
            <SelectItem value="Mobile">Mobile Close-up</SelectItem>
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
            Found {filteredData.length} relevant records
          </p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Scan ID</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead>Field Name</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Detected Issue</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead className="text-right w-[100px] pr-6">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((record) => {
                const badge = getBadgeStyle(record.severity, record.issue);
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
                        {record.issue}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-slate-500">
                      {record.source}
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
                            Record {record.id}
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            View Full Analysis
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Compare to Previous Scan
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Download Raw Data
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
                    colSpan={7}
                    className="h-24 text-center text-slate-500"
                  >
                    No records found matching your filters.
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
