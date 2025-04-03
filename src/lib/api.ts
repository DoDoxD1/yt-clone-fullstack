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

// export const registerUser = async (userData: {
//   username: string;
//   password: string;
//   email: string;
//   fullName: string;
//   avatar: File | undefined;
//   coverImage: File | undefined;
// }) => {
//   try {
//     console.log(userData);
//     const response = await fetch(URL + "/users/register", {
//       method: "POST",
//       body: JSON.stringify(userData),
//     });
//     if (!response.ok) {
//       const errorMessage = await response.text();
//       throw new Error(`Error Sign-Up: ${response.status} - ${errorMessage}`);
//       // throw new Error("Error Sign-Up");
//     }
//     return response.json();
//   } catch (error: any) {
//     console.error("Error Sign-Up", error);
//     throw new Error(error);
//   }
// };

export const registerUser = async (userData: {
  username: string;
  password: string;
  fullName: string;
  email: string;
  avatar: File | undefined;
  coverImage: File | undefined;
}) => {
  try {
    const formData = new FormData();

    // Add text fields
    formData.append("fullName", userData.fullName);
    formData.append("email", userData.email);
    formData.append("username", userData.username);
    formData.append("password", userData.password);

    // Add files
    if (userData.avatar) {
      formData.append("avatar", userData.avatar);
    }

    if (userData.coverImage) {
      formData.append("coverImage", userData.coverImage);
    }

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const fetchUserVideos = async () => {
  try {
    const res = await fetch(URL + "/dashboard/videos", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to load user videos");
    const videos = await res.json();
    return videos?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchVideos = async () => {
  try {
    const res = await fetch(URL + "/videos");
    if (!res.ok) throw new Error("Failed to fetch videos");
    const videos = await res.json();
    return videos?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
