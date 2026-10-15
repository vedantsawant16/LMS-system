import getCoursesByCategory from "@/app/actions/getCourses";
import CourseGrid from "@/components/courses/CourseGrid";
import Categories from "@/components/custom/Categories";
import { db } from "@/lib/db";
import { BookOpen } from "lucide-react";

const CoursesByCategory = async ({ params }: { params: { categoryId: string } }) => {
  const [categories, courses] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    getCoursesByCategory(params.categoryId),
  ]);

  return (
    <div className="min-h-screen bg-surface-0 px-4 md:px-10 xl:px-16 pb-16 pt-6">
      <Categories categories={categories} selectedCategory={params.categoryId} />

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <div className="w-14 h-14 rounded-xl bg-surface-3 border border-white/[0.07] flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-warm-600" />
          </div>
          <p className="text-warm-400 font-semibold text-sm">No courses in this category yet</p>
        </div>
      ) : (
        <CourseGrid courses={courses} />
      )}
    </div>
  );
};

export default CoursesByCategory;
