import { Task } from "./Tasks";

type TaskDrawerProps = {
  task: Task | null;
  onClose: () => void;
};

const TaskDrawer = ({ task, onClose }: TaskDrawerProps) => {
  if (!task) return null;

  return (
    <div className="w-[100%] h-[100%] fixed  flex ">
      <div onClick={onClose} />
      <div className="ml-[600px] w-[600px] h-full bg-[#1f2d3d] text-[#FFF] pl-[20px] shadow-2xl  relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-[#552218] text-[30px] font-bold  bg-[#1f2d3d] border-none"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="mb-[5px] border-none pb-[10px] mt-[40px] text-[#2792dc] ">Task Details</h2>
        <div className="w-[480px] flex flex-col gap-[10px] p-[10px] mr-[20px]">
          <div> {task.id}</div>
          <p className="text-[25px] m-[0px]">{task.title}</p>
          <p className="text-[19px] my-[6px]">{task.description}</p>

          <p className="text-[19px] my-[6px]">Properties</p>
          <div className="flex gap-[20px]"> 
            <strong>Status</strong>{task.status}</div>
          <div className="flex gap-[20px]"> 
            <strong>Assignees</strong>{task.assignee?.name}</div>
          <div className="flex gap-[20px]"> 
            <strong>Created By</strong> {typeof task.createdBy === "object" ? task.createdBy.name : task.createdBy}</div>
          
        </div>
      </div>
    </div>
  );
};

export default TaskDrawer;
