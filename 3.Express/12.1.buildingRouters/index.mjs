import express from "express";
import chalk from "chalk";
import debug from "debug";
import morgan from "morgan";

const DEBUG = debug("index");

const app = express();
// app.use(morgan('combined')) //all info
app.use(morgan("tiny"));

const PORT = process.env.PORT || 3500;

const sessionsRouter = express.Router();


app.get("/", (req, res) => {
  res.send(`msg:  {Hello there,  i love  u }`);
});

sessionsRouter.route("/").get((req, res) => {
  res.send("Hello Session");
}); //http://localhost:4000/sessions

sessionsRouter.route("/1").get((req, res) => {
    res.send("Hello single session");
  }); //http://localhost:4000/sessions/1
  
//implementing navigation
// app.get('/sessions')
// app.get('/sessions/:sessionID')
app.use("/sessions", sessionsRouter);

app.listen(PORT, () => {
  DEBUG(`running on port ${chalk.green(PORT)}`);
});
