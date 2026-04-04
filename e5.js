const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());

// Create Cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("username", "Pushpa", { maxAge: 60000 });
  res.send("Cookie created");
});

// Read Cookie
app.get("/get-cookie" , (req, res) => {
    if (req.cookies.username) {
        res.send("Cookie Value: " + req.cookies.username);
    } else {
        res.send("No cookie found");
    }
});

// Clear cookie
app.get("/clearcookie", (req, res) => {
    res.clearCookie("username");
    res.send("Cookie cleared");
});
app.listen(3000,()=>console.log("cookie is running at http://localhost:3000"));