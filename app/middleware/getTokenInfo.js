export const getTokenInfo = async(req, res, next) =>{
    const authHeader = req.headers['authorization']
    return authHeader && authHeader.split(' ')[1];
}
