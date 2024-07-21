const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const createTemplate = require("./accessories/menu");
const path = require("path");
const { channels } = require("../src/shared/constants");

process.env.NODE_ENV = "development";

const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV === "production" ? false : true;

const template = createTemplate(isMac);

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  window.loadURL(`http://localhost:3000`);
  window.show();

  if (isDev) {
    window.webContents.openDevTools({
      mode: "detach",
    });
  }
};

const products = {
  notebook: {
    name: "notebook",
    price: "2500",
    color: "gray",
    unit: "pound",
  },
  headphone: {
    name: "headphone",
    price: "700",
    color: "black",
  },
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on(channels.GET_DATA, (event, arg) => {
  const { product } = arg;
  event.sender.send(channels.GET_DATA, products[product]);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
