const grid = document.querySelector(".grid");

function setGrid(size) {
    for (let i = 0; i < size*size; i++) {
        let tile = document.createElement("div");
        tile.style.height = `${700 / size - 2}px`
        tile.style.width = `${700 / size - 2}px`
        tile.className = "tile";
        grid.appendChild(tile);
    }
}

setGrid(16);