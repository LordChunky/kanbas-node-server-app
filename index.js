import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import EnrollmentRoutes from "./Kanbas/Enrollments/routes.js";
import session from "express-session";
import mongoose from "mongoose";
// import the new dotenv library to read .env file
import "dotenv/config";


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas-cs5610-fa24"
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(
    cors({
        credentials: true,
        // use different front end URL in dev and in production
        origin: process.env.NETLIFY_URL || "http://localhost:3000",
    })
);

// default session options
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kanbas",
    resave: false,
    saveUninitialized: false,
};
// in production
if (process.env.NODE_ENV !== "development") { 
    // turn on proxy support
    sessionOptions.proxy = true;

    // configure cookies for remote server
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,  
    };
}
  
app.use(
    session(sessionOptions)
);
  
app.use(express.json());
Lab5(app);
Hello(app)
UserRoutes(app);
CourseRoutes(app);
EnrollmentRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);

// uses the remote PORT environment variable if available, or port 4000 when running locally
app.listen(process.env.PORT || 4000)