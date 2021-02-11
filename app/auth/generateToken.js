export const generateToken = (secret_key, error) => {
    return jwt.sign({secret_key: secret_key, error: error}, process.env.TOKEN_SECRET, { expiresIn: '3hrs'});
}
