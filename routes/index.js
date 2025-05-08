var express = require('express');
var router = express.Router();

const { getData, getEntry, createEntry, updateEntry, removeEntry } = require('../database');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Get All Data */
router.get('/data', async function(req, res, next) {
  const people = await getData();

  res.render('data', { people });
});

/* Update a single entry */
router.get('/update/:id', async function(req, res, next) {
  const { id } = req.params;
 
  const people = await getEntry(id);
  console.log('///////////////////////////////////////////////');
  console.log(typeof people);
  res.render('update', { people });
})

/* sample route */
router.get('/people', function(req, res) {
  const people = [
    { ID: 1, Name: 'John Doe', Age: 28, Country: 'USA' },
    { ID: 2, Name: 'Jane Smith', Age: 34, Country: 'Canada' },
    { ID: 3, Name: 'Alice Johnson', Age: 25, Country: 'UK' },
    { ID: 4, Name: 'Bob Brown', Age: 45, Country: 'Australia' }
  ];

  console.log(typeof people);
  res.render('data', { people });
});

// /* Update a single entry */
router.post('/update/:id', async function(req, res) {
  const { id } = req.params;
  const { name, age, country } = req.body;

  
  try {
    await updateEntry(id, name, age, country); 
    res.redirect('/data');
  } catch (err) {
    res.status(500).send('Error updating the entry.');
  }
});

/* Handle form submission for creating new entry */
router.post('/create', async function(req, res) {
  const { name, age, country } = req.body;

  try {
    await createEntry(name, age, country); // Insert into DB
    res.redirect('/data');  // Redirect to people page or show success message
  } catch (err) {
    res.status(500).send('Error creating the entry.');
  }
});

/* Handle form submission for removing one entry */
router.post('/remove/:id', async function(req, res) {
  const { id } = req.params;
console.log('removing', id);
  try {
    await removeEntry(id); // remove from DB
    res.redirect('/data');  // Redirect to people page or show success message
  } catch (err) {
    res.status(500).send('Error creating the entry.');
  }
});



module.exports = router;
