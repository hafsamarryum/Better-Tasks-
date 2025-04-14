const express = require("express")
const app = express();
const port = 8000;
const cors = require("cors");

app.get("/", (req, res) => {
  res.status(201).json("Server Created")
}); 

app.use(express.json());
app.use(cors());


app.listen(port,()=> {
  console.log(`Server start at port no : ${port}`);
})