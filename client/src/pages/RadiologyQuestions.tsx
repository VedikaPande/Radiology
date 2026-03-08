import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { FileQuestion, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const QUESTIONS = [
  {
    id: 1,
    question:
      "A 65-year-old patient presents with a Chest X-Ray showing a unilateral pleural effusion. What is the most likely diagnosis given a history of cardiac failure?",
    options: ["Empyema", "Transudative pleural effusion", "Pneumothorax", "Atelectasis"],
    answer: 1,
    explanation: "Cardiac failure causes transudative pleural effusion due to increased hydrostatic pressure.",
    category: "Chest",
    difficulty: "Intermediate",
  },
  {
    id: 2,
    question:
      "On a brain CT without contrast, which finding is most consistent with an acute epidural hematoma?",
    options: [
      "Crescent-shaped hypodensity",
      "Biconvex hyperdense lesion",
      "Ring-enhancing lesion",
      "Diffuse subarachnoid hyperdensity",
    ],
    answer: 1,
    explanation: "Epidural hematomas appear as biconvex (lens-shaped) hyperdense collections on non-contrast CT.",
    category: "Neuro",
    difficulty: "Advanced",
  },
];

export default function RadiologyQuestions() {
  const { dark } = useTheme();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExpl, setShowExpl] = useState(false);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.answer;

  const card = cn(
    "rounded-2xl p-6 transition-all",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/80 border border-[#A7EBF2]/15 shadow-luna"
  );

  const handleNext = () => {
    setCurrent((c) => (c + 1) % QUESTIONS.length);
    setSelected(null);
    setShowExpl(false);
  };

  return (
    <div className="space-y-7 max-w-3xl mx-auto">
      <div>
        <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
          <FileQuestion size={22} className="text-[#54ACBF]" /> Radiology Questions
        </h1>
        <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          Test your knowledge with curated MCQs across all modalities.
        </p>
      </div>

      {/* Progress */}
      <div className={cn("flex items-center gap-4", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
        <span className="text-xs font-medium">
          Question {current + 1} of {QUESTIONS.length}
        </span>
        <div className={cn("flex-1 h-1.5 rounded-full overflow-hidden", dark ? "bg-[#A7EBF2]/6" : "bg-[#A7EBF2]/15")}>
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${((current + 1) / QUESTIONS.length) * 100}%`,
              background: "linear-gradient(90deg, #54ACBF, #26658C)",
            }}
          />
        </div>
        <Badge
          className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            q.difficulty === "Advanced" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"
          )}
        >
          {q.difficulty}
        </Badge>
      </div>

      {/* Question Card */}
      <div className={card}>
        <p className={cn("text-sm font-medium mb-1", dark ? "text-[#A7EBF2]" : "text-[#26658C]")}>{q.category}</p>
        <p className={cn("text-base font-medium leading-relaxed mb-6", dark ? "text-[#A7EBF2]/90" : "text-[#011C40]")}>
          {q.question}
        </p>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            let style = dark
              ? "border-[#A7EBF2]/8 text-[#A7EBF2]/70 hover:border-[#54ACBF] hover:bg-[#023859]/40"
              : "border-[#A7EBF2]/20 text-[#023859] hover:border-[#54ACBF] hover:bg-[#A7EBF2]/8";

            if (selected !== null) {
              if (i === q.answer) style = "border-emerald-400 bg-emerald-50 text-emerald-800";
              else if (i === selected && !isCorrect) style = "border-rose-400 bg-rose-50 text-rose-700";
              else style = dark ? "border-[#A7EBF2]/5 text-[#54ACBF]/30" : "border-[#A7EBF2]/10 text-[#26658C]/30";
            }

            return (
              <button
                key={i}
                disabled={selected !== null}
                onClick={() => { setSelected(i); setShowExpl(true); }}
                className={cn(
                  "w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium flex items-center gap-3 transition-all",
                  style
                )}
              >
                <span
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center text-xs font-bold",
                    selected !== null && i === q.answer
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : selected !== null && i === selected && !isCorrect
                      ? "border-rose-500 bg-rose-500 text-white"
                      : dark
                      ? "border-[#A7EBF2]/15 text-[#54ACBF]/50"
                      : "border-[#A7EBF2]/30 text-[#26658C]/50"
                  )}
                >
                  {["A", "B", "C", "D"][i]}
                </span>
                {opt}
                {selected !== null && i === q.answer && <CheckCircle size={16} className="ml-auto text-emerald-500" />}
                {selected !== null && i === selected && !isCorrect && <XCircle size={16} className="ml-auto text-rose-500" />}
              </button>
            );
          })}
        </div>

        {showExpl && (
          <div className={cn("mt-5 p-4 rounded-xl text-sm", dark ? "bg-[#023859]/40 text-[#A7EBF2]/70" : "bg-[#A7EBF2]/8 text-[#023859]")}>
            <p className={cn("font-semibold mb-1", dark ? "text-[#A7EBF2]" : "text-[#26658C]")}>Explanation</p>
            {q.explanation}
          </div>
        )}

        {selected !== null && (
          <Button onClick={handleNext} className="mt-5 ml-auto flex items-center gap-2 btn-luna rounded-xl">
            Next Question <ChevronRight size={16} />
          </Button>
        )}
      </div>
    </div>
  );
}
