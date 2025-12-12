import React from "react";
import { CheckCircle, Leaf, Microscope, Zap, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// --- Mock Data ---
const ANALYSIS_RESULT = {
  diagnosis: "Nitrogen (N) Deficiency",
  confidence: 97,
  severity: "Critical",
  recommended_treatment:
    "Apply Urea fertilizer (46-0-0) as a foliar spray immediately.",
  key_symptoms: [
    "Yellowing starts at leaf tips",
    "Progresses along the midrib",
    "Older leaves affected first",
  ],
  image_url: "/path/to/uploaded/leaf_photo.jpg",
  metadata: {
    crop: "Maize",
    sampleArea: "North Sector A",
    scanDate: "Oct 30, 2025",
  },
};

export default function LeafAnalysisDetail() {
  const getSeverityColor = (severity) => {
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
      <p className="text-slate-500">
        Sample from {ANALYSIS_RESULT.metadata.sampleArea} scanned on{" "}
        {ANALYSIS_RESULT.metadata.scanDate}.
      </p>

      {/* --- Main Content: Photo & Diagnosis --- */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* --- 1. Image Viewer (Spans 7 columns) --- */}
        <Card className="lg:col-span-7 min-h-[500px] overflow-hidden">
          <CardHeader>
            <CardTitle>Symptom Photo</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Placeholder for the Leaf Image */}
            <div className="w-full aspect-square bg-slate-100 flex items-center justify-center relative">
              <Leaf className="h-16 w-16 text-slate-300" />
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${ANALYSIS_RESULT.image_url})` }}
              >
                {/* Placeholder for highlighting the symptomatic area */}
                <div className="absolute top-4 left-4 p-2 bg-black/50 text-white text-xs rounded">
                  Symptom Area Highlighted by AI
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- 2. Diagnosis & Recommendation (Spans 5 columns) --- */}
        <div className="lg:col-span-5 space-y-6">
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
                <p className="font-medium text-slate-700">
                  AI Confidence Score:
                </p>
                <Badge
                  variant="secondary"
                  className="text-lg p-2 font-bold text-emerald-700"
                >
                  {ANALYSIS_RESULT.confidence}%
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Card */}
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
                Observed Symptoms:
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

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4">
                Log Treatment & Archive
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
