const http = require('http')
const fs = require('fs')
const { title } = require('process')
http.createServer((req, res) => {
  getTitle(res)
}).listen(3333, () => {
  console.log('listen 3333')
})
function getTitle(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) {
      hadError(err, res)
    } else {
      getTemplate(JSON.parse(data.toString()), res)
    }
  })
}
function getTemplate (titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      hadError(err, res)
    } else {
      formateTemplate(titles, data.toString(), res)
    }
  })
}
function formateTemplate(titles, tmpl, res) {
  const html = tmpl.replace('%', titles.join('</li><li></li>'))
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.end(html)
}
function hadError(err, res) {
  console.log(err);
  res.end('server error')
}