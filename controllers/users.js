const User = require('../models/user');

module.exports.registerForm = (req, res)=> {
    res.render('register');
}

async(req, res, next)=>{
    try {
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err)
                return next(err);
                req.flash('success', 'Welcome to YelpCamp!');
                res.redirect('/campgrounds');
        }) 
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.registerUser = async(req, res, next)=>{
    try {
        const { email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err)
                return next(err);
                req.flash('success', 'Welcome to YelpCamp!');
                res.redirect('/campgrounds');
        }) 
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.loginForm = async(req, res)=>{
    res.render('login');

}

module.exports.login = (req, res)=> {
    req.flash('success', 'Welcome back!');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }

module.exports.logout = (req, res)=> {
    req.logout();
    req.flash('success', 'Goodbye!');
    res.redirect('/campgrounds')
}