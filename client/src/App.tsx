import { Transition } from "@headlessui/react";
import './index.css';
import clsx from "clsx";
import { Fragment, useRef } from "react";
import { IoClose } from "react-icons/io5";

import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

import { setOpenSidebar } from "./redux/slices/authSlice";

import {
  useAppDispatch,
  useAppSelector,
} from "./redux/hooks";

const Layout = () => {
  const { user } = useAppSelector(
    (state) => state.auth
  );

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className="flex-1 overflow-y-auto">
        <Navbar />

        <div className="p-4 2xl:px-10">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate
      to="/log-in"
      state={{ from: location }}
      replace
    />
  );
};

const MobileSidebar = () => {
  const { isSidebarOpen } = useAppSelector(
    (state) => state.auth
  );

  const mobileMenuRef =
    useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter="transition-opacity duration-700"
      enterFrom="opacity-x-10"
      enterTo="opacity-x-100"
      leave="transition-opacity duration-700"
      leaveFrom="opacity-x-100"
      leaveTo="opacity-x-0"
    >
      <div
        ref={mobileMenuRef}
        className={clsx(
          "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
          isSidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        )}
        onClick={closeSidebar}
      >
        <div className="bg-white w-3/4 h-full">
          <div className="w-full flex justify-end px-5 mt-5">
            <button
              onClick={closeSidebar}
              className="flex justify-end items-end"
            >
              <IoClose size={25} />
            </button>
          </div>

          <div className="-mt-10">
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

function App() {
  return (
    <main className="w-full min-h-screen bg-[#f3f4f6]">
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/tasks"
            element={<Tasks />}
          />

          <Route
            path="/completed/:status"
            element={<Tasks />}
          />

          <Route
            path="/in-progress/:status"
            element={<Tasks />}
          />

          <Route
            path="/todo/:status"
            element={<Tasks />}
          />

          <Route
            path="/team"
            element={<Users />}
          />

          <Route
            path="/trashed"
            element={<Trash />}
          />

          <Route
            path="/task/:id"
            element={<TaskDetails />}
          />
        </Route>

        <Route
          path="/log-in"
          element={<Login />}
        />
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}
      />
    </main>
  );
}

export default App;