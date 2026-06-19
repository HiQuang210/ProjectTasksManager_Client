import {
  useEffect,
  useState,
} from "react";

import { ApiCollection } from "@/api/ApiCollection";
import { Task } from "@/types/task";

interface TaskResponse {
  tasks: Task[];
}

export const useTasks = (
  status: string
) => {
  const [
    data,
    setData,
  ] =
    useState<TaskResponse | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const fetchTasks =
    async () => {
      try {
        setIsLoading(true);

        const response =
          await ApiCollection.getAllTask(
            status,
            false,
            ""
          );

        setData(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  return {
    data,
    isLoading,
    refetch: fetchTasks,
  };
};