import {
  useState,
} from "react";

import clsx from "clsx";
import {
  BiMessageAltDetail,
} from "react-icons/bi";

import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

import { FaList } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  BGS,
  PRIORITYSTYLES,
  TASK_TYPE,
  formatDate,
} from "@/utils";

import UserInfo from "@/components/UserInfo";
import Button from "@/components/Button";
import ConfirmationDialog from "@/components/Dialogs";
import AddTask from "./AddTask";
import { ApiCollection } from "@/api/ApiCollection";
import type { Task } from "@/types/task";

const ICONS = {
  high:
    <MdKeyboardDoubleArrowUp />,

  medium:
    <MdKeyboardArrowUp />,

  low:
    <MdKeyboardArrowDown />,
};

interface TableProps {
  tasks: Task[];
}

interface TableRowProps {
  task: Task;
}

const Table = ({
  tasks,
}: TableProps) => {
  const [
    openDialog,
    setOpenDialog,
  ] = useState(false);

  const [
    selectedId,
    setSelectedId,
  ] = useState<
    string | null
  >(null);

  const [
    selectedTask,
    setSelectedTask,
  ] = useState<
    Task | undefined
  >();

  const [
    openEdit,
    setOpenEdit,
  ] = useState(false);

  const deleteClicks = (
    id: string
  ) => {
    setSelectedId(id);

    setOpenDialog(true);
  };

  const editTaskHandler = (
    task: Task
  ) => {
    setSelectedTask(task);

    setOpenEdit(true);
  };

  const deleteHandler =
    async () => {
      if (!selectedId) {
        return;
      }

      try {
        const response =
          await ApiCollection.trashTask(
            selectedId
          );

        toast.success(
          response.message ||
            "Task deleted successfully"
        );

        setTimeout(() => {
          setOpenDialog(
            false
          );

          window.location.reload();
        }, 1200);
      } catch (error) {
        console.log(error);

        toast.error(
          "Something went wrong"
        );
      }
    };

  const TableHeader =
    () => (
      <thead className="w-full border-b border-gray-300">
        <tr className="w-full text-black text-left">
          <th className="py-2">
            Task Title
          </th>

          <th className="py-2">
            Priority
          </th>

          <th className="py-2">
            Created At
          </th>

          <th className="py-2">
            Assets
          </th>

          <th className="py-2">
            Team
          </th>

          <th className="py-2 text-right">
            Actions
          </th>
        </tr>
      </thead>
    );

  const TableRow = ({
    task,
  }: TableRowProps) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-4 h-4 rounded-full",
              TASK_TYPE[
                task.stage
              ]
            )}
          />

          <p className="w-full line-clamp-2 text-base text-black">
            {task.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-1 items-center">
          <span
            className={clsx(
              "text-lg",
              PRIORITYSTYLES[
                task.priority
              ]
            )}
          >
            {
              ICONS[
                task.priority as keyof typeof ICONS
              ]
            }
          </span>

          <span className="capitalize">
            {
              task.priority
            }{" "}
            Priority
          </span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">
          {formatDate(
            new Date(
              task.date
            )
          )}
        </span>
      </td>

      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />

            <span>
              {
                task
                  .activities
                  ?.length
              }
            </span>
          </div>

          <div className="flex gap-1 items-center text-sm text-gray-600">
            <MdAttachFile />

            <span>
              {
                task.assets
                  ?.length
              }
            </span>
          </div>

          <div className="flex gap-1 items-center text-sm text-gray-600">
            <FaList />

            <span>
              0/
              {
                task
                  .subTasks
                  ?.length
              }
            </span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task.team?.map(
            (
              member,
              index
            ) => (
              <div
                key={
                  member._id
                }
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[
                    index %
                      BGS.length
                  ]
                )}
              >
                <UserInfo
                  user={
                    member
                  }
                />
              </div>
            )
          )}
        </div>
      </td>

      <td className="py-2">
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            label="Edit"
            className="text-blue-600 hover:text-blue-500 text-sm"
            onClick={() =>
              editTaskHandler(
                task
              )
            }
          />

          <Button
            type="button"
            label="Delete"
            className="text-red-700 hover:text-red-500 text-sm"
            onClick={() =>
              deleteClicks(
                task._id
              )
            }
          />
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />

            <tbody>
              {tasks.map(
                (
                  task
                ) => (
                  <TableRow
                    key={
                      task._id
                    }
                    task={task}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        open={
          openDialog
        }
        setOpen={
          setOpenDialog
        }
        onClick={
          deleteHandler
        }
      />

      <AddTask
        open={openEdit}
        setOpen={
          setOpenEdit
        }
        task={
          selectedTask
        }
      />
    </>
  );
};

export default Table;