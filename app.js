require('dotenv').config()

const { application } = require('express');
const Server = require('./Models/server')

const server = new Server();


server.listen();