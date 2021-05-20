const express = require ('express');
const router = express.Router();
const multer = require ('../middleware/multer-config')
const PublicationController = require('../controllers/publication');
const auth = require ('../middleware/auth')

router.get('/' ,auth, PublicationController.getAllPublication);
router.post('/',auth, multer ,PublicationController.createNewPublication);
router.put('/:id' ,auth, PublicationController.modifyPublication);
router.delete('/:id',auth, PublicationController.deletePublication);
router.get('/:id',auth, PublicationController.getOnePublication);


module.exports = router;