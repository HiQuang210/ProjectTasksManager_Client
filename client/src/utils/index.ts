import { Task } from "@/types/task";

type TaskPriority = Task["priority"];
type TaskStage = Task["stage"];

export const formatDate = (
  date: Date
): string => {
  const month = date.toLocaleString(
    "en-US",
    {
      month: "short",
    }
  );

  const day = date.getDate();

  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const dateFormatter = (
  dateString: string
): string => {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate.getTime())) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();

  const month = String(
    inputDate.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    inputDate.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getInitials = (
  fullName: string
): string => {
  const names = fullName.split(" ");

  const initials = names
    .slice(0, 2)
    .map(
      (name) =>
        name[0]?.toUpperCase() ?? ""
    );

  return initials.join("");
};

export const PRIORITYSTYLES: Record<
  TaskPriority,
  string
> = {
  high: "text-red-600",

  medium: "text-yellow-600",

  normal: "text-orange-600",

  low: "text-blue-600",
};

export const TASK_TYPE: Record<
  TaskStage,
  string
> = {
  todo: "bg-blue-600",

  "in progress":
    "bg-yellow-600",

  completed: "bg-green-600",
};

export const BGS: string[] = [
  "bg-blue-600",

  "bg-yellow-600",

  "bg-red-600",

  "bg-green-600",
];