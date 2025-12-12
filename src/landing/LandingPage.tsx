import {
  Leaf,
  Map, // Keeping map for general geographical context, but usage is minimal
  Layers,
  Zap,
  ChevronRight,
  Shield,
  Microscope, // New Icon for close-up analysis
  CheckCircle2,
  ArrowRight,
  Camera, // New Icon for camera/photo focus
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

// --- NAVIGATION (Header) ---
const Header = () => (
  <header className="py-4 px-6 md:px-10 flex justify-between items-center bg-white border-b sticky top-0 z-10">
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
        <Leaf className="h-5 w-5 text-white" />
      </div>
      <span className="font-bold text-xl tracking-tight text-slate-900">
        AgriVision AI
      </span>
    </div>
    <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
      <a href="#features" className="hover:text-emerald-600">
        How It Works
      </a>
      <a href="#pricing" className="hover:text-emerald-600">
        Pricing
      </a>
      <a href="#demo" className="hover:text-emerald-600">
        Contact
      </a>
    </nav>
    <div className="flex items-center space-x-2">
      <Link to="/auth/login">
        <Button variant="ghost" className="text-sm font-medium">
          Log In
        </Button>
      </Link>
      <Link to="/auth/signup">
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-sm font-medium">
          Start Free Trial
        </Button>
      </Link>
    </div>
  </header>
);

// --- HERO SECTION ---
const HeroSection = () => (
  <section className="bg-slate-50 py-20 px-6 md:px-10 text-center">
    <Badge
      variant="outline"
      className="bg-emerald-50 text-emerald-700 border-emerald-300 px-3 py-1 mb-4 text-sm font-semibold"
    >
      <Zap className="h-3 w-3 mr-1" /> Instant Disease & Nutrient Diagnosis
    </Badge>
    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-slate-900 max-w-4xl mx-auto leading-tight">
      Just Snap a Photo. Get{" "}
      <span className="text-emerald-600">Actionable Plant Health</span> Insights
      in Seconds.
    </h1>
    <p className="text-xl text-slate-600 mt-5 max-w-3xl mx-auto">
      Turn your phone's camera into an agricultural laboratory. Upload close-up
      leaf images to instantly detect diseases, pests, and nutrient
      deficiencies.
    </p>
    <div className="mt-8 flex justify-center space-x-4">
      <Button
        size="lg"
        className="bg-emerald-600 hover:bg-emerald-700 text-lg gap-2"
      >
        Start 14-Day Free Trial
      </Button>
      <Button size="lg" variant="outline" className="text-lg gap-2">
        Request a Demo <ArrowRight className="h-5 w-5" />
      </Button>
    </div>
    <div className="mt-12 w-full h-80 bg-slate-200 rounded-xl shadow-2xl relative overflow-hidden">
      {/* Placeholder for a screenshot of the Leaf Analysis page */}
      <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium"></div>
    </div>
  </section>
);

// --- FEATURE BLOCK (Value Proposition) ---
const FeatureBlock = () => (
  <section id="features" className="py-20 px-6 md:px-10 bg-white">
    <h2 className="text-4xl font-bold text-center text-slate-900 mb-12">
      The 3-Step Path to Healthier Crops
    </h2>
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {/* Feature 1: Photo Capture */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
        <Camera className="h-8 w-8 text-emerald-600 mb-3" />
        <h3 className="text-xl font-semibold mb-2">
          1. Capture Symptomatic Leaves
        </h3>
        <p className="text-slate-600">
          Use your phone or a digital camera to take clear, close-up photos of
          leaves showing symptoms of stress or disease.
        </p>
      </div>

      {/* Feature 2: AI Processing */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
        <Microscope className="h-8 w-8 text-emerald-600 mb-3" />
        <h3 className="text-xl font-semibold mb-2">
          2. Instant AI Lab Analysis
        </h3>
        <p className="text-slate-600">
          Our advanced computer vision model analyzes the visual patterns, color
          spectrum, and lesion shape to identify the exact pathogen or
          deficiency.
        </p>
      </div>

      {/* Feature 3: Actionable Output */}
      <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition duration-300">
        <Shield className="h-8 w-8 text-emerald-600 mb-3" />
        <h3 className="text-xl font-semibold mb-2">
          3. Get a Specific Treatment Plan
        </h3>
        <p className="text-slate-600">
          Receive a clear, specific recommendation, including required
          nutrients, pesticides, or cultural practices, tailored to your
          diagnosis.
        </p>
      </div>
    </div>
  </section>
);

// --- CTA / Trust Section ---
const CTATrustSection = () => (
  <section className="bg-slate-50 py-16 px-6 md:px-10">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-slate-900">
        Stop Guessing. Start Treating. Guaranteed Results.
      </h2>
      <p className="text-lg text-slate-600 mt-4">
        Accurate diagnosis leads to timely action, saving you yield and money.
      </p>
      <div className="mt-8 flex justify-center space-x-8">
        <p className="flex items-center text-slate-700 font-medium gap-2">
          <Shield className="h-5 w-5 text-emerald-600" /> Secure Diagnosis
          History
        </p>
        <p className="flex items-center text-slate-700 font-medium gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" /> Dedicated
          Agronomist Support
        </p>
      </div>
    </div>
  </section>
);

// --- CONTACT / FOOTER ---
const Footer = () => (
  <footer id="demo" className="bg-slate-800 text-white py-12 px-6 md:px-10">
    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
      {/* Branding and Contact Form */}
      <div className="col-span-2 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            AgriVision AI
          </span>
        </div>
        <p className="text-slate-400">
          Ready to see the difference? Contact our sales team today.
        </p>
        <form className="space-y-3">
          <Input
            type="email"
            placeholder="Your Email Address"
            className="w-full bg-slate-700 border-slate-600 text-white focus:ring-emerald-500"
          />
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2">
            Schedule Demo <ChevronRight className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Navigation Links */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-200">Product</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>
            <a href="/dashboard" className="hover:text-emerald-400">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/analysis" className="hover:text-emerald-400">
              Leaf Analysis
            </a>
          </li>
          <li>
            <a href="#features" className="hover:text-emerald-400">
              How It Works
            </a>
          </li>
        </ul>
      </div>

      {/* Company Links */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-200">Company</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>
            <a href="#" className="hover:text-emerald-400">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400">
              Careers
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-emerald-400">
              Terms & Privacy
            </a>
          </li>
        </ul>
      </div>

      {/* Support Links */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-200">Support</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>
            <a href="#" className="hover:text-emerald-400">
              Help Center
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-emerald-400">
              Contact Sales
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-10 pt-6 border-t border-slate-700 text-center text-sm text-slate-500">
      &copy; {new Date().getFullYear()} AgriVision AI. All rights reserved.
    </div>
  </footer>
);

// --- MAIN LANDING PAGE COMPONENT ---
export default function LandingPage() {
  return (
    <div className="min-h-screen antialiased">
      <Header />
      <main>
        <HeroSection />
        <FeatureBlock />
        <CTATrustSection />
      </main>
      <Footer />
    </div>
  );
}
