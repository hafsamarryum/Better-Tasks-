import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/endpoints/task";
import { FaTasks } from "react-icons/fa";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { TbSubtask } from "react-icons/tb";
import { GrTasks } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { PiListNumbersBold } from "react-icons/pi";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    myTasks: 0,
    statusCounts: {
      TODO: 0,
      IN_PROGRESS: 0,
      DONE: 0,
    },
    activeUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex-1 text-[#1e1f1c] dashBoardImg ">
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center bg-transparent bg-opacity-[0.5] rounded-xl shadow-xl backdrop-blur-[6px]">
        <div className=" flex flex-col justify-center items-center rounded-[15px] pb-[18px]">
          <div className="flex flex-wrap gap-[20px] px-[20px]">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex flex-col justify-center items-center gap-[10px] bg-[#2892e0] hover:bg-[#1f2d3d] py-[16px] px-[24px] rounded-[12px] text-[#FFF] w-[180px]">
                <div className="h-[50px] w-[50px] bg-[#FFF] text-[#2892e0] rounded-[32px] flex justify-center items-center">
                  <TbSubtask className="text-[37px]" />
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>Total Tasks</p>
                  <p>{stats.totalTasks}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="flex flex-col justify-center items-center gap-[10px] bg-[#2892e0] hover:bg-[#1f2d3d] py-[16px] px-[24px] rounded-[12px] text-[#FFF] w-[180px]">
                <div className="h-[50px] w-[50px] bg-[#FFF] text-[#2892e0] rounded-[32px] flex justify-center items-center">
                  <GrTasks className="text-[26px]" />
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>My Tasks</p>
                  <p>{stats.myTasks}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-[10px] bg-[#2892e0] hover:bg-[#1f2d3d] py-[16px] px-[24px] rounded-[12px] text-[#FFF] w-[180px]">
              <div className="h-[50px] w-[50px] bg-[#FFF] text-[#2892e0] rounded-[32px] flex justify-center items-center">
                <FaUsers className="text-[30px]" />
              </div>
              <div className="w-full flex justify-between items-center">
                <p>Active Users</p>
                <p>{stats.activeUsers}</p>
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="w-[730px] flex flex-col gap-[15px]">
              <h1 className="text-2xl text-[#FFF] text-center bg-[#1f2d3d] py-[10px] m-[0px]">
                TASKS
              </h1>
              <div className="w-[100%] flex justify-around items-start">
                <div className="flex flex-col gap-[10px] justify-around items-start">
                  <div className="w-[230px] flex bg-[#fff5] py-[5px] justify-start items-center pl-[10px]">
                    <div className="h-[40px] w-[40px] bg-[#FFF] text-[#2892e0] rounded-[32px] flex justify-center items-center">
                      <FaTasks className="text-[#2892e0] text-[24px]" />
                    </div>
                    <h2 className="text-lg text-[#1f2d3d] m-[0px] text-start pl-[15px] ">
                      TODO{" "}
                    </h2>
                  </div>
                  <div className="flex flex-col bg-[#FFF]  border-l-6 border-[#2892e0] py-[13px] px-[20px] rounded-[12px] w-[180px] ml-[12px]">
                    <div className="flex justify-start items-center ">
                    <PiListNumbersBold className="text-[#2892e0] text-[25px] mr-[12px]" />
                    <h3 className="text-[#1f2d3d] m-[0px]">Number of Tasks</h3>
                    </div>
                    <p className="m-[0px] mt-[8px] text-end pr-[10px]">{stats.statusCounts.TODO}</p>
                  </div>
                </div>
                <div >
                  <div className="w-[200px] flex bg-[#fff5] py-[5px] justify-start items-center pl-[10px]">
                    <div className="h-[40px] w-[40px] bg-[#FFF] text-[#2892e0] rounded-[32px] flex justify-center items-center">
                      <GiProgression className="text-[#2892e0] text-[24px]" />
                    </div>
                    <h2 className="text-lg text-[#1f2d3d] m-[0px] text-start pl-[10px]">
                      STATUS
                    </h2>
                    </div>
                    <div className="flex flex-col gap-[10px] pt-[10px]">
                      <div className="flex flex-col bg-[#FFF] border-l-6 border-[#2892e0] py-[13px] px-[24px] rounded-[12px] w-[140px] ml-[12px]">
                      <div className="flex justify-start items-center ">
                        <FaClock className="text-[#2892e0] text-[25px] mr-[12px]" />
                        <h3 className="text-[#1f2d3d] m-[0px]">In Progress</h3>
                        </div>
                        <p className="m-[0px] mt-[8px] text-end pr-[10px]">{stats.statusCounts.IN_PROGRESS}</p>
                      </div>
                      <div className="flex flex-col bg-[#FFF] border-l-6 border-[#2892e0] py-[13px] px-[24px] rounded-[12px] w-[140px] ml-[12px]">
                    <div className="flex justify-start items-center ">
                      <FaCheckCircle className="text-[#2892e0] text-[25px] mr-[12px]" />
                      <h3 className="text-[#1f2d3d] m-[0px]">Done{" "}</h3>
                      </div>
                      <p className="m-[0px] mt-[8px] text-end pr-[10px]">{stats.statusCounts.DONE}</p>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
