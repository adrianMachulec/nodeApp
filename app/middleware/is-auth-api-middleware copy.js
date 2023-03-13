const User = require('../db/models/User')

module.exports = async function(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1]
    const user = User.findOne({ apiToken: token })
    if(!token){
        res.status(403).json({message: 'Dostęp zabroniony'})
    }
    if(!user){
        res.status(403).json({message: 'Dostęp zabroniony'})
    }
    req.user = user
    next()
}