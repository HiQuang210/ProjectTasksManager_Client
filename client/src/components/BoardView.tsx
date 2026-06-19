import TaskCard from "@/components/task/TaskCard";

import { Task } from "@/types/task";

interface BoardViewProps {
  tasks: Task[];
}

const BoardView = ({
  tasks,
}: BoardViewProps) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
      {tasks.map((task) => (
        <TaskCard
          task={task}
          key={task._id}
        />
      ))}
    </div>
  );
};

export default BoardView;