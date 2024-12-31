import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/dbConfig';
import shortUrl from './routes/shortUrl';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDb();

const BASE_SERVER_URL = process.env.BASE_SERVER_URL;
console.log("Base Server URL: " + BASE_SERVER_URL);
const server_port = process.env.PORT || 5001;
const CLIENT_APP_URL = 'https://url-shortner-react-app.vercel.app'; // Default to localhost if CLIENT_APP_URL is missing

// Initialize Express application
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [CLIENT_APP_URL, 'http://localhost:3000'], // Allow both local and production URLs
    credentials: true,    // Include credentials such as cookies
  })
);

// Routes
app.use('/api/', shortUrl);

// Global error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start the server
app.listen(server_port, () => {
  console.log(`✅ Server running on port ${server_port}`);
  console.log(`✅ Allowed Client App URLs: ${CLIENT_APP_URL}, https://url-shortner-react-app.vercel.app`);
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