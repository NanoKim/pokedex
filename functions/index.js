const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.use((req, next) => {
  let userAgent = req.headers['user-agent'] || '';
  if (userAgent.includes('Kakaotalk')) {
    req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
  }
  next();
});


app.use(express.static('public'));

exports.handleUserAgent = functions.https.onRequest(app);