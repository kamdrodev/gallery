import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

app.get("/photos", async (req, res, next) => {
  try {
    const getPhotosRequest = await axios.get("https://api.unsplash.com/search/photos", {
      params: {
        client_id: process.env.UNSPLASH_API_ACCESS_KEY,
        query: req.query.keyword,
      },
    })
    return res.json({
      message: "Photos have been fetched",
      photos: getPhotosRequest.data,
    });
  } catch (e) {
    const customError = new Error("Oops! Something has gone wrong!");
    return next(customError);
   }
});

app.get("/photos/:id", async (req, res, next) => {
  try {
    const getPhotoRequest = await axios.get(`https://api.unsplash.com/photos/${req.params.id}`, {
      params: {
        client_id: process.env.UNSPLASH_API_ACCESS_KEY,
      },
    })
    return res.json({
      message: "Photos has fetched",
      photos: getPhotoRequest.data,
    });
  } catch (e) {
    const customError = new Error("Oops! Something has gone wrong!");
    return next(customError);
   }
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
