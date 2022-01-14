const express = require('express');
const Project = require('./projects-model');
//import middleware here

const router = express.Router();

//GET/api/projects
router.get('/', (req, res, next) => {
    //returns an array of all the resources contained in the DB
})

//import error middelware here
router.use((err, req, res, next) => {
    console.log('YO! something went wrong really bad!')
    res.status(err.status || 500).json({
        message: 'this is the super bad path',
        error: err.message
    })
});

module.exports = router;
