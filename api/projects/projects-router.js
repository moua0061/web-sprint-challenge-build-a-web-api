const express = require('express');
const Projects = require('./projects-model');
//import middleware here
const { idIsValid, secondMiddlware } = require('./projects-middleware');

const router = express.Router();

//[GET] /api/projects
router.get('/', (req, res, next) => {
    //returns an array of all the resources contained in the DB
    Projects.get()
        .then(something =>{
            res.json(something)
        })
        .catch(next)
})

//[GET] /api/projects/:id
router.get('/:id', (req, res, next) => {
    Projects.get(req.params.id)
        .then(maybeAnId => {
            // console.log(maybeAnId)
            res.json(maybeAnId)
        })
        .catch(next)
})

//[POST] /api/projects
router.post('/', (req, res, next) => {
    const { name, description } = req.body
    if(!name || !description) {
        res.status(400).json({
            message: "Missing name or body fields"
        })
    } else {
        Projects.insert(req.body)
            .then(newProject => {
                res.status(201).json(newProject)
            })
            .catch(next)
    }
})



module.exports = router;
