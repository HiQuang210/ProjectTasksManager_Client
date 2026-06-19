import {
  MdDelete,
  MdOutlineRestore,
} from "react-icons/md";

import Button from "@/components/Button";
import Title from "@/components/Title";

interface TrashToolbarProps {
  onRestoreAll: () => void;
  onDeleteAll: () => void;
}

const TrashToolbar = ({
  onRestoreAll,
  onDeleteAll,
}: TrashToolbarProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <Title title="Trashed Tasks" />

      <div className="flex gap-2 md:gap-4 items-center">
        <Button
          label="Restore All"
          icon={
            <MdOutlineRestore className="text-lg hidden md:flex" />
          }
          className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
          onClick={onRestoreAll}
        />

        <Button
          label="Delete All"
          icon={
            <MdDelete className="text-lg hidden md:flex" />
          }
          className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
          onClick={onDeleteAll}
        />
      </div>
    </div>
  );
};

export default TrashToolbar;