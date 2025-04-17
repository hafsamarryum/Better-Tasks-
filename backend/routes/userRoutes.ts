import { Router } from "express";
import createUser, { deleteUser, fetchUsers, showUser, updateUser } from "../Controller/UserController.js";
import authMiddleware from "../middlewares/auth.js";

const router = Router();

router.post("/", createUser as any);
router.put("/:id", updateUser as any);
router.get("/", [authMiddleware as any], fetchUsers as any);
router.get("/:id", showUser as any);
router.delete("/:id", deleteUser as any);

export default router;