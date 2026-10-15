import { Course, Section } from "@prisma/client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { List, BookOpen, ChevronRight } from "lucide-react";

interface SectionMenuProps {
  course: Course & { sections: Section[] };
}

const SectionMenu = ({ course }: SectionMenuProps) => {
  return (
    <div className="z-50 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-3 border border-white/10 text-slate-300 text-sm font-medium hover:bg-surface-4 hover:border-white/20 transition-all">
            <List className="h-4 w-4" />
            Sections
          </button>
        </SheetTrigger>
        <SheetContent className="bg-surface-1 border-white/[0.07] flex flex-col pt-8 gap-1">
          <p className="text-[10px] font-semibold tracking-widest text-slate-600 uppercase px-4 mb-3">
            Course Content
          </p>

          {/* Overview */}
          <Link
            href={`/courses/${course.id}/overview`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-all"
          >
            <div className="p-1.5 rounded-lg bg-brand-purple/20">
              <BookOpen className="h-3.5 w-3.5 text-brand-purple-light" />
            </div>
            Course Overview
            <ChevronRight className="h-3.5 w-3.5 ml-auto text-slate-600" />
          </Link>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mx-4 my-1" />

          {/* Sections */}
          {course.sections.map((section, index) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/sections/${section.id}`}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] transition-all"
            >
              <span className="w-5 h-5 rounded-full bg-surface-4 text-[10px] font-bold text-slate-500 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </span>
              <span className="truncate flex-1">{section.title}</span>
              <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-600" />
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionMenu;
