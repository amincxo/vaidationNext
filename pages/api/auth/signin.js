import User from "../../../models/User";
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

    if(!email || !password) {
        return res.status(422).json({status: "failed", message: "Invalid Data" });
    }

    const user = await User.findOne({email: email});

    if(!user) {
      return res.status(404).json({status: "failed", message: "User doesn't exist"})  
    }
}

export default handler;