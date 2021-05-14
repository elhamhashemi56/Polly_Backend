const express = require('express');
const router = express.Router();
const { check }  = require('express-validator')



//check normalize Email!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const {userGetController,
       userPostController,
       userEinloggen,
       userEinloggenGoogle
      }=require('../controller/users_controller')

const validUser = [
  check('name')
    .not()
    .isEmpty()
    .isLength({min:2})
    .withMessage('Bitte geben Sie einen Namen ein.')
    .trim()
    .escape(),
  check('email')
    .isEmail()
    .withMessage('Keine gültige E-Mail Adresse.')
    .trim()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .isLength({min:8})
    .withMessage('Ihr Passwort muss aus 8 Zeichen bestehen.')
    .matches('[0-9]').withMessage('Ihr Passwort muss eine Zahl beinhalten.')
    .trim()
    .escape(),
    
];

router
    .route('/')
        .get(userGetController)
        .post(validUser,userPostController)
        

router.route('/login')
        .post(userEinloggen)

router.route('/googlelogin')
        .post(userEinloggenGoogle)






module.exports = router;
