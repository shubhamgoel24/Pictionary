const express = require('express');
const router = express.Router();
const indexcontroller = require('./index_controller');

console.log('Router loaded');

router.post('/nameroom', indexcontroller.nameroom);

module.exports= router;
