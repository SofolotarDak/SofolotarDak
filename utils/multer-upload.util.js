// External Inputs
const multer = require('multer');
const path = require('path');

// renaming the uploaded file and defind it's storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Uploads');
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;
        cb(null, fileName + fileExt);
    },
});

// prepare the multer upload object
const upload = multer({
    storage,
    limits: {
        fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'storyimage') {
            try {
                const fileExt = path.extname(file.originalname);
                const allowedExtensions = ['.png', '.jpg'];
                const maxSize = 1 * 1024 * 1024; // 1MB

                if (
                    allowedExtensions.includes(fileExt) &&
                    file.size <= maxSize
                ) {
                    cb(null, true);
                } else {
                    throw new Error(
                        'ক্রুটিপূর্ণ ছবি। শুধুমাত্র PNG, JPG, JPEG, এবং GIF এক্সটেনশন যুক্ত ছবি আপলোড করতে পারবেন এবং এর সাইজ সর্বোচ্চ 1MB পর্যন্ত হতে হবে।'
                    );
                }
            } catch (error) {
                cb(error);
            }
        }
    },
});

module.exports = upload;
