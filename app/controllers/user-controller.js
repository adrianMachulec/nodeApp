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
      await user.save();
      res.redirect("/zaloguj");
    } catch (e) {
      console.log(e)
      res.render("pages/auth/register", {
        errors: e.errors,
        form: req.body,
      });
    }
  }

  showLogin(req, res) {
    {
      res.render("pages/auth/login");
    }
  }

  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new Error("User not found");
      }

      const isValidPassword = user.comparePassword(req.body.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      //login
      req.session.user = {
        _id: user._id,
        email: user.email
      }

      res.redirect('/')

    } catch (e) {
      res.render("pages/auth/login", {
        form: req.body,
        errors: true,
      });
    }
  }

  logout(req, res){
    req.session.destroy()
    res.redirect('/')
  }

  showProfile(req, res){
    res.render('pages/auth/profile', {
      form: req.session.user
    })
  }

  async update(req, res){
    const user = await User.findById(req.session.user._id)
    user.email = req.body.email

    if(req.body.password) user.password = req.body.password

    try{
      await user.save()
      req.session.user.email = user.email
      res.redirect('back')
    } catch (e) {
      res.render('pages/auth/profile', {
        errors: e.errors,
        form: req.body
      })
    }
  }
}

module.exports = new UserController();
