import { clerkClient } from "@clerk/nextjs/server";
import { Course, Level } from "@prisma/client";
import CourseCard from "./CourseCard";

type CourseWithLevel = Course & { level?: Level | null };

interface CourseGridProps {
  courses: CourseWithLevel[];
}

/**
 * Fetches ALL instructors in ONE batch Clerk call instead of
 * one call per card. This is the main perf fix.
 */
const CourseGrid = async ({ courses }: CourseGridProps) => {
  if (courses.length === 0) return null;

  // Deduplicate instructor IDs
  const uniqueIds = Array.from(new Set(courses.map((c) => c.instructorId)));

  // Single batched Clerk call for all unique instructors
  const client = await clerkClient();
  const userList = await client.users.getUserList({ userId: uniqueIds, limit: 100 });

  const instructorMap = new Map(
    userList.data.map((u) => [
      u.id,
      { imageUrl: u.imageUrl, fullName: u.fullName },
    ])
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-1">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          instructor={instructorMap.get(course.instructorId) ?? null}
        />
      ))}
    </div>
  );
};

export default CourseGrid;
