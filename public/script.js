const { join } = require("path");
const { homedir } = require("os");
const { ipcRenderer } = require("electron");

document.getElementById("output-path").innerText = join(
  homedir(),
  "imageshrink"
);

const form = document.getElementById("image-form");
const slider = document.getElementById("slider");
const img = document.getElementById("img");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const imagePath = img.files[0].path;
  const quality = slider.value;

  ipcRenderer.send("image:minimize", {
    imagePath,
    quality,
  });
});
