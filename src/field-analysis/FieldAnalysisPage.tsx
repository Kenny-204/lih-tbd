import React, { useState } from "react";
import { 
  CheckCircle, 
  Microscope, 
  Zap, 
  Shield, 
  Store, 
  Package 
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  // Using a Healthy example to make listing on marketplace make sense
  diagnosis: "Healthy / Low Risk", 
  confidence: 94,
  severity: "Low",
  recommended_treatment: "Crop is healthy. Continue standard irrigation schedule.",
  key_symptoms: ["Vibrant green coloration", "No visible lesions", "Firm texture"],
  metadata: { crop: "Maize", scanDate: "Oct 30, 2025" },
};

export default function LeafAnalysisDetail() {
  const [isListingOpen, setIsListingOpen] = useState(false);

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "Critical": return "bg-rose-500 hover:bg-rose-600";
      case "Medium": return "bg-amber-500 hover:bg-amber-600";
      default: return "bg-emerald-500 hover:bg-emerald-600";
    }
  };

  const handleListForSale = () => {
    // Logic to save to DB goes here
    setIsListingOpen(false);
    alert("Item listed on marketplace successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
           <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
             <Microscope className="h-7 w-7 text-emerald-600" />
             Leaf Analysis: {ANALYSIS_RESULT.metadata.crop}
           </h1>
           <div className="flex items-center gap-4 text-slate-500 mt-1">
             <p>Sample scanned on <span className="font-semibold">{ANALYSIS_RESULT.metadata.scanDate}</span>.</p>
           </div>
        </div>
        
        {/* --- 🛒 NEW: ADD TO MARKETPLACE BUTTON --- */}
        <Dialog open={isListingOpen} onOpenChange={setIsListingOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-sm">
               <Store className="h-4 w-4" /> List on Marketplace
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Sell Your Crop</DialogTitle>
              <DialogDescription>
                Create a listing for this batch. The "AI Verified" badge will be applied automatically based on this health scan.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
               {/* Auto-filled Info */}
               <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-md flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Verified Healthy Batch</p>
                    <p className="text-xs text-emerald-600">Based on scan ID L-1005 • Confidence 94%</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label>Price per Kg (₦)</Label>
                   <div className="relative">
                      {/* Naira Symbol */}
                      <span className="absolute left-3 top-2.5 text-slate-500 font-semibold">₦</span>
                      <Input placeholder="1,000" className="pl-9" type="number" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label>Quantity Available (kg)</Label>
                   <div className="relative">
                      <Package className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                      <Input placeholder="500" className="pl-9" type="number" />
                   </div>
                 </div>
               </div>
               
               <div className="space-y-2">
                  <Label>Listing Title</Label>
                  <Input defaultValue={`Fresh ${ANALYSIS_RESULT.metadata.crop} - Verified Quality`} />
               </div>

               <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Describe harvest date, pickup options, etc." />
               </div>
            </div>

            <DialogFooter>
              <Button onClick={handleListForSale} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Publish Listing
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* --- END MARKETPLACE BUTTON --- */}

      </div>

      {/* --- Main Content (Diagnosis and Treatment) --- */}
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
                Given the **{ANALYSIS_RESULT.severity}** severity, consult local agricultural guidelines. If listing on the marketplace, ensure the crop meets standard quality checks.
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