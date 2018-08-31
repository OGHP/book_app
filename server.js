'use strict';

require('dotenv').config();

const pg = require('pg');
const express = require('express');
let app = express();
app.set('view engine', 'ejs');

app.use( express.urlencoded({extended:true}) );
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const CONSTRING = process.env.DATABASE_URL
const superagent = require('superagent');
const client = new pg.Client(CONSTRING);

client.connect();
client.on('error', err => console.error(err));

app.get ('/new', addBookForm);
app.get('/show/:id', showDetails);
app.get('/results', runSearch)
app.get('/search',(request, response) => {
  response.render('../views/pages/searches/search');
});
app.post ('/new', addBook);

// - - - - - FUNCTIONS - - - - -  //

app.get('/', (request, response) => {
  let SQL = 'SELECT title, author, description, image_url, id FROM books';
  client.query(SQL)
    .then( data => {
      let bookData = data.rows;
      response.render('index', {books:bookData});
    })
    .catch(err => {
      throwDatabaseError(response, err)
    });
});

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
    response.render('../views/pages/books/show', {books:bookDetails});
  })
}

function addBookForm(request, response) {
  let data = {
    book: request.params.book,
    id: request.params.id
  };

  response.render('../views/pages/books/new', data);
}

function addBook (request, response) {
  let SQL = `INSERT INTO books (title, author, isbn, image_url, description)
  VALUES ($1, $2, $3, $4, $5)
  `;

  let values = [
    request.body.title,
    request.body.author,
    request.body.isbn,
    request.body.image_url,
    request.body.description
  ];

  client.query(SQL, values)
    .then( () => {
      response.render('success', {link:request.body});
    });
};

function runSearch(request, response) {
  let search = encodeURIComponent(request.query.search);
   let url = 'https://www.googleapis.com/books/v1/volumes?q=in' + request.query.by + ':' + search;
  console.log(request.query);
  superagent.get(url)
  .then( results => {
    let listings = results.body.items.reduce(( items, item ) => {
      let listing = {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        image_url: item.volumeInfo.imageLinks.smallThumbnail,
        isbn: item.volumeInfo.industryIdentifiers[0].identifier
      };
      items.push (listing);
      return items;
    },[]);

    response.render('pages/searches/results', {books:listings}); 
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  });
};

//added function (from code review)
function throwDatabaseError(response, error) {
    response.render('../views/pages/error');
};

//added __dirname (from code review)
app.use( express.static(__dirname + '/public') );

//added (from code review) I think this should be a 404. It's the last thing the load will look at & ONLY if needed
app.use('*', (request, response) => response.render('../views/pages/error') );

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));