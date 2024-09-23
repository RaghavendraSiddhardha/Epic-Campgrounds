const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const Review = require('../models/review.js')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware.js')
const campgrounds = require('../controllers/campgrounds.js')
const multer = require('multer')
const {storage} = require('../cloudinary/index.js')
const upload = multer({storage})


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampground))

router.post('/search',isLoggedIn,async (req,res)=>{
    const f = req.body.search; 
    const regex = new RegExp(`.*${f}.*`, 'i');
    const campgrounds = await Campground.find({ "title": { $regex: regex } });
    console.log(campgrounds)
    res.render('campgrounds/search',{campgrounds,f})
})

router.get('/new',isLoggedIn,campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,upload.array('image'),validateCampground,catchAsync(campgrounds.editCampground))
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm))

module.exports = router