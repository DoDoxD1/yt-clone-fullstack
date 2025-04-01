"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import {
  FilterCarousel,
  SkeletonFilterCarousel,
} from "@/components/filter-carousel";

export default function CategoriesSection() {
  const router = useRouter();

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return <SkeletonFilterCarousel />;
  }

  if (error) {
    return <p className="text-red-500">Failed to load categories.</p>;
  }

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value && value !== "") {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };

  return <FilterCarousel onSelect={onSelect} categories={categories?.data} />;
}
