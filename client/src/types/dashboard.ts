import { Task } from "./task";
import { User } from "./user";

export interface ChartData {
  name: string;
  total: number;
}

export interface DashboardStats {
  totalTasks: number;

  tasks: {
    completed: number;
    todo: number;
    "in progress": number;
  };

  graphData: ChartData[];
  last10Task: Task[];
  users: User[];
}