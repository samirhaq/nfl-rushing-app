const express = require('express');
const cors = require('cors');
const statsRouter = require('./src/routes/router');

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

app.use('/', statsRouter);

const port = process.env.PORT || 8080;

app.listen('3001', () => { })
