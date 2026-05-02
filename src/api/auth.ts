import api from "#/lib/axios";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data as { accessToken: string; user: { id: string; name: string; email: string } };
};
