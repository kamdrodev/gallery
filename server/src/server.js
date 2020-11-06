import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.get("/", (req, res) => {
  return res.json({
    message: "Hello World",
  });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  err.message = err.message || "Error";
  err.status = err.status || 400;

  return res.status(err.status).json({
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
