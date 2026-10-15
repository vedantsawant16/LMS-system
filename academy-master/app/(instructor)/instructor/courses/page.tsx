import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";
import { Plus, MonitorPlay } from "lucide-react";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const courses = await db.course.findMany({
    where: { instructorId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-full p-6 md:p-8" style={{ backgroundColor: "var(--surface-0)" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(245,166,35,0.12)" }}>
              <MonitorPlay className="h-4 w-4 text-gold" />
            </div>
            <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Instructor</span>
          </div>
          <h1 className="text-2xl font-extrabold" style={{ color: "hsl(var(--foreground))" }}>
            My Courses
          </h1>
          <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
            {courses.length} course{courses.length !== 1 ? "s" : ""} created
          </p>
        </div>

        <Link
          href="/instructor/create-course"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold text-surface-0 font-bold text-sm shadow-gold hover:bg-gold-light hover:shadow-gold-lg transition-all self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          Create Course
        </Link>
      </div>

      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
