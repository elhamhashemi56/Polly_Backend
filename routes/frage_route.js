const express = require('express');
const router = express.Router();
const { check }  = require('express-validator')
const auth = require('../middleware/auth')
const {fragePostController}=require('../controller/frage_controller')


//umfrage post ist auf /frage 
const validUmfrage = [
    check('titel')
      .not()
      .isEmpty()
      .withMessage('Ihre Umfrage hat keinen Titel.')
      .trim()
      .escape(),
]

router
    .route('/')
        .post(auth,validUmfrage,fragePostController)
 




module.exports = router