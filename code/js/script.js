// Get the canvas element
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

// Set the size of each grid cell and the number of rows and columns
const cellSize = 50;
const numRows = 10;
const numCols = 10;

let Wall = function (length, price) {
    this.length = length;
    this.height = 2000;
    this.width = 40;
    this.price = price;
    this.surface = this.length * this.height;
}

// Set the canvas size based on the grid size
canvas.width = cellSize * numCols;
canvas.height = cellSize * numRows;

let selectedWall = null;

// Function to draw the grid
function drawGrid() {
    // Draw horizontal grid lines
    for (let i = 0; i <= numRows; i++) {
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }

    // Draw vertical grid lines
    for (let j = 0; j <= numCols; j++) {
        ctx.beginPath();
        ctx.moveTo(j * cellSize, 0);
        ctx.lineTo(j * cellSize, canvas.height);
        ctx.stroke();
    }
}

// Clear the Grid
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
}

// Event handler for placing the wall on the grid
canvas.addEventListener('click', function (event) {
    if (selectedWall) {
        const x = Math.floor(event.offsetX / cellSize); // Calculate the grid cell x-coordinate
        const y = Math.floor(event.offsetY / cellSize); // Calculate the grid cell y-coordinate

        // Place the wall at the clicked position
        PlaceWall(x, y, selectedWall);
    }
});

// Function to place the wall on the grid
function PlaceWall(x, y, wall) {
    // Calculate the grid cell coordinates
    const gridX = Math.floor(x / cellSize);
    const gridY = Math.floor(y / cellSize);

    // Calculate the position to draw the wall, snapping it to the grid lines
    const drawX = gridX * wall.length / 10;
    const drawY = gridY * cellSize + cellSize / 2;

    // Draw the wall based on its type and dimensions
    ctx.strokeStyle = 'cyan';
    ctx.lineWidth = 4; // Thin line for the wall
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + cellSize / 2);
    ctx.lineTo(drawX + wall.length / 10, drawY + cellSize / 2);
    ctx.stroke();
}

// Function to handle button clicks and select the wall
function SelectWall(wall) {
    selectedWall = wall;
}

// Event handler for dynamically placing walls based on mouse movement
canvas.addEventListener('mousemove', function (event) {
    if (selectedWall) {
        const x = Math.floor(event.offsetX / cellSize); // Calculate the grid cell x-coordinate
        const y = Math.floor(event.offsetY / cellSize); // Calculate the grid cell y-coordinate

        // Place the wall at the mouse position
        PlaceWall(x, y, selectedWall);
    }
});

// Initial draw of the grid
drawGrid();