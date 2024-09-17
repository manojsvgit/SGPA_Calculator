const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sgpaDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB:', err));

// Define a schema for the SGPA data
const sgpaSchema = new mongoose.Schema({
    name: String,
    usn: String,
    sgpa: Number
});

// Create a model based on the schema
const SGPA = mongoose.model('SGPA', sgpaSchema);

// POST route to save SGPA data
app.post('/api/save-sgpa', async (req, res) => {
    const { name, usn, sgpa } = req.body;

    try {
        const newSGPA = new SGPA({ name, usn, sgpa });
        await newSGPA.save();
        res.status(200).send('SGPA data saved successfully');
    } catch (err) {
        res.status(500).send('Error saving SGPA data');
    }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
