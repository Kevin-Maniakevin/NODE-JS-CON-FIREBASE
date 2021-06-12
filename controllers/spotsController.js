'use strict';

const firebase = require ('../db');
const Spot = require('../models/spots');
const firestore = firebase.firestore();


const addSpot = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('spots').doc().set(data);
        res.send('Record saved successfuly')
    }catch(error){
        res.status(400).send(error.message);
    }
}

const getAllSpots = async (req, res,next) =>{
    try {
        const spots = await firestore.collection('spots');
        const data = await spots.get();
        const spotsArray = [];
        if(data.empty){
            res.status(404).send('No spots found');
        }else{
            data.forEach(doc => {
                const spot = new Spot(
                    doc.id,
                    doc.data().spottitle,
                    doc.data().spotsubtitle
                );
                spotsArray.push(spot);
            });
            res.send(spotsArray);
        }
    } catch (error) {
        res.status(400).send(error.message)   
    }
}

const getSpot = async (req, res, next) => {
    try {
        const id = req.params.id;
        const spot = await firestore.collection('spots').doc(id);
        const data = await spot.get();
        if(!data.exists){
            res.status(404).send('Spots with the given ID not found');
        }else{
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message)  
    }
}

const updateSpot = async (req, res, next) =>{
    try {
        const id = req.params.id;
        const data = req.body;
        const spot = await firestore.collection('spots').doc(id);
        await spot.update(data);
        res.send("Spot record updated successfuly");
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const deleteSpot = async (req,res,next) =>{
    try {
        const id = req.params.id;
        await firestore.collection('spots').doc(id).delete()
        res.send("Spot record deleted successfuly");
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports = {
    addSpot,
    getAllSpots,
    getSpot,
    updateSpot,
    deleteSpot
}