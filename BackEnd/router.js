const express = require('express');
const  router = express.Router();
const controller = require('./controllers/controller')

router.post('/insertCustomer',controller.insertCustomer)

router.get('/selectCustomers',controller.selectCustomers)

router.post('/selectCustomerById/:id',controller.selectCustomerById)

router.post('/updateCustomer',controller.updateCustomer)

router.post('/deleteCustomer/:id',controller.deleteCustomer)

module.exports = router