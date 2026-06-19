import clsx from "clsx";
import moment from "moment";
import UserInfo from "@/components/UserInfo";
import {
  BGS,
  PRIORITYSTYLES,
  TASK_TYPE,
} from "@/utils";

import { Task } from "@/types/task";
import { PRIORITY_ICONS } from "@/constants/dashboard";

interface Props {
  tasks: Task[];
}

const DashboardTaskTable = ({
  tasks,
}: Props) => {
  return (
    <div className="w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">
              Task Title
            </th>

            <th className="py-2">
              Priority
            </th>

            <th className="py-2">
              Team
            </th>

            <th className="py-2 hidden md:block">
              Created At
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map(
            (task, index) => (
              <tr
                key={
                  task._id ??
                  index
                }
                className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10"
              >
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

                    <p className="text-base text-black">
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
                        PRIORITY_ICONS[
                          task.priority
                        ]
                      }
                    </span>

                    <span className="capitalize">
                      {task.priority}
                    </span>
                  </div>
                </td>

                <td className="py-2">
                  <div className="flex">
                    {task.team?.map(
                      (
                        member,
                        idx
                      ) => (
                        <div
                          key={
                            member._id
                          }
                          className={clsx(
                            "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                            BGS[
                              idx %
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

                <td className="py-2 hidden md:block">
                  <span className="text-base text-gray-600">
                    {moment(
                      task.date
                    ).fromNow()}
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTaskTable;