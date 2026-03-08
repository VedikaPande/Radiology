import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSidebar } from "@/context/AppContext";

const SIDEBAR_OPEN_W = 256;
const SIDEBAR_CLOSED_W = 64;

export default function Layout() {
  const { open } = useSidebar();
  const sidebarW = open ? SIDEBAR_OPEN_W : SIDEBAR_CLOSED_W;

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div
        className="flex flex-col flex-1 min-w-0 transition-all duration-300"
        style={{ marginLeft: sidebarW }}
      >
        <Header />

        <main className="flex-1">
          <div className="w-full p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
