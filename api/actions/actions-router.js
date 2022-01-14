// Write your "actions" router here!
const express = require('express')
const router = express.Router();
const Actions = require('./actions-model')

// [GET] /api/actions
router.get('/', (req, res, next) => {
    Actions.get()
        .then(something => {
            res.json(something)
        })
        .catch(next)
})

// [GET] /api/actions/:id
router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(maybeAnId => {
            if(!maybeAnId) {
                res.status(404).json({
                    message: 'id does not exist'
                })
            } else {
                res.json(maybeAnId)
            }
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

router.put('/:id', (req, res, next) => {
    const {id} = req.params
    Actions.update(id, req.body)
        .then(updatedActions => {
            res.json(updatedActions)
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    Actions.remove(req.params.id)
        .then(deletedActions => {
            res.json(deletedActions)
        })
        .catch(next)
})

module.exports = router;