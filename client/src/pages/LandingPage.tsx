import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  Brain,
  ScanLine,
  BookOpen,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
  Users,
  Zap,
  ChevronRight,
  Heart,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ScanLine,
    title: "AI Image Analysis",
    description:
      "Upload DICOM images and get AI-powered analysis with confidence scores and automated findings detection.",
    color: "#A7EBF2",
    bg: "rgba(167, 235, 242, 0.12)",
  },
  {
    icon: Brain,
    title: "Smart Case Library",
    description:
      "Browse thousands of curated radiology cases organized by modality, difficulty, and diagnosis.",
    color: "#54ACBF",
    bg: "rgba(84, 172, 191, 0.12)",
  },
  {
    icon: BookOpen,
    title: "Interactive Flashcards",
    description:
      "Rapid-fire concept review with spaced repetition to solidify your radiology knowledge.",
    color: "#26658C",
    bg: "rgba(38, 101, 140, 0.1)",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track your learning progress, accuracy rates, and study streaks with detailed visual analytics.",
    color: "#54ACBF",
    bg: "rgba(84, 172, 191, 0.12)",
  },
  {
    icon: Shield,
    title: "Board-Style Questions",
    description:
      "Practice with curated MCQs modeled after board exams with detailed explanations for every answer.",
    color: "#023859",
    bg: "rgba(2, 56, 89, 0.08)",
  },
  {
    icon: Sparkles,
    title: "AI Study Assistant",
    description:
      "Get personalized study recommendations and instant explanations powered by advanced AI models.",
    color: "#26658C",
    bg: "rgba(38, 101, 140, 0.1)",
  },
];

const stats = [
  { value: "10,000+", label: "Radiology Cases" },
  { value: "5,000+", label: "Active Learners" },
  { value: "98%", label: "Pass Rate" },
  { value: "50+", label: "Modalities" },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-16 py-6">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-luna"
            style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
          >
            <Stethoscope size={20} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg gradient-text-luna">Medvision</p>
            <p className="text-[11px] text-[#54ACBF] -mt-0.5 tracking-wide">
              Medical Platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/login")}
            variant="ghost"
            className="text-sm text-[#023859] hover:text-[#011C40] hover:bg-[#A7EBF2]/15 rounded-2xl"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="btn-luna px-6 py-2.5 rounded-2xl text-sm font-semibold"
          >
            Get Started <ArrowRight size={14} />
          </Button>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-28 text-center">
        <h1 className="animate-fade-in-up text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
          <span className="text-[#011C40]">Master Radiology</span>
          <br />
          <span className="gradient-text">With Intelligence</span>
        </h1>

        <p className="animate-fade-in-up-delay-1 mt-8 text-lg md:text-xl text-[#26658C]/70 max-w-2xl mx-auto leading-relaxed">
          The most advanced AI-assisted radiology learning platform. Analyze
          images, practice board-style questions, and track your progress — all
          in one beautiful interface.
        </p>

        <div className="animate-fade-in-up-delay-2 mt-12 flex items-center justify-center gap-4 flex-wrap">
          <Button
            onClick={() => navigate("/register")}
            className="btn-luna px-8 py-3.5 rounded-2xl text-base font-semibold h-auto"
          >
            <Zap size={18} className="mr-2" />
            Start Learning Free
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/login")}
            className="px-8 py-3.5 rounded-2xl text-base font-semibold border-[#A7EBF2]/50 text-[#023859] hover:bg-[#A7EBF2]/10 h-auto"
          >
            Sign In
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>

        {/* Hero illustration */}
        <div className="animate-fade-in-up-delay-3 mt-20 relative max-w-4xl mx-auto">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #54ACBF 0%, #26658C 45%, #023859 80%, #011C40 100%)",
              boxShadow: "0 25px 80px rgba(2,56,89,0.3), 0 8px 30px rgba(38,101,140,0.15)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(167,235,242,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 20%, rgba(167,235,242,0.08) 0%, transparent 50%)`,
              }}
            />
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#A7EBF2]/5" />
            <div className="absolute -bottom-16 right-24 w-48 h-48 rounded-full bg-[#A7EBF2]/5" />

            <div className="relative z-10 flex items-center justify-between flex-wrap gap-8 p-10 md:p-16">
              <div className="max-w-md text-left">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                  style={{ background: "rgba(167,235,242,0.15)", backdropFilter: "blur(8px)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#A7EBF2] animate-pulse" />
                  <span className="text-xs text-white/90 font-medium">AI Engine Active</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Intelligent Analysis
                  <br />
                  <span className="text-[#A7EBF2]/70">In Real-Time</span>
                </h2>
                <p className="text-white/50 text-sm mt-5 leading-relaxed max-w-sm">
                  Our deep learning models analyze radiological images with 98%
                  accuracy, providing instant feedback and educational insights.
                </p>
                <div className="flex gap-3 mt-7">
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Activity size={15} className="text-[#A7EBF2]" />
                    <span className="text-white text-sm font-medium">12 New Cases</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                    <Heart size={15} className="text-[#A7EBF2]/70" />
                    <span className="text-white text-sm font-medium">3 Flagged</span>
                  </div>
                </div>
              </div>

              {/* Right — Floating brain */}
              <div className="float-anim flex-shrink-0 relative hidden md:block">
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(167,235,242,0.08)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(167,235,242,0.15)",
                    boxShadow: "0 0 60px rgba(167,235,242,0.1), inset 0 0 30px rgba(167,235,242,0.03)",
                  }}
                >
                  <div className="relative w-28 h-28">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: "radial-gradient(ellipse at 35% 35%, rgba(167,235,242,0.6) 0%, rgba(84,172,191,0.4) 40%, rgba(38,101,140,0.3) 100%)",
                        filter: "blur(1px)",
                      }}
                    />
                    <div
                      className="absolute inset-2 rounded-full"
                      style={{
                        background: "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.5) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain size={40} className="text-white/80 drop-shadow-lg" />
                    </div>
                  </div>

                  {[
                    { angle: 30, label: "98%", sub: "Accuracy", bg: "#54ACBF" },
                    { angle: 150, label: "3s", sub: "Scan", bg: "#26658C" },
                    { angle: 270, label: "AI", sub: "Verified", bg: "#023859" },
                  ].map(({ angle, label, sub, bg }, i) => {
                    const rad = (angle * Math.PI) / 180;
                    const r = 90;
                    const x = 96 + r * Math.cos(rad);
                    const y = 96 + r * Math.sin(rad);
                    return (
                      <div key={i} className="absolute" style={{ left: x - 24, top: y - 20 }}>
                        <div
                          className="w-12 text-center px-1.5 py-1 rounded-xl"
                          style={{ background: bg, boxShadow: "0 2px 8px rgba(1,28,64,0.25)" }}
                        >
                          <p className="text-white text-xs font-bold leading-none">{label}</p>
                          <p className="text-white/60 text-[9px] leading-tight">{sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="glass-strong rounded-3xl p-7 text-center card-hover">
              <p className="text-3xl font-extrabold gradient-text-luna">{value}</p>
              <p className="text-sm text-[#26658C]/60 mt-1.5 font-medium">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#011C40]">
            Everything You Need to <span className="gradient-text">Excel</span>
          </h2>
          <p className="mt-4 text-[#26658C]/60 text-lg max-w-xl mx-auto">
            A comprehensive suite of AI-powered tools designed for radiology
            education and practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <Card
              key={title}
              className="glass-strong rounded-3xl border-0 card-hover cursor-pointer overflow-hidden group"
            >
              <CardContent className="p-7">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: bg }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="text-lg font-bold text-[#011C40] mb-2">{title}</h3>
                <p className="text-sm text-[#26658C]/60 leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28">
        <div
          className="rounded-3xl p-12 md:p-16 text-center overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #54ACBF 0%, #26658C 40%, #023859 75%, #011C40 100%)",
            boxShadow: "0 20px 60px rgba(2,56,89,0.35), 0 4px 20px rgba(38,101,140,0.15)",
          }}
        >
          <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#A7EBF2]/5" />
          <div className="absolute -bottom-16 left-10 w-48 h-48 rounded-full bg-[#A7EBF2]/5" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
              Ready to Transform Your
              <br />
              Radiology Education?
            </h2>
            <p className="text-[#A7EBF2]/60 text-lg max-w-lg mx-auto mb-10">
              Join thousands of radiologists and residents who are already
              learning smarter with AI.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button
                onClick={() => navigate("/dashboard")}
                className="px-8 py-3.5 rounded-2xl text-base font-semibold text-[#023859] bg-white hover:bg-white/90 h-auto shadow-luna-lg"
              >
                <Users size={18} className="mr-2" />
                Get Started Today
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/browse-cases")}
                className="px-8 py-3.5 rounded-2xl text-base font-semibold text-white border-white/20 bg-white/8 hover:bg-white/15 h-auto backdrop-blur-sm"
              >
                Explore Cases
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-[#A7EBF2]/20 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
          >
            <Stethoscope size={14} className="text-white" />
          </div>
          <span className="font-bold gradient-text-luna">Medvision</span>
        </div>
        <p className="text-xs text-[#54ACBF]/50">
          © 2026 Medvision. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
