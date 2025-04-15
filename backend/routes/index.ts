import { Router } from "express";
import UserRoutes from "./userRoutes.js";

const router = Router()

router.use("/api/user",  UserRoutes);

router.get("/", (req, res) => {
  res.status(201).json("Server Created hi")
}); 


export default router