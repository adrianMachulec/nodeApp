const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const { checkForbidenString } = require('../validators')

const companySchema = new Schema({
    slug: {
        type: String,
        required: [true, 'Pole slug jest wymagane'],
        minLength: [3, 'Minimalna liczba znaków dla pola slug to 3'],
        validate: value => checkForbidenString(value, 'slug'),
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: [true, 'Pole name jest wymagane']
    },
    employeesCount: {
        type: Number,
        min: 1,
        default: 1
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: String
})
//setter
//companySchema.path('slug').set((value) => value.toLowerCase())


const Company = mongoose.model('Company', companySchema)

module.exports = Company