let express = require('express');
const articleController = require('../controllers/article.controller');
//const Article = require('../models/article.model');
let router = express.Router();

/* GET home page. */
router.get('/', articleController.list);

router.get('/article/:id', articleController.show);

router.get('/add-article', articleController.add);

router.get('/add-article', articleController.addOne);

module.exports = router;
