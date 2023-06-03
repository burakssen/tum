const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const dotenv = require("dotenv");
const xss = require("xss-clean");
const cookieparser = require("cookie-parser");

const errorHandler = require("./utils/errorHandler");
const authRouter = require("./routers/auth");
const modulesRouter = require("./routers/modules");

dotenv.config();

//Starts application
const app = express();

// Body parser
app.use(express.json());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

const corsOptions = {
    credentials: true,
    origin: ['https://modulmanager.ldv.ei.tum.de'],
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token', 'set-cookie'],
    exposedHeaders: ['set-cookie']
};
// Enable CORS
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(cookieparser());

// Mount to routers
app.use("/api/auth/", authRouter);
app.use("/api/modules/", modulesRouter);

app.use(errorHandler);

module.exports = app;