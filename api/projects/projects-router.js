const express = require('express');
const Projects = require('./projects-model');
//import middleware here
const { idIsValid } = require('./projects-middleware');

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
router.get('/:id', idIsValid, (req, res, next) => {
    Projects.get(req.params.id)
        .then(maybeAnId => {
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

//[PUT] /api/projects/:id
router.put('/:id', idIsValid, (req, res, next) => {
    const { id } = req.params
    const { name, description, completed } = req.body
    if(!name || !description || completed === undefined) {
        res.status(400).json({
            message: 'required name, description, and completed texts field'
        })
    } else {
        Projects.update(id, req.body)
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
    }
})

//[DELETE] /api/projects/:id
router.delete('/:id', idIsValid, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(removedProject => {
            res.json(removedProject)
        })
        .catch(next)
})

//[GET] /api/projects/:id/actions
router.get('/:id/actions', idIsValid, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(gettingActions => {
            res.json(gettingActions)
        })
        .catch(next)
})

module.exports = router;
