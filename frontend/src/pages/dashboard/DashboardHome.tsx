import { FaTasks } from 'react-icons/fa';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

const stats = [
  {
    label: 'Total Tasks',
    value: 24,
    icon: <FaTasks className="text-[#2892e0] text-[28px] mb-[10px]" />,
  },
  {
    label: 'Completed Tasks',
    value: 15,
    icon: <FaCheckCircle className="text-[#2892e0] text-[30px] mb-[10px]" />,
  },
  {
    label: 'Pending Tasks',
    value: 9,
    icon: <FaClock className="text-[#2892e0] text-[30px] mb-[10px]" />,
  },
];

const DashboardHome = () => {
  return (
    <div className=" py-[20px] px-[60px] text-[#1e1f1c] flex flex-col justify-center items-center ">
      <h1 className="text-2xl font-semibold text-center mb-[18px]">Dashboard</h1>
      <div className="flex flex-wrap gap-[15px] p-[20px]">
  {stats.map((item, idx) => (
    <div
      key={idx}
      className="flex-1 min-w-[250px] bg-[#FFF] rounded-2xl shadow-md py-[80px] px-[6px] flex flex-col items-center justify-center transition hover:shadow-lg border rounded-[10px]"
    >
      {item.icon}
      <p className="text-lg font-medium text-gray-700">{item.label}</p>
      <p className="text-2xl font-bold mt-[8px]">{item.value}</p>
    </div>
  ))}
</div>
    </div>
  );
};

export default DashboardHome;
