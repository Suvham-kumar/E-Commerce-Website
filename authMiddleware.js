const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();



module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    console.log("🔍 Incoming Auth Header:", authHeader); // ✅ Debugging ke liye

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ error: "Access Denied! No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified Successfully:", decoded); // ✅ Check karo token verify ho raha hai ya nahi
        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ Token Verification Failed:", err);
        return res.status(401).json({ error: "Invalid Token" });
    }
};
