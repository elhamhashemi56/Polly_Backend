const Antwort = require('../models/antwort')
const Frage = require("../models/frage")


/////////////////////////////////
// req.body ={
//   "antworten":[
//      {"frageID": "6083cec026d9b59b5a1615b3","antwort" : "Auto" },
//      {"frageID": "6083cec026d9b59b5a1615b4","antwort":"Englisch"},
//       ]
//    }
//////////////////////////////////

const antwortPostController = (req, res, next)=>{
    try {
        
        let alleAntworten = req.body.antworten.map(async element => {
            let beantworteteFrage =await Frage.find({_id:element.frageID })
            let antwortAufFrage = element.antwort;
            let gespeicherteAntworten =await Antwort.create({ antwort: antwortAufFrage, Question: beantworteteFrage[0].frage ,frage: beantworteteFrage[0]._id,umfrageId: beantworteteFrage[0].umfrage,umfrageTitel:beantworteteFrage[0].titel})
            return gespeicherteAntworten

        })
        Promise.all(alleAntworten).then(data=>{
         console.log(data);   
         res.status(201).send(data)
        }) 
    }catch(error){
        res.status(500).send(error)

    }
}
// zieht mit ID
// gegeben = [ 

//     { "frage": "6083cec026d9b59b5a1615b3", "antwort" : "Auto"},
//     { "frage": "6083cec026d9b59b5a1615b3", "antwort": "Zug"},
//     { "frage": "6083cec026d9b59b5a1615b3", "antwort": "Auto"},
//     { "frage": "6083cec026d9b59b5a1615b4", "antwort": "Englisch"},
//     { "frage": "6083cec026d9b59b5a1615b4", "antwort": "Deutsch"},
//     { "frage": "6083cec026d9b59b5a1615b4", "antwort": "Deutsch"}

// ]
// // Ziel am Ende:
// antworten = [ 
//     { frageid: "6083cec026d9b59b5a1615b3", antworten: ["Auto", "Zug","Auto"]},
//     { frageid: "6083cec026d9b59b5a1615b4", antworten: ["Englisch", "Deutsch","Deutsch"]}
// ]
const antwortIdGetController = async(req,res,next)=>{
    try{
        let neuarrayAntworten=[]
        const {id} = req.params
        let AntwortenAufUmfrage=await Antwort.find({umfrageId:id})
        AntwortenAufUmfrage.forEach(element=>{
            let ActuelleFrage= (element.frage).toString()
            let ActuelleAntwort=element.antwort
            let ActuelleQuestion=element.Question
            let ActuelleUmfrageTitel=element.umfrageTitel
            let passendesItem=neuarrayAntworten.find(item=>{
                return (item.frageId === ActuelleFrage)
            })
            if(passendesItem === undefined){
                passendesItem= {frageId:ActuelleFrage,antworten:[],question:ActuelleQuestion,umfrageTitel:ActuelleUmfrageTitel}
                neuarrayAntworten.push(passendesItem)
            }
             passendesItem.antworten.push(ActuelleAntwort)
        })

        res.status(200).send(neuarrayAntworten)
    }catch(error){
        res.status(500).send(error)
    }
}




module.exports = {antwortPostController, antwortIdGetController}