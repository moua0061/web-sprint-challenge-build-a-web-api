// Write your "actions" router here!
const express = require('express')
const router = express.Router();
const Actions = require('./actions-model')
const actionIdIsValid = require('./actions-middlware');

// [GET] /api/actions
router.get('/', (req, res, next) => {
    Actions.get()
        .then(something => {
            res.json(something)
        })
        .catch(next)
})

// [GET] /api/actions/:id
router.get('/:id', actionIdIsValid, (req, res, next) => {
    Actions.get(req.params.id)
        .then(maybeAnId => {
            res.json(maybeAnId)
        })
        .catch(next)
})

// [POST] /api/actions
router.post('/', (req, res, next) => {
    const {notes, description, project_id} = req.body
        if(!notes || !description || !project_id) {
            res.status(400).json({
                message: 'required text fields'
            })
        } else {
            Actions.insert(req.body)
                .then(newAction => {
                    res.json(newAction)
                })
                .catch(next)
        }
})

router.put('/:id', actionIdIsValid, (req, res, next) => {
    const {id} = req.params
    const { notes, description, project_id, completed } = req.body
    const actions = Actions.get(id)
        if(!actions) {
            res.status(404).json({
                message: 'id does not exist'
            })
        } else if( !notes || !description || !project_id || !completed){
            res.status(400).json({
                message: ' notes, description, project id and completed required text fields'
            })
        } else {
            Actions.update(id, req.body)
                .then(updatedActions => {
                    res.json(updatedActions)
            })
                .catch(next)   
        }
})

router.delete('/:id', actionIdIsValid, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(deletedActions => {
            if(!deletedActions) {
                res.status(404).json({
                    message: 'id does not exist'
                })
            } else {
                res.json(deletedActions)
            }
        })
        .catch(next)
})

module.exports = router;