import { User } from "./user";

export interface SubTask {
  _id: string;
  title: string;
  date: string;
  tag: string;
}

export interface Activity {
  _id: string;
  type: string;
  activity: string;
  date: string;
  by: User;
}

export interface Task {
  _id: string;
  title: string;
  date: string;

  stage:
    | "todo"
    | "in progress"
    | "completed";

  priority:
    | "high"
    | "medium"
    | "normal"
    | "low";

  assets?: string[];

  team?: User[];

  activities?: Activity[];

  subTasks?: SubTask[];
}