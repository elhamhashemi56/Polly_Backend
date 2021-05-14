require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");

/////////////////////////////////////////////////////////////////
 const userRouter = require("./routes/user_route");
 const umfrageRouter = require("./routes/umfrage_route");
 const frageRouter = require("./routes/frage_route");
 const antwortRouter = require("./routes/antwort_route")
 


//initialize express
const app = express();
app.use(express.static(path.join(__dirname, "../build")));


//DB connection
const verbindeDB = require("./mongo-db");
verbindeDB();


app.use(logger("dev"));
//Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//CORS Header Info
const corsHeader = require("./middleware/cors");
app.use(corsHeader);

//Routes
app.use("/user", userRouter);
app.use("/umfrage", umfrageRouter);
app.use("/frage", frageRouter);
app.use("/antwort", antwortRouter);


//Error Middleware needs to be last
//dead End

app.get('*',(req,res,next)=>{
    let fehler=new Error('Diesen Pfad gibt es nicht')
    fehler.statusCode=404
    next(fehler)
})
// usere Fehler middleware:
app.use((error, req,res,next) => {
    // status im header setzen:
    res.status(error.statusCode)
    res.send({
      error: {
        status: error.statusCode,
        mitteilung: error.message
      }
    })
  })


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

//mit send or end req/res cycle ends!
module.exports = app;