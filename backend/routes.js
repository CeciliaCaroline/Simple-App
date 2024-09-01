
import express from "express";
import {
    loginUser,
} from "./userController.js";


const router = express.Router();

// Login route
router.route("/").post(loginUser);


export default router;