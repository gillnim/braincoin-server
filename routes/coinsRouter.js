import express from 'express'
import { Router } from 'express';
import fs from 'fs';

const router = express.Router();

// Path to the JSON data file
const dataFilePath = './data/users.json';

// Route to get all user balances
router.get('/balance', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data' });
        }

        try {
            const users = JSON.parse(data);
            res.json(users);
        } catch (parseError) {
            return res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

// Route to get top 10 richest users
router.get('/top-ten', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading data' });
        }
        const users = JSON.parse(data);

        // Calculate total value for each user and sort by their value in Mark bucks
        const usersWithTotal = users.map(user => {
            const totalValueInMarkBucks = (user['Umer coins'] / 500) + user['Mark bucks'] +
                                          (user['Kcoins'] * 500) + (user['CorgiCoins'] * 500) +
                                          (user['Neo Coins'] * 1000);
            return { ...user, totalValueInMarkBucks };
        });

        // Sort by total value in descending order and take top 10
        const topTenUsers = usersWithTotal.sort((a, b) => b.totalValueInMarkBucks - a.totalValueInMarkBucks).slice(0, 10);
        res.json(topTenUsers);
    });
});

export default router;
