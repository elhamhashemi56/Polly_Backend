const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const {umfrageUserGetController,umfrageIDGetController, umfrageIDDeleteController}=require('../controller/umfrage_controller')



router
    .route('/')
     .get(auth,umfrageUserGetController)

router
    .route('/:id')
     .get(umfrageIDGetController)

router
    .route('/:id')
        .delete(auth,umfrageIDDeleteController)




module.exports = router