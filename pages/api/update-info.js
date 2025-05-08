import User from "../../models/User";
import { verifyToken , verifyPassword } from "../../utils/auth";
import connectDB from "../../utils/connectDB";

async function handler(req,res) {
    if(req.method !== "POST") return;
    try {
        await connectDB();
    }catch (err) {
        console.log(err);
        return res.status(500).json({status: "failed", message: "Error in connecting to DB"})
    }

    const {name, lastName , password} = req.body;
    const {token} = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!token) {
        return res.status(401).json({ status: "failed", message: "You are not logged in"})
    }

    const result = verifyToken(token, secretKey)
    console.log(result.email)

    if (!result) {
        return res.status(401).json({ status: "failed", message: "You are unauthirized"})
    }
    const user = await User.findOne({email: result.email})
    if (!user) {
        return res.status(404).json({
            status: "failed",
            message: "User doesn't exist!"
        })
    }
    const isValid = await verifyPassword(password, user.password)
    if (!isValid) {
        return res.status(423).json({
            status: "failed",
            message: "Username or password is in correct!",
        });
    }
    user.name = name;
    user.lastName = lastName;
    user.save();
    res.status(200).json({status: "success", data: {name, lastName , email:result.email}})
}


export default handler