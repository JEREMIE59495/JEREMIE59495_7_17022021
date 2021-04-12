const express = require ('express');
const router = express.Router();
const multer = require ('../middleware/multer-config')
const PublicationController = require('../controllers/publication');

router.get('/', PublicationController.getAllPublication);
router.post('/', multer ,PublicationController.createNewPublication);
router.put('/:id', PublicationController.modifyPublication);
router.delete('/:id', PublicationController.deletePublication);
router.get('/:id', PublicationController.getOnePublication);


module.exports = router;