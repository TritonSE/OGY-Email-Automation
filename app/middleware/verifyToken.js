/**
 * This method verifyToken gets the token from a cookie &
 * checks to see if token is defined to verify it.
 * 
 * @param {express.req} request obj when a route is called
 * @param {*} result what we store as a result of whether the cookie was valid or not
 * @param {*} nextOperation the next method to call if the token is not defined 
 */
function verifyToken(request, result, nextOperation) {
    // get token from cookie
    const userToken = request.cookies.userToken;

    if (typeof userToken != 'undefined') {
        request.token = userToken;
        nextOperation();
    } else {
        // else, token is verified, & can enter the site
        result.redirect('/');
    }
}

module.exports = verifyToken;
