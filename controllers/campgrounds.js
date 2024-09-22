const Campground = require('../models/campground')
const Review = require('../models/review')
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;



module.exports.index = async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index',{campgrounds})
}

module.exports.renderNewForm = (req,res)=>{
    return res.render('campgrounds/new')
}

module.exports.createCampground = async (req,res,next)=>{
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.features[0].geometry;
    campground.images = req.files.map(f=>({url: f.path,filename: f.filename}))
    campground.author = req.user._id
    await campground.save()
    req.flash('success','Successfully made Campground')
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.showCampground = async (req,res)=>{
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate:{
            path:'author'
        }
    }).populate('author')
    if(!campground){
        req.flash('error','No campground found') 
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show',{campground})
}

module.exports.renderEditForm = async (req,res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground){
        req.flash('error','No campground found') 
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit',{campground})
}

module.exports.editCampground = async(req,res)=>{
    const {id} = req.params
    const camp = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    camp.geometry = geoData.features[0].geometry;
    const images = req.files.map(f=>({url: f.path,filename: f.filename}))
    camp.images.push(...images)
    await camp.save()
    req.flash('success','Successfully Edited Campground')
    res.redirect(`/campgrounds/${id}`)
}

module.exports.deleteCampground = async(req,res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    await Review.deleteMany({_id:{$in: campground.reviews}})
    await Campground.findByIdAndDelete(id)
    req.flash('success','Successfully Deleted Campground')
    res.redirect('/campgrounds')
}