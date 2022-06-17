const mongoose = require('mongoose');
const articleSchema = mongoose.Schema({
    title: String,
    content: String,
    image: String,
    category: String,
    publishedAt: Date
});

module.exports = mongoose.model('Article', articleSchema);