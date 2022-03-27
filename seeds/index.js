const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const {places, descriptors} = require('./helpers');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser : true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array)=> array[Math.floor(Math.random()* array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random()* 1000);
        const price = Math.floor(Math.random()*20)+10;
        const randomCamp = new Campground({
            author: '623b741bd2363dc530cd10f4',
            geometry:{ 
            type: "Point",
            coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude
            ]},
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: '*Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam laboriosam est veritatis eos rem repellat dolorum quibusdam quaerat, beatae repudiandae asperiores ipsam illum. Perferendis ipsum rerum provident deleniti illum animi?',
            price,
            images:[
                {
                    url: 'https://images.unsplash.com/photo-1542176281-363d7e8c1c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                    filename: 'dummy1'
                },
                {
                    url: 'https://images.unsplash.com/photo-1464069668014-99e9cd4abf16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
                    filename: 'dummy2'
                },
                {
                    url: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
                    filename: 'dummy3'
                }
            ]
        })
        await randomCamp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
    console.log('connection closed')
})

