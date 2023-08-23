// les package
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const routing = require('./routes');

// application express
const app = express();
const port = 5000 

// le chemin de nos views : 
app.set('views', path.join(__dirname, 'views'))
// le motteur de template pug
app.set('view engine', 'ejs')

// midleware
app.use(express.static(path.join(__dirname, 'public'))); // chemin d'accès au dossier public
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('short'));

app.use(routing);



app.listen(port, () => console.log(`application Node : http://127.0.0.1:${port}`));