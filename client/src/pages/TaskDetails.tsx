import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Tabs from "@/components/Tabs";
import Loading from "@/components/Loader";
import { ApiCollection } from "@/api/ApiCollection";
import { Task } from "@/types/task";
import TaskContent from "@/components/task/TaskContent";
import Activities from "@/components/task/Activities";

const TABS = [
  {
    title: "Task Detail",
    icon: <FaTasks />,
  },

  {
    title:
      "Activities/Timeline",

    icon: <RxActivityLog />,
  },
];

interface TaskResponse {
  task: Task;
}

const TaskDetails = () => {
  const { id } =
    useParams<{
      id: string;
    }>();

  const [selected, setSelected] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [task, setTask] =
    useState<Task | null>(null);

  const fetchTask = async () => {
    if (!id) return;

    try {
      setLoading(true);

      const response: TaskResponse =
        await ApiCollection.getSingleTask(
          id
        );

      setTask(response.task);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch task."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="py-10 text-center text-gray-500">
        Task not found.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 mb-4">
      <h1 className="text-2xl font-bold text-gray-700">
        {task.title}
      </h1>

      <Tabs
        tabs={TABS}
        setSelected={setSelected}
      >
        {selected === 0 ? (
          <TaskContent
            task={task}
          />
        ) : (
          <Activities
            activity={
              task.activities ||
              []
            }
            id={task._id}
            refetch={fetchTask}
          />
        )}
      </Tabs>
    </div>
  );
};

export default TaskDetails;