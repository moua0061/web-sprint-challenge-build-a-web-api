const Actions = require('./actions-model');

function actionIdIsValid(req, res, next) {
    //returns a valid id
    Actions.get(req.params.id)
        .then(id => {
            if(!id) {
                next({
                    status: 404,
                    message: 'id does not exist'
                })
            } else {
                next()
            }
        })
        .catch(next)
}

module.exports = actionIdIsValid;
