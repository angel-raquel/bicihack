const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer  = require('multer');
const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'user-avatars',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(undefined, 'avatar');
  }
});
const parser = multer({ storage: storage });
const secure = require('../middleware/security.middleware');

router.get('/:id', secure.isMyProfile, userController.profile);
router.get('/edit/:id', secure.isMyProfile, userController.edit);
router.post('/edit/:id', [secure.isMyProfile, parser.single('avatar')], userController.doEdit);


module.exports = router;
