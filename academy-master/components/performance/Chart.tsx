"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/formatPrice"; // Import the price formatter

const Chart = ({ data }: { data: { name: string; total: number }[] }) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            stroke="888888"
            fontSize={12}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatPrice(value)} // ✅ Fix applied
          />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
