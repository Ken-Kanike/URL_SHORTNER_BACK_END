"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
// Load environment variables from .env file
dotenv_1.default.config();
// Connect to MongoDB
(0, dbConfig_1.default)();
const port = process.env.PORT || 5001;
const clientAppUrl = process.env.CLIENT_APP_URL || 'http://localhost:3000'; // Default to localhost if CLIENT_APP_URL is missing
// Initialize Express application
const app = (0, express_1.default)();
// Middleware for parsing JSON and URL-encoded data
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// CORS configuration
app.use((0, cors_1.default)({
    origin: clientAppUrl, // Allow requests from the client app
    credentials: true, // Include credentials such as cookies
}));
// Routes
app.use('/api/', shortUrl_1.default);
// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message || err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});
// Start the server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
    console.log(`✅ Allowed Client App URL: ${clientAppUrl}`);
});
// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import connectDb from './config/dbConfig';
// import shortUrl from './routes/shortUrl';
// dotenv.config();
// connectDb();
// const port = process.env.PORT || 5001;
// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended : true }));
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         credentials: true,
//     })
// );
// app.use("/api/", shortUrl);
// // app.get('/', (req, res) => {
// //     res.send('Hello, World!');
// // });
// app.listen(port, () =>{
//      console.log(`Server running on port ${port}`)
// });
