const Project = require('./projects-model');

function idIsValid(req, res, next) {
    //returns a valid id 
    Project.get(req.params.id)
        .then(something => {
            console.log(something)
            if(!something) {
                res.status(404).json({
                    message: 'user does not exist'
                })
            } else {
                req.user = something
                console.log(something)
                next()
            }
        })
        .catch(err => {
            next(err)
        })
}

function secondMiddlware(req, res, next) {
    //returns a valid body 
}

module.exports = {
    idIsValid,
    secondMiddlware
}