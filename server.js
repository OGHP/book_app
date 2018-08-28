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

    //added (from code review) all of our routes will need this!
    .catch(err => {
      throwDatabaseError(response, err)
    });
});

//added function (from code review)
function throwDatabaseError(response, error) {
    response.render('pages/error');
};

//added __dirname (from code review)
app.use( express.static(__dirname + './public') );

//added (from code review) I think this should be a 404. It's the last thing the load will look at & ONLY if needed
app.use('*', (request, response) => response.render('pages/error') );

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
