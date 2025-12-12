import { Leaf } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        {/* App Logo/Branding */}
        <div className="flex flex-col items-center mb-6">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800 mt-3">
            AgriVision AI
          </h1>
        </div>

        <Card className="shadow-lg">
          <CardContent>
            <Outlet />
          </CardContent>
        </Card>

        {/* Footer / Links */}
        <p className="mt-6 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} AgriVision AI.{" "}
          <a
            href="/privacy"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
