const express = require('express');
const app = express();
var path = require('path');
const pug = require('pug');
const compiledFunction = pug.compileFile('template.pug');


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/assets", express.static(path.join(__dirname, 'assets')));
app.get('/signin', function (req, res) {
    res.send(pug.renderFile('template.pug', {
        activePage: 'signin'
    }));
})

app.post('/signedin/', (req, res) => {
    var mail_client = req.body.signin.mail_client;
    var pass_client = req.body.signin.pass_client;
    if (mail_client && pass_client) {
        connection.query('SELECT * FROM clients WHERE mail_client = ? AND pass_client = ?', [mail_client, pass_client], function(error, results, fields) {
        if (results.length > 0) {
            request.session.loggedin = true;
            request.session.mail_client = mail_client;
            response.redirect('/accueil');
        } else {
            response.send('Incorrect mail and/or Password!');
        }			
        response.end();
        });
    } else {
        response.send('Please enter mail and Password!');
        response.end();
    }
});

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