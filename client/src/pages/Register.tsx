import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/lib/api";
import {
  Stethoscope,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  GraduationCap,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student" as "student" | "instructor",
    specialization: "",
    institution: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Client-side validation
    if (form.password !== form.confirmPassword) {
      setFieldErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    if (form.password.length < 8) {
      setFieldErrors({ password: "Password must be at least 8 characters" });
      return;
    }

    setLoading(true);

    try {
      await register({
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role,
        specialization: form.specialization || undefined,
        institution: form.institution || undefined,
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.details) {
          const errors: Record<string, string> = {};
          err.details.forEach((d) => {
            errors[d.field] = d.message;
          });
          setFieldErrors(errors);
        } else {
          setError(err.message);
        }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Decorative panel */}
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
            Join the Future of
            <br />
            <span className="text-[#A7EBF2]">Radiology Learning</span>
          </h2>
          <p className="text-[#A7EBF2]/70 max-w-sm mx-auto">
            Join thousands of medical professionals advancing their radiology skills with our
            AI-powered platform.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-6 max-w-xs mx-auto">
            {[
              { value: "10K+", label: "Cases" },
              { value: "5K+", label: "Learners" },
              { value: "98%", label: "Pass Rate" },
              { value: "50+", label: "Modalities" },
            ].map((stat) => (
              <div key={stat.label} className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                <p className="text-xl font-bold text-[#A7EBF2]">{stat.value}</p>
                <p className="text-xs text-[#A7EBF2]/50">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
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
            <h1 className="text-3xl font-bold text-[#011C40]">Create your account</h1>
            <p className="mt-2 text-[#26658C]/70">
              Start your radiology learning journey today
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#023859]">First Name</Label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                  />
                  <Input
                    placeholder="John"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    required
                    className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                  />
                </div>
                {fieldErrors.firstName && (
                  <p className="text-xs text-red-500">{fieldErrors.firstName}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#023859]">Last Name</Label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                  />
                  <Input
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    required
                    className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                  />
                </div>
                {fieldErrors.lastName && (
                  <p className="text-xs text-red-500">{fieldErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#023859]">Email</Label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                  className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                />
              </div>
              {fieldErrors.email && (
                <p className="text-xs text-red-500">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#023859]">Password</Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
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
              {fieldErrors.password && (
                <p className="text-xs text-red-500">{fieldErrors.password}</p>
              )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#023859]">Confirm Password</Label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  required
                  className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                />
              </div>
              {fieldErrors.confirmPassword && (
                <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-[#023859]">I am a...</Label>
              <div className="grid grid-cols-2 gap-3">
                {(["student", "instructor"] as const).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => updateField("role", role)}
                    className={`p-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center gap-2 ${
                      form.role === role
                        ? "border-[#54ACBF] bg-[#54ACBF]/10 text-[#023859]"
                        : "border-[#A7EBF2]/20 text-[#26658C]/60 hover:border-[#A7EBF2]/40"
                    }`}
                  >
                    <GraduationCap size={16} />
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#023859]">
                  Specialization <span className="text-[#54ACBF]/40">(optional)</span>
                </Label>
                <div className="relative">
                  <Stethoscope
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                  />
                  <Input
                    placeholder="e.g. Neuroradiology"
                    value={form.specialization}
                    onChange={(e) => updateField("specialization", e.target.value)}
                    className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-[#023859]">
                  Institution <span className="text-[#54ACBF]/40">(optional)</span>
                </Label>
                <div className="relative">
                  <Building2
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]/60"
                  />
                  <Input
                    placeholder="e.g. Johns Hopkins"
                    value={form.institution}
                    onChange={(e) => updateField("institution", e.target.value)}
                    className="pl-10 py-2.5 rounded-xl border-[#A7EBF2]/30 focus:border-[#54ACBF] focus:ring-2 focus:ring-[#54ACBF]/20"
                  />
                </div>
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
                  Create Account <ArrowRight size={16} />
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-[#26658C]/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#54ACBF] hover:text-[#26658C] transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
