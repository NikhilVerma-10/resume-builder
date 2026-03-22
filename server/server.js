// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import userRouter from "./routes/userRoutes.js";
// import resumeRouter from "./routes/resumeRoutes.js";
// import aiRouter from "./routes/aiRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// async function startServer() {
//   try {
//     // Connect to the database
//     await connectDB();

//     app.use(express.json());
//     app.use(cors());

//     app.get('/', (req, res) => res.send("Server is live..."));
//     app.use('/api/users', userRouter);
//     app.use('/api/resmes', resumeRouter);
//     app.use('api/ai', aiRouter)

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err);
//     process.exit(1);
//   }
// }

// startServer();

import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Connect to the database
    await connectDB();

    app.use(express.json());
    app.use(cors());

    app.get('/', (req, res) => res.send("Server is live..."));
    app.use('/api/users', userRouter);

    // ❌ You wrote /api/resmes (typo)
    // ❌ Should be /api/resumes
    app.use('/api/resumes', resumeRouter);

    // ❌ Missing leading slash
    app.use('/api/ai', aiRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
