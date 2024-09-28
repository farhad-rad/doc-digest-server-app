import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRoutes from "./routes/user";
// import documentRoutes from "./routes/document";
import fs from "fs";

dotenv.config({ path: fs.existsSync("./.env") ? "./.env" : "../.env" });

const app: Application = express();
app.use(express.json()); // For    parsing JSON bodies

app.all("*", (req, res) => {
  res.send(process.env);
});

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/documents", documentRoutes);

// // Start the server
const PORT = process.env.PORT || 3000;
// mongoose
//   .connect(process.env.MONGO_URI as string, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));
