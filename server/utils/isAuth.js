const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_JWT_KEY || 'd77590bf111825243804257ee4538961c9b58d'

module.exports = async (req, res, next) => {
    const beare = req.headers.authorization
    if(!beare) return res.status(402).json({ msg: 'there is no token, please signin again !' })
    const token = beare.split(' ')[1]
    if (!token) return res.status(402).json({ msg: 'there is no token, please signin again !' })
    try {
        const decodedToken = await jwt.verify(token, secretKey)
        req.userId = decodedToken.id
        req.userEmail = decodedToken.email
        next()
    } catch (error) {
        return res.status(402).json({ msg: 'invalid token, please signin again !' })
    }
}