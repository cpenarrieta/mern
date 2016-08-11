const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const courseController = require('./course/courseController');
const userController = require('./user/userController');
const mongoose = require('mongoose');


// mongo config
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mern');


// express middleware settings
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());


// api routes
app.route('/user')
  .get(userController.get)
  .post(userController.post);
app.route('/user/:id')
  .get(userController.getOne)
  .put(userController.put)
  .delete(userController.delete)

app.route('/course')
  .get(courseController.get)
  .post(courseController.post);
app.route('/course/:id')
  .get(courseController.getOne)
  .put(courseController.put)
  .delete(courseController.delete)


// set up global error handling
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send('Oops');
});


// run express server and listen to port 8888
app.listen('8888', () => {
  console.log('listening on 8888');
});
