import express from "express";
import cors from "cors";
import todoListRouter from "./routes/todolist.js";

const app = express();
const port = 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cors());

app.use("/todolists", todoListRouter);

app.listen(port, () => {
  console.log(`Start server localhost:${port}.`);
});
