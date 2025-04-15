import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();
const PORT = process.env.PORT || 8000;


const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


try {
  app.use(routes);
} catch (err) {
  console.error("Error loading routes:", err);
}

app.listen(PORT,()=> {
  console.log(`Server start at port no : ${PORT}`);
})