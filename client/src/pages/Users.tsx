import {
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import AddUser from "@/components/AddUser";
import ConfirmationDialog, {
  UserAction,
} from "@/components/Dialogs";

import UsersToolbar from "@/components/users/UsersToolbar";
import UsersTable from "@/components/users/UsersTable";
import { ApiCollection } from "@/api/ApiCollection";
import { User } from "@/types/user";

const Users = () => {
  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    openAction,
    setOpenAction,
  ] = useState(false);

  const [
    selected,
    setSelected,
  ] =
    useState<
      User | string | null
    >(null);

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
      } catch (
        error
      ) {
        console.log(
          error
        );

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

  const userActionHandler =
    async () => {
      if (
        !selected ||
        typeof selected ===
          "string"
      ) {
        return;
      }

      try {
        const result =
          await ApiCollection.userAction(
            selected._id,
            {
              isActive:
                !selected.isActive,
            }
          );

        await fetchUsers();

        toast.success(
          result.message
        );

        setSelected(
          null
        );

        setOpenAction(
          false
        );
      } catch (
        error: unknown
      ) {
        console.log(
          error
        );

        toast.error(
          "Something went wrong"
        );
      }
    };

  const deleteHandler =
    async () => {
      if (
        !selected ||
        typeof selected !==
          "string"
      ) {
        return;
      }

      try {
        await ApiCollection.deleteUser(
          selected
        );

        await fetchUsers();

        toast.success(
          "Deleted successfully"
        );

        setSelected(
          null
        );

        setOpenDialog(
          false
        );
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "Something went wrong"
        );
      }
    };

  const handleDelete =
    (id: string) => {
      setSelected(id);

      setOpenDialog(
        true
      );
    };

  const handleEdit = (
    user: User
  ) => {
    setSelected(user);

    setOpen(true);
  };

  const handleStatus =
    (user: User) => {
      setSelected(user);

      setOpenAction(
        true
      );
    };

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <UsersToolbar
          onAdd={() =>
            setOpen(
              true
            )
          }
        />

        <UsersTable
          users={users}
          isLoading={
            isLoading
          }
          onEdit={
            handleEdit
          }
          onDelete={
            handleDelete
          }
          onStatus={
            handleStatus
          }
        />
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={
          typeof selected ===
          "object"
            ? selected
            : null
        }
        key={Date.now()}
      />

      <ConfirmationDialog
        open={openDialog}
        setOpen={
          setOpenDialog
        }
        onClick={
          deleteHandler
        }
      />

      <UserAction
        open={openAction}
        setOpen={
          setOpenAction
        }
        onClick={
          userActionHandler
        }
      />
    </>
  );
};

export default Users;