import clsx from "clsx";
import { MdTaskAlt } from "react-icons/md";
import {
  PRIORITYSTYLES,
  TASK_TYPE,
  getInitials,
} from "@/utils";

import { Task } from "@/types/task";

import {
  PRIORITY_BG,
  PRIORITY_ICONS,
} from "@/constants/task";

interface Props {
  task: Task;
}

const TaskContent = ({
  task,
}: Props) => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 bg-white shadow-md p-8">
      <div className="w-full md:w-1/2 space-y-8">
        <div className="flex items-center gap-5">
          <div
            className={clsx(
              "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
              PRIORITYSTYLES[
                task.priority
              ],
              PRIORITY_BG[
                task.priority
              ]
            )}
          >
            <span className="text-lg">
              {
                PRIORITY_ICONS[
                  task.priority
                ]
              }
            </span>

            <span className="uppercase">
              {task.priority}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "w-4 h-4 rounded-full",
                TASK_TYPE[
                  task.stage
                ]
              )}
            />

            <span className="uppercase">
              {task.stage}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {task.team?.map(
            (member) => (
              <div
                key={
                  member._id
                }
                className="flex gap-4 items-center"
              >
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                  {getInitials(
                    member.name
                  )}
                </div>

                <div>
                  <p className="font-semibold">
                    {
                      member.name
                    }
                  </p>

                  <span className="text-gray-500">
                    {
                      member.title
                    }
                  </span>
                </div>
              </div>
            )
          )}
        </div>

        <div className="space-y-5">
          {task.subTasks?.map(
            (subTask) => (
              <div
                key={
                  subTask._id
                }
                className="flex gap-3"
              >
                <MdTaskAlt
                  size={24}
                />

                <div>
                  <p>
                    {
                      subTask.title
                    }
                  </p>

                  <span className="text-sm text-gray-500">
                    {
                      subTask.tag
                    }
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="grid grid-cols-2 gap-4">
          {task.assets?.map(
            (
              asset,
              index
            ) => (
              <img
                key={
                  asset +
                  index
                }
                src={asset}
                alt={
                  task.title
                }
                className="rounded h-36 object-cover"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskContent;