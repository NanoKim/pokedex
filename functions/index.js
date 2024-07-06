const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const app = express();

app.use((req, res, next) => {
  let userAgent = req.headers['user-agent'] || '';
  if (userAgent.includes('Kakaotalk')) {
    req.headers['user-agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
  }
  next();
});

app.use('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('url query parameter is required');
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': req.headers['user-agent']
      },
      responseType: 'stream'
    });
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send('Error fetching the URL');
  }
});

app.use(express.static('public'));

exports.handleUserAgent = functions.https.onRequest(app);
