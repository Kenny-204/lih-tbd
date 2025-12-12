import { useState } from "react";
import {
  Map,
  Leaf,
  Layers,
  Maximize,
  ChevronRight,
  TrendingUp,
  Droplets,
  Zap,
  Download,
  Share2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// --- Mock Data ---
const FIELD_DATA = {
  name: "North Sector A",
  lastScan: "Oct 25, 2025 (Drone)",
  totalArea: "150 Acres",
  crop: "Maize (Corn)",
  deficiencies: [
    {
      type: "Nitrogen (N)",
      severity: "Critical",
      score: 95,
      color: "bg-rose-500",
      icon: Zap,
    },
    {
      type: "Water Stress",
      severity: "Medium",
      score: 62,
      color: "bg-amber-500",
      icon: Droplets,
    },
    {
      type: "Potassium (K)",
      severity: "Low",
      score: 30,
      color: "bg-yellow-500",
      icon: TrendingUp,
    },
  ],
};

interface def {
  icon: any;
  score: number;
  type: string;
  color: string;
  severity: string;
}

const DeficiencyRecommendation = ({ def }: { def: def }) => (
  <div className="space-y-3 p-4 border rounded-lg bg-slate-50">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <def.icon className={`h-5 w-5 ${def.color.replace("bg-", "text-")}`} />
        <h4 className="font-semibold text-slate-800">{def.type}</h4>
      </div>
      <Badge className={`${def.color} text-white`}>{def.severity}</Badge>
    </div>

    <Separator className="my-2" />

    <p className="text-sm text-slate-700">
      The model predicts **{def.type}** deficiency across **
      {Math.round(
        Number(FIELD_DATA.totalArea.split(" ")[0]) * (def.score / 100)
      )}{" "}
      acres** with high confidence.
    </p>

    <div className="bg-white p-3 rounded-md border border-emerald-100">
      <p className="text-xs font-semibold text-emerald-800">
        RECOMMENDED ACTION:
      </p>
      <p className="text-sm mt-1">
        Apply **Urea (46-0-0)** at a variable rate, targeting 150kg/Ha in
        critical zones.
      </p>
    </div>

    <Button variant="outline" size="sm" className="w-full mt-2">
      Generate Prescription Map
    </Button>
  </div>
);

export default function FieldAnalysisPage() {
  const [activeLayers, setActiveLayers] = useState({
    original: true,
    nitrogen: true,
    waterStress: false,
    ndvi: false,
  });
  const [opacity, setOpacity] = useState([70]);

  interface ActiveLayers {
    original: boolean;
    nitrogen: boolean;
    waterStress: boolean;
    ndvi: boolean;
  }

  const toggleLayer = (layer: keyof ActiveLayers): void => {
    setActiveLayers((prev: ActiveLayers) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

  return (
    <div className="space-y-6">
      {/* --- Page Header & Field Info --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {FIELD_DATA.name} Analysis
          </h1>
          <p className="text-slate-500 mt-1">
            Last Scan:{" "}
            <span className="font-medium text-emerald-700">
              {FIELD_DATA.lastScan}
            </span>{" "}
            | Crop: {FIELD_DATA.crop}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export Data
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
      </div>

      {/* --- Main Content: Map Viewer and Side Panel --- */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* --- 1. Map/Image Viewer (Spans 9 columns) --- */}
        <Card className="lg:col-span-9 relative min-h-[600px] overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Interactive Field View</CardTitle>
            <Button variant="ghost" size="icon" className="text-slate-500">
              <Maximize className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 h-[520px]">
            {/* Placeholder for Map/Image Viewer */}
            <div className="relative h-full w-full bg-slate-100 flex items-center justify-center">
              <Map className="h-16 w-16 text-slate-300" />
              <div className="absolute top-0 right-0 p-4 text-xs text-slate-600 font-medium">
                Zoom Level: 14x
              </div>

              {/* --- Image Comparison Slider Placeholder --- */}
              <div
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500`}
                style={{
                  // In a real app, this would be a dynamic map overlay
                  opacity: activeLayers.nitrogen ? opacity[0] / 100 : 0,
                  background:
                    "linear-gradient(45deg, rgba(255,0,0,0.5), rgba(255,255,0,0.5), rgba(0,255,0,0.5))",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl drop-shadow">
                  AI Nitrogen Deficiency Heatmap
                </div>
              </div>
              {/* Opacity Control for the Overlay */}
              <div className="absolute bottom-4 left-4 p-3 bg-white/70 backdrop-blur-sm rounded-lg shadow-md w-64">
                <Label className="text-sm font-medium">
                  Overlay Opacity: {opacity[0]}%
                </Label>
                <Slider
                  defaultValue={[70]}
                  max={100}
                  step={1}
                  onValueChange={setOpacity}
                  className="mt-2"
                  //   indicatorClassName="bg-emerald-600"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- 2 & 3. Control & Recommendation Panel (Spans 3 columns) --- */}
        <div className="lg:col-span-3 space-y-6">
          {/* Layer Control Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2 text-slate-700">
                <Layers className="h-4 w-4 text-emerald-600" /> Layer Controls
              </CardTitle>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-slate-600"
                  >
                    Tools <ChevronRight className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                  <SheetHeader>
                    <SheetTitle>Advanced Map Tools</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    {/* Placeholder for tools like drawing, measurement, historical comparison */}
                    <p className="text-sm text-slate-500">
                      Future tools go here (e.g., Draw Polygon for ROI analysis,
                      Field History Comparison).
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="original-switch"
                  className="flex flex-col space-y-1"
                >
                  <span className="font-medium">Original Imagery (RGB)</span>
                  <span className="text-xs text-slate-500">
                    Base layer (Drone/Satellite)
                  </span>
                </Label>
                <Switch
                  id="original-switch"
                  checked={activeLayers.original}
                  onCheckedChange={() => toggleLayer("original")}
                  disabled
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="nitrogen-switch"
                  className="flex flex-col space-y-1"
                >
                  <span className="font-medium text-rose-600">
                    Nitrogen Deficiency Heatmap
                  </span>
                  <span className="text-xs text-slate-500">
                    AI Classification Map (Critical)
                  </span>
                </Label>
                <Switch
                  id="nitrogen-switch"
                  checked={activeLayers.nitrogen}
                  onCheckedChange={() => toggleLayer("nitrogen")}
                  className="data-[state=checked]:bg-rose-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="water-switch"
                  className="flex flex-col space-y-1"
                >
                  <span className="font-medium text-amber-600">
                    Water Stress (NDWI)
                  </span>
                  <span className="text-xs text-slate-500">
                    Index-based analysis
                  </span>
                </Label>
                <Switch
                  id="water-switch"
                  checked={activeLayers.waterStress}
                  onCheckedChange={() => toggleLayer("waterStress")}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="ndvi-switch"
                  className="flex flex-col space-y-1"
                >
                  <span className="font-medium text-emerald-600">
                    NDVI Vegetation Index
                  </span>
                  <span className="text-xs text-slate-500">
                    Biomass density
                  </span>
                </Label>
                <Switch
                  id="ndvi-switch"
                  checked={activeLayers.ndvi}
                  onCheckedChange={() => toggleLayer("ndvi")}
                  className="data-[state=checked]:bg-emerald-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Deficiency Recommendation Panel (Scrollable) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2 text-slate-700">
                <Leaf className="h-4 w-4 text-emerald-600" /> AI Recommendations
              </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[280px] px-6 pb-6">
              <div className="space-y-4 pr-4">
                {FIELD_DATA.deficiencies
                  .sort((a, b) => b.score - a.score) // Sort by highest score first
                  .map((def, index) => (
                    <DeficiencyRecommendation key={index} def={def} />
                  ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}
