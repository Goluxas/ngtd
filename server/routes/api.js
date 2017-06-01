const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const mongoose = require('mongoose');
var url = require('./mongoose-conf.json');
url = url.url;
//const url = 'mongodb://goluxas:conflicttheory@ds053312.mlab.com:53312/ngtd';

const Task = require('../models/task');

mongoose.Promise = global.Promise;
mongoose.connect(url);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/* GET api listing */
router.get('/', (req, res) => {
	res.send('api works');
});

// Get all tasks
router.get('/tasks', (req, res) => {
  Task.find({}, (err, tasks) => {
    if (err) return console.log(err);

    res.status(200).json(tasks);
  });
});

router.post('/tasks', (req, res) => {
  console.log('post request received');
  tasklist = req.body;

  for (task of tasklist) {
    mgTask = new Task(task);
    Task.findByIdAndUpdate(mgTask._id, mgTask, {upsert:true}, (err) => {
      if (err) return console.log(err);
    });
  }

  res.status(200).json({status: true});

});

module.exports = router;
