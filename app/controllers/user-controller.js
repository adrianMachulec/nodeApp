const User = require("../db/models/User");

class UserController {
  showRegister(req, res) {
    {
      res.render("pages/auth/register");
    }
  }

  async register(req, res) {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    try {
      await user.save()
      res.redirect("/zaloguj");
    } catch (e) {
      res.render("pages/auth/register", {
        errors: e.errors,
        form: req.body,
      });
    }
  }
}

module.exports = new UserController();
