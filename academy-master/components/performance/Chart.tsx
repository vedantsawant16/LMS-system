"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { formatPrice } from "@/lib/formatPrice";
import { BarChart2 } from "lucide-react";

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface-card rounded-xl px-4 py-3 border border-gold/20 shadow-gold">
      <p className="text-[10px] mb-1 truncate max-w-[150px]" style={{ color: "hsl(var(--muted-foreground))" }}>{label}</p>
      <p className="text-sm font-extrabold text-gold">{formatPrice(payload[0].value)}</p>
    </div>
  );
};

const Chart = ({ data }: { data: { name: string; total: number }[] }) => (
  <div className="surface-card rounded-xl p-5">
    <div className="flex items-center gap-2 mb-5">
      <div className="p-1.5 rounded-lg bg-gold/12">
        <BarChart2 className="h-4 w-4 text-gold" />
      </div>
      <div>
        <h3 className="text-sm font-bold" style={{ color: "hsl(var(--foreground))" }}>Revenue by Course</h3>
        <p className="text-[10px]" style={{ color: "hsl(var(--muted-foreground))" }}>All-time performance</p>
      </div>
    </div>

    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 55 }}>
        <defs>
          <linearGradient id="goldBar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5a623" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#d4870d" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 4" stroke="var(--border-subtle)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} angle={-35} textAnchor="end" interval={0} />
        <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={formatPrice} width={72} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(245,166,35,0.05)", radius: 4 }} />
        <Bar dataKey="total" fill="url(#goldBar)" radius={[5, 5, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => <Cell key={i} fill="url(#goldBar)" />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default Chart;
