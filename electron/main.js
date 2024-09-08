import { app, BrowserWindow, ipcMain, Menu, shell } from "electron";
import channels from "../src/shared/constants.js";
import createTemplate from "./accessories/menu.js";
import path from "path";
import os from "os";
import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import slash from "slash";

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

const shrinkImage = async ({ imgPath, quality, dest }) => {
  try {
    const pngQuality = quality / 100;
    const files = await imagemin([slash(imgPath)], {
      destination: dest,
      plugins: [
        imageminMozjpeg({ quality }),
        imageminPngquant({
          quality: [pngQuality, pngQuality],
        }),
      ],
    });

    console.log(files);

    shell.openItem(dest);
  } catch {}
};

ipcMain.on(channels.GET_DATA, (event, arg) => {
  const { product } = arg;
  event.sender.send(channels.GET_DATA, products[product]);
});

ipcMain.on("image:minimize", (e, options) => {
  options.dest = path.join(os.homedir(), "imageshrink");
  shrinkImage(options);
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// jdlasjldjadj
