const User = require('../models/user')

module.exports.renderRegister = (req,res)=>{
    res.render('users/register')
}

module.exports.submitReview = async (req,res)=>{
    try{
        const {email,username,password} = req.body
        const user = new User({email,username})
        const registeredUser = await User.register(user,password)
        req.login(registeredUser,err=>{
            if(err) return next(err)
            req.flash('success','Welcome to EpicCampgrounds')
            res.redirect('/campgrounds')
        })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
}

module.exports.addLogin = (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/campgrounds');
}

module.exports.renderLogin = async (req,res)=>{
    res.render('users/login')
}

module.exports.renderLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}