"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";

interface CategoryListProps {
  categories: {
    _id: string;
    title: string;
  }[];
  onSelect: (value: string | null) => void;
}

function FilterCarousel({ categories, onSelect }: CategoryListProps) {
  const [value, setValue] = useState<string>("");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    }),
      [api];
  });

  return (
    <div className="relative w-full">
      {/* Left fade */}
      <div
        className={cn(
          "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
          current === 1 && "hidden"
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-12"
      >
        <CarouselContent className="-ml-3">
          <CarouselItem
            className="pl-3 basis-auto"
            onClick={() => {
              setValue("");
              onSelect?.(null);
            }}
          >
            <Badge
              variant={value === "" ? "default" : "secondary"}
              className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
            >
              All
            </Badge>
          </CarouselItem>
          {categories?.map((category: { _id: any; title: string }) => (
            <CarouselItem
              key={category._id}
              className="pl-3 basis-auto"
              onClick={() => {
                setValue(category.title);
                onSelect?.(category.title);
              }}
            >
              <Badge
                variant={value === category.title ? "default" : "secondary"}
                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
              >
                {category.title}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-20" />
        <CarouselNext className="right-0 z-20" />
      </Carousel>
      {/* right fade */}
      <div
        className={cn(
          "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none",
          current === count && "hidden"
        )}
      />
    </div>
  );
}

function SkeletonFilterCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full px-12"
    >
      <CarouselContent className="-ml-3">
        {Array.from({ length: 14 }).map((_, index) => (
          <CarouselItem key={index} className="pl-3 basis-auto">
            <Skeleton className="rounded-lg px-3 py-1 h-full text-sm w-[100px] font-semibold">
              &nbsp;
            </Skeleton>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export { FilterCarousel, SkeletonFilterCarousel };
