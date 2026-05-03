import api from "#/lib/axios";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data as {
    accessToken: string;
    user: { id: string; name: string; email: string };
  };
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to login";
    throw new Error(message);
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (err: any) {
    const message = err.response?.data?.message || "Failed to logout";
    throw new Error(message);
  }
};

export const refreshAccessToken = async () => {
  try {
    const res = await api.post("/auth/refresh");
    return res.data;
  } catch (err: any) {
    const message =
      err.response?.data?.message || "Failed to access refresh token";
    throw new Error(err.message);
  }
};
