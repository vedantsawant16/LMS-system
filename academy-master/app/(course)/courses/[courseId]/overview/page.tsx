import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import { db } from "@/lib/db";
import ReadText from "@/components/custom/ReadText";
import SectionMenu from "@/components/layout/SectionMenu";
import { BookOpen, Gem, Tag, User, Clock, BarChart2, Star } from "lucide-react";
import BuyButton from "@/components/custom/BuyButton";
import { auth } from "@clerk/nextjs/server";

const CourseOverview = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  const course = await db.course.findUnique({
    where: { id: params.courseId, isPublished: true },
    include: { sections: { where: { isPublished: true } } },
  });

  if (!course) return redirect("/");

  const client = await clerkClient();
  const instructor = await client.users.getUser(course.instructorId);

  let level;
  if (course.levelId) {
    level = await db.level.findUnique({ where: { id: course.levelId } });
  }

  let purchase = null;
  if (userId) {
    purchase = await db.purchase.findUnique({
      where: { customerId_courseId: { customerId: userId, courseId: course.id } },
    });
  }

  const freeSections = course.sections.filter((s) => s.isFree).length;

  return (
    <div className="min-h-full bg-surface-0">
      {/* Mobile section menu */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <SectionMenu course={course} />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-warm-100 leading-tight mb-3">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="text-warm-500 text-lg leading-relaxed">{course.subtitle}</p>
          )}
        </div>

        {/* Course image */}
        {course.imageUrl && (
          <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-white/[0.07]">
            <Image src={course.imageUrl} alt={course.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-0/80 to-transparent" />
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left: Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Meta chips */}
            <div className="flex flex-wrap gap-2">
              {level && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold">
                  <Gem className="h-3 w-3" />
                  {level.name}
                </div>
              )}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-info/10 border border-info/20 text-info text-xs font-semibold">
                <BookOpen className="h-3 w-3" />
                {course.sections.length} Sections
              </div>
              {freeSections > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 border border-success/20 text-success text-xs font-semibold">
                  <Star className="h-3 w-3" />
                  {freeSections} Free Preview
                </div>
              )}
            </div>

            {/* Instructor */}
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-gold/30 flex-shrink-0">
                <Image
                  src={instructor.imageUrl ?? "/avatar_placeholder.jpg"}
                  alt={instructor.fullName ?? "Instructor"}
                  fill className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-warm-600 font-medium">Your Instructor</p>
                <p className="text-sm font-bold text-warm-100">{instructor.fullName}</p>
                <p className="text-xs text-warm-600 mt-0.5">Expert Instructor</p>
              </div>
            </div>

            {/* Description */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="text-sm font-bold text-warm-300 mb-4 flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-gold" />
                About This Course
              </h3>
              <div className="text-warm-500 text-sm leading-relaxed">
                <ReadText value={course.description!} />
              </div>
            </div>
          </div>

          {/* Right: Purchase card */}
          <div className="space-y-4">
            <div className="glass-card rounded-2xl p-5 sticky top-24 space-y-4">
              {/* Price */}
              <div className="text-center pb-4 border-b border-white/[0.07]">
                <p className="text-3xl font-extrabold gradient-text">
                  {formatPrice(course.price)}
                </p>
                <p className="text-xs text-warm-600 mt-1">One-time payment · Lifetime access</p>
              </div>

              {/* What you get */}
              <ul className="space-y-2.5">
                {[
                  { icon: <BookOpen className="h-3.5 w-3.5" />, text: `${course.sections.length} lessons` },
                  { icon: <Clock className="h-3.5 w-3.5" />,    text: "Full lifetime access" },
                  { icon: <Tag className="h-3.5 w-3.5" />,      text: "Certificate of completion" },
                  { icon: <User className="h-3.5 w-3.5" />,     text: "Expert instruction" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-2 text-xs text-warm-500">
                    <span className="text-gold">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {purchase ? (
                <div className="text-center py-2 px-4 rounded-xl bg-success/10 border border-success/20 text-success text-sm font-semibold">
                  ✓ Already Enrolled
                </div>
              ) : (
                <BuyButton courseId={course.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
