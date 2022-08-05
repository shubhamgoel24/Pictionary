const express = require('express');
const router = express.Router();
const indexcontroller = require('./index_controller');

console.log('Router loaded');

router.post('/nameroom', indexcontroller.nameroom);
// router.get('/join/:id',indexcontroller.joinroom);

module.exports= router;
