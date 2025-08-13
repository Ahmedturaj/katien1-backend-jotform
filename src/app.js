import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import notFound from "./middleware/notFound.js";
import router from "./router/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1", router);

app.use("/", (req, res) => {
  res.send("Your server is running!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
