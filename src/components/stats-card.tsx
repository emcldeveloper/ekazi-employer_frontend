import { Card, CardContent } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgClass?: string;
  iconColorClass?: string;
  onClick?: () => void;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-blue-50",
  iconColorClass = "text-blue-700",
  onClick,
}: StatsCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`
        transition-all duration-200 ease-out
        hover:scale-[1.02]
        hover:-translate-y-1
        hover:shadow-lg
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      <CardContent className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-muted-foreground font-medium">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>

        <div className={`p-3 rounded-lg ${iconBgClass} ${iconColorClass}`}>
          <Icon size={16} />
        </div>
      </CardContent>
    </Card>
  );
}
