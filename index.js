const { WebSocketServer } = require("ws");
const watcher = require("./src/watcher");
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  let folderPath = ".";
  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);
    if (data.folderPath) {
      folderPath = data.folderPath;
      watcher(folderPath, {}, function (event, path, date) {
        const data = {
          event: event,
          path: path,
          date: date,
        };
        ws.send(JSON.stringify(data));
      });
    }
  });
});
