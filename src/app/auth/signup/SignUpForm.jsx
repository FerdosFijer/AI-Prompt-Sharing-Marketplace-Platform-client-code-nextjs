"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card } from "@heroui/react";
import { Person, At, Picture, Lock, ArrowRight, ShieldCheck, Eye, EyeSlash } from "@gravity-ui/icons";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing again
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (generalError) setGeneralError("");
  };

  // Client-Side Validation Logic
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccess("");

    // Prevent sign-up if client validation fails
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image || undefined,
        role: "user",
      });

      if (authError) {
        const msg = authError.message?.toLowerCase() || "";
        
        // Map backend errors directly under specific fields if applicable
        if (msg.includes("email") || msg.includes("user already exists") || msg.includes("exist")) {
          setFieldErrors((prev) => ({ ...prev, email: "This email is already registered." }));
        } else if (msg.includes("password")) {
          setFieldErrors((prev) => ({ ...prev, password: authError.message }));
        } else if (msg.includes("name")) {
          setFieldErrors((prev) => ({ ...prev, name: authError.message }));
        } else {
          setGeneralError(authError.message || "Failed to create account. Please try again.");
        }
      } else {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setGeneralError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGeneralError("");
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setGeneralError("Failed to authenticate with Google.");
    }
  };

  return (
    <Card className="border border-white/10 bg-[#090b1e]/70 backdrop-blur-xl shadow-2xl p-2 sm:p-4 rounded-3xl">
      <div className="flex flex-col gap-5">
        {/* Header / Brand */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-950/30 px-3 py-1 text-xs text-purple-300 backdrop-blur-md mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-purple-400" />
            <span>Join Aiverse Today</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Create an Account</h1>
          <p className="text-xs text-default-400 mt-1">Unlock engineering-grade prompts & resources</p>
        </div>

        {/* Global Error & Success Alerts */}
        {generalError && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/40 p-3 text-center text-xs text-rose-300 font-medium animate-in fade-in duration-200">
            {generalError}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-center text-xs text-emerald-300 font-medium animate-in fade-in duration-200">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-1" noValidate>
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <div
              className={`relative flex items-center rounded-xl border px-3 transition-all h-11 ${
                fieldErrors.name
                  ? "border-rose-500/80 bg-rose-950/20"
                  : "border-white/10 bg-white/3 hover:border-purple-500/40 focus-within:border-purple-500/60 focus-within:ring-1 focus-within:ring-purple-500/30"
              }`}
            >
              <Person className={`h-4 w-4 shrink-0 mr-2.5 ${fieldErrors.name ? "text-rose-400" : "text-default-400"}`} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white placeholder:text-default-500 outline-none border-none focus:outline-none focus:ring-0"
              />
            </div>
            {fieldErrors.name && (
              <span className="text-[11px] text-rose-400 pl-1 font-medium animate-in fade-in duration-150">
                {fieldErrors.name}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <div
              className={`relative flex items-center rounded-xl border px-3 transition-all h-11 ${
                fieldErrors.email
                  ? "border-rose-500/80 bg-rose-950/20"
                  : "border-white/10 bg-white/3 hover:border-purple-500/40 focus-within:border-purple-500/60 focus-within:ring-1 focus-within:ring-purple-500/30"
              }`}
            >
              <At className={`h-4 w-4 shrink-0 mr-2.5 ${fieldErrors.email ? "text-rose-400" : "text-default-400"}`} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white placeholder:text-default-500 outline-none border-none focus:outline-none focus:ring-0"
              />
            </div>
            {fieldErrors.email && (
              <span className="text-[11px] text-rose-400 pl-1 font-medium animate-in fade-in duration-150">
                {fieldErrors.email}
              </span>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="flex flex-col gap-1">
            <div
              className={`relative flex items-center rounded-xl border px-3 transition-all h-11 ${
                fieldErrors.image
                  ? "border-rose-500/80 bg-rose-950/20"
                  : "border-white/10 bg-white/3 hover:border-purple-500/40 focus-within:border-purple-500/60 focus-within:ring-1 focus-within:ring-purple-500/30"
              }`}
            >
              <Picture className="h-4 w-4 text-default-400 shrink-0 mr-2.5" />
              <input
                type="url"
                name="image"
                placeholder="Avatar / Photo URL (Optional)"
                value={formData.image}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white placeholder:text-default-500 outline-none border-none focus:outline-none focus:ring-0"
              />
            </div>
            {fieldErrors.image && (
              <span className="text-[11px] text-rose-400 pl-1 font-medium animate-in fade-in duration-150">
                {fieldErrors.image}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div
              className={`relative flex items-center rounded-xl border px-3 transition-all h-11 ${
                fieldErrors.password
                  ? "border-rose-500/80 bg-rose-950/20"
                  : "border-white/10 bg-white/3 hover:border-purple-500/40 focus-within:border-purple-500/60 focus-within:ring-1 focus-within:ring-purple-500/30"
              }`}
            >
              <Lock className={`h-4 w-4 shrink-0 mr-2.5 ${fieldErrors.password ? "text-rose-400" : "text-default-400"}`} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (Min. 8 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent text-xs text-white placeholder:text-default-500 outline-none border-none focus:outline-none focus:ring-0 pr-2"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-default-400 hover:text-white transition-colors focus:outline-none"
              >
                {showPassword ? <EyeSlash className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <span className="text-[11px] text-rose-400 pl-1 font-medium animate-in fade-in duration-150">
                {fieldErrors.password}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={loading}
            className="mt-2 w-full bg-purple-600 font-medium text-white hover:bg-purple-500 rounded-xl shadow-lg shadow-purple-900/40 text-xs sm:text-sm h-11 transition-all"
            endContent={!loading && <ArrowRight className="h-4 w-4" />}
          >
            Sign Up
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-1">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#0b0d23] px-3 text-[11px] text-default-500 uppercase tracking-wider">
            Or
          </span>
        </div>

        {/* Google OAuth Button */}
        <Button
          onPress={handleGoogleSignIn}
          variant="bordered"
          className="w-full flex items-center justify-center gap-2 border-white/10 bg-white/3 font-medium text-white hover:bg-white/10 rounded-xl text-xs sm:text-sm h-11 transition-all"
        >
          <FaGoogle className="h-4 w-4 text-white" />
          <span>Sign in with Google</span>
        </Button>

        {/* Navigation Link to Sign In */}
        <div className="text-center mt-2">
          <p className="text-xs text-default-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-semibold text-purple-400 hover:text-purple-300 transition-all underline underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
}