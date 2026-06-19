const UsersTableHeader =
  () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">
          Full Name
        </th>

        <th className="py-2">
          Title
        </th>

        <th className="py-2">
          Email
        </th>

        <th className="py-2">
          Role
        </th>

        <th className="py-2">
          Status
        </th>

        <th className="py-2 text-center">
          Action
        </th>
      </tr>
    </thead>
  );

export default UsersTableHeader;