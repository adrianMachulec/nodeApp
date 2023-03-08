const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { validateEmail } = require('../validators')

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        lowercase: true,
        trim: true,
        unique: true,
        validate: [validateEmail, 'Podany email jest nieprawidłowy']
    },
    password:{
        type: String,
        required: true,
        minLength: [4, 'Hasło powinno posiadać min 4 znaki']
    }
})

userSchema.pre('save', function(next){
    const user = this
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(value, salt)
    user.password = hash
    next()
})

userSchema.post('save', function(error, doc, next) {
    if(error.code === 11000) {
        error.errors = {email: { message: 'Taki email jest już zajęty'}}
    }
    next(error)
})

userSchema.methods = {
    comparePassword(password) {
        const user = this
        return bcrypt.compareSync(password, user.password)
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User;