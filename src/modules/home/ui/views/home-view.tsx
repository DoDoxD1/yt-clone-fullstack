import React from "react";
import CategoriesSection from "../sections/category-section";
import VideosSection from "../sections/videos-section";

export default function HomeView() {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 py-2.5 flex flex-col gap-y-6">
      <CategoriesSection />
      <VideosSection />
    </div>
  );
}
