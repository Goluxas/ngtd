const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const mongoose = require('mongoose');
var url = require('./mongoose-conf.json');
url = url.url;

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
router.get('/tasks/get', (req, res) => {
  console.log('Fetching master list.');

  Task.find({}, (err, tasks) => {
    if (err) {
      console.error(err);
      return res.status(500).json({status:false});
    }

    console.log('Master list sent.');
    return res.status(200).json(tasks);
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

router.post('/tasks/post', (req, res) => {
  console.log('Received new task:');

  let task = req.body;
  console.log(task);

  Task.create(task, (err, new_task) => {
    if (err) {
      console.error(err);
      return res.status(500).json({status:false});
    }

    console.log('Task created');
    return res.status(200).json({status:true});
  });
});

router.post('/tasks/update', (req, res) => {
  console.log('Received task to update:');

  let task = req.body;
  console.log(task);

  Task.update({_id: task._id}, task, (err, updated_task) => {
    if (err) {
      console.error(err);
      return res.status(500).json({status:false});
    }

    console.log('Task updated.');
    return res.status(200).json({status:true});
  });
});

module.exports = router;
