import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { FolderSearch, Filter, Search, Eye, Tag, ScanLine, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CASES = [
  { id: "CX-4821", type: "Chest X-Ray", difficulty: "Intermediate", tags: ["Pneumonia", "Infiltrate"], views: 214, modIcon: Activity },
  { id: "CT-3017", type: "Brain CT", difficulty: "Advanced", tags: ["Hemorrhage", "Trauma", "Acute"], views: 189, modIcon: ScanLine },
  { id: "MR-0892", type: "Spine MRI", difficulty: "Beginner", tags: ["Disc Herniation", "L4-L5"], views: 97, modIcon: Activity },
  { id: "CT-2201", type: "Abdominal CT", difficulty: "Intermediate", tags: ["Appendicitis", "Inflammation"], views: 143, modIcon: ScanLine },
  { id: "CX-4799", type: "Chest X-Ray", difficulty: "Beginner", tags: ["Normal", "Baseline", "Screening"], views: 302, modIcon: Activity },
  { id: "MR-1103", type: "Knee MRI", difficulty: "Advanced", tags: ["ACL Tear", "Sports Injury"], views: 76, modIcon: Activity },
  { id: "US-8901", type: "Fetal Ultrasound", difficulty: "Beginner", tags: ["20 Week", "Anatomy"], views: 412, modIcon: ScanLine },
  { id: "CT-6642", type: "Chest CT", difficulty: "Advanced", tags: ["Pulmonary Embolism", "Contrast"], views: 156, modIcon: ScanLine },
  { id: "MR-3310", type: "Shoulder MRI", difficulty: "Intermediate", tags: ["Rotator Cuff", "Impingement"], views: 89, modIcon: Activity },
];

const diffColor: Record<string, string> = {
  Beginner: "bg-emerald-50 text-emerald-700",
  Intermediate: "bg-amber-50 text-amber-700",
  Advanced: "bg-rose-50 text-rose-700",
};

export default function BrowseCases() {
  const { dark } = useTheme();
  const [search, setSearch] = useState("");

  const filtered = CASES.filter(
    (c) =>
      c.type.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const card = cn(
    "rounded-2xl p-6 transition-all",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/80 border border-[#A7EBF2]/15 shadow-luna"
  );

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            <FolderSearch size={22} className="text-[#54ACBF]" /> Browse Cases
          </h1>
          <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
            Explore radiology cases by modality, difficulty, and diagnosis.
          </p>
        </div>
        <Button className="btn-luna text-sm font-medium rounded-xl">+ Upload Case</Button>
      </div>

      {/* Search & Filter */}
      <div className={cn(card, "flex gap-3 items-center flex-wrap")}>
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by type, ID, or tag..."
            className={cn(
              "w-full pl-9 pr-4 py-2 text-sm rounded-xl border outline-none focus:ring-2 focus:ring-[#54ACBF]/25",
              dark
                ? "bg-[#A7EBF2]/5 border-[#A7EBF2]/8 text-[#A7EBF2] placeholder-[#54ACBF]/40"
                : "bg-[#A7EBF2]/8 border-[#A7EBF2]/15 text-[#011C40] placeholder-[#54ACBF]/60"
            )}
          />
        </div>
        <Button
          variant="outline"
          className={cn(
            "rounded-xl text-sm",
            dark
              ? "border-[#A7EBF2]/10 text-[#54ACBF] hover:bg-[#A7EBF2]/5"
              : "border-[#A7EBF2]/25 text-[#26658C] hover:bg-[#A7EBF2]/8"
          )}
        >
          <Filter size={14} className="mr-1" /> Filter
        </Button>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((c) => {
          const ModIcon = c.modIcon;
          return (
            <div key={c.id} className={cn(card, "cursor-pointer hover:-translate-y-1 hover:shadow-luna-lg flex flex-col")}>
              <div
                className={cn(
                  "w-full h-40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden",
                  dark ? "bg-[#011C40]/60" : "bg-[#A7EBF2]/8"
                )}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{ background: "radial-gradient(circle at center, #A7EBF2 0%, transparent 70%)" }}
                />
                <ModIcon className={cn("relative z-10", dark ? "text-[#54ACBF]/30" : "text-[#54ACBF]/25")} size={48} />
              </div>

              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className={cn("text-xs font-bold tracking-wider", dark ? "text-[#A7EBF2]" : "text-[#26658C]")}>{c.id}</p>
                  <p className={cn("text-base font-bold mt-0.5", dark ? "text-white" : "text-[#011C40]")}>{c.type}</p>
                </div>
                <Badge className={cn("text-xs px-2.5 py-1 rounded-full font-bold", diffColor[c.difficulty])}>
                  {c.difficulty}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-5 flex-1 content-start">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className={cn(
                      "flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full",
                      dark
                        ? "bg-[#023859]/60 text-[#A7EBF2]/70 border border-[#A7EBF2]/8"
                        : "bg-[#A7EBF2]/10 text-[#26658C] border border-[#A7EBF2]/20"
                    )}
                  >
                    <Tag size={10} />
                    {t}
                  </span>
                ))}
              </div>
              <div
                className={cn(
                  "flex items-center justify-between text-xs font-medium pt-3 border-t",
                  dark ? "border-[#A7EBF2]/8 text-[#54ACBF]/50" : "border-[#A7EBF2]/15 text-[#26658C]/50"
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Eye size={14} className={dark ? "text-[#54ACBF]/40" : "text-[#54ACBF]"} />
                  {c.views} views
                </span>
                <button className="text-[#54ACBF] hover:text-[#26658C] flex items-center gap-1 transition-colors">
                  Open <Activity size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
