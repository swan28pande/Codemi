const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');

module.exports = {

    auth: (req,res,next) => {
        const authHeader =  req.headers["authorization"];
        if(!authHeader){
            return res.status(403).json({msg: 'Authorization header required'});
        }
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        if(decoded && decoded.id){
            req.userID = decoded.id;
            console.log(req.userID);
            console.log(decoded.id);
            next();
        }
        return res.status(403).json({msg: 'Authorization header invalid'});

}
}


