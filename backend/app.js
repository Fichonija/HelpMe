const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();


mongoose.connect('mongodb+srv://fbolcic:C8aW72Pn8eyjFRjf@cluster0-eijik.mongodb.net/HelpMe?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to MongoDB.') })
  .catch((err) => { console.log('Connection to MongoDB failed. Error: ' + err) });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    summary: req.body.summary
  });
  post.save();

  console.log(post);
  res.status(201).json({
    message: 'Post added successfuly.'
  });
})

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
      res.status(200).json({
        message: 'Posts fetched.',
        data: documents
      });
  });
});

module.exports = app;
