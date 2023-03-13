const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { validateEmail } = require("../validators");
const randomstring = require('randomstring')

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [validateEmail, "Podany email jest nieprawidłowy"],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, "Hasło powinno posiadać min 4 znaki"],
  },
  firstName: String,
  lastName: String,
  apiToken: String,
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next();
  }
});

userSchema.post("save", function (error, doc, next) {
  if (error.code === 11000) {
    error.errors = { email: { message: "Taki email jest już zajęty" } };
  }
  next(error);
});

userSchema.pre("save", function (next) {
  const user = this;
  if(user.isNew) user.apiToken = randomstring.generate(30);
  next();
});

userSchema.methods = {
  comparePassword(password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
  },
};

userSchema.virtual("fullName").get(function () {
  if (this.firstName) return `${this.firstName} ${this.lastName}.`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
