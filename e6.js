const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
//Set Cookies
app.get("/setcookie", (req, res) => {
    res.cookie("Username", "Sri");
    res.send("Cookie created");
});
//Read Cookie
app.get("/getcookie", (req, res) => {
    if (req.cookies.Username) {
        res.send("Cookie value:" + req.cookies.Username);
    } else {
        res.send("No cookie found!");
    }
});
//Clear Cookie
app.get("/clearcookie", (req, res) => {
    res.clearCookie("Username");
    res.send("Cookie Cleared");
});
app.listen(1000, () => console.log("Cookie server running on http://localhost:1000"));