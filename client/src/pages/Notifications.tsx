import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { Bell, CheckCheck, Info, PartyPopper, Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  type: "info" | "success" | "warning";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const INITIAL: Notification[] = [
  { id: 1, type: "info", title: "New Cases Available", message: "12 new chest CT cases have been added to the library.", time: "10 min ago", read: false },
  { id: 2, type: "success", title: "Achievement Unlocked", message: "You've completed 100 radiology cases. Great work!", time: "1 hour ago", read: false },
  { id: 3, type: "warning", title: "Study Streak at Risk", message: "Complete at least one case today to maintain your 12-day streak.", time: "3 hours ago", read: false },
  { id: 4, type: "info", title: "Weekly Report Ready", message: "Your weekly analytics report for Feb 26 – Mar 3 is ready to view.", time: "1 day ago", read: true },
];

const typeConfig = {
  info: { icon: Info, color: "#54ACBF", bg: "rgba(84,172,191,0.12)" },
  success: { icon: PartyPopper, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
};

export default function Notifications() {
  const { dark } = useTheme();
  const [notifications, setNotifications] = useState(INITIAL);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);
  const remove = (id: number) => setNotifications((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifications.filter((n) => !n.read).length;

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
            <Bell size={22} className="text-[#54ACBF]" /> Notifications
            {unreadCount > 0 && (
              <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(84,172,191,0.15)", color: "#54ACBF" }}>
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
            Stay up to date with your learning activity.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className={cn(
              "text-xs rounded-lg font-medium",
              dark
                ? "border-[#A7EBF2]/10 text-[#A7EBF2] hover:bg-[#A7EBF2]/5"
                : "border-[#A7EBF2]/25 text-[#26658C] hover:bg-[#A7EBF2]/8"
            )}
          >
            <CheckCheck size={13} className="mr-1" /> Mark all read
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className={cn(
              "text-xs rounded-lg font-medium",
              dark
                ? "border-[#A7EBF2]/10 text-[#A7EBF2] hover:bg-[#A7EBF2]/5"
                : "border-[#A7EBF2]/25 text-[#26658C] hover:bg-[#A7EBF2]/8"
            )}
          >
            <Trash2 size={13} className="mr-1" /> Clear all
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 && (
          <div className={cn(card, "p-10 flex flex-col items-center text-center")}>
            <Bell size={32} className="text-[#54ACBF]/30 mb-3" />
            <p className={cn("text-sm font-medium", dark ? "text-[#A7EBF2]/50" : "text-[#26658C]/60")}>
              No notifications yet.
            </p>
          </div>
        )}
        {notifications.map((n) => {
          const cfg = typeConfig[n.type];
          const Icon = cfg.icon;
          return (
            <div
              key={n.id}
              className={cn(
                card,
                "flex items-start gap-4 p-4 group",
                !n.read && (dark ? "ring-1 ring-[#54ACBF]/20" : "ring-1 ring-[#54ACBF]/15")
              )}
            >
              <span
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: cfg.bg }}
              >
                <Icon size={16} style={{ color: cfg.color }} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={cn("text-sm font-semibold", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{n.title}</p>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#54ACBF]" />}
                </div>
                <p className={cn("text-xs mt-0.5 leading-relaxed", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>{n.message}</p>
                <span className={cn("text-xs mt-1 inline-block", dark ? "text-[#54ACBF]/30" : "text-[#54ACBF]/50")}>{n.time}</span>
              </div>
              <button
                onClick={() => remove(n.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-[#54ACBF]/40 hover:text-rose-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
