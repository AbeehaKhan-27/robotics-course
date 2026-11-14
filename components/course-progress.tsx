import { cn } from "@/lib/utils";

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const barByVariant = {
  default: "bg-sky-600",
  success: "bg-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

interface CourseProgressProps {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

export const CourseProgress = ({ value, variant, size }: CourseProgressProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full rounded-full bg-slate-200 overflow-hidden"
      >
        <div
          className={cn(
            "h-full transition-all",
            barByVariant[variant || "default"]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <p
        className={cn(
          "font-medium mt-2",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        {Math.round(clamped)}% complete
      </p>
    </div>
  );
};