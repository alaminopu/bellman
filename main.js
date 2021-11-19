const { app, BrowserWindow } = require("electron");

// running the backend server
require("./index");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("ui/index.html");
};

app.whenReady().then(() => {
  createWindow();
});
