//Global selections and variables
const colorDivs = document.querySelectorAll(".color");
const generateButton = document.querySelector(".generate");
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll(".color h2");
let initialColors;

//Functions

//Color Generator
function generateHex() {
  return chroma.random();
}

function randomColors() {
  colorDivs.forEach((div, index) => {
    const hexText = div.children[0];
    const randomColor = generateHex();

    //Add the color to the background
    div.style.background = randomColor;

    //Change the h2 text to the appropriate color hex
    hexText.innerText = randomColor;
  });
}

randomColors();
