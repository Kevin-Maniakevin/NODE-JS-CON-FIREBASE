const express = require('express');
const {addSpot,getAllSpots,getSpot,updateSpot,deleteSpot} = require('../controllers/spotsController')

const router = express.Router();

router.post('/spot', addSpot);
router.get('/spots', getAllSpots);
router.get('/spot/:id', getSpot);


//router.put('/spot/:id', updateSpot);
router.delete('/spot/:id', deleteSpot)

module.exports = {
    routes: router
}