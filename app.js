const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./api/server/module/usercontroller');
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use('/api', userRoute);
// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status = 404;
//     next(error);
//   })
  
//   app.use((error, req, res, next) => {
//      res.status(error.status || 500);
//      res.json({
//          error: {
//           message: error.message
//          }
//      });
  
//   });
  module.exports = app;