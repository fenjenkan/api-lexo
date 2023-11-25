const express = require('express');
const Router = require('./routes');
const initDB = require('./mongoDB/index.js');
var cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

    app.use(cors());
app.use("/", Router)


  

app.listen (PORT, () => {console.log("Escuchando en el puerto " + PORT);});

initDB()