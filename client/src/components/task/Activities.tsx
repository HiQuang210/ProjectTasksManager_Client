import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import Loading from "@/components/Loader";
import { ApiCollection } from "@/api/ApiCollection";
import { Activity } from "@/types/task";
import ActivityCard from "./ActivityCard";
import {
  ACTIVITY_TYPES,
} from "@/constants/task";

interface Props {
  activity: Activity[];
  id: string;
  refetch: () => Promise<void>;
}

const Activities = ({
  activity,
  id,
  refetch,
}: Props) => {
  const [selected, setSelected] =
    useState(
      ACTIVITY_TYPES[0]
    );

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit =
    async () => {
      if (!text.trim()) {
        toast.error(
          "Please enter activity."
        );

        return;
      }

      try {
        setLoading(true);

        const result =
          await ApiCollection.postTaskActivity(
            id,
            {
              type:
                selected.toLowerCase(),
              activity: text,
            }
          );

        toast.success(
          result.message
        );

        setText("");

        await refetch();
      } catch (err: any) {
        toast.error(
          err?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="w-full flex flex-col md:flex-row gap-10 px-10 py-8 bg-white shadow rounded-md">
      <div className="w-full md:w-1/2">
        <h4 className="text-lg font-semibold mb-5">
          Activities
        </h4>

        {activity.map((item) => (
          <ActivityCard
            key={item._id}
            item={item}
          />
        ))}
      </div>

      <div className="w-full md:w-1/3">
        <h4 className="text-lg font-semibold mb-5">
          Add Activity
        </h4>

        <div className="flex flex-wrap gap-5">
          {ACTIVITY_TYPES.map(
            (item) => (
              <label
                key={item}
                className="flex gap-2 items-center"
              >
                <input
                  type="checkbox"
                  checked={
                    selected === item
                  }
                  onChange={() =>
                    setSelected(item)
                  }
                />

                <p>{item}</p>
              </label>
            )
          )}

          <textarea
            rows={10}
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
            placeholder="Type something..."
            className="w-full mt-6 border border-gray-300 outline-none p-4 rounded-md"
          />

          {loading ? (
            <Loading />
          ) : (
            <Button
              type="button"
              label="Submit"
              onClick={
                handleSubmit
              }
              className="bg-blue-600 text-white rounded"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;