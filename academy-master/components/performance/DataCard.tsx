import { formatPrice } from "@/lib/formatPrice";
import { IndianRupee, TrendingUp } from "lucide-react";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: DataCardProps) => (
  <div className="surface-card rounded-xl p-6 flex items-center gap-5">
    <div className={`p-3 rounded-xl flex-shrink-0 ${shouldFormat ? "bg-gold/12 text-gold" : "bg-info/10 text-info"}`}>
      {shouldFormat ? <IndianRupee className="h-6 w-6" /> : <TrendingUp className="h-6 w-6" />}
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "hsl(var(--muted-foreground))" }}>
        {label}
      </p>
      <p className={`text-3xl font-extrabold ${shouldFormat ? "text-gold" : ""}`}
         style={!shouldFormat ? { color: "hsl(var(--foreground))" } : {}}>
        {shouldFormat ? formatPrice(value) : value.toLocaleString()}
      </p>
    </div>
  </div>
);

export default DataCard;
