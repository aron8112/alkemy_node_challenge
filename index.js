const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger('dev'));
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
console.log(`Listening on port: ${PORT}`))