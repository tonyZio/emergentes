const express = require('express');
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');


const app = express();

app.use(cookieParser());;
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
