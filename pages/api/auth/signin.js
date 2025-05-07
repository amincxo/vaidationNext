import { sign } from "jsonwebtoken";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";
import connectDB from "../../../utils/connectDB";

async function handler(req,res) {
    if (req.method !== 'POST' ) {
        return;
    }

    try {
        await connectDB();
    } catch (err) {
        return res.status(500).json({status: "failed", message: "Error in connection to DB"});
    }

    const {email, password} = req.body;
    const secretKey = process.env.SECRET_KEY;
    const expiration = 24 * 60 * 60;

    if(!email || !password) {
        return res.status(422).json({status: "failed", message: "Invalid Data" });
    }

    const user = await User.findOne({email: email});

    if(!user) {
      return res.status(404).json({status: "failed", message: "User doesn't exist"})  
    }

    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
        return res.status(422).json({status: "failed", message: "Username or password isn incorrect!" })
    }
    const token = sign({email}, secretKey, {expiresIn: expiration }  )
}

export default handler;