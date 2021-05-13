const express = require('express')
const bodyParser = require('body-parser');
const { json } = require('express');
const app = express()
const port = process.env.PORT || 3004;
const Articel = require('./db').Article
const read = require('node-readability')

app.set('port', port)
// app.get('/', (req, res) => {
//   res.send('hello word')
// })
// app.listen(port, () => {
//   console.log(`listen at ${port}`)
// })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.get('/articles', (req, res, next) => {
  Articel.all((err, articles) => {
    if (err) return next(err);
    res.format({
      html: () => {
        res.render('articles.ejs', {articles: articles})
      },
      json: () => {
        res.send(articles);
      }
    })
  })
})
app.post('/artices', (req, res, next) => {
  const url = req.body.url;
  read(url, (err, results) => {
    if (err || !results) res.status(500).send('error')
    Articel.create({
      title: results.title, content: results.content
    }, (err, article) => {
      if (err) return next(err);
      console.log(article);
      res.send('OK');
    })
  })
})
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Articel.find(id, (err, articvle) => {
    if (err) return next(err)
    res.format({
      html: () => {
        res.render('article.ejs', {article: articvle})
      },
      json: () => {
        res.send(articvle);
      }
    })
  })
})
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  Articel.delete(id, (err) => {
    if (err) return next(err)
  })
})
app.listen(app.get('port'), () => {
  console.log(`listen at ${port}`)
})