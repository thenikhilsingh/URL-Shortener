import { readFile, writeFile } from "fs/promises";
// import crypto from "crypto";
import path from "path";
// TO use router
// import express from "express";
// const router = express.Router();
// or you can simply write
import { Router } from "express";
import {
  postURLShortener,
  getShortenerPage,
  redirectToShortLink,
} from "../controllers/postshortener.controller.js";

const router = Router();

// const DATA_FILE = path.join("data", "links.json");

// const loadLinks = async () => {
//   try {
//     const data = await readFile(DATA_FILE, "utf-8");
//     // handle empty file safely
//     if (!data.trim()) {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     return JSON.parse(data);
//   } catch (error) {
//     if (error.code === "ENOENT") {
//       await writeFile(DATA_FILE, JSON.stringify({}));
//       return {};
//     }
//     throw error;
//   }
// };

// const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links));
// };

router.get("/report", (req, res) => {
  const student = [
    {
      name: "Hriday",
      education: "B.Tech",
      skill: "Web Development",
    },
    {
      name: "Lucky",
      education: "B.Tech",
      skill: "Web Development",
    },
    {
      name: "Abhay",
      education: "B.Tech",
      skill: "Web Development",
    },
    {
      name: "Ashutosh",
      education: "B.Tech",
      skill: "Web Development",
    },
    {
      name: "Monu",
      education: "B.Tech",
      skill: "Web Development",
    },
  ];
  return res.render("report", { student });
});

router.get("/", getShortenerPage);

// router.get("/", async (req, res) => {
//   try {
//     const file = await readFile(path.join("views", "index.html"));
//     const links = await loadLinks();

//     const content = file.toString().replaceAll(
//       "{{ Shortened_urls }}",
//       Object.entries(links)
//         .map(
//           ([shortCode, url]) =>
//             `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a>->${url}</li>`
//         )
//         .join("")
//     );

//     return res.send(content);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// });

router.post("/", postURLShortener);

// router.post("/", async (req, res) => {
//   try {
//     const { url, shortCode } = req.body;
//     const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
//     const links = await loadLinks();
//     if (links[finalShortCode]) {
//       res.status(400).send("Short Code already exists. Please choose another.");
//     }
//     links[finalShortCode] = url;
//     await saveLinks(links);
//     return res.redirect("/");
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// });

router.get("/:shortCode", redirectToShortLink);
// router.get("/:shortCode", async (req, res) => {
//   try {
//     const shortCode = req.params.shortCode;
//     const links = await loadLinks();

//     if (!links[shortCode]) return res.status(404).send("404 error occurred");

//     return res.redirect(links[shortCode]);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error");
//   }
// });

// Default Export
// export default router;

// Named Exports
export const shortenedRoutes = router;
