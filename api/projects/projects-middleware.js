const Projects = require('./projects-model');

function idIsValid(req, res, next) {
    //returns a valid id
    Projects.get(req.params.id)
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


module.exports = idIsValid;