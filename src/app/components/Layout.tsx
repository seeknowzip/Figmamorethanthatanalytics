import { Outlet, Link, useLocation } from "react-router";
import { LayoutDashboard, FileText, Sparkles, Settings } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/reports", label: "Reports", icon: FileText },
    { path: "/insights", label: "AI Insights", icon: Sparkles },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#fafbfc' }}>
      {/* Sidebar - Mixpanel style */}
      <aside className="w-64 bg-white border-r border-[#e5e7eb] flex flex-col shadow-sm">
        <div className="p-6 border-b border-[#e5e7eb]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4285f4] to-[#9334e9] flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="font-semibold tracking-tight" style={{ fontSize: '1rem', lineHeight: '1.4' }}>
              morethanthat
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                      ${active 
                        ? 'bg-gradient-to-r from-[#4285f4]/10 to-[#9334e9]/5 text-[#4285f4] shadow-sm' 
                        : 'text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" strokeWidth={active ? 2 : 1.5} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#e5e7eb]">
          <div className="px-3 py-2.5 bg-gradient-to-r from-[#f3f4f6] to-[#e5e7eb]/50 rounded-lg">
            <div className="text-xs uppercase tracking-wider text-[#6b7280] mb-1.5 font-medium">
              Workspace
            </div>
            <div className="text-sm font-semibold text-[#111827]">
              Global Operations
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}