const express = require('express');
const router = express.Router();

router.get("/:latitude/:longitude/:distance", async (req, res) => {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);
    const distance = parseFloat(req.params.distance);

    if (isNaN(latitude) || isNaN(longitude) || isNaN(distance)) {
        return res.status(400).json({ error: "Invalid input parameters" });
    }

    const latDiff = distance / 111.32;
    const longDiff = distance / (111.32 * Math.cos(latitude * (Math.PI / 180)));

    const minLat = latitude - latDiff;
    const maxLat = latitude + latDiff;
    const minLong = longitude - longDiff;
    const maxLong = longitude + longDiff;

    const query = `
        SELECT * 
        FROM store
        WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
        LIMIT 10;
    `;

    try {
        const [rows] = await req.connection.query(query, [minLat, maxLat, minLong, maxLong]);
        console.log(rows);
        res.json(rows);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
