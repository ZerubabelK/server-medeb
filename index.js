const express = require("express");
const authRoute = require("./api/authRoute");

const app = express();
app.use("/auth", authRoute);
const IP_ADDRESS = "192.168.43.70";
const PORT = 8080;
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`http://${IP_ADDRESS}:${PORT}`);
});
