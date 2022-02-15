const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(express.urlencoded({extended: false}));

app.use(express.json());

// Arquivos Estaticos
app.use(express.static('public'));

// Handlebars
// app.engine('handlebars', expressHandlebars.engine);
// app.set('view engine', 'handlebars');
const handlebars = expressHandlebars.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Conexão com o Banco de Dados
// const pool = mysql.createPool({
//     connectionLimit : 100,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database:  process.env.DB_NAME
// });

// pool.getConnection((err, connection) => {
//     if(err) throw err;
//     console.log('Connected as ID ' + connection.threadId);
// });

// 1:39:00 https://www.youtube.com/watch?v=1aXZQcG2Y6I

// Rotas
// app.get('/', (req,res) =>{
//     res.render('home');
// });

const routes = require('./server/routes/rotas');
app.use('/', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));