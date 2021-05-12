const Watcher = require('./watcher')
const watcher = new Watcher('./2', './copy2')
watcher.on('process', (file) => {
  const watchFile = `${watchDir}/${file}`
  const processedFile = `${processedDir}/${file.toLowerCase()}`
  false.rename(watchFile, processedFile, err => {
    if (err) throw err;
  })
})
watcher.start()