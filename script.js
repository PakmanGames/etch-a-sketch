const grid = document.querySelector(".grid");
const input = document.querySelector(".input");
const inputText = document.querySelector(".input-text");

// Buttons
const clear = document.querySelector(".clear");
const eraser = document.querySelector(".eraser");
const greyscale = document.querySelector(".greyscale");
const rgb = document.querySelector(".rgb");
const pastel = document.querySelector(".pastel");

// Default values
input.value = 16;
setGrid(input.value);
inputText.textContent = `x ${input.value}`;

let tool = "greyscale";

// const setSize = document.querySelector(".set-size");
// setSize.addEventListener("click", () => {
//     if (typeof(input.value) == "Number") {
//         setGrid(input.value);
//     }
// });

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

input.addEventListener("keyup", updateInput);
input.addEventListener("input", updateInput);

function getRandomColors() {
    return `${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}`;
}

function setGrid(size) {
    grid.replaceChildren();
    for (let i = 0; i < size*size; i++) {
        let tile = document.createElement("div");
        tile.style.height = `${600 / size - 2}px`
        tile.style.width = `${600 / size - 2}px`
        tile.className = "tile";

        tile.addEventListener("mouseover", () => {
            const opacity = tile.style.backgroundColor.slice(-4).substring(0,3);
            const bgColorCode = tile.style.backgroundColor;

            const color = tile.style.backgroundColor.substring(5, tile.style.backgroundColor.length - 6);
            // console.log(color);

            if (tool === "greyscale") {
                if (opacity != "1" || !tile.classList.contains("greyscale")) {
                    if (bgColorCode.includes("rgb(") && !tile.classList.contains("greyscale")) {
                        tile.style.backgroundColor = `rgba(0, 0, 0, ${0.1})`;
                        tile.classList.remove("colored");
                    } else if (!tile.classList.contains("greyscale")) {
                        tile.style.backgroundColor = `rgba(0, 0, 0, ${0.1})`;
                    }
                    tile.classList.remove("rgb");
                    tile.style.backgroundColor = `rgba(0, 0, 0, ${Number(opacity) + 0.1})`;
                    tile.classList.add("greyscale");
                }
            } else if (tool === "eraser") {
                tile.style.backgroundColor = `rgba(255, 255, 255, ${0})`;
                tile.className = "tile";
            } else if (tool === "rgb") {
                if (opacity != "1" && !tile.classList.contains("rgb") || bgColorCode.includes("rgba(")) {
                    if (bgColorCode.includes("rgb(") && !tile.classList.contains("rgb")) {
                        tile.style.backgroundColor = `rgba(${getRandomColors()}, ${0.1})`;
                        tile.classList.remove("colored");
                    }
                    tile.classList.remove("greyscale");
                    tile.style.backgroundColor = `rgba(${getRandomColors()}, ${Number(opacity) + 0.1})`;
                    tile.classList.add("rgb");
                }
            }
            if (opacity == "0.9") {
                tile.classList.add("colored");
            }
        });

        grid.appendChild(tile);
    }
}

clear.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the grid?")) {
        setGrid(input.value);
    }
});

eraser.addEventListener("click", () => tool = "eraser");

greyscale.addEventListener("click", () => tool = "greyscale");

rgb.addEventListener("click", () => tool = "rgb");