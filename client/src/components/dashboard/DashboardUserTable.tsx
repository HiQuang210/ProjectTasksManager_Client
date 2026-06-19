import clsx from "clsx";
import moment from "moment";
import { User } from "@/types/user";
import { getInitials } from "@/utils";

interface Props {
  users: User[];
}

const DashboardUserTable = ({
  users,
}: Props) => {
  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded">
      <table className="w-full mb-5">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">
              Full Name
            </th>

            <th className="py-2">
              Status
            </th>

            <th className="py-2">
              Created At
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map(
            (user, index) => {
              const isActive =
                user?.isActive ??
                false;

              return (
                <tr
                  key={
                    user._id ??
                    index
                  }
                  className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10"
                >
                  <td className="py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
                        <span className="text-center">
                          {getInitials(
                            user.name
                          )}
                        </span>
                      </div>

                      <div>
                        <p>
                          {user.name}
                        </p>

                        <span className="text-xs text-black">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <p
                      className={clsx(
                        "w-fit px-3 py-1 rounded-full text-sm",
                        isActive
                          ? "bg-blue-200"
                          : "bg-yellow-100"
                      )}
                    >
                      {isActive
                        ? "Active"
                        : "Disabled"}
                    </p>
                  </td>

                  <td className="py-2 text-sm">
                    {moment(
                      user.createdAt
                    ).fromNow()}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardUserTable;