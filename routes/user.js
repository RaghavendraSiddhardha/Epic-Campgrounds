const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const passport = require('passport')
// const storeReturnTo  = require('../middleware');
const users = require('../controllers/users')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.submitReview))

router.route('/login')
    .get(catchAsync(users.renderLogin))
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),users.addLogin)

router.get('/logout', users.renderLogout);
    

module.exports = router

// router.post('/login',
//     // use the storeReturnTo middleware to save the returnTo value from session to res.locals
//     storeReturnTo,
//     // passport.authenticate logs the user in and clears req.session
//     passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),
//     // Now we can use res.locals.returnTo to redirect the user after login
//     (req, res) => {
//         req.flash('success', 'Welcome back!');
//         const redirectUrl = res.locals.returnTo ? res.locals.returnTo: '/campgrounds'; // update this line to use res.locals.returnTo now
//         res.redirect(redirectUrl);
// });
