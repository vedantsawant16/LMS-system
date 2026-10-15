import CourseGrid from "@/components/courses/CourseGrid";
import { db } from "@/lib/db";
import { Search, BookOpen } from "lucide-react";

const SearchPage = async ({ searchParams }: { searchParams: { query: string } }) => {
  const q = searchParams.query || "";

  const courses = await db.course.findMany({
    where: {
      isPublished: true,
      OR: [
        { title: { contains: q } },
        { category: { name: { contains: q } } },
        { subCategory: { name: { contains: q } } },
      ],
    },
    include: {
      category: true,
      subCategory: true,
      level: true,
      sections: { where: { isPublished: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-surface-0 px-4 py-10 md:px-10 xl:px-16">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-warm-600 text-xs mb-2">
          <Search className="h-3.5 w-3.5" />
          Search results for
        </div>
        <h1 className="text-2xl font-extrabold text-warm-100">
          &ldquo;<span className="gradient-text">{q}</span>&rdquo;
        </h1>
        <p className="text-warm-600 text-xs mt-1">
          {courses.length} course{courses.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-14 h-14 rounded-xl bg-surface-3 border border-white/[0.07] flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-warm-600" />
          </div>
          <p className="text-warm-300 font-semibold text-sm">No courses found</p>
          <p className="text-warm-600 text-xs text-center max-w-xs">
            Try a different search term or browse all courses.
          </p>
        </div>
      ) : (
        <CourseGrid courses={courses} />
      )}
    </div>
  );
};

export default SearchPage;
