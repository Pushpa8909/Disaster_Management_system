const express = require("express");
const session = require("express-session");

const app = express();

// Session setup
app.use(session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true
}));

// Create Session 
app.get("/login", (req, res) => {
    req.session.username = "Adithya";
    res.send("Session created");
});

// Read Session
app.get("/dashboard", (req, res) => {
    if (req.session.username) {
        res.send("Welcome " + req.session.username);
    } else {
        res.send("Session expired. Please login again.");
    }
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});