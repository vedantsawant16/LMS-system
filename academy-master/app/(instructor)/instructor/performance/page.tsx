import { getPerformance } from "@/app/actions/getPerformance";
import Chart from "@/components/performance/Chart";
import DataCard from "@/components/performance/DataCard";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { BarChart2, ShoppingBag, TrendingUp, Medal } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

const PerformancePage = async () => {
  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const { data, totalRevenue, totalSales } = await getPerformance(userId);

  // Sort by sales count descending
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const maxCount = sortedData[0]?.count || 1;

  return (
    <div className="min-h-full p-6 md:p-8" style={{ backgroundColor: "var(--surface-0)" }}>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(245,166,35,0.12)" }}>
            <BarChart2 className="h-4 w-4 text-gold" />
          </div>
          <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Analytics</span>
        </div>
        <h1 className="text-2xl font-extrabold" style={{ color: "hsl(var(--foreground))" }}>
          Performance
        </h1>
        <p className="text-sm mt-1" style={{ color: "hsl(var(--muted-foreground))" }}>
          Track your revenue and sales across all courses
        </p>
      </div>

      {/* Stat cards + chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <DataCard value={totalRevenue} label="Total Revenue" shouldFormat />
        <DataCard value={totalSales} label="Total Sales" />
        <div className="md:col-span-2">
          <Chart data={data} />
        </div>
      </div>

      {/* ── Course Sales Breakdown ── */}
      {sortedData.length > 0 && (
        <div>
          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: "rgba(245,166,35,0.12)" }}>
                <ShoppingBag className="h-4 w-4 text-gold" />
              </div>
              <div>
                <h2 className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>
                  Sales by Course
                </h2>
                <p className="text-[11px]" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Number of enrollments per course
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(245,166,35,0.1)" }}>
              <TrendingUp className="h-3 w-3 text-gold" />
              <span className="text-xs font-bold text-gold">{totalSales} total</span>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedData.map((course, index) => {
              const barPct = Math.round((course.count / maxCount) * 100);
              const isTop = index === 0;

              return (
                <div
                  key={course.name}
                  className="surface-card rounded-xl p-5 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    boxShadow: isTop ? "0 0 0 1.5px rgba(245,166,35,0.35), 0 4px 16px rgba(0,0,0,0.15)" : undefined,
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-3">
                    {/* Rank badge */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-extrabold"
                      style={{
                        backgroundColor: isTop ? "rgba(245,166,35,0.15)" : "var(--surface-4)",
                        color: isTop ? "var(--accent-gold)" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      {isTop ? <Medal className="h-4 w-4" /> : `#${index + 1}`}
                    </div>

                    {/* Sales pill */}
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold flex-shrink-0"
                      style={{
                        backgroundColor: isTop ? "rgba(245,166,35,0.12)" : "var(--surface-4)",
                        color: isTop ? "var(--accent-gold)" : "hsl(var(--muted-foreground))",
                      }}
                    >
                      <ShoppingBag className="h-3 w-3" />
                      {course.count} {course.count === 1 ? "sale" : "sales"}
                    </div>
                  </div>

                  {/* Course name */}
                  <div>
                    <p
                      className="text-sm font-bold leading-snug line-clamp-2"
                      style={{ color: "hsl(var(--foreground))" }}
                    >
                      {course.name}
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface-4)" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${barPct}%`,
                        background: isTop
                          ? "linear-gradient(90deg, #d4870d, #f5a623, #fbbf55)"
                          : "linear-gradient(90deg, var(--surface-5), hsl(var(--muted-foreground)))",
                      }}
                    />
                  </div>

                  {/* Revenue */}
                  <div className="flex items-center justify-between pt-1 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                      Total Revenue
                    </span>
                    <span className="text-base font-extrabold text-gold">
                      {formatPrice(course.total)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary footer card */}
          <div
            className="mt-4 rounded-xl px-6 py-4 flex items-center justify-between"
            style={{ backgroundColor: "var(--surface-3)", border: "1px solid var(--border-subtle)" }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "hsl(var(--muted-foreground))" }}>
              All Courses Total
            </span>
            <div className="flex items-center gap-6">
              <span className="text-sm font-extrabold text-gold">{totalSales} sales</span>
              <span className="text-sm font-extrabold" style={{ color: "hsl(var(--foreground))" }}>
                {formatPrice(totalRevenue)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {sortedData.length === 0 && (
        <div className="surface-card rounded-xl flex flex-col items-center justify-center py-16 gap-3">
          <ShoppingBag className="h-10 w-10" style={{ color: "hsl(var(--muted-foreground))" }} />
          <p className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>No sales yet</p>
          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            Publish courses and start earning!
          </p>
        </div>
      )}
    </div>
  );
};

export default PerformancePage;
