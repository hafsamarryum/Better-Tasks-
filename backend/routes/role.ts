import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { Role } from "../generated/prisma";
import { updateRole } from "../Controller/UserController";

const roleRoutes:Router = Router()

roleRoutes.put("/users/:userId/role" , authMiddleware as any, updateRole as any)  //, checkRole([Role.ADMIN]) as any

export default roleRoutes;