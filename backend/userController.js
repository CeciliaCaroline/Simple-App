import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const usersFilePath = './users.json';
const secretKey = process.env.secretKey; // Replace with a strong secret key




// Function to read users from the JSON file asynchronously
export const readUsers = async (data) => {
    try {
        const usersData = await fs.readFileSync(usersFilePath);
        return JSON.parse(usersData);
    } catch (error) {
        console.error('Error reading users file:', error);
        return [];
    }
};



export const loginUser = async (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send({ message: 'username and password are required' });
    }

    try {
        const users = await readUsers();

        // Find the user by name and password
        const user = users.find(user => user.name === name && user.password === password);
        if (!user) {
            return res.status(401).send({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ username: user.name }, secretKey, {
            expiresIn: '1h',
        });

        // If credentials are correct, return a success message
        return res.status(200).send({ ...user, token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error', error });
    }
}


