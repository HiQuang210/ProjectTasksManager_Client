import { IoPersonAdd } from "react-icons/io5";
import Button from "@/components/Button";
import Title from "@/components/Title";

interface UsersToolbarProps {
  onAdd: () => void;
}

const UsersToolbar = ({
  onAdd,
}: UsersToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Title title="Team Members" />

      <Button
        label="Add New User"
        icon={
          <IoPersonAdd className="text-lg" />
        }
        className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
        onClick={onAdd}
      />
    </div>
  );
};

export default UsersToolbar;