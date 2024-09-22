const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places,descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp_camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"))
db.once("open",()=>{
    console.log("Database Connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)] 

const seedDb = async () => {
    await Campground.deleteMany({})
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*160)
        const c = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
            title:  `${sample(descriptors)} ${sample(places)}`,
            author: '66e95aaec7a7e5077fd608d2',
            images: [
                {
                    url: 'https://res.cloudinary.com/dqxxiowce/image/upload/v1726679031/YelpCamp/lv77k4ywsj9uafdg2sl8.jpg',
                    filename: 'YelpCamp/lv77k4ywsj9uafdg2sl8',
                },
                {
                    url: 'https://res.cloudinary.com/dqxxiowce/image/upload/v1726679031/YelpCamp/rflvlexscqb51z25hkwb.jpg',
                    filename: 'YelpCamp/rflvlexscqb51z25hkwb',
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].lng,cities[random1000].lat]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci cupiditate fuga, molestiae reiciendis consectetur reprehenderit maiores vitae atque aperiam, odio, sed dolorum. Dolor, nulla minus. Aperiam voluptatibus eius deserunt? A.",
            price: Math.floor(Math.random()*2000)+100
        })
        await c.save()
    }
}

seedDb().then(()=>{
    mongoose.connection.close();
})