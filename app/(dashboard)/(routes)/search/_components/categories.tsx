"use client";

import { Cpu, Folder, type LucideIcon } from "lucide-react";
import type { Category } from "@/lib/generated/prisma/client";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<string, LucideIcon> = {
  Robotics: Cpu,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name] ?? Folder}
          value={item.id}
        />
      ))}
    </div>
  );
};