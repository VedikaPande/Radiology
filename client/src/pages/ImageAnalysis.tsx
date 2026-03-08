import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { ScanLine, Upload, ZoomIn, RotateCw, Contrast, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const recentImages = [
  { id: "CX-4821", label: "Chest PA View", modality: "X-Ray", status: "Pending Analysis" },
  { id: "CT-3017", label: "Brain Axial Slices", modality: "CT", status: "Analyzed" },
  { id: "MR-0892", label: "L4-L5 Sagittal", modality: "MRI", status: "Analyzed" },
];

export default function ImageAnalysis() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState(recentImages[0]);

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
          <ScanLine size={22} className="text-[#54ACBF]" /> Image Analysis
        </h1>
        <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          AI-assisted radiology image viewer and annotation tool.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Viewer Panel */}
        <div className={cn(card, "lg:col-span-3 space-y-4")}>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className={cn("text-sm font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
              {selected.label} —{" "}
              <span className={cn("text-xs font-normal", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/50")}>
                {selected.modality}
              </span>
            </p>
            <div className="flex gap-2">
              {[
                { Icon: ZoomIn, label: "Zoom" },
                { Icon: RotateCw, label: "Rotate" },
                { Icon: Contrast, label: "Contrast" },
                { Icon: Layers, label: "Layers" },
              ].map(({ Icon, label }) => (
                <Button
                  key={label}
                  variant="ghost"
                  size="icon"
                  title={label}
                  className={cn(
                    "rounded-lg",
                    dark
                      ? "text-[#54ACBF]/60 hover:bg-[#A7EBF2]/8 hover:text-[#A7EBF2]"
                      : "text-[#26658C]/50 hover:bg-[#A7EBF2]/12 hover:text-[#023859]"
                  )}
                >
                  <Icon size={16} />
                </Button>
              ))}
            </div>
          </div>

          {/* Image placeholder */}
          <div
            className="relative w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #023859, #011C40)" }}
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#A7EBF2]/8 flex items-center justify-center">
                <ScanLine size={30} className="text-[#54ACBF]" />
              </div>
              <p className="text-[#54ACBF]/50 text-sm">DICOM image viewer</p>
              <Button className="btn-luna text-sm font-medium rounded-xl">
                <Upload size={14} className="mr-1" /> Upload DICOM
              </Button>
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(167,235,242,0.02) 4px, rgba(167,235,242,0.02) 5px)",
              }}
            />
          </div>

          {/* AI findings */}
          <div className={cn("rounded-xl p-4", dark ? "bg-[#023859]/40" : "bg-[#A7EBF2]/8")}>
            <p className={cn("text-xs font-semibold mb-2", dark ? "text-[#A7EBF2]" : "text-[#26658C]")}>
              AI Findings Preview
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Cardiomegaly — 68% confidence",
                "Bilateral infiltrates — 41% confidence",
                "No pneumothorax detected",
              ].map((f) => (
                <Badge
                  key={f}
                  variant="outline"
                  className={cn(
                    "text-xs px-3 py-1 rounded-full",
                    dark
                      ? "bg-[#023859] text-[#A7EBF2]/70 border-[#A7EBF2]/10"
                      : "bg-white text-[#26658C] border-[#A7EBF2]/20"
                  )}
                >
                  {f}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Case List */}
        <div className={cn(card, "space-y-3")}>
          <p className={cn("text-sm font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            Recent Images
          </p>
          {recentImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelected(img)}
              className={cn(
                "w-full text-left p-3 rounded-xl border text-xs transition-all",
                selected.id === img.id
                  ? dark
                    ? "border-[#54ACBF] bg-[#023859]/50"
                    : "border-[#54ACBF] bg-[#A7EBF2]/12"
                  : dark
                  ? "border-[#A7EBF2]/6 hover:bg-[#A7EBF2]/5"
                  : "border-[#A7EBF2]/15 hover:bg-[#A7EBF2]/6"
              )}
            >
              <p className={cn("font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{img.id}</p>
              <p className={cn("mt-0.5", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/50")}>{img.label}</p>
              <Badge
                className={cn(
                  "mt-1 text-xs px-2 py-0.5 rounded-full font-medium",
                  img.status === "Analyzed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                )}
              >
                {img.status}
              </Badge>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
