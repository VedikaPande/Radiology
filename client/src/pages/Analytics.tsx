import { useTheme } from "@/context/AppContext";
import { BarChart3, Brain, CheckCircle2, Clock, Star, Target, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const stats = [
  { label: "Cases Studied", value: 248, icon: Brain, change: "+12%" },
  { label: "Accuracy", value: "82%", icon: Target, change: "+3.2%" },
  { label: "Study Streak", value: "12 days", icon: Zap, change: "+2 days" },
  { label: "Time This Week", value: "14.5h", icon: Clock, change: "+1.3h" },
];

const weeklyData = [
  { day: "Mon", value: 65 },
  { day: "Tue", value: 80 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 70 },
  { day: "Sat", value: 40 },
  { day: "Sun", value: 85 },
];

const modalities = [
  { label: "CT", accuracy: 88, cases: 96 },
  { label: "MRI", accuracy: 79, cases: 64 },
  { label: "X-Ray", accuracy: 85, cases: 54 },
  { label: "Ultrasound", accuracy: 72, cases: 34 },
];

const achievements = [
  { icon: Trophy, label: "First 100 Cases", done: true },
  { icon: Star, label: "7-Day Streak", done: true },
  { icon: CheckCircle2, label: "90% CT Accuracy", done: false },
];

export default function Analytics() {
  const { dark } = useTheme();

  const card = cn(
    "rounded-2xl p-5 transition-all",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/80 border border-[#A7EBF2]/15 shadow-luna"
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
          <BarChart3 size={22} className="text-[#54ACBF]" /> Analytics
        </h1>
        <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          Track your radiology learning progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={card}>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(84,172,191,0.12)" }}
              >
                <s.icon size={16} className="text-[#54ACBF]" />
              </span>
            </div>
            <p className={cn("text-xl font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{s.value}</p>
            <p className={cn("text-xs", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/60")}>{s.label}</p>
            <span className="text-xs text-emerald-500 font-medium">{s.change}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Weekly Activity Chart */}
        <div className={cn(card, "lg:col-span-3")}>
          <h2 className={cn("text-sm font-semibold mb-5", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            Weekly Activity
          </h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((d) => {
              const maxH = 140;
              const h = (d.value / 100) * maxH;
              return (
                <div key={d.day} className="flex flex-col items-center flex-1 gap-1">
                  <div
                    className="w-full rounded-lg transition-all hover:opacity-80"
                    style={{
                      height: h,
                      background: `linear-gradient(to top, #54ACBF, #26658C)`,
                      maxWidth: 36,
                      margin: "0 auto",
                    }}
                  />
                  <span className={cn("text-xs", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/60")}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className={cn(card, "lg:col-span-2")}>
          <h2 className={cn("text-sm font-semibold mb-4", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            Achievements
          </h2>
          <div className="space-y-3">
            {achievements.map((a) => (
              <div
                key={a.label}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-colors",
                  a.done
                    ? dark
                      ? "bg-[#A7EBF2]/5"
                      : "bg-[#A7EBF2]/10"
                    : dark
                    ? "bg-[#A7EBF2]/2"
                    : "bg-[#A7EBF2]/5"
                )}
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    a.done ? "bg-emerald-500/15 text-emerald-500" : "bg-[#54ACBF]/10 text-[#54ACBF]/40"
                  )}
                >
                  <a.icon size={14} />
                </span>
                <span className={cn("text-sm font-medium", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{a.label}</span>
                {a.done && <CheckCircle2 size={13} className="ml-auto text-emerald-500" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modality Accuracy */}
      <div className={card}>
        <h2 className={cn("text-sm font-semibold mb-5", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
          Accuracy by Modality
        </h2>
        <div className="space-y-4">
          {modalities.map((m) => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className={cn("text-sm font-medium", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{m.label}</span>
                <span className={cn("text-xs", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>{m.cases} cases</span>
              </div>
              <div className="relative">
                <Progress value={m.accuracy} className={cn("h-2.5 rounded-full", dark ? "bg-[#A7EBF2]/6" : "bg-[#A7EBF2]/10")} />
                <span
                  className="absolute right-0 -top-5 text-xs font-semibold"
                  style={{ color: "#54ACBF" }}
                >
                  {m.accuracy}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
