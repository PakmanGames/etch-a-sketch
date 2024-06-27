const grid = document.querySelector(".grid");
const input = document.querySelector(".input");
const inputText = document.querySelector(".input-text");

input.value = 16;
setGrid(input.value);
inputText.textContent = `x ${input.value}`;

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
            if (opacity != "1") {
                tile.style.backgroundColor = `rgba(0, 0, 0, ${Number(opacity) + 0.1})`;
            }
        });

        grid.appendChild(tile);
    }
}