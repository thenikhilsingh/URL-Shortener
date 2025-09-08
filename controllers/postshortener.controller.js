import crypto from "crypto";
import {
  loadLinks,
  saveLinks,
  getLinkByShortCode,
} from "../models/shortener.model.js";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export const postURLShortener = async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();
    if (links[finalShortCode]) {
      res.status(400).send("Short Code already exists. Please choose another.");
    }
    // links[finalShortCode] = url;
    // await saveLinks(links);
    await saveLinks({ url, shortCode });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const getShortenerPage = async (req, res) => {
  try {
    const links = await loadLinks();

    return res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectToShortLink = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    // const links = await loadLinks();
    const link = await getLinkByShortCode(shortCode);
    // if (!links[shortCode]) return res.status(404).send("404 error occurred");
    if (!link) return res.status(404).send("404 error occurred");

    return res.redirect(link.url);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
