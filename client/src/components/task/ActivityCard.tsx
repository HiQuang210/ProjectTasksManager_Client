import moment from "moment";
import { Activity } from "@/types/task";
import {
  TASK_ACTIVITY_ICONS,
} from "@/constants/task";

interface Props {
  item: Activity;
}

const ActivityCard = ({
  item,
}: Props) => {
  return (
    <div className="flex space-x-4">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-10 h-10 flex items-center justify-center">
          {
            TASK_ACTIVITY_ICONS[
              item.type
            ]
          }
        </div>

        <div className="w-0.5 bg-gray-300 h-full" />
      </div>

      <div className="flex flex-col gap-y-1 mb-8">
        <p className="font-semibold">
          {item.by?.name}
        </p>

        <div className="text-gray-500">
          <span className="capitalize">
            {item.type}
          </span>

          <span className="text-sm ml-2">
            {moment(
              item.date
            ).fromNow()}
          </span>
        </div>

        <div className="text-gray-700">
          {item.activity}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;