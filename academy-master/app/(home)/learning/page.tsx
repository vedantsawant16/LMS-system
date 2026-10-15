import CourseGrid from "@/components/courses/CourseGrid";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";

const LearningPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const purchases = await db.purchase.findMany({
    where: { customerId: userId },
    select: {
      course: {
        include: {
          level: true,
          category: true,
          subCategory: true,
          sections: { where: { isPublished: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const courses = purchases.map((p) => p.course);

  return (
    <div className="min-h-screen bg-surface-0 px-4 py-10 md:px-10 xl:px-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-gold/12">
            <GraduationCap className="h-4 w-4 text-gold" />
          </div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest">My Learning</span>
        </div>
        <h1 className="text-2xl font-extrabold text-warm-100">Your Courses</h1>
        <p className="text-warm-600 text-sm mt-1">
          {courses.length} course{courses.length !== 1 ? "s" : ""} enrolled
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-xl bg-surface-3 border border-white/[0.07] flex items-center justify-center">
            <BookOpen className="h-7 w-7 text-warm-600" />
          </div>
          <p className="text-warm-300 font-semibold">No courses enrolled yet</p>
          <p className="text-warm-600 text-sm">Browse our catalog to get started.</p>
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-surface-0 font-bold text-sm shadow-gold hover:bg-gold-light transition-all mt-1"
          >
            Browse Courses <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : (
        <CourseGrid courses={courses} />
      )}
    </div>
  );
};

export default LearningPage;
