const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://alit:Alit2005@cluster0.c9n41rf.mongodb.net/admin';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
