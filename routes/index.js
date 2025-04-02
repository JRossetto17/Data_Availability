var express = require('express');
var router = express.Router();

const { getData, createEntry } = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', async function(req, res, next) {
  const [data] = await getData();

  res.send(data);

  // res.render('data', { title: 'Express' });
});

router.get('/people', function(req, res) {
  const people = [
    { id: 1, name: 'John Doe', age: 28, country: 'USA' },
    { id: 2, name: 'Jane Smith', age: 34, country: 'Canada' },
    { id: 3, name: 'Alice Johnson', age: 25, country: 'UK' },
    { id: 4, name: 'Bob Brown', age: 45, country: 'Australia' }
  ];
  res.render('data', { people });
});

module.exports = router;
