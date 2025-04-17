import { Router } from "express";
import router from ".";
import authMiddleware from "../middlewares/auth";
import { checkRole } from "../middlewares/checkRole";
import { Role } from "../generated/prisma";
import { updateRole } from "../Controller/UserController";

const roleRoutes:Router = Router()

router.put("/:userId/role" , authMiddleware as any, checkRole as any,([Role.ADMIN] as any), updateRole as any)

export default roleRoutes;