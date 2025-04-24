import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import authRoutes from "./auth.js";
import taskRoutes from "./task.js";
import roleRoutes from "./role.js";

const router = Router();

router.use('/auth', authRoutes);
router.use("/users", UserRoutes);
router.use("/tasks", taskRoutes);
router.use("/", roleRoutes);
router.use("/", taskRoutes);

 //in the app.js
router.get("/api", (req, res) => {
  res.status(201).json("Server Created hi");
});

export default router;
