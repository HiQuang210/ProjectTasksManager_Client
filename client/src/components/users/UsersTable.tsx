import { User } from "@/types/user";

import UsersTableRow from "./UsersTableRow";

interface UsersTableProps {
  users: User[];

  isLoading: boolean;

  onEdit: (
    user: User
  ) => void;

  onDelete: (
    id: string
  ) => void;

  onStatus: (
    user: User
  ) => void;
}

const TABLE_HEADERS = [
  "Full Name",
  "Title",
  "Email",
  "Role",
  "Status",
  "Action",
];

const UsersTable = ({
  users,
  isLoading,
  onEdit,
  onDelete,
  onStatus,
}: UsersTableProps) => {
  return (
    <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
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
                    className={`
                      py-2
                      ${
                        header ===
                        "Action"
                          ? "text-center"
                          : ""
                      }
                    `}
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-6 text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              users.map(
                (
                  user
                ) => (
                  <UsersTableRow
                    key={
                      user._id
                    }
                    user={user}
                    onEdit={
                      onEdit
                    }
                    onDelete={
                      onDelete
                    }
                    onStatus={
                      onStatus
                    }
                  />
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;