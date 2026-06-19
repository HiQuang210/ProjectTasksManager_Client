import clsx from "clsx";

import {
  MdDelete,
  MdOutlineRestore,
} from "react-icons/md";

import Button from "@/components/Button";

import {
  PRIORITYSTYLES,
  TASK_TYPE,
} from "@/utils";

import {
  PRIORITY_ICONS,
} from "@/constants/task";

import { Task } from "@/types/task";

interface TrashTableRowProps {
  task: Task;

  onRestore: (
    id: string
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

const TrashTableRow = ({
  task,
  onRestore,
  onDelete,
}: TrashTableRowProps) => {
  return (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
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

      <td className="py-2 capitalize">
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
              PRIORITY_ICONS[
                task.priority
              ]
            }
          </span>

          <span>
            {task.priority}
          </span>
        </div>
      </td>

      <td className="py-2 capitalize text-center md:text-start">
        {task.stage}
      </td>

      <td className="py-2 text-sm">
        {new Date(
          task.date
        ).toDateString()}
      </td>

      <td className="py-2 flex gap-1 justify-end">
        <Button
          icon={
            <MdOutlineRestore className="text-xl text-gray-500" />
          }
          onClick={() =>
            onRestore(
              task._id
            )
          }
        />

        <Button
          icon={
            <MdDelete className="text-xl text-red-600" />
          }
          onClick={() =>
            onDelete(
              task._id
            )
          }
        />
      </td>
    </tr>
  );
};

export default TrashTableRow;