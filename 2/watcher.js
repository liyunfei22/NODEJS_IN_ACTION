const fs = require('fs')
const events = require('events')
class Watcher extends events.EventEmitter {
  constructor(watchDir, processeDir) {
    super();
    this.watchDir = watchDir;
    this.processeDir = processeDir
  }
  watch () {
    fs.readFile(this.watchDir, (err, files) => {
      if (err) throw err;
      for(var index in files) {
        this.emit('process', files(index))
      }
    })
  }
  start() {
    fs.watchFile(this.watchDir, () => {
      this.watch()
    })
  }
}
module.exports = Watcher