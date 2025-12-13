import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Store, 
  CheckCircle2, 
  MapPin,
  Leaf
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// --- Mock Data (Updated to Naira) ---
const MARKETPLACE_LISTINGS = [
  {
    id: "M-101",
    crop: "Premium Yellow Maize",
    quantity: "500 kg",
    price: "₦1,200 / kg", // Updated
    seller: "North Sector Farm",
    location: "Lagos, NG",
    aiVerified: true,
    healthScore: 98,
    imageColor: "bg-yellow-100",
    date: "2 hrs ago"
  },
  {
    id: "M-102",
    crop: "Organic Soybeans",
    quantity: "200 kg",
    price: "₦2,500 / kg", // Updated
    seller: "Green Valley Coop",
    location: "Ogun, NG",
    aiVerified: true,
    healthScore: 95,
    imageColor: "bg-green-100",
    date: "5 hrs ago"
  },
  {
    id: "M-103",
    crop: "Sweet Potatoes (Bulk)",
    quantity: "1000 kg",
    price: "₦850 / kg", // Updated
    seller: "West Valley Farms",
    location: "Ibadan, NG",
    aiVerified: false,
    healthScore: null,
    imageColor: "bg-amber-100",
    date: "1 day ago"
  },
  {
    id: "M-104",
    crop: "White Corn",
    quantity: "350 kg",
    price: "₦1,100 / kg", // Updated
    seller: "East River Plot",
    location: "Abuja, NG",
    aiVerified: true,
    healthScore: 92,
    imageColor: "bg-slate-100",
    date: "2 days ago"
  },
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      
      {/* --- Header --- */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Store className="h-8 w-8 text-emerald-600" /> Marketplace
          </h1>
          <p className="text-slate-500 mt-1">Buy and sell crops with AI-verified health records.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
           <ShoppingCart className="h-4 w-4" /> My Orders
        </Button>
      </div>

      {/* --- Search & Filters --- */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search for crops (e.g., Maize, Soy)..." 
            className="pl-10 w-full bg-slate-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
             <Filter className="h-4 w-4 mr-2 text-slate-500" />
             <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Listings</SelectItem>
            <SelectItem value="verified">AI Verified Only</SelectItem>
            <SelectItem value="price_low">Price: Low to High</SelectItem>
            <SelectItem value="price_high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* --- Listings Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MARKETPLACE_LISTINGS.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Placeholder */}
            <div className={`h-40 w-full ${item.imageColor} flex items-center justify-center relative`}>
                <Leaf className="h-12 w-12 text-slate-400 opacity-50" />
                {item.aiVerified && (
                  <Badge className="absolute top-3 right-3 bg-emerald-600 hover:bg-emerald-700 text-white gap-1 shadow-sm">
                    <CheckCircle2 className="h-3 w-3" /> AI Verified Healthy
                  </Badge>
                )}
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold text-slate-900">{item.crop}</CardTitle>
                <p className="text-lg font-bold text-emerald-700">{item.price}</p>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {item.location} • {item.seller}
              </p>
            </CardHeader>

            <CardContent>
              <div className="flex justify-between items-center text-sm">
                 <div className="bg-slate-50 px-3 py-1 rounded-md border text-slate-700 font-medium">
                    Qty: {item.quantity}
                 </div>
                 {item.healthScore && (
                   <div className="text-emerald-700 text-xs font-semibold flex items-center gap-1">
                      Health Score: {item.healthScore}/100
                   </div>
                 )}
              </div>
              <Separator className="mt-4"/>
            </CardContent>

            <CardFooter>
              <Button className="w-full" variant="outline">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}