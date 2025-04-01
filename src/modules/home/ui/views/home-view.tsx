import React from "react";
import CategoriesSection from "../sections/category-section";

export default function HomeView() {
  return (
    <div className="max-w-[2400px] mx-auto mb-10 px-4 py-2.5 flex flex-col gap-y-6">
      <CategoriesSection />
    </div>
  );
}
