const express = require('express');
const router = express.Router();
const {afilliatesController,ordersController,getDashboard} = require('../controller/index')

const {getNewCode,createNewAfilliate,getAllAfilliates}  = afilliatesController ;
const{processNewOrder,getAllOrdersFromApi}=ordersController

// SENDS NEW CODE FOR REGISTERING USER
router.get("/new_code",getNewCode);

// CREATE NEW AFFILIATE AND STORES IN DB
router.post('/new_user',createNewAfilliate);

// GET ALL AFILLIATES FROM DB
router.get('/all_members',getAllAfilliates);

// GETS ALL ORDERS FROM WOOCOMMERCE API 
router.get('/all_orders', getAllOrdersFromApi);

// GETS DETAILS FOR DASHBOARD AND
router.get('/dashboard',getDashboard);

// NEW ORDERS FROM WOOCOMMERCE API
router.post('/new_order',processNewOrder)




module.exports = router;