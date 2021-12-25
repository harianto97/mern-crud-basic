const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productControllerV1 = require('./controller');

router.post('/product/', upload.single('image'), productControllerV1.addProduct);
router.get('/product/', productControllerV1.getAll);
router.get('/product/:id', productControllerV1.getById);
router.put('/product/:id', upload.single('image'), productControllerV1.updateById);
router.delete('/product/:id', productControllerV1.deleteById);

module.exports = router;
