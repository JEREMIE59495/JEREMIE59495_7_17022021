const express = require ('express');
const router = express.Router();


const employeeController = require('../controllers/employee');

router.get('/', employeeController.getEmployeeList);
router.get('/:id', employeeController.getOneEmployee);
router.post('/',employeeController.createNewEmployee);
router.put('/:id',employeeController.modifyEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;