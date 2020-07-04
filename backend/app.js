const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});



app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'esfmc23', title: 'First server blog title', summary: 'First blog post summary is awesome.' },
    { id: 'wrefpokp34', title: 'Second server blog title', summary: 'Second blog post summary is awesome.' },
    { id: 'qr0k3m3', title: 'Third server blog title', summary: 'Third blog post summary is awesome.' }
  ];
  res.status(200).json({
    message: 'Posts fetched.',
    data: posts
  });
});

module.exports = app;
