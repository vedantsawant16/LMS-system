import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseGrid from "@/components/courses/CourseGrid";
import { BookOpen, Users, Award, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Courses",         value: "500+",  icon: BookOpen,   sub: "Across all categories" },
  { label: "Active Students", value: "50K+",  icon: Users,      sub: "Learning every day" },
  { label: "Instructors",     value: "200+",  icon: Award,      sub: "Industry experts" },
  { label: "Completion Rate", value: "94%",   icon: TrendingUp, sub: "Above industry avg." },
];

export default async function Home() {
  const [categories, courses] = await Promise.all([
    db.category.findMany({
      orderBy: { name: "asc" },
      include: { subCategories: { orderBy: { name: "asc" } } },
    }),
    getCoursesByCategory(null),
  ]);

  return (
    <div className="min-h-screen bg-surface-0">

      {/* ── Hero ── */}
      <section className="relative border-b border-white/[0.06]">

        {/* Very faint warm radial — not a glow, just a warmth */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(245,166,35,0.07) 0%, transparent 70%)"
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">

          {/* Eyebrow — plain text, no badge pill */}
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-warm-600 mb-8">
            Marvel Academy — Online Learning Platform
          </p>

          {/* Heading — large, tight, editorial */}
          <h1 className="text-5xl md:text-7xl font-black tracking-[-0.03em] leading-[1.0] text-warm-100 mb-6">
            The skills that
            <br />
            <span className="text-gold">get you hired.</span>
          </h1>

          <p className="text-warm-500 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed font-normal">
            Learn from practitioners who built real products.
            No fluff — just skills that translate directly to your next role.
          </p>

          {/* CTA — minimal, two options */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-warm-100 text-surface-0 font-semibold text-sm hover:bg-white transition-colors"
            >
              Browse courses
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-warm-400 font-semibold text-sm hover:text-warm-200 transition-colors"
            >
              Create free account
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Stats — horizontal strip at bottom of hero, like Stripe */}
        <div className="relative border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map(({ label, value, sub }) => (
              <div key={label} className="px-8 py-6">
                <p className="text-2xl font-black text-warm-100 tracking-tight">{value}</p>
                <p className="text-xs font-semibold text-warm-300 mt-0.5">{label}</p>
                <p className="text-[11px] text-warm-700 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section id="courses" className="max-w-6xl mx-auto px-6 py-14">

        {/* Section header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-warm-100 tracking-tight">All Courses</h2>
            <p className="text-warm-600 text-sm mt-1">{courses.length} available</p>
          </div>
          <Link
            href="/search?query="
            className="hidden md:inline-flex items-center gap-1 text-xs font-semibold text-warm-500 hover:text-warm-200 transition-colors"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Categories */}
        <Categories categories={categories} selectedCategory={null} />

        {/* Grid */}
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 border border-dashed border-white/[0.08] rounded-2xl mt-6">
            <BookOpen className="h-8 w-8 text-warm-700" />
            <p className="text-warm-500 font-medium text-sm">No courses yet</p>
          </div>
        ) : (
          <div className="mt-4">
            <CourseGrid courses={courses} />
          </div>
        )}
      </section>
    </div>
  );
}
