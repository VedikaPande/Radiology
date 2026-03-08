import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { NotebookPen, Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_NOTES = [
  { id: 1, title: "Chest X-Ray Patterns", content: "Key patterns: air bronchogram = consolidation. Kerley B lines = pulmonary edema. Tram-track opacities = bronchiectasis.", tag: "Chest", date: "Mar 3" },
  { id: 2, title: "CT Head — Density Values", content: "Acute blood: hyperdense (~60HU). Subacute: isodense. Chronic: hypodense. CSF ~0HU, Brain ~35HU.", tag: "Neuro", date: "Mar 2" },
  { id: 3, title: "MRI Signal Characteristics", content: "T1: Fat bright, water dark. T2: Water bright, fat variable. FLAIR: CSF suppressed. DWI: Restricts in acute ischemia.", tag: "MRI", date: "Feb 28" },
];

const tagColors: Record<string, string> = {
  Chest: "bg-[#A7EBF2]/15 text-[#26658C]",
  Neuro: "bg-[#54ACBF]/12 text-[#023859]",
  MRI: "bg-[#26658C]/10 text-[#023859]",
};

export default function Notes() {
  const { dark } = useTheme();
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(notes[0]);

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (active?.id === id) setActive(notes[0]);
  };

  const card = cn(
    "rounded-2xl transition-all",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/80 border border-[#A7EBF2]/15 shadow-luna"
  );

  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
            <NotebookPen size={22} className="text-[#54ACBF]" /> Notes
          </h1>
          <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
            Personal radiology study notes and references.
          </p>
        </div>
        <Button className="btn-luna text-sm font-medium rounded-xl">
          <Plus size={15} className="mr-1" /> New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Notes List */}
        <div className={cn(card, "p-4 space-y-3")}>
          <div className="relative mb-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#54ACBF]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes..."
              className={cn(
                "w-full pl-8 pr-3 py-2 text-xs rounded-lg border outline-none",
                dark
                  ? "bg-[#A7EBF2]/5 border-[#A7EBF2]/8 text-[#A7EBF2] placeholder-[#54ACBF]/40"
                  : "bg-[#A7EBF2]/8 border-[#A7EBF2]/15 text-[#011C40] placeholder-[#54ACBF]/50"
              )}
            />
          </div>
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() => setActive(n)}
              className={cn(
                "p-3 rounded-xl cursor-pointer text-xs transition-all group",
                active?.id === n.id
                  ? dark
                    ? "bg-[#023859]/50 border border-[#54ACBF]/30"
                    : "bg-[#A7EBF2]/12 border border-[#54ACBF]/25"
                  : dark
                  ? "hover:bg-[#A7EBF2]/3"
                  : "hover:bg-[#A7EBF2]/6"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className={cn("font-semibold text-sm leading-tight", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                  {n.title}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNote(n.id); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-[#54ACBF]/50 hover:text-rose-500"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <p className={cn("mt-1 line-clamp-2 leading-relaxed", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/50")}>
                {n.content}
              </p>
              <div className="flex items-center justify-between mt-2">
                <Badge className={cn("px-2 py-0.5 rounded-full text-xs font-medium", tagColors[n.tag] || "bg-[#A7EBF2]/10 text-[#26658C]")}>
                  {n.tag}
                </Badge>
                <span className={dark ? "text-[#54ACBF]/30" : "text-[#54ACBF]/50"}>{n.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Editor Panel */}
        <div className={cn(card, "p-6 md:col-span-2")}>
          {active ? (
            <>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className={cn("text-lg font-bold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{active.title}</h2>
                  <Badge className={cn("text-xs px-2 py-0.5 rounded-full font-medium mt-1", tagColors[active.tag] || "")}>
                    {active.tag}
                  </Badge>
                </div>
                <span className={cn("text-xs", dark ? "text-[#54ACBF]/40" : "text-[#54ACBF]")}>{active.date}</span>
              </div>
              <Textarea
                defaultValue={active.content}
                rows={10}
                className={cn(
                  "w-full text-sm leading-relaxed outline-none resize-none rounded-xl p-4 transition-colors",
                  dark
                    ? "bg-[#A7EBF2]/3 text-[#A7EBF2]/80 placeholder-[#54ACBF]/30 border border-[#A7EBF2]/6"
                    : "bg-[#A7EBF2]/5 text-[#011C40] border border-[#A7EBF2]/15"
                )}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-[#54ACBF]/50">
              <p className="text-sm">Select a note or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
