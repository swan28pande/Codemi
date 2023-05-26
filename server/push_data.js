const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');

const uri = process.env.MONGO_URI;
console.log(uri);

const Problem = require('./models/models');

async function pushDataToCollection() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    const jsonData = fs.readFileSync('problems.json', 'utf8');
    const data = JSON.parse(jsonData);

    Problem.insertMany(data)
      .then(() => {
        console.log('Data pushed to the collection');
        mongoose.disconnect();
        console.log('Disconnected from MongoDB Atlas');
      })
      .catch((error) => {
        console.error('Error pushing data to the collection:', error);
        mongoose.disconnect();
      });

    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
}

pushDataToCollection();
