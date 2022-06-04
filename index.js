const express = require("express");
const path = require("path");
const { server, app } = require("./app");
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
