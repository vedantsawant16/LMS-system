"use client";

import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";

interface CategoriesProps {
  categories: Category[];
  selectedCategory: string | null;
}

const Categories = ({ categories, selectedCategory }: CategoriesProps) => {
  const router = useRouter();

  const go = (id: string | null) => router.push(id ? `/categories/${id}` : "/");

  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-5 justify-center">
      <button
        onClick={() => go(null)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
          selectedCategory === null
            ? "category-active border-transparent"
            : "bg-surface-3 text-warm-500 border-white/[0.08] hover:text-warm-200 hover:border-white/15 hover:bg-surface-4"
        }`}
      >
        <LayoutGrid className="h-4 w-4" />
        All Courses
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => go(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
            selectedCategory === cat.id
              ? "category-active border-transparent"
              : "bg-surface-3 text-warm-500 border-white/[0.08] hover:text-warm-200 hover:border-white/15 hover:bg-surface-4"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Categories;
