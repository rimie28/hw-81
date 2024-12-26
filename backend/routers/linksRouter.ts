import express from "express";
import Link from "../models/Link";
import crypto from 'crypto';

function getShortUrl(length = 6): string {
    return crypto.randomBytes(Math.ceil((length * 3) / 4))
        .toString('base64url')
        .slice(0, length);
}

const linksRouter = express.Router();

// @ts-ignore
linksRouter.post("/links", async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({error: "Add URL"});
    }


    try {
        const shortUrl = getShortUrl();
        const newLink = new Link({ longUrl, shortUrl });
        await newLink.save();
        return res.status(201).send(newLink);
    } catch (error) {
        return res.status(400).json({error: error});
    }
});

// @ts-ignore
linksRouter.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const link = await Link.findOne({ shortUrl });
        if (!link) {
            return res.status(404).json({ error: "Link not found" });
        }
        res.redirect(link.longUrl);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default linksRouter;
