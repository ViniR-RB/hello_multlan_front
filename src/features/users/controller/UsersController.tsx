import { useQuery } from "@tanstack/react-query";
import { httpClient } from "../../../core/http/client";
import UserModel from "../../../core/models/user_model";
import AppQuery from "../../../core/querys/appQuery";

export default function UsersController() {
  const getUsers = async () => {
    const response = await httpClient.auth.get<UserModel[]>("/api/auth/all");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [AppQuery.getUsers],
    queryFn: getUsers,
    staleTime: 0,
    refetchOnMount: false,
  });

  const createUser = async (
    data: Pick<UserModel, "name" | "email" | "password">
  ) => {
    await httpClient.unAuth.post("/api/auth/register", data);
  };

  const updatePassword = async (data: Pick<UserModel, "id" | "password">) => {
    const { id, password } = data;
    await httpClient.auth.post(`/api/auth/change-password/${id}`, { password });
  };

  return { users: data, isLoading, error, createUser, updatePassword };
}
