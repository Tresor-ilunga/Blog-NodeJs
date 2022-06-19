const Article = require('../models/article.model');
const Category = require('../models/category.model');

exports.list = (req, res)=>{
    // Récupération des articles
    Article.find()
        .then((articles)=>{
            res.render('index', { title: 'Express', articles: articles })
        })
        .catch((err)=>{
            res.status(200).json(err);
        });
}

exports.show = (req, res)=>{
    Article.findOne({_id: req.params.id})
        .then((article)=>{
            res.render('single-article',{article: article})
        })
        .catch((err)=>{
            res.redirect('/');
        });
}

exports.add = (req, res)=>{
    Category.find()
        .then((categories)=>{
            res.render('add-article', {categories: categories});
        })
        .catch(()=>{
            res.redirect('/');
        });
}

exports.addOne = (req, res)=>{
    let article = new Article({
        ...req.body,
        publishedAt: Date.now()
    });
    article.save((err, article)=>{
        if (err)
        {
            Category.find()
                .then((categories)=>{
                    res.render('add-article', {categories: categories,error: "Désolé, une erreur s'est produite. Merci de réessayer plus tard"});
                })
                .catch(()=>{
                    res.redirect('/');
                });
        }
        else {
            Category.find()
                .then((categories)=>{
                    res.render('add-article', {categories: categories,success: "Merci, votre article a été ajouté"});
                })
                .catch(()=>{
                    res.redirect('/');
                });
        }
    })
        /*.then(()=>{
            res.render('add-article', {success: "Merci, votre article a été ajouté"})
        })
        .catch(()=>{
            res.render('add-article', {error: "Désolé, une erreur s'est produite. Merci de réessayer plus tard"})
        });*/
}