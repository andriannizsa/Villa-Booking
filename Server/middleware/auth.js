const { tokenVerify } = require('../helper/jwt');

const authentication = (req,res,next) => {
    console.log("Authentication");
    const {access_token} = req.headers;

    if(access_token) {
        try {
            let verifier = tokenVerify(access_token)
        // res.json(verifier)
        req.userData = verifier
        next()
        }catch(err) {
            res.status(400).json({
                message: "User not authentication"
            })
        }
    }else {
        res.status(400).json({
            message: "token not found"
        })
    }
}

module.exports = {authentication};