const { Router } = require('express');
const wordController = require('./controllers/wordController');
// const languageController = require('./controllers/languageController');

const router = Router();

//languages
// router.get('/languages', languageController.findAll);
// router.get('/languages/:id', languageController.findOne);
// router.post('/languages/save', languageController.save);
// router.delete('/languages/:id', languageController.deleteLanguage);

//words
router.get('/words', wordController.findAll);
router.get('/words/:id', wordController.findOne);
router.post('/words/save', wordController.save);
router.delete('/words/:word', wordController.deleteWord);




module.exports = router;
