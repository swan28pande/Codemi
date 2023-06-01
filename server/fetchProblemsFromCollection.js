const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const {Problem} = require('./models/models');

async function fetchProblemsFromCollection() {
  try {
    console.log("starting the connection...")
    console.log(uri)
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas');

    const data = await Problem.find({});
    mongoose.disconnect();
    console.log('Disconnected from MongoDB Atlas');
    console.log(data);
    return data;
    
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

module.exports = fetchProblemsFromCollection;
