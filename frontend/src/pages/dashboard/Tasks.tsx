import { useEffect, useState } from "react";
import {deleteTask,getAllTasks,getMyTasks,updateTaskAssignee,updateTaskStatus,} from "../../api/endpoints/task";
// import { useAuthStore } from "../../store/authStore";
import { FilterType, TaskStatus } from "../../utilities/enum";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import TaskDrawer from "./TaskDrawer";

export type Task = {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  assignee?: {
    name: string;
  };
  status: TaskStatus;
  createdBy: string;
};

interface User {
  id: string;
  name: string;
}

const Tasks = () => {
  // const navigate = useNavigate();
  // const { user } = useAuthStore();
    const { users, fetchUsers } = useUserStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task); // Open the drawer with task data
  };

  const closeDrawer = () => setEditingTask(null);

  const fetchData = async () => {
    try {
      const taskRes =
        filter === FilterType.ALL ? await getAllTasks() : await getMyTasks();
      if (Array.isArray(taskRes.data.tasks)) {
        setTasks(taskRes.data.tasks);
      } else {
        console.error(
          "Invalid response: tasks data is not an array",
          taskRes.data.tasks
        );
        setTasks([]);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  },[users]);

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      await updateTaskStatus(id, status);
      fetchData();
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating status:", error.response?.data || error.message);
        alert("Failed to update task status.");
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteTask(id);
      alert(res.data.message || "Task deleted successfully.");
      fetchData(); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message || "Something went wrong. Please try again.";
        alert(msg);
      } else {
        alert("Network error or server is not responding. Please try again later.");
      }
      console.error("Failed to delete task", error);
    }
  };

  const handleAssigneeChange = async (taskId: string, newAssigneeId: string) => {
    try {
      await updateTaskAssignee(taskId, newAssigneeId);
      fetchData(); 
    alert("Assignee updated successfully.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Failed to update assignee.");
      } else {
        alert("Unexpected error while updating assignee.");
      }
      console.error("Assignee update error:", error);
    }
  };
  

  return (
    <div className="w-[890px] py-[20px] px-[60px] text-[#1e1f1c] flex flex-col justify-center items-center">
    <div className="w-full flex flex-col justify-between items-center p-[0px] rounded-[15px] tableImg">
      <div className="w-full flex justify-between items-center bg-[#fff5] ">
        <div>
        <h1 className="text-2xl mb-[3px] pl-[10px] items-start">Tasks</h1>
        </div>
        <div className="flex gap-[6px] mr-[15px]">
          <button
            className="px-[16px] py-[8px] rounded-[8px] border-none bg-[#6a5ccc] text-[#FFF] hover:bg-[#42397e]"
            onClick={() => setFilter(FilterType.ALL)}
          >
            All Tasks
          </button>
          <button
            className="px-[16px] py-[8px] rounded-[8px] border-none bg-[#6b56b2] text-[#FFF] hover:bg-[#382b5b]"
            onClick={() => setFilter(FilterType.MINE)}
          >
            My Tasks
          </button>
        </div>
      </div>

      <table className="w-[95%] rounded-[12px] p-[15px] pt-[0px] my-[18px]  border-collapse">
        <thead className="bg-[#d6d2de]"> 
          <tr className=" text-left">
          <th className="p-[10px]">Id</th>
            <th className="p-[10px]">Title</th>
            <th className="p-[10px]">Assignee</th>
            <th className="p-[10px]">Status</th>
            <th className="p-[10px]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="border-t">
                <td className="p-[10px] w-[10%]">{task.id}</td>
                <td className="p-[10px] w-[40%]">{task.title}</td>
                <td className="p-[10px] w-[10%]">

                <select
          name="assigneeId"
          value={task.assigneeId}
          onChange={(e) => handleAssigneeChange(task.id, e.target.value)}
          className="py-[5px] pr-[0px] pl-[5px] rounded-[5px] border-none bg-[#f3f4f6]"
        >
          <option value="" disabled>Select Assignee</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        </td>

                <td className="p-[10px] w-[10%]">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(
                        task.id,
                        e.target.value as TaskStatus
                      )
                    }
                    className="py-[5px] pr-[0px] pl-[5px] rounded-[5px] border-none bg-[#f3f4f6]"
                  >
                    <option value={TaskStatus.TO_DO}>To Do</option>
                    <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                    <option value={TaskStatus.DONE}>Done</option>
                  </select>
                </td>
                <td className="p-[10px] flex gap-[6px]">
                  {/* {(user?.role === UserRole.ADMIN || task.createdBy === user?.id) && ( */}
                    {/* <button
                     onClick={() =>
                      navigate('/createTasks', {
                        state: { task: {
                          id: task.id,
                          title: task.title,
                          description: task.description,
                          assigneeId: task.assigneeId,
                        } }
                      })
                    }
                    className="bg-[#F59E0B] px-[20px] py-[5px] text-[#fff] rounded-[5px] border-none">
                      Edit
                    </button> */}


                  {/* Inside the <td> with Edit button */}
<button
  onClick={() => handleEdit(task)}
  className="bg-[#F59E0B] px-[20px] py-[5px] text-[#fff] rounded-[5px] border-none"
>
  Edit
</button>





                   {/* )}  */}
                  {/* {user?.role === UserRole.ADMIN && ( */}
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="bg-[#EF4444] px-[15px] py-[5px] text-[#fff] rounded-[5px] border-none"
                    >
                      Delete
                    </button>
                   {/* )}  */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-[16px] text-center">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      {editingTask && (
  <TaskDrawer task={editingTask} onClose={closeDrawer} />
)}

    </div>
  );
};

export default Tasks;
