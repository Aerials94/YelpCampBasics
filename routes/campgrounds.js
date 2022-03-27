const express = require('express');
const router = express.Router();
const multer = require('multer');

const {storage} = require('../cloudinary');
const upload = multer({ storage });

const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../utils/middleware');
const campgrounds = require('../controllers/campgrounds');

router.route('/')
        .get(catchAsync(campgrounds.index))
        .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
        // .post(upload.array('image'),(req, res) => {
        //         console.log(req.body, req.files)
        //         res.send("it worked")
                
        // })
router.get('/new', isLoggedIn, campgrounds.newForm);

router.route('/:id')
        .get(catchAsync(campgrounds.showCampground))
        .put(isLoggedIn, isAuthor , upload.array('image') , validateCampground , catchAsync(campgrounds.updateCampground))
        .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor , catchAsync(campgrounds.editForm))

module.exports = router;
