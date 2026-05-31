import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

import usersRoutes from "./routes";
import { corsOptions, errorHandler } from "../../../shared/middleware";

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors(corsOptions()));
app.use(helmet());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoutes);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Health check endpoint: http://localhost:${PORT}/health`);
});

export default app;
