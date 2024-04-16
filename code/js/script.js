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

// Array to store the placed walls
let placedWalls = [];

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

// Function to draw all placed walls
function drawPlacedWalls() {
    placedWalls.forEach(wall => {
        PlaceWall(wall.x, wall.y, wall);
    });
}

// Initial draw of the grid
drawGrid();

// Clear and redraw the Grid and the walls
function UpdateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawPlacedWalls();
}

// Clear the Grid and delete all the walls
function ClearAll() {
    placedWalls = [];
    UpdateCanvas();
}

// Variable to store the position of the mouse cursor
let mouseX = 0;
let mouseY = 0;

// Function to draw the ghost wall
function drawGhostWall(x, y, wall) {
    // Calculate the position to draw the ghost wall
    const drawX = Math.floor(x / cellSize) * cellSize;
    const drawY = Math.floor(y / cellSize) * cellSize;

    // Draw the ghost wall based on its type and dimensions
    ctx.save(); // Save the current drawing state
    ctx.globalAlpha = .8; // Set the transparency
    ctx.strokeStyle = 'lime';
    ctx.lineWidth = 4; // Thin line for the wall
    ctx.beginPath();
    ctx.moveTo(drawX, drawY + cellSize);
    ctx.lineTo(drawX + wall.length / 10, drawY + cellSize);
    ctx.stroke();
    ctx.restore(); // Restore the previous drawing state
}

// Event listener for tracking mouse movement on the canvas
canvas.addEventListener('mousemove', function (event) {
    mouseX = event.offsetX; // Update mouseX with the x-coordinate of the mouse
    mouseY = event.offsetY; // Update mouseY with the y-coordinate of the mouse

    // Redraw the canvas to clear any previous ghost walls and draw the grid
    UpdateCanvas();

    // If a wall is selected, draw the ghost wall at the current mouse position
    if (selectedWall) {
        drawGhostWall(mouseX, mouseY, selectedWall);
    }
});

// Event handler for placing the wall on the grid
canvas.addEventListener('click', function (event) {
    if (selectedWall) {
        const x = Math.floor(event.offsetX / cellSize); // Calculate the grid cell x-coordinate
        const y = Math.floor(event.offsetY / cellSize); // Calculate the grid cell y-coordinate

        // Place the wall at the clicked position
        PlaceWall(x, y, selectedWall);
        placedWalls.push({ x, y, selectedWall });
    }
});

// Function to place the wall on the grid
function PlaceWall(x, y, wall) {
    // Calculate the position to draw the wall, snapping it to the grid lines
    const drawX = x * cellSize;
    const drawY = y * cellSize + cellSize / 2;

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