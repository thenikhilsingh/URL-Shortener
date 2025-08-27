import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
import express from "express";
import PORT from "./env.js";
const app = express();

// const PORT = process.env.PORT || 3002;

const DATA_FILE = path.join("data", "links.json");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    // handle empty file safely
    if (!data.trim()) {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
    throw error;
  }
};

const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

app.get("/", async (req, res) => {
  try {
    const file = await readFile(path.join("views", "index.html"));
    const links = await loadLinks();

    const content = file.toString().replaceAll(
      "{{ Shortened_urls }}",
      Object.entries(links)
        .map(
          ([shortCode, url]) =>
            `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a>->${url}</li>`
        )
        .join("")
    );

    return res.send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.post("/", async (req, res) => {
  try {
    const { url, shortCode } = req.body;
    const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
    const links = await loadLinks();
    if (links[finalShortCode]) {
      res.status(400).send("Short Code already exists. Please choose another.");
    }
    links[finalShortCode] = url;
    await saveLinks(links);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.get("/:shortCode", async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    const links = await loadLinks();

    if (!links[shortCode]) return res.status(404).send("404 error occurred");

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
