const express = require('express');
const router = express.Router();

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

/* GET api listing */
router.get('/', (req, res) => {
	res.send('api works');
});

// Get all posts (tutorial code)
router.get('/posts', (req, res) => {
	axios.get(`${API}/posts`)
		.then(posts => {
			res.status(200).json(posts.data);
		})
		.catch(error => {
			res.status(500).send(error);
		});
});

module.exports = router;
