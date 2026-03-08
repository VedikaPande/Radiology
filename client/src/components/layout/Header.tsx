import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar, useTheme } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  LogOut,
  UserIcon,
  Settings,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const NOTIFICATIONS = [
  { id: 1, text: "New case uploaded: Chest CT #4821", time: "2m ago", unread: true },
  { id: 2, text: "Dr. Chen reviewed your analysis", time: "18m ago", unread: true },
  { id: 3, text: "Weekly radiology quiz available", time: "1h ago", unread: false },
];

export default function Header() {
  const { open, toggleSidebar } = useSidebar();
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <header
      className={cn(
        "sticky top-0 z-20 h-16 flex items-center gap-4 px-4 md:px-6",
        dark
          ? "bg-[#01223d]/80 border-b border-[#A7EBF2]/6 backdrop-blur-2xl"
          : "bg-white/65 border-b border-[#A7EBF2]/15 backdrop-blur-2xl"
      )}
    >
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className={cn(
          "md:hidden rounded-xl",
          dark ? "text-[#54ACBF] hover:bg-[#A7EBF2]/8" : "text-[#26658C] hover:bg-[#A7EBF2]/12"
        )}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search
          size={14}
          className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2",
            dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]"
          )}
        />
        <Input
          type="text"
          placeholder="Search cases, topics..."
          className={cn(
            "w-full pl-9 pr-4 py-2 text-sm rounded-2xl border outline-none transition-all",
            "focus:ring-2 focus:ring-[#54ACBF]/25 focus:border-[#54ACBF]/40",
            dark
              ? "bg-[#A7EBF2]/5 border-[#A7EBF2]/8 text-[#A7EBF2] placeholder-[#54ACBF]/40"
              : "bg-white/70 border-[#A7EBF2]/25 text-[#011C40] placeholder-[#54ACBF]/60"
          )}
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDark}
          title={dark ? "Light mode" : "Dark mode"}
          className={cn(
            "rounded-2xl transition-all",
            dark
              ? "text-[#A7EBF2] bg-[#A7EBF2]/8 hover:bg-[#A7EBF2]/15"
              : "text-[#26658C] bg-[#A7EBF2]/10 hover:bg-[#A7EBF2]/20"
          )}
        >
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </Button>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => { setShowNotifs((p) => !p); setShowProfile(false); }}
            className={cn(
              "relative rounded-2xl transition-all",
              dark
                ? "text-[#54ACBF] bg-[#A7EBF2]/5 hover:bg-[#A7EBF2]/10"
                : "text-[#26658C] bg-[#A7EBF2]/10 hover:bg-[#A7EBF2]/18"
            )}
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="pulse-dot absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#54ACBF]" />
            )}
          </Button>

          {showNotifs && (
            <div
              className={cn(
                "absolute right-0 top-12 w-80 rounded-3xl overflow-hidden z-50",
                dark
                  ? "bg-[#02284d]/95 border border-[#A7EBF2]/8 backdrop-blur-2xl shadow-luna-lg"
                  : "bg-white/90 border border-[#A7EBF2]/25 backdrop-blur-2xl shadow-luna-lg"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between px-5 py-3.5 border-b",
                  dark ? "border-[#A7EBF2]/8" : "border-[#A7EBF2]/15"
                )}
              >
                <p className={cn("text-sm font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                  Notifications
                </p>
                <Badge
                  className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
                  style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
                >
                  {unreadCount} new
                </Badge>
              </div>
              <ul>
                {NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className={cn(
                      "px-5 py-3.5 flex gap-3 cursor-pointer transition-colors",
                      dark ? "hover:bg-[#A7EBF2]/5" : "hover:bg-[#A7EBF2]/8",
                      n.unread && (dark ? "bg-[#023859]/30" : "bg-[#A7EBF2]/6")
                    )}
                  >
                    <div className={cn("mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0", n.unread ? "bg-[#54ACBF]" : "bg-[#A7EBF2]/30")} />
                    <div>
                      <p className={cn("text-xs leading-relaxed", dark ? "text-[#A7EBF2]/80" : "text-[#023859]")}>
                        {n.text}
                      </p>
                      <p className={cn("text-xs mt-0.5", dark ? "text-[#54ACBF]/40" : "text-[#54ACBF]")}>
                        {n.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={cn("px-5 py-2.5 border-t text-center", dark ? "border-[#A7EBF2]/8" : "border-[#A7EBF2]/15")}>
                <button className="text-xs font-medium gradient-text-luna">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile((p) => !p); setShowNotifs(false); }}
            className={cn(
              "flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-2xl transition-all",
              dark ? "hover:bg-[#A7EBF2]/5" : "hover:bg-[#A7EBF2]/10"
            )}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-luna"
              style={{ background: "linear-gradient(135deg, #54ACBF, #26658C)" }}
            >
              {user ? user.firstName.charAt(0).toUpperCase() : "?"}
            </div>
            <div className="hidden sm:block text-left">
              <p className={cn("text-xs font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                {user ? `${user.firstName} ${user.lastName}` : "Guest"}
              </p>
              <p className={cn("text-[11px]", dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]")}>
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ""}
              </p>
            </div>
            <ChevronDown size={13} className={dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]"} />
          </button>

          {showProfile && (
            <div
              className={cn(
                "absolute right-0 top-12 w-52 rounded-3xl overflow-hidden z-50",
                dark
                  ? "bg-[#02284d]/95 border border-[#A7EBF2]/8 backdrop-blur-2xl shadow-luna-lg"
                  : "bg-white/90 border border-[#A7EBF2]/25 backdrop-blur-2xl shadow-luna-lg"
              )}
            >
              {user && (
                <div className={cn("px-4 py-3 border-b", dark ? "border-[#A7EBF2]/8" : "border-[#A7EBF2]/15")}>
                  <p className={cn("text-sm font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className={cn("text-xs truncate", dark ? "text-[#54ACBF]/50" : "text-[#54ACBF]")}>
                    {user.email}
                  </p>
                </div>
              )}
              <button
                onClick={() => { setShowProfile(false); navigate("/settings"); }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2",
                  dark ? "text-[#A7EBF2]/70 hover:bg-[#A7EBF2]/5 hover:text-[#A7EBF2]" : "text-[#023859] hover:bg-[#A7EBF2]/8"
                )}
              >
                <UserIcon size={14} /> My Profile
              </button>
              <button
                onClick={() => { setShowProfile(false); navigate("/settings"); }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2",
                  dark ? "text-[#A7EBF2]/70 hover:bg-[#A7EBF2]/5 hover:text-[#A7EBF2]" : "text-[#023859] hover:bg-[#A7EBF2]/8"
                )}
              >
                <Settings size={14} /> Settings
              </button>
              <button
                className={cn(
                  "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2",
                  dark ? "text-[#A7EBF2]/70 hover:bg-[#A7EBF2]/5 hover:text-[#A7EBF2]" : "text-[#023859] hover:bg-[#A7EBF2]/8"
                )}
              >
                <HelpCircle size={14} /> Help & Support
              </button>
              <div className={cn("border-t", dark ? "border-[#A7EBF2]/8" : "border-[#A7EBF2]/15")}>
                <button
                  onClick={async () => { setShowProfile(false); await logout(); navigate("/login"); }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 text-rose-500 hover:text-rose-600",
                    dark ? "hover:bg-rose-500/5" : "hover:bg-rose-50"
                  )}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
