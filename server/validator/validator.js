const Joi = require("@hapi/joi")
const jwt = require("jsonwebtoken")

exports.loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

exports.verifyToken = (req, res, next) => {
    const token = req.header("auth-token")
    if(!token) return res.status(400).json({error: "Access Denied"})

    try{
        const verify = jwt.verify(token, process.env.SECRET)
        req.user = verify
        next()
    }catch(err){
        res.status(400).json({error: "Token invalid"})
    }
}