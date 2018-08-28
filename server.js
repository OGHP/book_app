'use strict';

const pg = require('pg');
const express = require('express');
let app = express();
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/postgresql-animated-22077'

const client = new pg.Client(CONSTRING);
client.connect();
client.on('error', err => console.error(err));

app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, image_url FROM books';
  client.query(SQL)
    .then( data => {
      let bookData = data.rows;
      response.render('index', {books:bookData});
    })
    .catch(err => {
      console.log(err);
      response.render('pages/error');
    });
});

app.use( express.static('./public') );
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));