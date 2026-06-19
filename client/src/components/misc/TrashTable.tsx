import { Task } from "@/types/task";
import TrashTableRow from "./TrashTableRow";

interface TrashTableProps {
  tasks: Task[];

  onRestore: (
    id: string
  ) => void;

  onDelete: (
    id: string
  ) => void;
}

const TABLE_HEADERS = [
  "Task Title",
  "Priority",
  "Stage",
  "Modified On",
];

const TrashTable = ({
  tasks,
  onRestore,
  onDelete,
}: TrashTableProps) => {
  return (
    <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
      <div className="overflow-x-auto">
        <table className="w-full mb-5">
          <thead className="border-b border-gray-300">
            <tr className="text-black text-left">
              {TABLE_HEADERS.map(
                (
                  header
                ) => (
                  <th
                    key={
                      header
                    }
                    className="py-2"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {tasks.map(
              (task) => (
                <TrashTableRow
                  key={
                    task._id
                  }
                  task={task}
                  onRestore={
                    onRestore
                  }
                  onDelete={
                    onDelete
                  }
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrashTable;