import {
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { ApiCollection } from "@/api/ApiCollection";
import { User } from "@/types/user";

export const useUsers =
  () => {
    const [
      users,
      setUsers,
    ] = useState<User[]>([]);

    const [
      isLoading,
      setIsLoading,
    ] = useState(false);

    const fetchUsers =
      async () => {
        try {
          setIsLoading(
            true
          );

          const response =
            await ApiCollection.getTeamList();

          setUsers(
            response.data ||
              []
          );
        } catch {
          toast.error(
            "Failed to fetch users"
          );
        } finally {
          setIsLoading(
            false
          );
        }
      };

    useEffect(() => {
      fetchUsers();
    }, []);

    const deleteUser =
      async (
        id: string
      ) => {
        await ApiCollection.deleteUser(
          id
        );

        toast.success(
          "Deleted successfully"
        );

        fetchUsers();
      };

    const toggleUserStatus =
      async (
        user: User
      ) => {
        await ApiCollection.userAction(
          user._id,
          {
            isActive:
              !user.isActive,
          }
        );

        toast.success(
          "Updated successfully"
        );

        fetchUsers();
      };

    return {
      users,
      isLoading,
      deleteUser,
      toggleUserStatus,
      refetch:
        fetchUsers,
    };
  };