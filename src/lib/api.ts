import { URL } from "./constants";
export const fetchCategories = async () => {
  const res = await fetch(URL + "/category/all");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};
