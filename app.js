// Chase Barry
// 100751425
// 4/19/2024

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();


const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        readCSVAndInsertData('mock_data.csv');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });


// Render Home page
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Home' });
});

// Render Animal List page
app.get('/animal-list', (req, res) => {
    res.render('animal-list', { pageTitle: 'Animal List' });
});

// Render Entry Form page
app.get('/entry-form', (req, res) => {
    res.render('entry-form', { pageTitle: 'Entry Form' });
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

// Function to read data from the CSV file and insert into MongoDB
function readCSVAndInsertData(csvFilePath) {
    const results = [];
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Animal.insertMany(results);
                console.log('Data inserted successfully.');
            } catch (error) {
                console.error('Error inserting data:', error.message);
            } finally {
                mongoose.disconnect(); // Disconnect from MongoDB after insertion
            }
        });
    }
});
