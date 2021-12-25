const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productControllerV2 = require('./controller');

router.post('/product/', upload.single('image'), productControllerV2.addProduct);
router.get('/product/', productControllerV2.getAll);
router.get('/product/:id', productControllerV2.getById);
router.put('/product/:id', upload.single('image'), productControllerV2.updateById);
router.delete('/product/:id', productControllerV2.deleteById);

module.exports = router;