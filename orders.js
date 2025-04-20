const express = require("express");
const db = require("../db");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User Order History Route
router.get("/history", authenticate, (req, res) => {
    const userId = req.user.id;

    // ✅ Sirf Last 30 Days Ke Orders Show Karo
    const sql = `
        SELECT o.id, o.customer_name, o.payment_method, o.status, o.created_at
        FROM orders o
        WHERE o.user_id = ? AND o.created_at >= NOW() - INTERVAL 30 DAY
        ORDER BY o.created_at DESC
    `;

    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        res.json(results);
    });
});


module.exports = router;
