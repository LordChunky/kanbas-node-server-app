import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
Lab5(app);
Hello(app)

// uses the remote PORT environment variable if available, or port 4000 when running locally
app.listen(process.env.PORT || 4000)