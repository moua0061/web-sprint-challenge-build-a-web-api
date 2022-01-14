const express = require('express');
const Projects = require('./projects-model');
//import middleware here
// const { idIsValid, secondMiddlware } = require('./projects-middleware');

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

//[PUT] /api/projects/:id
router.put('/:id', (req, res, next) => {
    const { id } = req.params
    Projects.update(id, req.body)
        .then(updatedProject => {
            res.json(updatedProject)
        })
        .catch(next)
})

//[DELETE] /api/projects/:id
router.delete('/:id', (req, res, next) => {
    Projects.remove(req.params.id)
        .then(removedProject => {
            if(!removedProject) {
                res.status(404).json({
                    message: `project id ${removedProject} does not exist`
                })
            }
            res.json(removedProject)
        })
        .catch(next)
})

//[GET] /api/projects/:id/actions
router.get('/:id/actions', (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(gettingActions => {
            res.json(gettingActions)
        })
        .catch(next)
})

module.exports = router;
