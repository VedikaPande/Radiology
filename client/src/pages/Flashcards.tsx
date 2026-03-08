import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { BookOpen, ChevronRight, ChevronLeft, RotateCcw, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CARDS = [
  {
    front: 'What does a "bat-wing" opacity pattern on CXR indicate?',
    back: "Pulmonary edema — the bilateral perihilar opacities resemble bat wings due to fluid redistribution.",
    category: "Chest",
  },
  {
    front: "Describe the Rigler sign on plain abdominal X-ray.",
    back: "Rigler sign (double wall sign): both sides of the bowel wall are visible, indicating free intraperitoneal air (pneumoperitoneum).",
    category: "Abdomen",
  },
  {
    front: 'What is the "sail sign" seen on pediatric CXR?',
    back: "The thymus can project laterally simulating a sail. It is a normal variant in infants, not to be confused with consolidation.",
    category: "Pediatric",
  },
];

export default function Flashcards() {
  const { dark } = useTheme();
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [, setResults] = useState<{ id: number; knew: boolean }[]>([]);

  const card = CARDS[idx];

  const handleResult = (knew: boolean) => {
    setResults((r) => [...r, { id: idx, knew }]);
    setFlipped(false);
    setTimeout(() => setIdx((i) => (i + 1) % CARDS.length), 300);
  };

  const reset = () => {
    setIdx(0);
    setFlipped(false);
    setResults([]);
  };

  return (
    <div className="space-y-7 max-w-2xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            <BookOpen size={22} className="text-[#54ACBF]" /> Flashcards
          </h1>
          <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
            Rapid-fire radiology concept review.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={reset}
          className={cn(
            "rounded-xl text-sm",
            dark
              ? "border-[#A7EBF2]/10 text-[#54ACBF] hover:bg-[#A7EBF2]/5"
              : "border-[#A7EBF2]/25 text-[#26658C] hover:bg-[#A7EBF2]/8"
          )}
        >
          <RotateCcw size={14} className="mr-1" /> Reset
        </Button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <span className={cn("text-xs", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          {idx + 1}/{CARDS.length}
        </span>
        <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", dark ? "bg-[#A7EBF2]/6" : "bg-[#A7EBF2]/15")}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((idx + 1) / CARDS.length) * 100}%`,
              background: "linear-gradient(90deg, #54ACBF, #26658C)",
            }}
          />
        </div>
        <Badge
          className={cn(
            "text-xs px-2 py-0.5 rounded-full",
            dark ? "bg-[#023859] text-[#A7EBF2]" : "bg-[#A7EBF2]/15 text-[#26658C]"
          )}
        >
          {card.category}
        </Badge>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "relative w-full min-h-64 rounded-2xl cursor-pointer select-none transition-all duration-500 flex items-center justify-center p-8 text-center",
          flipped
            ? "text-white shadow-luna-lg"
            : dark
            ? "bg-[#02284d]/80 border border-[#A7EBF2]/6 text-[#A7EBF2]"
            : "bg-white/80 border border-[#A7EBF2]/15 text-[#011C40] shadow-luna"
        )}
        style={
          flipped
            ? { background: "linear-gradient(135deg, #54ACBF, #26658C, #023859)" }
            : undefined
        }
      >
        <div>
          <p
            className={cn(
              "text-xs font-medium mb-3",
              flipped ? "text-[#A7EBF2]/60" : dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]"
            )}
          >
            {flipped ? "Answer" : "Question — click to reveal"}
          </p>
          <p className="text-base leading-relaxed font-medium">
            {flipped ? card.back : card.front}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      {flipped && (
        <div className="flex gap-4">
          <Button onClick={() => handleResult(false)} className="flex-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl">
            <X size={16} className="mr-1" /> Didn't Know
          </Button>
          <Button onClick={() => handleResult(true)} className="flex-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-xl">
            <Check size={16} className="mr-1" /> Got It!
          </Button>
        </div>
      )}

      {!flipped && (
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setIdx((i) => Math.max(0, i - 1)); setFlipped(false); }}
            className={cn("rounded-xl", dark ? "text-[#54ACBF] hover:bg-[#A7EBF2]/5" : "text-[#26658C] hover:bg-[#A7EBF2]/8")}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button onClick={() => setFlipped(true)} className="btn-luna rounded-xl">
            Flip Card
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setIdx((i) => (i + 1) % CARDS.length); setFlipped(false); }}
            className={cn("rounded-xl", dark ? "text-[#54ACBF] hover:bg-[#A7EBF2]/5" : "text-[#26658C] hover:bg-[#A7EBF2]/8")}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      )}
    </div>
  );
}
