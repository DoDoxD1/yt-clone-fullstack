import { URL } from "./constants";
export const fetchCategories = async () => {
  const res = await fetch(URL + "/category/all");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchUser = async () => {
  const res = await fetch(URL + "/users/get-user", {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load user details");
  const user = await res.json();
  return user?.data;
};

export const loginUser = async (formData: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(URL + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Invalid credentials");
    }
    return response.json();
  } catch (error: any) {
    throw new Error(error.message || "Failed to login. Please try again.");
  }
};

export const logoutUser = async () => {
  const res = await fetch(URL + "/users/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to sign out");
  return res.json();
};
