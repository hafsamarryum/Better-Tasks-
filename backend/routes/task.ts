import { Router } from "express";
import { createTask, deleteTask, getAllTasks, getMyTasks, getTaskById, updateAssignee, updateTask, updateTaskStatus } from "../Controller/taskController";
import authMiddleware from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { Role } from "../generated/prisma";

const taskRoutes = Router();

taskRoutes.post("/", [authMiddleware as any], createTask as any);                         
taskRoutes.get("/", [authMiddleware as any], getAllTasks as any);                         
taskRoutes.get("/my", [authMiddleware as any], getMyTasks as any);                        
taskRoutes.get("/:taskId", [authMiddleware as any], getTaskById as any);                  
taskRoutes.put("/:taskId", [authMiddleware as any], updateTask as any);                   
taskRoutes.put("/:taskId/status", [authMiddleware as any], updateTaskStatus as any);      
taskRoutes.delete("/:taskId", [authMiddleware as any], checkRole([Role.ADMIN]) as any, deleteTask as any); 
taskRoutes.put("/tasks/:id/assignee", [authMiddleware as any], updateAssignee as any);

export default taskRoutes;
