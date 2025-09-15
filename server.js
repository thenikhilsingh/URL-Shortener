import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { env } from "./config/env.js";
// import router from "./routes/shortener.routes.js";
import { shortenedRoutes } from "./routes/shortener.routes.js";
import { connectDB } from "./config/db-client.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//In Express.js, a template engine is a tool that lets you embed dynamic content into HTML files and render them on the server before sending them to the client, It allows you to create reusable templates, making it easier to generate dynamic web pages with minimal code.
app.set("view engine", "ejs");
// app.set("views", "./views");

//express router
// app.use(router);
app.use(shortenedRoutes);

const PORT = env.PORT;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.log(error);
}
