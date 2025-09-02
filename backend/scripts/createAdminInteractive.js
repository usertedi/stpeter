const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const readline = require('readline');
require('dotenv').config();

// Import the User model
const User = require('../src/models/User');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function to ask questions
const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get user input
    const name = await askQuestion('Enter admin name: ');
    const email = await askQuestion('Enter admin email: ');
    const password = await askQuestion('Enter admin password: ');

    // Validate input
    if (!name || !email || !password) {
      console.log('All fields are required!');
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('User with this email already exists!');
      console.log('Email:', existingUser.email);
      console.log('Name:', existingUser.name);
      console.log('Is Admin:', existingUser.isAdmin);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      name,
      email,
      password,
      isAdmin: true
    });

    console.log('\nAdmin user created successfully!');
    console.log('Email:', adminUser.email);
    console.log('Name:', adminUser.name);
    console.log('Is Admin:', adminUser.isAdmin);

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    // Close the database connection and readline interface
    await mongoose.connection.close();
    rl.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the script
console.log('=== Create Admin User ===\n');
createAdminUser();
