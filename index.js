const express = require('express');
const app = express();
var path = require('path');
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/assets", express.static(path.join(__dirname, 'assets')));
app.get('/accueil', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'accueil'
    }));
})

app.get('/signin', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'signin'
    }));
})

app.get('/signup', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'signup'
    }));
})

app.get('/addbien', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'addbien'
    }));
})

app.get('/bien', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'bien'
    }));
})

app.get('/mentions', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'mentions'
    }));
})

app.get('/contact', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'contact'
    }));
})

app.post('/search/', (req, res) => {
    res.send(pug.renderFile('template.pug', {
        activePage: 'search',
        searchDept: req.body.search.dept,
        searchTypeBien: req.body.search.typeBien,
        searchTypeAchat: req.body.search.typeAchat,
        searchVille: req.body.search.ville
    }));
})


app.listen(3000, function () {
    console.log('App listening on port 3000!')
})

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'projet_transv'
    }
});
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
tableName: 'client',
posts: function() {
    return this.hasMany(Posts);
}
});

var Posts = bookshelf.Model.extend({
    tableName: 'messages',
    tags: function() {
        return this.belongsToMany(Tag);
    }
});

var Tag = bookshelf.Model.extend({
    tableName: 'tags'
})

//User.where('id_client', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
//    console.log(user.related('posts').toJSON());
//}).catch(function(err) {
//    console.error(err);
//});