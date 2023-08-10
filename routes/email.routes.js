const router = require('express').Router();
// const passport = require('passport');
const { sendEmail } = require('../controllers/sendEmil.controller');

router.post('/enviar', sendEmail);

module.exports = router;