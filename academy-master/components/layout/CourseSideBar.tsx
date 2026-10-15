import { db } from "@/lib/db";
import { Course, Section } from "@prisma/client";
import Link from "next/link";
import { CheckCircle2, Circle, Lock, BookOpen } from "lucide-react";

interface CourseSideBarProps {
  course: Course & { sections: Section[] };
  studentId: string;
}

const CourseSideBar = async ({ course, studentId }: CourseSideBarProps) => {
  const sections = await db.section.findMany({
    where: { courseId: course.id, isPublished: true },
    orderBy: { position: "asc" },
  });

  const sectionIds = sections.map((s) => s.id);

  const purchase = await db.purchase.findUnique({
    where: { customerId_courseId: { customerId: studentId, courseId: course.id } },
  });

  const completed = await db.progress.count({
    where: { studentId, sectionId: { in: sectionIds }, isCompleted: true },
  });

  const pct = sectionIds.length === 0 ? 0 : Math.round((completed / sectionIds.length) * 100);

  const doneIds = new Set(
    (await db.progress.findMany({
      where: { studentId, sectionId: { in: sectionIds }, isCompleted: true },
      select: { sectionId: true },
    })).map((p) => p.sectionId)
  );

  return (
    <div className="hidden md:flex flex-col w-72 min-h-full bg-surface-1 border-r border-white/[0.06]">

      {/* Header */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-gold/15 flex-shrink-0 mt-0.5">
            <BookOpen className="h-5 w-5 text-gold" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-warm-200 line-clamp-2 leading-snug">
              {course.title}
            </h1>
            <p className="text-xs text-warm-600 mt-1">{sections.length} sections</p>
          </div>
        </div>

        {purchase && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-warm-500 font-semibold">Progress</span>
              <span className={`text-xs font-bold ${pct === 100 ? "text-success" : "text-gold"}`}>
                {pct}%
              </span>
            </div>
            <div className="h-1.5 w-full bg-surface-4 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #d4870d, #f5a623, #fbbf55)" }}
              />
            </div>
            <p className="text-[11px] text-warm-700 mt-1.5">{completed}/{sections.length} done</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">

        {/* Overview */}
        <Link
          href={`/courses/${course.id}/overview`}
          className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-warm-500 hover:text-warm-200 hover:bg-surface-3 transition-all mb-1"
        >
          <BookOpen className="h-4.5 w-4.5 text-warm-600 flex-shrink-0" style={{ width: "18px", height: "18px" }} />
          Overview
        </Link>

        {/* Sections label */}
        <p className="text-[10px] font-bold tracking-widest text-warm-700 uppercase px-3 pt-3 pb-2">
          Sections
        </p>

        {sections.map((s, i) => {
          const done   = doneIds.has(s.id);
          const locked = !purchase && !s.isFree;

          return (
            <Link
              key={s.id}
              href={`/courses/${course.id}/sections/${s.id}`}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all mb-0.5 ${
                locked
                  ? "opacity-40 pointer-events-none cursor-not-allowed text-warm-600"
                  : done
                  ? "text-success hover:bg-success/5 font-medium"
                  : "text-warm-400 hover:text-warm-100 hover:bg-surface-3 font-medium"
              }`}
            >
              {done ? (
                <CheckCircle2 className="flex-shrink-0 text-success" style={{ width: "18px", height: "18px" }} />
              ) : locked ? (
                <Lock className="flex-shrink-0 text-warm-700" style={{ width: "18px", height: "18px" }} />
              ) : (
                <Circle className="flex-shrink-0 text-warm-700" style={{ width: "18px", height: "18px" }} />
              )}
              <span className="truncate flex-1">{i + 1}. {s.title}</span>
              {s.isFree && !purchase && (
                <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded flex-shrink-0">
                  FREE
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default CourseSideBar;
