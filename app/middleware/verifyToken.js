const { NotExtended } = require("http-errors");

function verifyToken(request, result, nextOperation) {
    // const userToken = "HI!";
    // get token from cookie
    const userToken = request.cookies.userToken;
    // if undefined
    if (typeof userToken != 'undefined') {
        request.token = userToken;
        nextOperation();
    } else {
        // else, token is verified, & can enter the site
        result.redirect('/');
    }
}