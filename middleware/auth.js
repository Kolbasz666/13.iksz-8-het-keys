require('dotenv').config({quiet: true})
const jwt = require('jsonwebtoken')
const SK = process.env.SK

function Auth(){
    return (req,res,next) => {
        try {
            const token = req.headers.authorization
            if(!token)
                return res.status(401).json({message: 'Hiányzó token'})
            const decodedToken = jwt.verify(token, SK)
            req.ownerId = decodedToken.ownerId
            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({message:'Sikertelen hitelesítés: token hiba'})
        }
    }
}

module.exports = Auth