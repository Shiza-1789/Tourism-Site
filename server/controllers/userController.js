const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, name, email, phone, role) => {
    return jwt.sign(
        {id, name, email, phone, role},
        process.env.JWT_SECRET_KEY,
        {expiresIn:'24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {name, email, password, phone, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Неккоректный email или пароль'))
        }

        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))   
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const user = await User.create({name, email, password: hashPassword, phone, role})
        const token = generateJwt(user.id, user.name, user.email, user.phone, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))   
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))   
        }
        const token = generateJwt(user.id, user.name, user.email, user.phone, user.role)
        return res.json({token})
    }
    
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.phone, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()