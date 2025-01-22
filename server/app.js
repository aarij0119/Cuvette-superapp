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

app.get('/images', (req, res) => {
    const images = [
        {
            name: "image1",
            url: "https://i.pinimg.com/236x/79/b5/df/79b5df00e60e87841a5161858428f8b7.jpg"
        },
        {
            name: "image2",
            url: "https://img.pikbest.com/wp/202408/program-code-3d-rendering-of-abstract-purple-coding-background-with-mock-up-and-big-data-illuminating-the-concept-programming_9762612.jpg!w700wp"
        },
        {
            name: "image3",
            url: "https://i.pinimg.com/236x/ce/05/28/ce05280419168eac1d02091c515b7de5.jpg"
        },
        {
            name: "image4",
            url: "https://i.pinimg.com/236x/8a/b8/42/8ab84227db072538fc5bc1cf65d1b280.jpg"
        },
        {
            name: "image5",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s"
        },
        {
            name: "image6",
            url: "https://img.freepik.com/free-photo/animal-eye-staring-close-up-watch-nature-generative-ai_188544-15471.jpg"
        },
        {
            name: "image7",
            url: "https://growbilliontrees.com/cdn/shop/articles/guava-tree-grow-billion-trees.jpg?v=1712390096&width=1100"
        },
        {
            name: "image8",
            url: "https://www.shape.com/thmb/gxkgfgm-EVmPOKwpNGp3ziU8Wyo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/guava-promo-0f9f6443ec6b4b63897463ee30cfddf0.jpg"
        },
        {
            name: "image9",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9gSW3x98_hl7R2hl_nR5YcAwtmQ_68HCq4Q&s"
        },
        {
            name: "image10",
            url: "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/08/learn-coding-online-for-free.webp"
        },
        {
            name: "image11",
            url: "https://blog.hubspot.com/hs-fs/hubfs/how-to-start-coding-1.jpg?width=595&height=400&name=how-to-start-coding-1.jpg"
        },
        {
            name: "image12",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMkn5DaaADmONBXQ3Cr3Km3lJwkn3s4VDW0Q&s"
        },
        {
            name: "image13",
            url: "https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775232_640.png"
        },
        {
            name: "image14",
            url: "https://cdn.pixabay.com/photo/2024/04/09/03/04/ai-generated-8684869_640.jpg"
        },
        {
            name: "image15",
            url: "https://blog-media.byjusfutureschool.com/bfs-blog/2022/08/03035002/Article-Image-945%C3%97498.jpg"
        }
    ];
    res.status(200).json(images)
})


app.listen(3000, () => {
    console.log("Backend is running on localhost 3000");
});
