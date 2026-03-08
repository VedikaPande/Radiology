import { useTheme } from "@/context/AppContext";
import {
  TrendingUp,
  Users,
  FolderOpen,
  ClipboardCheck,
  ArrowUpRight,
  Zap,
  Activity,
  Brain,
  Heart,
  Wind,
  ScanLine as ScanLineIcon,
  FileQuestion as FileQuestionIcon,
  BookOpen as BookOpenIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* ── Stat card ── */
function StatCard({
  icon: Icon,
  label,
  value,
  change,
  dark,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  dark: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl p-6 flex flex-col gap-3 cursor-pointer card-hover",
        dark
          ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
          : "bg-white/70 border border-[#A7EBF2]/20 shadow-luna"
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(84, 172, 191, 0.12)" }}
        >
          <Icon size={18} className="text-[#26658C]" />
        </div>
        <span className="flex items-center gap-0.5 text-xs font-semibold text-emerald-500">
          <ArrowUpRight size={13} />
          {change}
        </span>
      </div>
      <div>
        <p className={cn("text-2xl font-bold tracking-tight", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
          {value}
        </p>
        <p className={cn("text-xs font-medium mt-0.5", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          {label}
        </p>
      </div>
    </div>
  );
}

/* ── Quick-action pill ── */
function ActionPill({
  label,
  icon: Icon,
  onClick,
}: {
  label: string;
  icon: React.ElementType;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center gap-2.5 py-5 px-3 rounded-3xl text-white text-xs font-semibold card-hover"
      style={{
        background: "linear-gradient(135deg, #54ACBF, #26658C)",
        boxShadow: "0 4px 20px rgba(38,101,140,0.2)",
      }}
    >
      <Icon size={20} />
      <span className="text-center leading-tight">{label}</span>
    </button>
  );
}

const CASES = [
  { id: "CX-4821", type: "Chest X-Ray", status: "Pending", sev: "Medium", time: "2m" },
  { id: "CT-3017", type: "Brain CT", status: "Reviewed", sev: "High", time: "15m" },
  { id: "MR-0892", type: "Spine MRI", status: "Reviewed", sev: "Low", time: "42m" },
  { id: "CX-4819", type: "Chest X-Ray", status: "Pending", sev: "Low", time: "1hr" },
];

const sevStyle: Record<string, { dot: string; badge: string }> = {
  High: { dot: "bg-rose-400", badge: "bg-rose-50 text-rose-600" },
  Medium: { dot: "bg-amber-400", badge: "bg-amber-50 text-amber-600" },
  Low: { dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-600" },
};

export default function Dashboard() {
  const { dark } = useTheme();
  const navigate = useNavigate();

  const glassCard = cn(
    "rounded-3xl",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/70 border border-[#A7EBF2]/20 shadow-luna"
  );

  return (
    <div className="relative space-y-7 z-10">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className={cn("text-xs font-semibold tracking-widest uppercase mb-1", dark ? "text-[#54ACBF]" : "text-[#54ACBF]")}>
            Good afternoon
          </p>
          <h1 className={cn("text-3xl font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            Dr. Vedika
          </h1>
          <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
            Here's your radiology overview for today.
          </p>
        </div>
        <Button className="btn-luna px-5 py-2.5 rounded-2xl text-sm font-semibold">
          <Zap size={14} className="mr-1" /> Quick Case
        </Button>
      </div>

      {/* ── HERO CARD ── */}
      <div
        className="relative w-full rounded-3xl overflow-hidden card-hover"
        style={{
          background: "linear-gradient(135deg, #54ACBF 0%, #26658C 40%, #023859 70%, #011C40 100%)",
          boxShadow: "0 20px 60px rgba(2,56,89,0.3), 0 4px 20px rgba(38,101,140,0.15)",
          minHeight: 220,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(167,235,242,0.12) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(167,235,242,0.06) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#A7EBF2]/5" />
        <div className="absolute -bottom-16 right-24 w-48 h-48 rounded-full bg-[#A7EBF2]/4" />

        <div className="relative z-10 flex items-center justify-between flex-wrap gap-6 p-8 md:p-10">
          <div className="max-w-md">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5"
              style={{ background: "rgba(167,235,242,0.12)", backdropFilter: "blur(8px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#A7EBF2] animate-pulse" />
              <span className="text-xs text-white/80 font-medium">AI Analysis Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Intelligent Radiology
              <br />
              <span className="text-[#A7EBF2]/60">Powered by Deep Learning</span>
            </h2>
            <p className="text-white/50 text-sm mt-3 leading-relaxed">
              Your AI assistant has pre-analyzed 12 new cases.
              <br />3 flagged for priority review.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate("/image-analysis")}
                className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-[#023859] transition-all hover:-translate-y-0.5 bg-white/90 shadow-luna"
              >
                View Analysis
              </button>
              <button
                onClick={() => navigate("/browse-cases")}
                className="px-5 py-2.5 rounded-2xl text-sm font-semibold text-white border transition-all hover:-translate-y-0.5 bg-white/8 border-white/15 backdrop-blur-sm"
              >
                Browse Cases
              </button>
            </div>
          </div>

          {/* Right — Brain illustration */}
          <div className="float-anim flex-shrink-0 relative hidden md:block">
            <div
              className="w-44 h-44 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(167,235,242,0.08)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(167,235,242,0.12)",
                boxShadow: "0 0 60px rgba(167,235,242,0.08), inset 0 0 30px rgba(167,235,242,0.03)",
              }}
            >
              <div className="relative w-28 h-28">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(ellipse at 35% 35%, rgba(167,235,242,0.7) 0%, rgba(84,172,191,0.4) 40%, rgba(38,101,140,0.3) 100%)",
                    filter: "blur(1px)",
                  }}
                />
                <div
                  className="absolute inset-2 rounded-full"
                  style={{ background: "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)" }}
                />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15 -translate-y-1/2" />
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/12 -translate-x-1/2" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain size={36} className="text-white/80 drop-shadow-lg" />
                </div>
              </div>

              {[
                { angle: 30, label: "98%", sublabel: "Confidence", bg: "#54ACBF" },
                { angle: 150, label: "3s", sublabel: "Scan time", bg: "#26658C" },
                { angle: 270, label: "AI", sublabel: "Verified", bg: "#023859" },
              ].map(({ angle, label, sublabel, bg }, i) => {
                const rad = (angle * Math.PI) / 180;
                const r = 82;
                const x = 88 + r * Math.cos(rad);
                const y = 88 + r * Math.sin(rad);
                return (
                  <div key={i} className="absolute" style={{ left: x - 24, top: y - 20 }}>
                    <div
                      className="w-12 text-center px-1.5 py-1 rounded-xl"
                      style={{ background: bg, boxShadow: "0 2px 8px rgba(1,28,64,0.25)" }}
                    >
                      <p className="text-white text-xs font-bold leading-none">{label}</p>
                      <p className="text-white/60 text-[9px] leading-tight">{sublabel}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard dark={dark} icon={FolderOpen} label="Total Cases" value="3,842" change="+12%" />
        <StatCard dark={dark} icon={Users} label="Active Learners" value="1,269" change="+8%" />
        <StatCard dark={dark} icon={ClipboardCheck} label="Pending Reviews" value="47" change="-5%" />
        <StatCard dark={dark} icon={TrendingUp} label="Avg. Accuracy" value="78.4%" change="+3%" />
      </div>

      {/* ── Bottom row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Cases */}
        <div className={cn("lg:col-span-2 p-6 card-hover", glassCard)}>
          <div className="flex items-center justify-between mb-5">
            <h2 className={cn("text-base font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
              Recent Cases
            </h2>
            <button
              onClick={() => navigate("/browse-cases")}
              className="gradient-text-luna text-xs font-semibold flex items-center gap-1"
            >
              View all <ArrowUpRight size={13} />
            </button>
          </div>
          <div className="space-y-3">
            {CASES.map((c) => (
              <div
                key={c.id}
                className={cn(
                  "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all cursor-pointer",
                  dark ? "bg-[#A7EBF2]/3 hover:bg-[#A7EBF2]/6" : "bg-[#A7EBF2]/6 hover:bg-[#A7EBF2]/12"
                )}
              >
                <div className={cn("w-2 h-2 rounded-full flex-shrink-0", sevStyle[c.sev].dot)} />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-bold", dark ? "text-[#A7EBF2]" : "text-[#26658C]")}>
                    {c.id}
                  </p>
                  <p className={cn("text-xs truncate", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/50")}>
                    {c.type}
                  </p>
                </div>
                <Badge className={cn("text-xs px-2.5 py-0.5 rounded-full font-medium", sevStyle[c.sev].badge)}>
                  {c.sev}
                </Badge>
                <Badge
                  className={cn(
                    "text-xs px-2.5 py-0.5 rounded-full font-medium",
                    c.status === "Pending"
                      ? dark ? "bg-[#023859] text-[#A7EBF2]" : "bg-[#A7EBF2]/20 text-[#26658C]"
                      : dark ? "bg-[#A7EBF2]/5 text-[#54ACBF]/60" : "bg-slate-50 text-slate-500"
                  )}
                >
                  {c.status}
                </Badge>
                <span className={cn("text-xs ml-1", dark ? "text-[#54ACBF]/40" : "text-[#26658C]/40")}>
                  {c.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Quick Actions */}
          <div className={cn("p-5 card-hover", glassCard)}>
            <h2 className={cn("text-sm font-bold mb-4", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
              Quick Actions
            </h2>
            <div className="flex gap-2">
              <ActionPill label="Image Analysis" icon={ScanLineIcon} onClick={() => navigate("/image-analysis")} />
              <ActionPill label="Questions" icon={FileQuestionIcon} onClick={() => navigate("/radiology-questions")} />
              <ActionPill label="Flashcards" icon={BookOpenIcon} onClick={() => navigate("/flashcards")} />
            </div>
          </div>

          {/* Today's Progress */}
          <div className={cn("p-5 flex-1 card-hover", glassCard)}>
            <div className="flex items-center gap-2 mb-4">
              <Activity size={15} className="text-[#54ACBF]" />
              <h2 className={cn("text-sm font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                Today's Progress
              </h2>
            </div>
            {[
              { label: "Cases Reviewed", val: 12, max: 20 },
              { label: "Questions", val: 28, max: 50 },
              { label: "Flashcards", val: 45, max: 60 },
            ].map(({ label, val, max }) => (
              <div key={label} className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60"}>{label}</span>
                  <span className={cn("font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                    {val}<span className="font-normal text-[#54ACBF]/50">/{max}</span>
                  </span>
                </div>
                <div className={cn("h-2 rounded-full overflow-hidden", dark ? "bg-[#A7EBF2]/6" : "bg-[#A7EBF2]/15")}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(val / max) * 100}%`,
                      background: "linear-gradient(90deg, #54ACBF, #26658C)",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Vital indicators */}
            <div className="grid grid-cols-3 gap-2 mt-5">
              {[
                { icon: Heart, label: "HR", val: "72", unit: "bpm", color: "text-[#54ACBF]" },
                { icon: Wind, label: "O2", val: "98", unit: "%", color: "text-[#26658C]" },
                { icon: Brain, label: "AI", val: "99", unit: "%", color: "text-[#023859]" },
              ].map(({ icon: Icon, label, val, unit, color }) => (
                <div
                  key={label}
                  className={cn(
                    "rounded-2xl p-2.5 text-center",
                    dark ? "bg-[#A7EBF2]/5" : "bg-[#A7EBF2]/8"
                  )}
                >
                  <Icon size={14} className={cn("mx-auto mb-0.5", color)} />
                  <p className={cn("text-sm font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                    {val}<span className="text-xs font-normal">{unit}</span>
                  </p>
                  <p className={cn("text-xs", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/50")}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
