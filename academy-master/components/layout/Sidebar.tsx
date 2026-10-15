"use client";

import { BarChart4, MonitorPlay, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const routes = [
    { icon: MonitorPlay, label: "Courses",     path: "/instructor/courses",     sub: "Manage content" },
    { icon: BarChart4,   label: "Performance", path: "/instructor/performance", sub: "Revenue & stats" },
  ];

  return (
    <div className="sidebar max-sm:hidden flex flex-col w-60 min-h-full px-3 py-5 gap-0.5">
      <p className="sidebar-label text-[10px] font-bold tracking-widest uppercase px-3 mb-3">
        Instructor
      </p>

      {routes.map(({ icon: Icon, label, path, sub }) => {
        const active = pathname.startsWith(path);
        return (
          <Link
            key={path}
            href={path}
            className={`group flex items-center justify-between px-3 py-3 rounded-lg transition-all duration-150 ${
              active ? "sidebar-active" : "sidebar-item"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className={`p-1.5 rounded-md transition-colors ${active ? "sidebar-icon-active" : "sidebar-icon"}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-sm font-semibold ${active ? "sidebar-item-label-active" : "sidebar-item-label"}`}>
                  {label}
                </p>
                <p className="sidebar-item-sub text-[11px] leading-none mt-0.5">{sub}</p>
              </div>
            </div>
            <ChevronRight className={`h-3.5 w-3.5 transition-all ${active ? "sidebar-chevron-active" : "opacity-0 group-hover:opacity-50"}`} />
          </Link>
        );
      })}

      <div className="mt-auto pt-5">
        <div className="sidebar-tip rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <p className="text-xs font-semibold text-gold">Pro tip</p>
          </div>
          <p className="sidebar-tip-text text-[11px] leading-relaxed">
            Complete all fields before publishing to maximize reach.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
