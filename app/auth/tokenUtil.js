const jwt = require('jsonwebtoken');

async function validateToken(token){
    return jwt.verify(token, process.env.SECRETKEY, async function(err, authData) {
        if(err) {
            return null;
        } else {
            return authData;
        }
    });
}

async function generateToken(userDataPacket){
    return jwt.sign({userDataPacket}, process.env.SECRETKEY, {expiresIn:'3hr'});
}

module.exports = {
    validateToken,
    generateToken
};
