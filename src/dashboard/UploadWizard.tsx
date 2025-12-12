import React, { useState } from "react";
import {
  UploadCloud,
  Leaf,
  MapPin,
  CheckCircle,
  Loader2,
  Crop,
  FileText,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- Mock Data ---
const MOCK_FIELDS = [
  { id: "F-001", name: "North Sector A", crop: "Maize" },
  { id: "F-002", name: "East River Plot", crop: "Soybean" },
  { id: "F-003", name: "West Valley", crop: "Potato" },
];

export default function UploadWizard() {
  const [targetField, setTargetField] = useState(MOCK_FIELDS[0].id);
  const [cropType, setCropType] = useState("Maize");
  type UploadedFile = { name: string; size: string; status: string };
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, complete, error
  const [progress, setProgress] = useState(0);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents files from opening in the browser

    // Filter to only accept common image types
    const filesArray = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const uploadedFiles = filesArray.map((file) => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // Size in MB
      status: "pending",
    }));

    if (uploadedFiles.length > 0) {
      setFiles(uploadedFiles);
      setUploadStatus("uploading");
      startSimulation();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter to only accept common image types
    const filesArray = Array.from(e.target.files ?? []).filter((file: File) =>
      file.type.startsWith("image/")
    );

    const uploadedFiles = filesArray.map((file: File) => ({
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2),
      status: "pending",
    }));

    if (uploadedFiles.length > 0) {
      setFiles(uploadedFiles);
      setUploadStatus("uploading");
      startSimulation();
    }
  };

  // Simulation for demonstration
  const startSimulation = () => {
    setProgress(0);
    setUploadStatus("uploading");

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 10;
        } else {
          clearInterval(interval);
          // In a real app, this would trigger the backend analysis job
          setUploadStatus("complete");
          return 100;
        }
      });
    }, 100);
  };

  const getStatusText = () => {
    if (uploadStatus === "uploading")
      return `Uploading & Analyzing... (${progress}%)`;
    if (uploadStatus === "complete") return "Analysis Request Submitted";
    if (uploadStatus === "error") return "Upload Failed";
    return "Ready to Upload";
  };

  const isUploadDisabled =
    files.length === 0 ||
    uploadStatus === "uploading" ||
    uploadStatus === "complete";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <UploadCloud className="h-4 w-4" /> New Sample
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" /> New Leaf Sample
            Analysis
          </DialogTitle>
          <p className="text-sm text-slate-500">
            Upload close-up photos of symptomatic leaves to get an instant AI
            diagnosis.
          </p>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <h3 className="text-lg font-semibold text-slate-800">
            1. Sample Context
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Crop Type */}
            <div className="space-y-2">
              <Label htmlFor="crop-type" className="flex items-center gap-1">
                <Crop className="h-4 w-4 text-slate-500" /> Crop Type
              </Label>
              <Select onValueChange={setCropType} defaultValue={cropType}>
                <SelectTrigger id="crop-type">
                  <SelectValue placeholder="Select Crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Maize">Maize (Corn)</SelectItem>
                  <SelectItem value="Soybean">Soybean</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Potato">Potato</SelectItem>
                  <SelectItem value="Other">Other...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Field Selection */}
            <div className="space-y-2">
              <Label htmlFor="target-field" className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-slate-500" /> Sample Location
              </Label>
              <Select onValueChange={setTargetField} defaultValue={targetField}>
                <SelectTrigger id="target-field">
                  <SelectValue placeholder="Select a field" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_FIELDS.map((field) => (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <h3 className="text-lg font-semibold text-slate-800">
            2. Photo Upload
          </h3>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) =>
              e.currentTarget.classList.add(
                "border-emerald-500",
                "bg-emerald-50"
              )
            } // Hover effect
            onDragLeave={(e) =>
              e.currentTarget.classList.remove(
                "border-emerald-500",
                "bg-emerald-50"
              )
            } // Hover effect end
            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer transition duration-200"
            onClick={() => {
              const input = document.getElementById("file-input-leaf");
              if (input) (input as HTMLInputElement).click();
            }}
          >
            <UploadCloud className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">
              Drag & Drop Leaf Photos (.JPG, .PNG)
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Maximum 5 files per sample.
            </p>
            <input
              id="file-input-leaf"
              type="file"
              accept="image/jpeg,image/png"
              multiple
              hidden
              onChange={handleFileSelect}
            />
          </div>

          {/* Status and File List */}
          {files.length > 0 && (
            <Card className="p-4 bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-slate-700">
                  Files ({files.length}):
                </h4>
                <Badge
                  className={
                    uploadStatus === "complete"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-200 text-slate-700"
                  }
                >
                  {uploadStatus === "complete" ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  )}
                  {getStatusText().split(":")[0]}
                </Badge>
              </div>

              {/* Progress Bar */}
              {uploadStatus !== "complete" && (
                <div className="space-y-1 mb-3">
                  <p className="text-sm text-slate-600">{getStatusText()}</p>
                  <Progress
                    value={progress}
                    max={100}
                    className="h-2 bg-slate-200"
                    // indicatorClassName="bg-emerald-600 transition-all duration-150"
                  />
                </div>
              )}

              <ul className="text-sm space-y-1 max-h-24 overflow-y-auto">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-slate-600"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileText className="h-4 w-4 shrink-0 text-emerald-600" />
                      {file.name}
                    </span>
                    <span className="text-xs text-slate-500 ml-4">
                      {file.size} MB
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            onClick={startSimulation}
            disabled={isUploadDisabled}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {uploadStatus === "complete"
              ? "View Analysis Results"
              : "Submit for AI Analysis"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
