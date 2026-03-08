import { useState } from "react";
import { useTheme } from "@/context/AppContext";
import { Bell, Lock, Moon, Palette, Save, Settings2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
] as const;

type Section = (typeof sections)[number]["id"];

export default function Settings() {
  const { dark, toggleDark } = useTheme();
  const [active, setActive] = useState<Section>("profile");

  const card = cn(
    "rounded-2xl p-6 transition-all",
    dark
      ? "bg-[#02284d]/80 border border-[#A7EBF2]/6"
      : "bg-white/80 border border-[#A7EBF2]/15 shadow-luna"
  );

  const inputClass = cn(
    "w-full text-sm rounded-lg border outline-none px-3 py-2 transition-colors",
    dark
      ? "bg-[#A7EBF2]/5 border-[#A7EBF2]/8 text-[#A7EBF2] placeholder-[#54ACBF]/40"
      : "bg-[#A7EBF2]/5 border-[#A7EBF2]/15 text-[#011C40] placeholder-[#54ACBF]/50"
  );

  const heading = cn("text-base font-bold mb-4", dark ? "text-[#A7EBF2]" : "text-[#011C40]");
  const labelClass = cn("text-xs font-semibold mb-1 block", dark ? "text-[#A7EBF2]/70" : "text-[#26658C]");
  const descClass = cn("text-xs", dark ? "text-[#54ACBF]/50" : "text-[#26658C]/60");

  const Row = ({ label, desc, children }: { label: string; desc: string; children: React.ReactNode }) => (
    <div className={cn("flex items-center justify-between py-3 border-b last:border-none", dark ? "border-[#A7EBF2]/6" : "border-[#A7EBF2]/10")}>
      <div>
        <p className={cn("text-sm font-medium", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>{label}</p>
        <p className={descClass}>{desc}</p>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-7">
      <div>
        <h1 className={cn("text-2xl font-bold flex items-center gap-2", dark ? "text-[#A7EBF2]" : "text-[#011C40]")}>
          <Settings2 size={22} className="text-[#54ACBF]" /> Settings
        </h1>
        <p className={cn("text-sm mt-1", dark ? "text-[#54ACBF]/60" : "text-[#26658C]/60")}>
          Manage your account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Sidebar Nav */}
        <div className={cn(card, "md:col-span-1 p-3 space-y-1")}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left",
                active === s.id
                  ? dark
                    ? "bg-[#023859]/50 text-[#A7EBF2]"
                    : "bg-[#A7EBF2]/12 text-[#26658C]"
                  : dark
                  ? "text-[#54ACBF]/60 hover:bg-[#A7EBF2]/3 hover:text-[#A7EBF2]"
                  : "text-[#26658C]/60 hover:bg-[#A7EBF2]/6 hover:text-[#26658C]"
              )}
            >
              <s.icon size={15} /> {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className={cn(card, "md:col-span-3")}>
          {/* Profile */}
          {active === "profile" && (
            <div>
              <h2 className={heading}>Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <Input placeholder="Dr. Sarah Chen" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <Input placeholder="sarah@hospital.org" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Specialty</label>
                  <Input placeholder="Diagnostic Radiology" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Institution</label>
                  <Input placeholder="City Medical Center" className={inputClass} />
                </div>
              </div>
              <Button className="btn-luna mt-5 text-sm font-medium rounded-xl">
                <Save size={14} className="mr-1" /> Save Changes
              </Button>
            </div>
          )}

          {/* Notifications */}
          {active === "notifications" && (
            <div>
              <h2 className={heading}>Notifications</h2>
              <Row label="Email Notifications" desc="Receive emails about new cases and updates.">
                <Switch defaultChecked />
              </Row>
              <Row label="Study Reminders" desc="Daily reminders to maintain your streak.">
                <Switch defaultChecked />
              </Row>
              <Row label="Achievement Alerts" desc="Get notified when you unlock achievements.">
                <Switch />
              </Row>
              <Row label="Weekly Reports" desc="Receive a weekly analytics summary.">
                <Switch defaultChecked />
              </Row>
            </div>
          )}

          {/* Appearance */}
          {active === "appearance" && (
            <div>
              <h2 className={heading}>Appearance</h2>
              <Row label="Dark Mode" desc="Switch between light and dark theme.">
                <div className="flex items-center gap-2">
                  <Moon size={14} className="text-[#54ACBF]" />
                  <Switch checked={dark} onCheckedChange={toggleDark} />
                </div>
              </Row>
              <Row label="Compact Mode" desc="Reduce spacing for denser layout.">
                <Switch />
              </Row>
              <Row label="Animations" desc="Enable UI transitions and animations.">
                <Switch defaultChecked />
              </Row>
            </div>
          )}

          {/* Security */}
          {active === "security" && (
            <div>
              <h2 className={heading}>Security</h2>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Current Password</label>
                  <Input type="password" placeholder="••••••••" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>New Password</label>
                  <Input type="password" placeholder="••••••••" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" className={inputClass} />
                </div>
              </div>
              <Button className="btn-luna mt-5 text-sm font-medium rounded-xl">
                <Lock size={14} className="mr-1" /> Update Password
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
