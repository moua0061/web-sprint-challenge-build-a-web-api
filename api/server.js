const express = require('express');
const server = express();
const ProjectsRouter = require('./projects/projects-router');

server.use('/api/projects', ProjectsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h1> Sprint Challenge 1 </h1>
    `)
});

server.use('*', (req, res) => {
    res.status(404).json({
        message: `[${req.method}] ${req.baseUrl} not found!`
    })
});

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
