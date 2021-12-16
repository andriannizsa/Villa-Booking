require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

const router = require("./routes");
app.use(router);

const PORT = process.env.PORT | 3000;

app.listen(PORT, () => console.log(`listen on ${PORT}`));