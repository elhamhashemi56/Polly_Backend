
const Frage = require('../models/frage')
const Umfrage = require("../models/umfrage")



{/* <button>Umfrage anlegen</button> =>  */}

// req.body = {

//     "titel": "Lukas Bäcker",
//     "fragen": [
//         { "frage": "wie findest du unseren kaffee?", "antworten" : ["mies", "toll", "geht so" ] },
//         { "frage": "Wie ist unser Service?", "antworten" : ["furchtbar", "freundlich"] }
//     ]
// }   

const fragePostController = async (req, res, next)=>{
    try{
        let neueUmfrage = await Umfrage.create({titel: req.body.titel,user:req.tokenUser.userId})
        let vieleFragen = req.body.fragen.map( ele => {
            ele.umfrage = neueUmfrage._id;
            ele.titel = neueUmfrage.titel
            return ele
        } );
        let gespeicherteFragen = await Frage.insertMany(vieleFragen)
        res.status(201).send({
            ufrageID:neueUmfrage._id,
            gespeicherteFragen,
        })
    }catch(error){
        res.status(500).send(error)
    }
}


module.exports = {fragePostController}


