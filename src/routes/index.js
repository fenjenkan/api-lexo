const express = require('express');
const controller  = require('../controllers/client.controller.js')
const router = express.Router();



router
    .get('/empresa', controller.index)
    .get('/departamento', controller.index)
    .get('/empleado', controller.index)
    .get('/departamento/:id', controller.show)
    .get('/empleado/:id', controller.show)
    .post('/empresa', controller.store)
    .post('/departamento', controller.store)
    .post('/empleado', controller.store)
    .put('/:id', controller.update)
    .put('/empleado/:id', controller.update)
    .put('/departamento/:id', controller.update)
    .delete('/:id',controller.destroy)



module.exports = router;