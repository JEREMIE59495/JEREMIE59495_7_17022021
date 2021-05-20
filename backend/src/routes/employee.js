const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth')

const employeeController = require('../controllers/employee');

router.get('/',auth ,employeeController.getEmployeeList);
router.get('/:id',auth , employeeController.getOneEmployee);
router.post('/', auth, employeeController.createNewEmployee);
router.put('/:id', employeeController.modifyEmployee);
router.delete('/:id',auth, employeeController.deleteEmployee);

module.exports = router;