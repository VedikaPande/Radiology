import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import {
  Stethoscope,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
            >
              <Stethoscope size={22} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-xl text-[#011C40]">Medvision</p>
              <p className="text-xs text-[#54ACBF]">Medical Platform</p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-3xl font-bold text-[#011C40]">Welcome back</h1>
            <p className="mt-2 text-[#26658C]/70">
              Sign in to continue your radiology learning journey
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-[#023859]">
                Email
              </Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-[#023859]">
                Password
              </Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60 hover:text-[#54ACBF]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-base font-semibold h-auto"
              style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#26658C]/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#54ACBF] hover:text-[#26658C] transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Right: Decorative panel */}
      <div
        className="hidden lg:flex flex-1 items-center justify-center relative"
        style={{
          background: "linear-gradient(135deg, #011C40 0%, #023859 40%, #26658C 100%)",
        }}
      >
        <div className="text-center px-12 space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center bg-white/10 backdrop-blur-sm">
            <Stethoscope size={40} className="text-[#A7EBF2]" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Master Radiology
            <br />
            <span className="text-[#A7EBF2]">With Intelligence</span>
          </h2>
          <p className="text-[#A7EBF2]/70 max-w-sm mx-auto">
            AI-powered radiology learning platform with image analysis, board-style questions, and
            real-time analytics.
          </p>
        </div>
      </div>
    </div>
  );
}
