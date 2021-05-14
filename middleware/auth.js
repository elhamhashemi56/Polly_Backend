const jwt = require('jsonwebtoken')

const authorization =(req, res, next)=>{
    try{
        let token = req.headers.authorization.split(' ')[1];
        let tokenReadable = jwt.verify(token, process.env.JWT || 'geheimnis');
        req.tokenUser = tokenReadable;
        next()
    }catch(error){
        return res.status(400).send('User could not be logged in.')
    }
}
module.exports = authorization

