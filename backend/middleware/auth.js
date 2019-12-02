const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async(req, res, next) => {
    if(req.header('Authorization') && req.header('Authorization').indexOf('Bearer') > -1){
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.wordsec)
        try {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'No estas autorizado' })
        }
    }else{
        res.status(401).send({ error: 'No estas autorizado' })
    }

}
module.exports = auth