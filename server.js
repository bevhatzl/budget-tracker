const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PWD = process.env.DB_PWD;
const databaseUrl = `mongodb+srv://chick-flick:${encodeURIComponent(PWD)}@cluster0.fqf9a.mongodb.net/budget-tracker`;

// Connection before deployment
// mongoose.connect(databaseUrl, { useNewUrlParser: true, useFindAndModify: false });

// Connection for deployment on heroku
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/budget-tracker',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});