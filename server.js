require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const connectDB = require('./database/db');

// Move this later
const User = require('./models/User');

app.use(express.urlencoded({ extended: true, limit: '50mb ' }));
app.use(express.json());
app.use(cors());

connectDB();

app.post('/api/users', (req, res) => {
  const { name, email, googleId } = req.body;

  console.log(name, email, googleId);

  User.findOrCreate({ name, email, googleId }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'User could not be created ' });
    } else {
      console.log(foundUser);
      res.status(201).json({ message: 'User created' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
