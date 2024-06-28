// Grid and Elements for changing size
const grid = document.querySelector(".grid");
const input = document.querySelector(".input");
const inputText = document.querySelector(".input-text");

// Buttons
const clear = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");
const greyscale = document.querySelector(".greyscale");
const rgb = document.querySelector(".rgb");
const custom = document.querySelector(".custom");
const customSelector = document.querySelector(".custom-selector");

// Default values
input.value = 16;
setGrid(input.value);
inputText.textContent = `x ${input.value}`;
let tool = "greyscale";

// Dynamically updates input text and grid size
const updateInput = function() {
    if (!input.validity.valid) {
        if (input.value > 100) {
            input.value = 100;
        } else {
            input.value = 2;
        }
    }
    inputText.textContent = `x ${input.value}`;
    setGrid(input.value);
}

// Event listeners for when user types value or uses input buttons
input.addEventListener("keyup", updateInput);
input.addEventListener("input", updateInput);

// Create random colours for rgb tool
function getRandomColors() {
    return `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
}

// Convert hex value from input to rgb values
function hexToRgb(hex) {
    hex = hex.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
}

// Sets size of grid and creates divs representing the tiles
function setGrid(size) {
    // Removes previous grid
    grid.replaceChildren();

    for (let i = 0; i < size*size; i++) {
        let tile = document.createElement("div");
        tile.style.height = `${600 / size - 2}px`
        tile.style.width = `${600 / size - 2}px`
        tile.className = "tile";

        // Create event listeners for each tile
        tile.addEventListener("mouseover", () => {
            // Opacity value and background-color value
            const opacity = tile.style.backgroundColor.slice(-4).substring(0,3);
            const bgColorCode = tile.style.backgroundColor;

            // Different behaviour based on selected tool
            if (tool === "greyscale") {
                if (opacity != "1" || !tile.classList.contains("greyscale")) {
                    // If tile is fully coloured but is rgb or custom
                    if (bgColorCode.includes("rgb(") && !tile.classList.contains("greyscale")) {
                        tile.style.backgroundColor = `rgb(0, 0, 0)`;
                    } 
                    tile.classList.remove("rgb");
                    tile.classList.remove("custom");
                    tile.style.backgroundColor = `rgba(0, 0, 0, ${Number(opacity) + 0.1})`;
                    tile.classList.add("greyscale");
                }
            } else if (tool === "rgb") {
                if (opacity != "1" && !tile.classList.contains("rgb") || bgColorCode.includes("rgba(")) {
                    // If tile is fully coloured but is grey or custom
                    if (bgColorCode.includes("rgb(") && !tile.classList.contains("rgb")) {
                        tile.style.backgroundColor = `rgb(${getRandomColors()})`;
                    }
                    tile.classList.remove("greyscale");
                    tile.classList.remove("custom");
                    tile.style.backgroundColor = `rgba(${getRandomColors()}, ${Number(opacity) + 0.1})`;
                    tile.classList.add("rgb");
                }
            } else if (tool === "custom") {
                if (opacity != "1" || !tile.classList.contains("custom") || bgColorCode.includes("rgba(")) {
                    // If tile is fully coloured but is grey or rgb
                    if (bgColorCode.includes("rgb(") && !tile.classList.contains("custom")) {
                        tile.style.backgroundColor = `rgb(${hexToRgb(customSelector.value)})`;
                    }
                    tile.classList.remove("greyscale");
                    tile.classList.remove("rgb");
                    tile.style.backgroundColor = `rgba(${hexToRgb(customSelector.value)}, ${Number(opacity) + 0.1})`;
                    tile.classList.add("custom");
                }
            } else if (tool === "eraser") {
                // Change tile to white and reset class names
                tile.style.backgroundColor = `rgba(255, 255, 255, ${0.1})`;
                tile.className = "tile";
            }

            // Once tile is fully coloured in
            if (opacity == "0.9") {
                tile.classList.add("colored");
            }
        });
        grid.appendChild(tile);
    }
}

// Event listener for clear button with confirmation 
clear.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the grid?")) {
        setGrid(input.value);
    }
});

const getCustomColor = function () {
    return custom.value;
}

// Event listeners when user changes custom colour
customSelector.addEventListener("input", getCustomColor, false);
customSelector.addEventListener("change", getCustomColor, false);

// Event listeners for each of the tools
eraser.addEventListener("click", () => tool = "eraser");
greyscale.addEventListener("click", () => tool = "greyscale");
rgb.addEventListener("click", () => tool = "rgb");
custom.addEventListener("click", () => tool = "custom");