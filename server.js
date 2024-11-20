const express = require('express');
const app = express();
app.use(express.json()); // To parse JSON bodies

// Mock API Routes
// Login endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.json({ success: true, token: 'mock-token' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Get products endpoint
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 200 },
        { id: 3, name: 'Product C', price: 300 },
    ]);
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/api/register', (req, res) => {
    const { username, password, email } = req.body;
    res.json({ success: true, message: 'User registered successfully', userId: Date.now() });
});


app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    res.json({ id: productId, name: `Product ${productId}`, price: productId * 100 });
});
