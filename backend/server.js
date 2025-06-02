const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');  // Import User model

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/healthconnect')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// POST request for login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email exists in the database
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials', success: false });
      }

      // Compare the password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error comparing passwords', success: false });
        }

        if (isMatch) {
          res.status(200).json({ message: 'Login successful', success: true });
        } else {
          res.status(401).json({ message: 'Invalid credentials', success: false });
        }
      });
    })
    .catch(err => {
      console.log("Error during login:", err);
      res.status(500).json({ message: 'Server error', success: false });
    });
});

// POST request for registering a new user
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  // Check if the email already exists
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: 'Email already exists', success: false });
      }

      // Hash the password before storing it
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password', success: false });
        }

        // Create a new user with the hashed password
        const newUser = new User({
          email,
          password: hashedPassword
        });

        // Save the user to the database
        newUser.save()
          .then(() => res.status(201).json({ message: 'User registered successfully', success: true }))
          .catch(err => {
            console.log("Error during registration:", err);
            res.status(500).json({ message: 'Server error', success: false });
          });
      });
    })
    .catch(err => {
      console.log("Error during registration:", err);
      res.status(500).json({ message: 'Server error', success: false });
    });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
