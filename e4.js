const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let users = [];

/* ---------------------------------
   1. ACCEPT DATA (POST)
--------------------------------- */
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).send({
        message: 'User added successfully',
        data: user
    });
});

/* ---------------------------------
   2. RETRIEVE DATA (GET)
--------------------------------- */
app.get('/users', (req, res) => {
    res.send(users);
});

/* ---------------------------------
   3. DELETE SPECIFIED RESOURCE (DELETE)
--------------------------------- */
app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    users = users.filter(user => user.id != id);
    res.send({
       message: `User with id ${id} deleted successfully`
   });
    
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
