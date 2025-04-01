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
  console.log(res);
  if (!res.ok) throw new Error("Failed to load user details");
  return res.json();
};

export const submitFormData = async (formData: {
  username: string;
  password: string;
}) => {
  const response = await fetch(URL + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to submit form");
  }
  if (response.status === 200) {
    const data = await response.json();
    const cookie = await response;
    console.log(data.data.user);
  }
  return response.json();
};
