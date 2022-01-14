const express = require('express');
const server = express();
const ProjectsRouter = require('./projects/projects-router');
const ActionsRouter = require('./actions/actions-router')

server.use(express.json());

server.use('/api/projects', ProjectsRouter);
server.use('/api/actions', ActionsRouter);


server.get('/', (req, res) => {
    res.send(`
    <h1> Sprint Challenge 1 </h1>
    `)
});

//to handle any invalid endpoints
server.use('*', (req, res) => {
    res.status(404).json({
        message: `[${req.method}] ${req.baseUrl} not found!`
    })
});

// error middelware
server.use((err, req, res, next) => {
    console.log('YO! something went wrong really bad!')
    res.status(err.status || 500).json({
        message: 'this is the super bad path',
        error: err.message
    })
});

module.exports = server;
