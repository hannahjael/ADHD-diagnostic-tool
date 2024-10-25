const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/questionnaire', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema
const responseSchema = new mongoose.Schema({
    name: String,
    age: Number,
    answers: [Number],
    score: Number,
});

const Response = mongoose.model('Response', responseSchema);

// API endpoint to save responses
app.post('/api/responses', async (req, res) => {
    try {
        const { name, age, answers, score } = req.body;
        const newResponse = new Response({ name, age, answers, score });
        await newResponse.save();
        res.status(201).json({ message: 'Response saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save response' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});