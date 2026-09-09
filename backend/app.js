import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://hirehub-job-portal-eight.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
// Root Route - Friendly HTML Landing Page or JSON
app.get("/", (req, res) => {
  if (req.accepts("html")) {
    res.setHeader("Content-Type", "text/html");
    return res.status(200).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>HireHub API • Server Online</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
          }
          .card {
            background: rgba(30, 41, 59, 0.85);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1.25rem;
            max-width: 620px;
            width: 100%;
            padding: 2.5rem;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.35rem 0.85rem;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #4ade80;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
          }
          .badge-dot {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 10px #22c55e;
          }
          h1 {
            font-size: 1.85rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.75rem;
          }
          p.lead {
            color: #94a3b8;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 1.75rem;
          }
          .action-box {
            background: rgba(59, 130, 246, 0.08);
            border: 1px solid rgba(59, 130, 246, 0.25);
            border-radius: 0.75rem;
            padding: 1.25rem;
            margin-bottom: 1.75rem;
          }
          .action-box p {
            color: #cbd5e1;
            font-size: 0.925rem;
            margin-bottom: 0.75rem;
            line-height: 1.5;
          }
          .btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.6rem;
            text-decoration: none;
            font-weight: 600;
            font-size: 0.95rem;
            transition: transform 0.2s, background 0.2s;
          }
          .btn-primary:hover {
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
            transform: translateY(-1px);
          }
          .endpoints-list {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
            margin-top: 1rem;
          }
          .endpoint-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.65rem 0.9rem;
            background: rgba(15, 23, 42, 0.6);
            border-radius: 0.5rem;
            font-family: monospace;
            font-size: 0.85rem;
          }
          .endpoint-item a {
            color: #60a5fa;
            text-decoration: none;
          }
          .endpoint-item a:hover {
            text-decoration: underline;
          }
          .method {
            color: #34d399;
            font-weight: 700;
            margin-right: 0.5rem;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">
            <span class="badge-dot"></span>
            Backend API Online & Running
          </div>
          <h1>HireHub Backend Server</h1>
          <p class="lead">
            The Express REST API server is running on port <strong>4000</strong> with MongoDB connected.
          </p>
          <div class="action-box">
            <p>
              Looking for the <strong>HireHub Web Application</strong>? Access the frontend web interface directly:
            </p>
            <a href="http://localhost:5173" class="btn-primary" target="_blank" rel="noopener noreferrer">
              🚀 Open Frontend Application (localhost:5173)
            </a>
          </div>
          <div style="font-size: 0.875rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.5rem;">
            Common API Endpoints:
          </div>
          <div class="endpoints-list">
            <div class="endpoint-item">
              <span><span class="method">GET</span> /health</span>
              <a href="/health">Test Health</a>
            </div>
            <div class="endpoint-item">
              <span><span class="method">GET</span> /api/v1/job/getall</span>
              <a href="/api/v1/job/getall">View All Jobs</a>
            </div>
            <div class="endpoint-item">
              <span><span class="method">GET</span> /api/v1/dashboard/stats</span>
              <a href="/api/v1/dashboard/stats">Dashboard Stats</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  }

  res.status(200).json({
    success: true,
    status: "online",
    message: "HireHub Backend API is running smoothly! 🚀",
    frontendUrl: "http://localhost:5173",
    endpoints: {
      health: "/health",
      jobs: "/api/v1/job/getall",
      stats: "/api/v1/dashboard/stats",
      user: "/api/v1/user",
      application: "/api/v1/application",
    },
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/dashboard", dashboardRouter);

dbConnection();

// 404 handler for unknown routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    hint: "Visit / for API documentation or http://localhost:5173 for the frontend application.",
  });
});

app.use(errorMiddleware);
export default app;

