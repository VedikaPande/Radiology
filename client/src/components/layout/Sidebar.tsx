import { NavLink, useLocation } from "react-router-dom";
import { useSidebar, useTheme } from "@/context/AppContext";
import {
  LayoutDashboard,
  FolderSearch,
  ScanLine,
  FileQuestion,
  BookOpen,
  NotebookPen,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Browse Cases", icon: FolderSearch, path: "/browse-cases" },
  { label: "Image Analysis", icon: ScanLine, path: "/image-analysis" },
  { label: "Questions", icon: FileQuestion, path: "/radiology-questions" },
  { label: "Flashcards", icon: BookOpen, path: "/flashcards" },
  { label: "Notes", icon: NotebookPen, path: "/notes" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const { open, toggleSidebar } = useSidebar();
  const { dark } = useTheme();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-[#011C40]/20 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        style={{ width: open ? 256 : 64 }}
        className={cn(
          "fixed top-0 left-0 h-full z-30 flex flex-col transition-all duration-300 ease-in-out",
          dark
            ? "bg-[#01223d]/90 backdrop-blur-2xl border-r border-[#A7EBF2]/6"
            : "bg-white/60 backdrop-blur-2xl border-r border-[#A7EBF2]/20"
        )}
      >
        {/* Brand */}
        <div
          className={cn(
            "flex items-center gap-3 px-4 h-16 flex-shrink-0 border-b",
            dark ? "border-[#A7EBF2]/6" : "border-[#A7EBF2]/15"
          )}
        >
          <div
            className="flex-shrink-0 w-9 h-9 rounded-2xl flex items-center justify-center shadow-luna"
            style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
          >
            <Stethoscope size={17} className="text-white" />
          </div>
          {open && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm gradient-text-luna truncate">Medvision</p>
              <p className={cn("text-[11px] truncate", dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]/70")}>
                Med Platform
              </p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-5 px-2.5 space-y-1">
          {navItems.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                title={!open ? label : undefined}
                className={cn(
                  "nav-item group flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium relative overflow-hidden",
                  active
                    ? "text-white shadow-luna"
                    : dark
                    ? "text-[#54ACBF]/60 hover:text-[#A7EBF2] hover:bg-[#A7EBF2]/5"
                    : "text-[#26658C]/60 hover:text-[#023859] hover:bg-[#A7EBF2]/10"
                )}
                style={
                  active
                    ? { background: "linear-gradient(135deg, #54ACBFcc, #26658Ccc, #023859cc)" }
                    : undefined
                }
              >
                {active && (
                  <span
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      boxShadow: "inset 0 1px 0 rgba(167,235,242,0.2), 0 4px 16px rgba(38,101,140,0.3)",
                    }}
                  />
                )}
                <Icon size={17} className="flex-shrink-0 relative z-10" />
                {open && <span className="truncate relative z-10">{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* User snippet */}
        {open && (
          <div
            className={cn(
              "mx-3 mb-3 p-3 rounded-2xl",
              dark ? "bg-[#A7EBF2]/5" : "bg-[#A7EBF2]/8"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
              >
                V
              </div>
              <div className="min-w-0">
                <p className={cn("text-xs font-semibold truncate", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                  Dr. Vedika
                </p>
                <p className={cn("text-[11px] truncate", dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]")}>
                  Radiologist
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse toggle */}
        <div
          className={cn(
            "flex-shrink-0 border-t p-2 hidden md:flex",
            dark ? "border-[#A7EBF2]/6" : "border-[#A7EBF2]/15",
            open ? "justify-end" : "justify-center"
          )}
        >
          <button
            onClick={toggleSidebar}
            className={cn(
              "p-2 rounded-xl transition-all",
              dark
                ? "text-[#54ACBF]/50 hover:text-[#A7EBF2] hover:bg-[#A7EBF2]/8"
                : "text-[#54ACBF] hover:text-[#26658C] hover:bg-[#A7EBF2]/12"
            )}
          >
            {open ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
          </button>
        </div>
      </aside>
    </>
  );
}
