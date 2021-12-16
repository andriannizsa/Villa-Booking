const bcrypt = require('bcrypt')
const saltRound = +process.env.SALT_ROUND;

const encryptPwd = (pwd) => {
    return bcrypt.hashSync(pwd, saltRound)
}

const decryptPwd = (pwd, haspwd) => {
    return bcrypt.compareSync(pwd,haspwd)
}

module.exports = {encryptPwd, decryptPwd};