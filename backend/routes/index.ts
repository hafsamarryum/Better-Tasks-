import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import authRoutes from "./auth.js";

const router = Router();

router.use('/auth', authRoutes)

router.use("/api/users", UserRoutes);

 //in the app.js
router.get("/api", (req, res) => {
  res.status(201).json("Server Created hi");
});

export default router;
