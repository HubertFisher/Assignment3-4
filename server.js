const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const helmet = require('helmet');


app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", "*"],
      connectSrc: ["'self'", "*", "http://localhost:3000"], 
      imgSrc: ["'self'", 'data:',"*"], 
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*", "https://cdn.jsdelivr.net", "https://ajax.googleapis.com"], 
      scriptSrcAttr: ["'unsafe-inline'"] 
    }
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://alit:Alit2005@cluster0.c9n41rf.mongodb.net/travelAgency';


mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
