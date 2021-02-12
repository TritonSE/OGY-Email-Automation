const jwt = require('jsonwebtoken');

/**
 * validates token, if validated, return the encoded data otherwise
 * return null
 *
 * @param token
 * @returns {Promise<*>}
 */
async function validateToken(token){
    return jwt.verify(token, process.env.SECRETKEY, async function(err, authData) {
        if(err) {
            return null;
        } else {
            return authData;
        }
    });
}

/**
 * generates a token that expires in 3 hours from the user Data
 *
 * @param userDataPacket
 * @returns {Promise<undefined|*>}
 */
async function generateToken(userDataPacket){
    return jwt.sign({userDataPacket}, process.env.SECRETKEY, {expiresIn:'3hr'});
}

module.exports = {
    validateToken,
    generateToken
};
