const express = require('express');
const router = express.Router();

// Function to calculate the distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radius = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c; // Distance in km
};

router.get("/:latitude/:longitude/:distance/:categoryId?", async (req, res) => {
    const latitude = parseFloat(req.params.latitude);
    const longitude = parseFloat(req.params.longitude);
    const distance = parseFloat(req.params.distance);
    const categoryId = req.params.categoryId;

    if (isNaN(latitude) || isNaN(longitude) || isNaN(distance)) {
        return res.status(400).json({ error: "Invalid input parameters" });
    }

    const latDiff = distance / 111.32;
    const longDiff = distance / (111.32 * Math.cos(latitude * (Math.PI / 180)));

    const minLat = latitude - latDiff;
    const maxLat = latitude + latDiff;
    const minLong = longitude - longDiff;
    const maxLong = longitude + longDiff;

    let query = `
        SELECT *, latitude, longitude
        FROM store
        WHERE latitude BETWEEN ? AND ?
        AND longitude BETWEEN ? AND ?
    `;

    const queryParams = [minLat, maxLat, minLong, maxLong];

    // Apply category filter if categoryId is provided
    if (categoryId) {
        query += ' AND categoryId = ?';
        queryParams.push(categoryId);
    }

    query += ' LIMIT 10;';

    try {
        const [rows] = await req.connection.query(query, queryParams);

        // Calculate distance for each store and add it to the response
        const storesWithDistance = rows.map(store => {
            const interval = calculateDistance(latitude, longitude, store.latitude, store.longitude);
            return { ...store, interval };
        });
        console.log(storesWithDistance);

        res.json(storesWithDistance);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
