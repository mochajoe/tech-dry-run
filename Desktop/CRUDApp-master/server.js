const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const MongoClient = require('mongodb').MongoClient
const {MongoClient} = require('mongodb')

app.set('view engine','ejs');
app.use(express.static('public'))
app.use(bodyParser.json())



var db;
MongoClient.connect('mongodb://joe:joejoe@ds131312.mlab.com:31312/starwars-quotes', (err,database) => {
if (err) {
  return console.log(err)
};
db = database;
app.listen(3000, () => {
	console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req,res) => {
	db.collection('quotes').find().toArray((err,results) => {
    if (err) {
      return console.log(err)
    }
      res.render('index.ejs', {quotes:results})
  })
})

app.post('/quotes', (req,res) => {
	db.collection('quotes').save(req.body, (err,results) => {
    if (err){return console.log(err)}
      console.log('saved to database')
      res.redirect('/')
  })
});

app.put('/quotes',(req,res) => {
  db.collection('quotes')
  .findOneAndUpdate({name:'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort:{_id:-1},
    upsert:true
  }, (err, result) => {
    if (err) return res.send(err)
      res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete({name: req.body.name},
  (err, result) => {
    if (err) return res.send(500, err)
    res.send({message: 'A darth vadar quote got deleted'})
  })
})