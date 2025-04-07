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

export interface FetchVideosOptions {
  cursor?: string;
  limit: number;
  sortOrder: "asc" | "desc";
}

export const fetchUserVideos = async (options: FetchVideosOptions) => {
  try {
    const { cursor, limit, sortOrder } = options;
    // const res = await fetch(URL + "", {
    //   method: "GET",
    //   credentials: "include",
    // });

    let queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    queryParams.append("limit", limit.toString());
    queryParams.append("sortOrder", sortOrder);
    const url = `${URL}/dashboard/videos?${queryParams.toString()}`;

    const res = await fetch(url, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch user videos");
    const videos = await res.json();
    return videos?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fetchVideos = async (options: FetchVideosOptions) => {
  try {
    const { cursor, limit, sortOrder } = options;
    // Build query string manually
    // console.log(limit);
    let queryParams = new URLSearchParams();
    if (cursor) queryParams.append("cursor", cursor);
    queryParams.append("limit", limit.toString());
    queryParams.append("sortOrder", sortOrder);
    const url = `${URL}/videos?${queryParams.toString()}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch videos");
    const videos = await res.json();
    return videos?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createMockVideo = async () => {
  try {
    const response = await fetch(URL + "/videos/mock-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Error while creating the video!");
    }
    return response.json();
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "Error while creating the video!");
  }
};

export const createVideo = async (data: {
  videoFile: File;
  thumbnailFile: File;
  title: string;
  description: string;
  category: string;
}) => {
  try {
    const formData = new FormData();
    formData.append("video", data.videoFile);
    formData.append("thumbnail", data.thumbnailFile);
    formData.append("title", data.title);
    formData.append("description", data.description);
    // formData.append("category", data.category);
    formData.append("isPublished", "true");

    const response = await fetch(URL + "/videos", {
      method: "POST",
      // Remove Content-Type header - browser will set it automatically with boundary for FormData
      credentials: "include",
      body: formData,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload error:", response.status, errorText);
      
      if (response.status === 413) {
        throw new Error("File too large. Maximum upload size exceeded.");
      }
      
      throw new Error(`Error uploading video: ${response.statusText}`);
    }
    
    return response.json();
  } catch (error: any) {
    console.error("Video upload error:", error);
    
    // Check if it's a network error
    if (error.name === 'TypeError') {
      throw new Error("Network error. Please check your connection and try again.");
    }
    
    throw new Error(error.message || "Failed to upload video. Please try again.");
  }
};