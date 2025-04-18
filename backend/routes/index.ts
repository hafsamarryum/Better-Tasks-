import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import authRoutes from "./auth.js";
import taskRoutes from "./task.js";

const router = Router();

router.use('/auth', authRoutes)
router.use("/users", UserRoutes);
router.use("/tasks", taskRoutes)

 //in the app.js
router.get("/api", (req, res) => {
  res.status(201).json("Server Created hi");
});

export default router;
