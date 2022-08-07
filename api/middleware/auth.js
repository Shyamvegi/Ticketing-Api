import jwt from 'jsonwebtoken';

const auth = (req,res,next) =>{
    try{
        const authToken = req.header('Auth-Token');
        console.log(authToken);
        if(!authToken){
            return res.status(404).json({'message':"No Token Found"}).end();
        }
        const decoded = jwt.verify(authToken,'qweasd123@');
        console.log(decoded);
        req.authUser = decoded.data
        next()
    }
    catch(err){
        console.log(err);
        return res.status(400).send('Access Denied');
    }
}

export default auth;