import express from "express";
// import apiRoutes from "./routes/index";
import dotenv from "dotenv";
import httpStatus from "http-status";
import cors from "cors";
import { ApiError } from "./utils";
import { errorHandler } from "./middlewares";
import serverConfig from "./config/server-config";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// app.use("/api", apiRoutes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Error handler
app.use(errorHandler);

app.listen(serverConfig.PORT, async () => {
    console.log(
        `Successfully started the server on PORT : ${serverConfig.PORT}`
    );
});

export default app;
