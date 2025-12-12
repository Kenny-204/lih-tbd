import {
  CheckCircle,
  Leaf,
  Microscope,
  Zap,
  Shield,
  MapPin,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// --- Mock Data ---
interface AnalysisMetadata {
  crop: string;
  scanDate: string;
}

interface AnalysisResult {
  diagnosis: string;
  confidence: number;
  severity: "Critical" | "Medium" | "Low";
  recommended_treatment: string;
  key_symptoms: string[];
  metadata: AnalysisMetadata;
}

const ANALYSIS_RESULT: AnalysisResult = {
  diagnosis: "Tomato Early blight",
  confidence: 97,
  severity: "Critical",
  recommended_treatment:
    "Apply Urea fertilizer (46-0-0) as a foliar spray immediately. Also consider a copper-based fungicide application.",
  key_symptoms: [
    "Yellowing starts at leaf tips",
    "Progresses along the midrib in a V-shape",
    "Older leaves affected first",
  ],
  metadata: {
    crop: "Tomato",
    scanDate: "Oct 30, 2025",
  },
};

export default function LeafAnalysisDetail() {
  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "Critical":
        return "bg-rose-500 hover:bg-rose-600";
      case "Medium":
        return "bg-amber-500 hover:bg-amber-600";
      default:
        return "bg-emerald-500 hover:bg-emerald-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* --- Header --- */}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
        <Microscope className="h-7 w-7 text-emerald-600" />
        Leaf Analysis: {ANALYSIS_RESULT.metadata.crop}
      </h1>
      <div className="flex items-center gap-4 text-slate-500">
        <p>Sample scanned on **{ANALYSIS_RESULT.metadata.scanDate}**.</p>
        <Separator orientation="vertical" className="h-4" />
        <Badge variant="outline" className="text-slate-600">
          <MapPin className="h-3 w-3 mr-1" /> Field Data Pending
        </Badge>
      </div>

      {/* --- Main Content: Two Columns (Diagnosis and Recommendation) --- */}
      {/* Removed the outer grid and image container entirely */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* === 1. AI Diagnosis Card (Left Column) === */}
        <Card className="shadow-lg border-t-4 border-t-emerald-600">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-emerald-600" /> AI Diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Diagnosis */}
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Predicted Issue:</p>
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-extrabold text-slate-900">
                  {ANALYSIS_RESULT.diagnosis}
                </h3>
                <Badge
                  className={`text-white ${getSeverityColor(
                    ANALYSIS_RESULT.severity
                  )} text-base p-2`}
                >
                  {ANALYSIS_RESULT.severity}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Confidence */}
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-700">AI Confidence Score:</p>
              <Badge
                variant="secondary"
                className="text-lg p-2 font-bold text-emerald-700"
              >
                {ANALYSIS_RESULT.confidence}%
              </Badge>
            </div>

            <Separator />

            {/* Contextual Description/Symptoms */}
            <h4 className="font-semibold text-slate-700">
              Key Symptom Characteristics:
            </h4>
            <ul className="space-y-2">
              {ANALYSIS_RESULT.key_symptoms.map((symptom, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-slate-600 text-sm"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  {symptom}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* === 2. Recommendation Card (Right Column) === */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" /> Treatment Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-semibold text-slate-800">
              {ANALYSIS_RESULT.recommended_treatment}
            </p>

            <Separator />

            <h4 className="font-semibold text-slate-700">
              Detailed Action Steps:
            </h4>
            <p className="text-slate-600 text-sm">
              Given the **{ANALYSIS_RESULT.severity}** severity, immediate
              action is recommended. Consult local agricultural guidelines
              before applying any treatment.
            </p>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
              Log Treatment & Archive
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
