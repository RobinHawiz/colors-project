//Global selections and variables
const saveButton = document.querySelector(".save");
const submitSaveButton = document.querySelector(".submit-save");
const closeSaveButton = document.querySelector(".close-save");
const saveContainer = document.querySelector(".save-container");
const saveInput = document.querySelector(".save-container input");
const libraryContainer = document.querySelector(".library-container");
const libraryButton = document.querySelector(".library");
const closeLibraryButton = document.querySelector(".close-library");
let savedPalettes = [];

//Event listeners
saveButton.addEventListener("click", togglePalette);
closeSaveButton.addEventListener("click", togglePalette);
submitSaveButton.addEventListener("click", savePalette);

libraryButton.addEventListener("click", toggleLibrary);
closeLibraryButton.addEventListener("click", toggleLibrary);

//Functions
function togglePalette(e) {
  const popup = saveContainer.children[0];
  saveContainer.classList.toggle("active");
  popup.classList.toggle("active");
}

function savePalette() {
  togglePalette();
  const name = saveInput.value;
  //removes the previously written input
  saveInput.value = "";
  const colors = [];
  let paletteNr = savedPalettes.length;
  currentHexes.forEach((hex) => {
    colors.push(hex.innerText);
  });
  generateObject(name, colors, paletteNr);
}

function generateObject(name, colors, paletteNr) {
  const paletteObj = { name, colors, nr: paletteNr };
  savedPalettes.push(paletteObj);
  saveToLocalStorage(paletteObj);
  generatePaletteForLibrary(paletteObj);
}

function saveToLocalStorage(paletteObj) {
  let localPalettes;
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    localPalettes = JSON.parse(localStorage.getItem("palettes"));
  }
  localPalettes.push(paletteObj);
  localStorage.setItem("palettes", JSON.stringify(localPalettes));
}

function generatePaletteForLibrary(paletteObj) {
  const palette = document.createElement("div");
  palette.classList.add("custom-palette");
  const title = document.createElement("h4");
  title.innerText = paletteObj.name;
  const preview = document.createElement("div");
  preview.classList.add("small-preview");
  paletteObj.colors.forEach((color) => {
    const smallDiv = document.createElement("div");
    smallDiv.style.background = color;
    preview.appendChild(smallDiv);
  });
  const paletteButton = document.createElement("button");
  paletteButton.classList.add("pick-palette-btn");
  paletteButton.classList.add(paletteObj.nr);
  paletteButton.innerText = "Select";
  paletteButton.addEventListener("click", (e) => {
    toggleLibrary();
    const paletteIndex = e.target.classList[1];
    initialColors = [];
    savedPalettes[paletteIndex].colors.forEach((color, index) => {
      initialColors.push(color);
      colorDivs[index].style.background = color;
      const text = colorDivs[index].children[0];
      updateTextUI(index);
    });
    resetInputs();
  });

  appendToLibrary(palette, title, preview, paletteButton);
}

function appendToLibrary(palette, title, preview, paletteButton) {
  palette.appendChild(title);
  palette.appendChild(preview);
  palette.appendChild(paletteButton);
  libraryContainer.children[0].appendChild(palette);
}

function toggleLibrary() {
  const popup = libraryContainer.children[0];
  libraryContainer.classList.toggle("active");
  popup.classList.toggle("active");
}

function getLocal() {
  if (localStorage.getItem("palettes") === null) {
    localPalettes = [];
  } else {
    const paletteObjects = JSON.parse(localStorage.getItem("palettes"));
    paletteObjects.forEach((paletteObject) => {
      savedPalettes.push(paletteObject);
      generatePaletteForLibrary(paletteObject);
    });
  }
}

getLocal();
