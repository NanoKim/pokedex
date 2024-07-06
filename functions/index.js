const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  if (userAgent.includes('Kakaotalk')) {
    res.redirect('https://pokedex-4d580.web.app/');
  } else {
    next();
  }
});

app.use(express.static('public'));

exports.handleUserAgent = functions.https.onRequest(app);