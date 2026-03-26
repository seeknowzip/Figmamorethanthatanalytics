import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, Radio, Gamepad2, FileText, Sparkles, Settings, ChevronDown } from "lucide-react";
import { useState } from "react";

const navSections = [
  {
    label: "Analytics",
    items: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/watchtower", label: "Watchtower", icon: Radio },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { path: "/games", label: "Games", icon: Gamepad2 },
      { path: "/reports", label: "Reports", icon: FileText },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { path: "/insights", label: "AI Insights", icon: Sparkles },
    ],
  },
];

const workspaces = ["Global Operations", "Rectangles", "Studio Alpha"];

export function Layout() {
  const location = useLocation();
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0]);

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-[#e8eaed] flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-[#e8eaed]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-[#1f1f1f] flex items-center justify-center">
              <span className="text-white font-bold text-xs tracking-tight">M</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1f1f1f] leading-none">morethanthat</div>
              <div className="text-[10px] text-[#5f6368] mt-0.5 uppercase tracking-widest font-medium">Analytics</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div className="px-3 mb-1.5 text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 ${
                          active
                            ? "bg-[#1f1f1f] text-white"
                            : "text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#1f1f1f]"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Workspace Switcher */}
        <div className="px-3 pb-4 border-t border-[#e8eaed] pt-3">
          <div className="relative">
            <button
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="w-full flex items-center justify-between px-3 py-2.5 bg-[#f8f9fa] hover:bg-[#f1f3f4] rounded-2xl transition-colors"
            >
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-widest text-[#9aa0a6] font-semibold mb-0.5">Workspace</div>
                <div className="text-sm font-semibold text-[#1f1f1f]">{activeWorkspace}</div>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#5f6368] transition-transform ${workspaceOpen ? "rotate-180" : ""}`} />
            </button>
            {workspaceOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-[#e8eaed] rounded-2xl shadow-lg overflow-hidden z-10">
                {workspaces.map((ws) => (
                  <button
                    key={ws}
                    onClick={() => { setActiveWorkspace(ws); setWorkspaceOpen(false); }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#f8f9fa] transition-colors ${
                      ws === activeWorkspace ? "font-semibold text-[#1f1f1f]" : "text-[#5f6368]"
                    }`}
                  >
                    {ws}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-150 mt-1 ${
              isActive("/settings")
                ? "bg-[#1f1f1f] text-white"
                : "text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#1f1f1f]"
            }`}
          >
            <Settings className="w-4 h-4" strokeWidth={1.5} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto min-h-screen bg-white">
        <Outlet />
      </main>
    </div>
  );
}
