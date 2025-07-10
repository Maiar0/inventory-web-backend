const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const uniqueName = `${base}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    console.log('Received file with MIME type:', file.mimetype); 

    const allowed = ['image/jpeg', 'image/png', 'image/gif'];

    if (allowed.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
});

module.exports = upload;
