import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./config/env.js";

import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.route.js";

import connectToDatabase from "./database/mongodb.js";

import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

// Creating a constant of express.js - express is a function! (it is also an object, so it has properties too)
const app = express();

// express.json allows app to handle JSON data sent in requests or API calls
app.use(express.json());

// express.urlencoded helps to process data sent via HTML forms in a simple format
app.use(express.urlencoded({ extended: false }));

// cookieParser reads cookies from incoming requests so that app can store user data
app.use(cookieParser());

// Arcjet middleware for Rate limiting and Bot protection
app.use(arcjetMiddleware);

// URLs for Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

// Error Middleware to handle common errors
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to the Subscription Tracker API!");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription Tracker API is running on http://localhost:${PORT}`
  );

  await connectToDatabase();
});

export default app;
