import { serialize } from "cookie";

async function handler(req, res) {
    if (req.method !== "GET") return;   
    const serializeed = serialize("token", "" ,{path: "/", maxage: 0});

    res.status(200).setHeader("Set-Cookie", serializeed).json({status: "success", message: "Loged Out!"})
}

export default handler