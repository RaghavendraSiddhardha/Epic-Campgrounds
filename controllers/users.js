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
            req.flash('success',`Welcome to EpicCampgrounds ${req.user.username}`)
            res.redirect('/campgrounds')
        })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
}

module.exports.addLogin = (req, res) => {
    req.flash('success', `Welcome back! ${req.user.username}`);
    res.redirect('/campgrounds');
}

module.exports.renderLogin = async (req,res)=>{
    res.render('users/login')
}

module.exports.renderLogout = (req, res, next) => {
    const username = req.user.username
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', `Goodbye ${username}!`);
        res.redirect('/campgrounds');
    });
}