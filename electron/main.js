const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { channels } = require("../src/shared/constants");
const createTemplate = require("./accessories/menu");
const path = require("path");
const os = require("os");
// const imagemin = require("imagemin");
// const imageminMozjpeg = require("imagemin-mozjpeg");
// const imageminPngquant = require("imagemin-pngquant");

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

ipcMain.on("image:minimize", (e, options) => {
  console.log(options);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
