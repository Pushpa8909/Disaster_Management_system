const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res) => {
    res.send("Hello from Express!");
});
app.get('/register', (req, res) => {
    res.sendFile(path.join("C:/Users/manik/OneDrive/Desktop/game", "index.html"));
});

app.listen(3003, () => {
    console.log("Server running on http://localhost:3003");
});