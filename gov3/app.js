const { exec } = require("child_process");
const path = require("path");
const express = require("express");
const app = express();
const os = require("os");
const platform = os.platform();

let command = "comando do linux";

if (platform === "win32") {
  command = "start http://localhost:1337";
}

app.use("/", express.static(path.join(__dirname, "")));

app.get("/", (_, res) => res.render("index.html"));

app.listen(1337, () => exec(command));
