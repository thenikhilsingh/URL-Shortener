import express from "express";
import PORT from "./env.js";
// import router from "./routes/shortener.routes.js";
import { shortenedRoutes } from "./routes/shortener.routes.js";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//express router
// app.use(router);
app.use(shortenedRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
