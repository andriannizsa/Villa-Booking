const jwt = require('jsonwebtoken');
const secretKey = "admin";

const tokenGenerator = (user) => {
    const {id, name,email,role} = user;
    const token = jwt.sign({
        id,name,email,role
    }, secretKey)
    return token;
}

const tokenVerify = (token) => {
    const decoded = jwt.verify(token, secretKey)
    return decoded;
}

module.exports= {
    tokenGenerator, tokenVerify
}