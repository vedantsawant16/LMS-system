"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Search, Menu, BookOpen, GraduationCap, X, Flame } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeToggle from "@/components/custom/ThemeToggle";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const [focused, setFocused] = useState(false);

  const topRoutes = [
    { label: "Instructor", path: "/instructor/courses", icon: <GraduationCap className="h-3.5 w-3.5" /> },
    { label: "My Learning", path: "/learning", icon: <BookOpen className="h-3.5 w-3.5" /> },
  ];

  const sidebarRoutes = [
    { label: "Courses",     path: "/instructor/courses" },
    { label: "Performance", path: "/instructor/performance" },
  ];

  const handleSearch = () => {
    if (searchInput.trim()) {
      router.push(`/search?query=${searchInput.trim()}`);
      setSearchInput("");
    }
  };

  return (
    <div className="topbar-glass sticky top-0 z-50 flex items-center justify-between px-5 h-14 gap-4">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
        <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center shadow-gold">
          <Flame className="h-3.5 w-3.5 text-surface-0" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-tight text-warm-100">MARVEL</span>
          <span className="text-[8px] font-semibold text-warm-600 tracking-[0.15em] uppercase">Academy</span>
        </div>
      </Link>

      {/* Search */}
      <div className={`max-md:hidden flex items-center relative w-[380px] h-8 rounded-lg transition-all ${
        focused ? "ring-1 ring-gold/50 shadow-gold" : "ring-1 ring-white/[0.08]"
      } bg-surface-3`}>
        <Search className="absolute left-2.5 h-3.5 w-3.5 text-warm-600 pointer-events-none" />
        <input
          className="flex-1 bg-transparent text-sm text-warm-200 placeholder-warm-600 outline-none pl-8 pr-8"
          placeholder="Search courses..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        {searchInput && (
          <button onClick={() => setSearchInput("")} className="absolute right-8 text-warm-600 hover:text-warm-300">
            <X className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={!searchInput.trim()}
          className="absolute right-1.5 h-5 w-5 rounded-md bg-gold flex items-center justify-center disabled:opacity-30 hover:bg-gold-light transition-colors"
        >
          <Search className="h-3 w-3 text-surface-0" />
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        {/* Desktop nav */}
        <div className="max-sm:hidden flex items-center">
          {topRoutes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                pathname.startsWith(r.path)
                  ? "text-gold bg-gold/10"
                  : "text-warm-500 hover:text-warm-200 hover:bg-surface-3"
              }`}
            >
              {r.icon} {r.label}
            </Link>
          ))}
        </div>

        <div className="max-sm:hidden w-px h-4 bg-white/[0.08] mx-1" />

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Mobile menu */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-1.5 rounded-lg bg-surface-3 border border-white/[0.08] text-warm-400 hover:text-warm-200">
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent className="bg-surface-1 border-white/[0.07] flex flex-col gap-1 pt-10">
              {topRoutes.map((r) => (
                <Link key={r.path} href={r.path} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-warm-400 hover:text-warm-200 hover:bg-surface-3 transition-all">
                  {r.icon} {r.label}
                </Link>
              ))}
              {pathname.startsWith("/instructor") && (
                <div className="mt-3 pt-3 border-t border-white/[0.07]">
                  {sidebarRoutes.map((r) => (
                    <Link key={r.path} href={r.path} className="block px-4 py-3 rounded-xl text-sm text-warm-400 hover:text-warm-200 hover:bg-surface-3 transition-all">
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Auth */}
        {isSignedIn ? (
          <div className="ring-1 ring-gold/30 rounded-full ml-1">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="ml-1 px-3 py-1.5 rounded-lg bg-gold text-surface-0 text-xs font-bold shadow-gold hover:bg-gold-light hover:shadow-gold-lg transition-all"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
