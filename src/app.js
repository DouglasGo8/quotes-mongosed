const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const body_p = require('body-parser');
const app = express();
const JSON_ = require('circular-json');

const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
var db;
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(`mongodb://${SERVER_HOST}:27017/quotes`, { useNewUrlParser: true }, (err, callback) => {
    if (err) throw err;
    db = callback.db('quotes');
});

app.use(body_p.urlencoded({
    extended: true
}));

app.use(body_p.json());

app.get('/', (req, resp) => {
    resp.setHeader('Content-Type', 'application/json');
    resp.send(JSON_.stringify({ 'msg': 'Liveness Probe' }));
});


app.get('/quote/byId/:id', (req, resp) => {

    // console.log(req.params.id);



    db.collection('quotes').findOne({ '_id': new ObjectId(req.params.id) },
        (err, doc) => {
            resp.setHeader('Content-Type', 'application/json');
            resp.send(JSON_.stringify(doc));
        });

});

app.get('/quote/all', (req, resp) => {

    db.collection('quotes').find().toArray((err, docs) => {
        resp.setHeader('Content-Type', 'application/json');
        resp.send(JSON_.stringify(docs));
    });
});

app.post('/quote/save', (req, resp) => {

    let json = req.body;

    db.collection('quotes').insertOne(json, (err, result) => {
        if (err) throw err;
        resp.setHeader('Content-Type', 'application/json');
        resp.send(JSON.stringify({ 'msg': 'Quote Save on db' }));
    });



})

app.listen(10254, () => {
    console.log('listening on 10524');
});