import { Task } from "./task";

export interface Notification {
  _id: string;
  team: string[];
  text: string;
  task: Pick<
    Task,
    "_id" | "title"
  > | null;

  notiType:
    | "alert"
    | "message";

  isRead: string[];
  createdAt: string;
  updatedAt: string;
}