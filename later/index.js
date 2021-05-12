const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;
const articles = [{title: 'example'}];
app.set('port', port)
// app.get('/', (req, res) => {
//   res.send('hello word')
// })
// app.listen(port, () => {
//   console.log(`listen at ${port}`)
// })
app.use(bodyParser.json())
app.use(bodyParser.urlencoded{
  extended: true
})
app.get('/articles', (req, res, next) => {
  res.end(articles)
})
app.post('/artices', (req, res, next) => {
  res.send('OK')
})
app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('Fetching:', id)
  res.send(articles[id])
})
app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('delete', id)
  delete articles[id]
  res.send({
    message: 'delete'
  })
})
app.listen(app.get('port'), () => {
  console.log(`listen at ${port}`)
})