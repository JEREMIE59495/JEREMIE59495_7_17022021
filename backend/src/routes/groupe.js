const express = require ('express');
const router = express.Router();
const auth = require ('../middleware/auth')
const groupeController = require('../controllers/groupe');

router.get('/', auth, groupeController.getAllGroupe);
router.post('/', groupeController.createNewGroupe);
router.delete('/:id',auth, groupeController.deleteGroupe);

module.exports = router;