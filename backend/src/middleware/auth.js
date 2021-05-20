const jwt = require ('jsonwebtoken');

module.exports = (req, res, next)=>{
    try{
        console.log('auth ok')
        console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        console.log('ICI',decodedToken)
        const userId = decodedToken.userId;
        console.log('ICI1',userId)
            if(req.body.userId && req.body.userId !== userId){
                throw 'Invalid user ID';
            }else{
                next()
            }
    }catch{
        res.status(401).json({
            
            error:new Error('Invalid request')
        })
        console.log('error')
    }
}