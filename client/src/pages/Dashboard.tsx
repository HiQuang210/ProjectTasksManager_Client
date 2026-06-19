import {
  useEffect,
  useState,
} from "react";

import {
  FaNewspaper,
} from "react-icons/fa";

import {
  FaArrowsToDot,
} from "react-icons/fa6";

import {
  LuClipboard
} from "react-icons/lu";

import {
  MdAdminPanelSettings,
} from "react-icons/md";

import Loading from "@/components/Loader";
import { Chart } from "@/components/Chart";
import { ApiCollection } from "@/api/ApiCollection";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardTaskTable from "@/components/dashboard/DashboardTaskTable";
import DashboardUserTable from "@/components/dashboard/DashboardUserTable";

import {
  DashboardStats,
} from "@/types/dashboard";

const Dashboard = () => {
  const [
    data,
    setData,
  ] =
    useState<DashboardStats | null>(
      null
    );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const response =
            await ApiCollection.getDashboardStats();

          setData(
            response
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        } finally {
          setIsLoading(
            false
          );
        }
      };

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  const totals =
    data?.tasks;

  const stats = [
    {
      _id: "1",
      label:
        "TOTAL TASK",
      total:
        data?.totalTasks ||
        0,
      icon:
        <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },

    {
      _id: "2",
      label:
        "COMPLETED TASK",
      total:
        totals?.completed ||
        0,
      icon:
        <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },

    {
      _id: "3",
      label:
        "TASK IN PROGRESS",
      total:
        totals?.[
          "in progress"
        ] || 0,
      icon:
        <LuClipboard />,
      bg: "bg-[#f59e0b]",
    },

    {
      _id: "4",
      label: "TODOS",
      total:
        totals?.todo ||
        0,
      icon:
        <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(
          (item) => (
            <DashboardCard
              key={
                item._id
              }
              {...item}
              count={
                item.total
              }
            />
          )
        )}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-xs">
        <h4 className="text-xl text-gray-600 font-semibold">
          Chart by
          Priority
        </h4>

        <Chart
          data={
            data?.graphData ||
            []
          }
        />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        <DashboardTaskTable
          tasks={
            data?.last10Task ||
            []
          }
        />

        <DashboardUserTable
          users={
            data?.users ||
            []
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;