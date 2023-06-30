// External Inputs
const express = require('express');
const router = express.Router();

// Internal Inputs

const { getSiteMap } = require('../controllers/user.controller');

router.get('/sitemap.xml', getSiteMap);

module.exports = router;
