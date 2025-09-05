import JWT from 'jsonwebtoken';
export const generateToken = async (
    {
        payload={},
        signature=process.env.ACCESS_TOKEN_SIGNATURE,
        options={expiresIn:process.env.ACCESS_TOKEN_EXPIRES_IN}
    }={}) =>{
    return JWT.sign(payload,signature,options)
}
export const verifyToken = async (
    {
        token="",
        signature=process.env.ACCESS_TOKEN_SIGNATURE,
    }={}) =>{
    return JWT.verify(token,signature);
}