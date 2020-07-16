const express = require('express');
const router = express.Router();

const LogEntry = require('../data-models/logEntry');

router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error){
        console.log(error.name);
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    
    try {

        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        
        res.json(createdEntry);
    } catch (error){
        
        console.log(error.name);
        
        if (error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;  