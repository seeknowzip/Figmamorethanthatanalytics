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
    <div className="min-h-screen flex" style={{ backgroundColor: '#ffffff' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e8eaed] flex flex-col">
        <div className="p-6 border-b border-[#e8eaed]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-2xl bg-[#5e8fff] flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="font-semibold tracking-tight" style={{ fontSize: '1rem', lineHeight: '1.4', color: '#1f1f1f' }}>
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
                      flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all duration-200
                      ${active 
                        ? 'bg-[#5e8fff] text-white' 
                        : 'text-[#5f6368] hover:bg-[#f8f9fa] hover:text-[#1f1f1f]'
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

        <div className="p-4 border-t border-[#e8eaed]">
          <div className="px-3 py-2.5 bg-[#f8f9fa] rounded-2xl">
            <div className="text-xs uppercase tracking-wider text-[#5f6368] mb-1.5 font-medium">
              Workspace
            </div>
            <div className="text-sm font-semibold text-[#1f1f1f]">
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
