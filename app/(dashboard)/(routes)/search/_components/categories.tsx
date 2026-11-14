"use client";

import {
  Camera,
  Code,
  Cpu,
  Film,
  Folder,
  Lightbulb,
  type LucideIcon,
  Music,
  Wrench,
} from "lucide-react";
import type { Category } from "@/lib/generated/prisma/client";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

// Keys must match the category names in your database
const iconMap: Record<string, LucideIcon> = {
  "Computer Science": Code,
  "Engineering": Wrench,
  "Music": Music,
  "Photography": Camera,
  "Filming": Film,
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