import express from "express";
import dotenv from "dotenv";
import { handle404Errors, handleErrors } from './helpers/error_handler.js';
import cors from "cors";
import userRoute from "./routes.js";
import jwt from 'jsonwebtoken';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const secretKey = process.env.secretKey; // Replace with a strong secret key


app.use(cors());
app.use(express.json());


//routes
app.use("/login", userRoute);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.sendStatus(401); // Unauthorized if token is not provided
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    console.log(user, "token user")
    req.user = user; // Attach user information to request object
    next();
  });
};

// Welcome route (protected)
app.get('/welcome', authenticateToken, (req, res) => {
  res.send({ message: `Welcome! ${req.user.username}` });
});

// catch 404 error and forward to error handler
app.use(handle404Errors());

// Error Handler
app.use(handleErrors());


app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});