// import { readFile, writeFile } from "fs/promises";
// import path from "path";
import { dbClient } from "../config/db-client.js";
import { env } from "../config/env.js";

// const DATA_FILE = path.join("data", "links.json");

// export const loadLinks = async () => {
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

// export const saveLinks = async (links) => {
//   await writeFile(DATA_FILE, JSON.stringify(links));
// };

const db = dbClient.db(env.MONGODB_DATABASE_NAME);

const shortenerCollection = db.collection("shorteners");
export const loadLinks = async () => {
  return shortenerCollection.find().toArray();
};

export const saveLinks = async (link) => {
  return shortenerCollection.insertOne(link);
};

export const getLinkByShortCode = async (shortcode) => {
  return await shortenerCollection.findOne({ shortCode: shortcode });
};
