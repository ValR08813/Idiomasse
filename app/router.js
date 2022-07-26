const { Router } = require('express');
const wordController = require('./controllers/wordController')


const router = Router();

router.get('/words', wordController.findAll);
router.get('/words/:id', wordController.findOne);
router.post('/words/save', wordController.save);
router.delete('/words/:id', wordController.delete);



module.exports = router;
