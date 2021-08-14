const express = require('express');
const router = express.Router();

//IMPORT MODELI
//const Department = require('../models/department.model');

//IMPORT CONTROLLERÓW/METOD
const DepartmentController = require('../controllers/departments.controller');

//ENDPOINTY Z CONTROLLERAMI
router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getOne);
router.post('/departments', DepartmentController.create);
router.put('/departments/:id', DepartmentController.changeOne);
router.delete('/departments/:id', DepartmentController.deleteOne);

module.exports = router;