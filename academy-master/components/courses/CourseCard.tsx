import { Course, Level } from "@prisma/client";
import { Gem, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatPrice";

const levelStyle: Record<string, string> = {
  Beginner:     "text-emerald-600 border-emerald-300 bg-emerald-50   dark:text-success dark:border-success/25 dark:bg-success/10",
  Intermediate: "text-amber-600  border-amber-300  bg-amber-50    dark:text-gold   dark:border-gold/25   dark:bg-gold/10",
  Advanced:     "text-red-600    border-red-300    bg-red-50      dark:text-danger  dark:border-danger/25 dark:bg-danger/10",
};

const fallbackLevel = "text-blue-600 border-blue-300 bg-blue-50 dark:text-info dark:border-info/25 dark:bg-info/10";

interface InstructorMeta {
  imageUrl: string;
  fullName: string | null;
}

interface CourseCardProps {
  course: Course & { level?: Level | null };
  instructor?: InstructorMeta | null;
}

const CourseCard = ({ course, instructor }: CourseCardProps) => {
  const level = (course as any).level as Level | null | undefined;
  const lvlClass = level?.name && levelStyle[level.name]
    ? levelStyle[level.name]
    : fallbackLevel;

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="course-card group relative flex flex-col w-full rounded-xl overflow-hidden shadow-card transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="relative h-[180px] overflow-hidden bg-surface-3">
        <Image
          src={course.imageUrl ?? "/image_placeholder.webp"}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 card-img-overlay" />

        {/* Level badge */}
        {level && (
          <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border backdrop-blur-sm ${lvlClass}`}>
            <Gem className="h-3.5 w-3.5" />
            {level.name}
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm text-white text-sm font-bold border border-white/20">
          {formatPrice(course.price)}
        </div>
      </div>

      {/* Body */}
      <div className="course-card-body flex flex-col gap-3 px-4 py-4 flex-1">
        {/* Title */}
        <h2 className="course-card-title text-sm font-bold leading-snug line-clamp-2 transition-colors duration-200">
          {course.title}
        </h2>

        {/* Instructor */}
        {instructor && (
          <div className="flex items-center gap-2">
            <div className="relative h-7 w-7 rounded-full overflow-hidden ring-2 ring-gold/40 flex-shrink-0">
              <Image
                src={instructor.imageUrl ?? "/avatar_placeholder.jpg"}
                alt={instructor.fullName ?? "Instructor"}
                fill
                className="object-cover"
              />
            </div>
            <p className="course-card-instructor text-xs font-medium truncate">
              {instructor.fullName}
            </p>
          </div>
        )}

        {/* Footer stats */}
        <div className="course-card-footer mt-auto pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="course-card-stat text-sm font-bold">4.8</span>
            <span className="course-card-meta text-xs">(2.4k)</span>
          </div>
          <div className="flex items-center gap-1.5 course-card-meta">
            <Users className="h-4 w-4" />
            <span className="text-xs font-medium">1.2k</span>
          </div>
        </div>
      </div>

      {/* Hover top border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-gold-muted via-gold to-gold-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

export default CourseCard;
