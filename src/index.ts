// Import necessary dependencies
import express from 'express'; // Express.js for creating web applications
import http from 'http'; // Node.js built-in HTTP module
import bodyParser from 'body-parser'; // Middleware for parsing JSON data in requests
import cookieParser from 'cookie-parser'; // Middleware for parsing cookies
import cors from 'cors'; // Middleware for handling Cross-Origin Resource Sharing (CORS)
import compression from 'compression'; // Middleware for response compression
import mongoose from 'mongoose';
import router from './router';

// Create an Express application
const app = express();

// Enable CORS with credentials support
app.use(cors({
  credentials: true,
}));

// Enable response compression
app.use(compression());

// Parse cookies from incoming requests
app.use(cookieParser());

// Parse JSON data from incoming requests
app.use(bodyParser.json());

// Create an HTTP server using Express
const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Serve running on http://localhost:8080/');
})

// Create a Mongoose connection instance
const db = mongoose.connection;

// Listen for the "error" event on the connection instance
db.on("error", (error: Error) => {
  console.error("Mongoose connection error:", error);
});

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/RestAPIs?useNewUrlParser=true&useUnifiedTopology=true')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.use('/', router())