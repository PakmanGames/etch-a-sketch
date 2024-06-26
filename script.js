const grid = document.querySelector(".grid");
const input = document.querySelector(".input");
input.value = 16;

setGrid(input.value);

function setGrid(size) {
    for (let i = 0; i < size*size; i++) {
        let tile = document.createElement("div");
        tile.style.height = `${700 / size - 2}px`
        tile.style.width = `${700 / size - 2}px`
        tile.className = "tile";
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = "black";
        })

        grid.appendChild(tile);
    }
}