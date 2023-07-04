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
        fileSize: 2 * 1024 * 1024, // 2MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'storyimage') {
            try {
                const fileExt = path.extname(file.originalname);
                const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
                const maxSize = 2 * 1024 * 1024; // 1MB

                if (
                    allowedExtensions.includes(fileExt) &&
                    file.size <= maxSize
                ) {
                    cb(null, true);
                } else {
                    throw new Error(
                        'অবৈধ ফাইল. শুধুমাত্র PNG, JPG, JPEG, এবং GIF এক্সটেনশন যুক্ত ছবি আপলোড করতে পারবেন এবং এর সাইজ সর্বোচ্চ 2MB পর্যন্ত হতে হবে।'
                    );
                }
            } catch (error) {
                cb(
                    new Error(
                        'ছবি আপলোড করার সময় অভ্যন্তরীণ ত্রুটি ঘটেছে, আবার চেষ্টা করুন।' +
                            error.message
                    )
                );
            }
        }
    },
});

module.exports = upload;
