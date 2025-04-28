import { useEffect, useState } from "react";
import { getActivitiesForTask, updateTask } from "../../api/endpoints/task";
import { Task } from "./Tasks";
import { formatDistanceToNow } from 'date-fns';

type TaskDrawerProps = {
  task: Task | null;
  onClose: () => void;
};

export type Activity = {
  id: string;
  actor: { id: number; name: string; email: string; };
  action: "create" | "update" | "delete";
  payload: {
    assignee?: { from: string; to: string };
    status?: { from: string; to: string };
  };
  createdAt: string;
};

const TaskDrawer = ({ task, onClose }: TaskDrawerProps) => {

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [activities, setActivities] = useState<Activity[]>(task?.activities || []);

  const fetchActivities = async () => {
    try {
      if (!task?.id) return;
      const activities = await getActivitiesForTask(Number(task.id));
      setActivities(activities);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [task?.id]);

  if (!task) {
    return (
      <div className="w-[100%] h-[100%] fixed flex top-0 left-0 z-50 bg-black/50">
        <div className="text-white m-auto text-2xl">No task selected.</div>
      </div>
    );
  }

  const handleUpdate = async () => {
    try {
      await updateTask(task.id, { title, description });
      alert("Task updated successfully!");
      await fetchActivities();
      onClose();
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("Failed to update task.");
    }
  };

  if (!task) return null;


  return (
    <div className="w-[100%] h-[100%] fixed flex top-0 left-0 z-50 mr-[40px]">
      <div className="flex-1" onClick={onClose} />
      <div className="ml-auto w-[600px] h-[100%] bg-[#1f2d3d] text-[#FFF] p-[20px] pt-[0px] shadow-2xl relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-[#2792dc] text-[30px] font-bold bg-[#1f2d3d] border-none"
          onClick={onClose}>
          &times;
        </button>

        <div className="w-[480px] flex flex-col gap-[10px] p-[10px] pt-[0px] mr-[20px]">
        <h2 className="mb-[0px] mt-[40px] text-[#2792dc] text-2xl">Task Details</h2>
          <div  className="pl-[7px]"><strong>ID:</strong> {task.id}</div>
          <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="border p-[10px] rounded-[5px] bg-[#334155] text-[#FFF] ml-[5px]"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="border p-[10px] rounded-[5px] bg-[#334155] text-[#FFF] resize-none h-auto ml-[5px]"
      />
          <div  className="pl-[7px] "><strong>Status:</strong> {task.status?.toLowerCase()}</div>
          <div  className="pl-[7px] "><strong>Assignee:</strong> {task.assignee?.name || "Unassigned"}</div>
        </div>

       <div className="w-[480px] flex justify-end">
        <button onClick={handleUpdate} className="w-[25%] bg-[#2992dc] hover:bg-[#151d80] border-none px-[12px] py-[10px] rounded-[9px] text-[#FFF]">
          Update
        </button>
        </div>

        
          <div className="w-[480px] flex flex-col gap-[10px] p-[10px] m-[20px] mt-[0px]">
          <hr className="w-[100%]" />
            <h3 className="text-xl text-[#2792dc] mt-[4px]">Activity Log</h3>
              

    {activities.length > 0 ? (
       activities.map((activity) => (
      <div key={activity.id} className="m-[0px] p-[20px] bg-[#334155] rounded">
        <div className="text-sm font-semibold">{activity.actor.name} {activity.action.toLowerCase()} the work item {formatDistanceToNow(new Date(activity.createdAt))} ago</div>
      
        {activity.payload && (
          <div className="mt-2 text-xs">
            {Object.entries(activity.payload).map(([key, value]) => (
              <div key={key}>
                {key}: {typeof value === 'object' ? `${value.from} → ${value.to}` : value}
              </div>
            ))}
          </div>
        )}

      </div>
    ))
  ) : (
    <div className="text-gray-400 text-sm">No activities yet for this task.</div>
  )}
        </div>
      </div>
    </div>
  );
};

export default TaskDrawer;