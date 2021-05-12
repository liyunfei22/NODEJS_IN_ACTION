const http = require('http')
const fs = require('fs')
http.createServer((req, res) => {
  if (req.url == '/') {
    fs.readFile('./titles.json', function(err, data) {
      if (err) {
        console.log(err);
        res.end('service error')
      } else {
        console.log(data)
        console.log(data.toString())
       const titles = JSON.parse(data.toString())
       fs.readFile('./template.html', (err, data) => {
         if (err) {
            console.log(err);
            res.end('service error')
         } else {
           console.log(data)
           const tmpl = data.toString();
           const html = tmpl.replace('%', titles.join('</li><li>'));
           res.writeHead(200, {
             'Content-Type': 'text/html'
           })
           res.end(html)
         }
       })
      }
    })
  }
}).listen(3333, function() {
  console.log('....')
})