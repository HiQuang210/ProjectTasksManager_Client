import { JSX } from "react";

import {
  MdGridView,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
} from "react-icons/md";

import { FaBug, FaList, FaThumbsUp, FaUser } from "react-icons/fa";

import { GrInProgress } from "react-icons/gr";

export interface TabItem {
  title: string;
  icon: JSX.Element;
}

export const TASK_TABS: TabItem[] = [
  {
    title: "Board View",
    icon: <MdGridView />,
  },

  {
    title: "List View",
    icon: <FaList />,
  },
];

export const TASK_STAGE_COLORS = {
  todo: "bg-blue-600",

  "in progress": "bg-yellow-600",

  completed: "bg-green-600",
};

export const PRIORITY_ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdKeyboardArrowDown />,
  low: <MdKeyboardArrowDown />,
};

export const PRIORITY_BG = {
  high: "bg-red-200",

  medium: "bg-yellow-200",

  normal: "bg-blue-200",

  low: "bg-blue-200",
};

export const TASK_ACTIVITY_ICONS: Record<
  string,
  JSX.Element
> = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />
    </div>
  ),

  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),

  assigned: (
    <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <FaUser size={14} />
    </div>
  ),

  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),

  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),

  "in progress": (
    <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

export const ACTIVITY_TYPES = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];