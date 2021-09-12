import express from "express";
import todoListRouter from "./routes/todolist.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/todolists", todoListRouter);

app.listen(port, () => {
  console.log(`Start server localhost:${port}.`);
});
