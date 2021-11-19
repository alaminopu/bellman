const chokidar = require("chokidar");

const watcherOptions = {
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
};

const watcher = function (path, options, callback) {
  const settings = { ...watcherOptions, ...options };
  chokidar.watch(path, settings).on("all", (event, path) => {
    callback(event, path, new Date());
  });
};

module.exports = watcher;
