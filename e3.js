// Import express module
const express = require('express');
const app = express();

// server port
const PORT = 3000;

// 1. DEFINING A BASIC ROUTE
app.get('/', (req, res) => {
    res.send('Welcome to the Home Page');
});

// 2. HANDLING ROUTES
app.get('/about', (req, res) => {
    res.send('This is the About Page');
});

// 3. ROUTE PARAMETERS
// URL Example: http://localhost:3000/student/101
app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;
    res.send(`Student ID received: ${studentId}`);
});

// 4. QUERY PARAMETERS
// URL Example: http://localhost:3000/search?course=Java&year=2
app.get('/search', (req, res) => {
    const course = req.query.course;
    const year = req.query.year;

    res.send(`Course: ${course}, Year: ${year}`);
});

// 5. URL BUILDING
app.get('/profile', (req, res) => {
    const userId = 5;

    // DYNAMICALLY BUILDING URL
    const profileUrl = `/user/${userId}?role=student`;
    res.send(`Profile URL: ${profileUrl}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});