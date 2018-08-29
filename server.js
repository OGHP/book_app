'use strict';

require('dotenv').config();

const pg = require('pg');
const express = require('express');
let app = express();
app.set('view engine', 'ejs');

// const PORT = process.env.PORT || 3000;
//removed PORT defaults per John's lecture Tuesday
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// const CONSTRING = process.env.DATABASE_URL || 'postgres://localhost:5432/postgresql-animated-22077'
//removed CONSTRING defaults per John's lecture Tuesday
const CONSTRING = process.env.DATABASE_URL

const client = new pg.Client(CONSTRING);
client.connect();
client.on('error', err => console.error(err));

app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, description, image_url, id FROM books';
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

app.get('/show/:id', showDetails);

function showDetails( request, response ) {
  let detail = request.params.id;
  let SQL = `
  SELECT title, author, description, image_url, isbn 
    FROM books
    WHERE id = $1
  `;
  let values = [detail];

  client.query(SQL,values)
  .then( data => {
    let bookDetails = data.rows;
    response.render('show', {books:bookDetails});
  })
}

//added function (from code review)
function throwDatabaseError(response, error) {
    response.render('pages/error');
};

//added __dirname (from code review)
app.use( express.static(__dirname + '/public') );

//added (from code review) I think this should be a 404. It's the last thing the load will look at & ONLY if needed
app.use('*', (request, response) => response.render('pages/error') );

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
