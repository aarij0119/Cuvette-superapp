import express, { urlencoded } from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
const app = express();
import connectDB from './config/connect.js';
import UserModel from './models/User.js';

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['POST', 'GET']
}));

app.post('/register', async (req, res) => {
    try {
        const { name, username, email, mobile } = req.body;
        // console.log("Request Body:", req.body);

        const userfind = await UserModel.findOne({ email });
        if (userfind) {
            return res.status(400).json({ message: "You already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(mobile, salt);
        const user = await UserModel.create({
            name,
            username,
            email,
            mobile: hash,
        });
        console.log("User Created Successfully", user);
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post('/login', async (req, res) => {
    const { username, email, mobile } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) return res.status(400).json({ message: "User Not Found" });

        const isMatch = await bcrypt.compare(mobile, user.mobile);

        if (isMatch) {
            console.log("User Found successfully", user)
            res.status(200).json(user);
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Error during user login:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }

});


app.listen(3000, () => {
    console.log("Backend is running on localhost 3000");
});
