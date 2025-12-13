import React, { useRef, useState } from "react";
import {
  UploadCloud,
  Leaf,
  CheckCircle,
  Loader2,
  Crop,
  FileText,
  Loader2Icon,
  ArrowRight,
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
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CustomMobileNet } from "@teachablemachine/image";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/supabase/config";

export default function UploadWizard() {
  const [cropType, setCropType] = useState("Maize");
  type UploadedFile = { name: string; size: string; status: string };
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, complete, error
  const [progress, setProgress] = useState(0);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [model, setModel] = useState<CustomMobileNet | null>(null); // To store the loaded model instance
  const [isDialogOpen, setIsDialogOpen] = useState(false); // To track if the modal is open
  const [isPredicting, setIsPredicting] = useState(false); // Tracks prediction status

  const [newAnalysisId, setNewAnalysisId] = useState<string | null>(null);

  // Ref and Image State: Still needed to run the prediction model
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleNavigation = (id: string) => {
    // In a real application (e.g., Next.js, React Router), you would use:
    // router.push(`/analysis/${id}`);

    setUploadStatus("complete");
    navigate(`/dashboard/analysis/${id}`);
  };
  const predictDisease = async (imgElement: HTMLImageElement) => {
    if (!model) {
      console.error("Model not loaded.");
      setUploadStatus("error"); // Failed prediction is a final status
      return;
    }

    setIsPredicting(true);

    try {
      const predictions = await model.predict(imgElement);
      predictions.sort((a, b) => b.probability - a.probability);
      const predictionData = {
        user_id: currentUser?.uid,
        crop_name: cropType,
        confidence: (predictions[0].probability * 100).toFixed(1),
        diagnosis: predictions[0].className,
      };
      console.log(predictions);

      const geminiKey = import.meta.env.VITE_GOOGLE_API_KEY;

      const MODEL = "gemini-2.5-flash-lite";

      async function getTreatment(predictionData: {
        user_id: string;
        crop_name: string;
        confidence: string;
        diagnosis: string;
      }) {
        const prompt = `
            Here is the prediction data:
            ${JSON.stringify(predictionData)}
            Output a JSON object exactly like this (no extra text):
            {
              "severity": "",  // must be one of "Critical", "Medium", "Low", "None"
              "treatment_plan": "",
              "key_symptoms": []
            }
            Fill the fields based on the prediction.
            `;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": geminiKey,
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        const geminiData = await res.json();
        return JSON.parse(
          geminiData.candidates?.[0]?.content?.parts?.[0]?.text
            .replace(/```json\s*([\s\S]*?)```/, "$1")
            .trim() || ""
        );
      }

      const geminiResponse = await getTreatment(predictionData);

      const { data, error } = await supabase
        .from("crops")
        .insert([
          {
            user_id: currentUser?.uid,
            crop_name: cropType,
            confidence: (predictions[0].probability * 100).toFixed(1),
            diagnosis: predictions[0].className,
            severity: geminiResponse.severity,
            treatment_plan: geminiResponse.treatment_plan,
            key_symptoms: geminiResponse.key_symptoms,
          },
        ])
        .select();

      // console.log(data.id, error);

      // Generate a Mock Analysis ID (replace with actual DB insert ID)
      // const mockId = `L-${Math.floor(Math.random() * 10000)}`;
      // setNewAnalysisId(mockId);

      // 🌟 STEP 4: TRIGGER REDIRECT (after prediction finishes) 🌟
      handleNavigation(data[0].id);
    } catch (error) {
      console.error("Prediction error:", error);
      setUploadStatus("error"); // Set final status to error
      console.log("Error making prediction. Check console for details.");
    }

    setIsPredicting(false);
  };
  const processFiles = (filesArray: File[]) => {
    if (filesArray.length === 0) return;
    const firstFile = filesArray[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setSelectedImage(dataUrl);
      const uploadedFiles: UploadedFile[] = filesArray.map((file) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        status: "pending",
        dataUrl: file === firstFile ? dataUrl : undefined, // Attach dataUrl to first file only for reference
      }));

      setFiles(uploadedFiles);
      setUploadStatus("uploading");
      startSimulation();
    };
    reader.readAsDataURL(firstFile);
  };

  const loadTeachableMachineModel = async () => {
    if (model) {
      console.log("Model already loaded.");
      return;
    }

    setIsModelLoading(true);
    console.log("Starting model load...");

    try {
      // Use dynamic imports to prevent issues if Teachable Machine is not installed
      // If you are using a standard React/Next.js environment, you might need to adjust this import.
      const tmImage = await import("@teachablemachine/image");

      const modelURL =
        "https://teachablemachine.withgoogle.com/models/e2cVE9iV7/model.json";
      const metadataURL =
        "https://teachablemachine.withgoogle.com/models/e2cVE9iV7/metadata.json";

      const loadedModel = await tmImage.load(modelURL, metadataURL);

      setModel(loadedModel);
      setIsModelLoading(false);
      console.log("Model loaded successfully!");
    } catch (error) {
      console.error("Error loading model:", error);
      alert("Failed to load model. Check console for details.");
      setIsModelLoading(false);
    }
  };
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const filesArray = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    ) as File[];
    processFiles(filesArray);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = Array.from(e.target.files ?? []).filter((file: File) =>
      file.type.startsWith("image/")
    ) as File[];
    processFiles(filesArray);
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

          // CRITICAL: Ensure image is loaded before attempting prediction
          setTimeout(() => {
            if (imageRef.current) {
              predictDisease(imageRef.current);
            } else {
              setUploadStatus("error");
              console.error(
                "Image element not found for prediction. Cannot predict."
              );
            }
          }, 500);
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
    uploadStatus === "complete" ||
    isModelLoading ||
    isPredicting;
  if (isModelLoading) return <Loader2Icon />;
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (open) {
          // Trigger model load ONLY when the dialog opens
          loadTeachableMachineModel();
        }
      }}
    >
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
                  <SelectItem value="Tomato">Tomato</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Potato">Potato</SelectItem>
                  <SelectItem value="Other">Other...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target Field Selection */}
          </div>

          <Separator />

          <h3 className="text-lg font-semibold text-slate-800">
            2. Photo Upload
          </h3>
          {selectedImage && (
            <img
              ref={imageRef}
              src={selectedImage}
              alt="Prediction Input"
              style={{ display: "none" }} // Hide the image element visually
              onLoad={() => console.log("Image Data Loaded into DOM")} // Optional debug log
            />
          )}
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
            onClick={() => {
              // Only call processFiles if files are selected and process hasn't started/completed
              if (files.length > 0 && uploadStatus === "idle") {
                // The click handler doesn't give us the files directly, so we use the input element:
                const input = document.getElementById(
                  "file-input-leaf"
                ) as HTMLInputElement | null;
                if (input && input.files && input.files.length > 0) {
                  processFiles(Array.from(input.files) as File[]);
                }
              } else if (newAnalysisId) {
                // If prediction is complete, clicking the button triggers navigation
                handleNavigation(newAnalysisId);
              }
            }}
            disabled={isUploadDisabled}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            {isModelLoading ? (
              "Waiting for AI Model..."
            ) : isPredicting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Diagnosing...
              </span>
            ) : newAnalysisId ? (
              <span className="flex items-center gap-2">
                View Analysis <ArrowRight className="h-4 w-4" />
              </span>
            ) : (
              "Submit for AI Analysis"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
