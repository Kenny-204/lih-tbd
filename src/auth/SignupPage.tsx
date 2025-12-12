import { UserPlus, Mail, User, MapPin, MinusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type e = {
  code?: string;
  message?: string;
};

function formatFirebaseError(err: unknown) {
  const codeMap: Record<string, string> = {
    "auth/email-already-in-use": "An account already exists with this email.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password":
      "Password is too weak. Please choose a stronger password.",
    "auth/operation-not-allowed":
      "This sign-in method is not enabled. Contact support.",
    "auth/network-request-failed":
      "Network error — check your internet connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };

  try {
    if (typeof err === "object" && err !== null) {
      const e: e = err;
      // Prefer explicit `code` if present (FirebaseError.code)
      if (typeof e.code === "string") {
        const code = e.code.replace("firebase/", "");
        return codeMap[code] ?? `Authentication error: ${code}`;
      }

      // Fallback: parse code from message like "Firebase: Error (auth/xxx)."
      if (typeof e.message === "string") {
        const m: string = e.message;
        const match = m.match(/auth\/[a-z-]+/);
        if (match) {
          const code = match[0];
          return codeMap[code] ?? `Authentication error: ${code}`;
        }
        // Some messages are human-friendly already
        if (m.length < 200) return m;
      }
    }
    if (typeof err === "string") {
      // handle the older message shape
      if (err.includes("network-request-failed"))
        return codeMap["auth/network-request-failed"];
      return err;
    }
  } catch (e) {
    // fall through
  }

  return "An unknown error occurred. Please try again.";
}
export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  type signupData = {
    email: string;
    password: string;
    passwordConfirm: string;
  };

  const form = useForm<signupData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  async function onSubmit(data: signupData) {
    try {
      setLoading(true);
      await signup(data.email, data.password);
      toast.success("Login successful... redirecting");
      navigate("/dashboard/home");
    } catch (err: unknown) {
      toast.error(formatFirebaseError(err));
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Full Name Input */}
      <div className="grid gap-2">
        <Label htmlFor="full-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <Input
            id="full-name"
            placeholder="John Doe"
            className="pl-10"
            required
          />
        </div>
      </div>
      {/* Email Input */}
      <Controller
        name="email"
        control={form.control}
        rules={{ required: "Enter your Email" }}
        render={({ field, fieldState }) => (
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <div className="relative" data-invalid={fieldState.invalid}>
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...field}
                id="signup-email"
                type="email"
                placeholder="me@example.com"
                className="pl-10"
              />
              {fieldState.invalid && (
                <p
                  // Tailwind styling for clarity
                  className="text-sm font-medium text-rose-600 mt-1 flex items-center gap-1.5 animate-in fade-in"
                >
                  <MinusCircle className="h-4 w-4 shrink-0" />
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          </div>
        )}
      />{" "}
      {/* Password Input */}
      <Controller
        name="password"
        control={form.control}
        rules={{ required: "Enter your Password" }}
        render={({ field, fieldState }) => (
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Password</Label>
            <div className="relative" data-invalid={fieldState.invalid}>
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...field}
                id="signup-password"
                type="password"
                className="pl-10"
              />
              {fieldState.invalid && (
                <p
                  // Tailwind styling for clarity
                  className="text-sm font-medium text-rose-600 mt-1 flex items-center gap-1.5 animate-in fade-in"
                >
                  <MinusCircle className="h-4 w-4 shrink-0" />
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          </div>
        )}
      />
      <Controller
        name="passwordConfirm"
        control={form.control}
        rules={{
          required: "Enter your Password Again",
          validate: (value) =>
            value === form.getValues("password") || "Passwords do not match",
        }}
        render={({ field, fieldState }) => (
          <div className="grid gap-2">
            <Label htmlFor="signup-password-confirm">Confirm Password</Label>
            <div className="relative" data-invalid={fieldState.invalid}>
              <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <Input
                {...field}
                id="signup-password-confirm"
                type="password"
                className="pl-10"
              />
              {fieldState.invalid && (
                <p
                  // Tailwind styling for clarity
                  className="text-sm font-medium text-rose-600 mt-1 flex items-center gap-1.5 animate-in fade-in"
                >
                  <MinusCircle className="h-4 w-4 shrink-0" />
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          </div>
        )}
      />
      {/* Farm Location (Example of a required AgTech field) */}
      <div className="grid gap-2">
        <Label htmlFor="farm-location">Primary Farm Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="farm-location"
            placeholder="City, Country"
            className="pl-10"
            required
          />
        </div>
      </div>
      {/* Terms and Conditions (Placeholder for a checkbox) */}
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          id="terms"
          className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          required
        />
        <Label htmlFor="terms" className="text-sm text-slate-600">
          I agree to the{" "}
          <a href="/terms" className="text-emerald-600 hover:text-emerald-700">
            Terms of Service
          </a>
          .
        </Label>
      </div>
      {/* Submit Button */}
      <Button
        className="w-full bg-emerald-600 hover:bg-emerald-700 mt-4 gap-2"
        disabled={loading}
      >
        <UserPlus className="h-4 w-4" /> Create Account
      </Button>
      <Separator className="my-2" />
      {/* Alternative Action */}
      <p className="text-center text-sm text-slate-600">
        Already have an account?
        <a
          href="/auth/login"
          className="text-emerald-600 hover:text-emerald-700 font-medium ml-1"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}
