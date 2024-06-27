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

function setGrid(size) {
    grid.replaceChildren();
    for (let i = 0; i < size*size; i++) {
        let tile = document.createElement("div");
        tile.style.height = `${600 / size - 2}px`
        tile.style.width = `${600 / size - 2}px`
        tile.className = "tile";
        tile.addEventListener("mouseover", () => {
            const opacity = tile.style.backgroundColor.substring(14, tile.style.backgroundColor.length - 1);
            if (tool === "greyscale") {
                if (opacity != "1") {
                    tile.style.backgroundColor = `rgba(0, 0, 0, ${Number(opacity) + 0.1})`;
                }
            } else if (tool === "eraser") {
                tile.style.backgroundColor = `rgba(0, 0, 0, ${0})`;
            } else if (tool === "rgb") {
                // placeholder
            } else if (tool === "pastel") {
                // placeholder
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