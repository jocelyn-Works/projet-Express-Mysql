const router = require('express').Router();
const path = require('path');
const restaurantRoute = require('./restaurant.routes');
const { home } = require("../controllers/home.controller");



router.use('/restaurant', restaurantRoute);

// req => requete //  res => response
router.get('/', home)
 


module.exports = router; // exporter les routes