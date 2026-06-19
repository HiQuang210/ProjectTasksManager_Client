import {
  useEffect,
  useState,
} from "react";

import { toast } from "react-toastify";
import Loading from "@/components/Loader";
import ConfirmationDialog from "@/components/Dialogs";
import TrashToolbar from "@/components/misc/TrashToolbar";
import TrashTable from "@/components/misc/TrashTable";
import { ApiCollection } from "@/api/ApiCollection";
import { Task } from "@/types/task";

type ActionType =
  | "delete"
  | "deleteAll"
  | "restore"
  | "restoreAll";

interface TrashResponse {
  tasks: Task[];
}

const Trash = () => {
  const [
    tasks,
    setTasks,
  ] = useState<Task[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const [
    selected,
    setSelected,
  ] = useState("");

  const [
    type,
    setType,
  ] =
    useState<ActionType>(
      "delete"
    );

  const [msg, setMsg] = useState<string | null>(null);
  const fetchTrashTasks =
    async () => {
      try {
        setIsLoading(
          true
        );

        const response: TrashResponse =
          await ApiCollection.getAllTask(
            "",
            true,
            ""
          );

        setTasks(
          response.tasks ||
            []
        );
      } catch (
        error
      ) {
        console.log(
          error
        );

        toast.error(
          "Failed to fetch trash tasks"
        );
      } finally {
        setIsLoading(
          false
        );
      }
    };

  useEffect(() => {
    fetchTrashTasks();
  }, []);

  const openConfirm =
    (
      action: ActionType,
      message: string,
      id = ""
    ) => {
      setType(action);

      setMsg(message);

      setSelected(id);

      setOpenDialog(
        true
      );
    };

  const deleteRestoreHandler =
    async () => {
      try {
        const result =
        await ApiCollection.deleteRestoreTask(
          selected,
          type
        );

        toast.success(
          result.message
        );

        await fetchTrashTasks();

        setOpenDialog(
          false
        );
      } catch (
        error: unknown
      ) {
        console.log(
          error
        );

        const err =
          error as {
            response?: {
              data?: {
                message?: string;
              };
            };

            message?: string;
          };

        toast.error(
          err?.response
            ?.data
            ?.message ||
            err?.message ||
            "Something went wrong"
        );
      }
    };

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <TrashToolbar
          onRestoreAll={() =>
            openConfirm(
              "restoreAll",
              "Do you want to restore all items in the trash?"
            )
          }
          onDeleteAll={() =>
            openConfirm(
              "deleteAll",
              "Do you want to permanently delete all items?"
            )
          }
        />

        <TrashTable
          tasks={tasks}
          onRestore={(
            id
          ) =>
            openConfirm(
              "restore",
              "Do you want to restore the selected item?",
              id
            )
          }
          onDelete={(
            id
          ) =>
            openConfirm(
              "delete",
              "Do you want to permanently delete this item?",
              id
            )
          }
        />
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={
          setOpenDialog
        }
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={
          deleteRestoreHandler
        }
      />
    </>
  );
};

export default Trash;