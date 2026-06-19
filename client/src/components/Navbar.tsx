import { HiOutlineMenuAlt3 } from "react-icons/hi";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";
import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hooks";
import {
  setOpenSidebar,
} from "@/redux/slices/authSlice";

const Navbar = () => {
  const { } =
    useAppSelector(
      (state) => state.auth
    );

  const dispatch =
    useAppDispatch();

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() =>
            dispatch(
              setOpenSidebar(true)
            )
          }
          className="text-gray-500 block md:hidden"
        >
          <HiOutlineMenuAlt3
            size={28}
          />
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;