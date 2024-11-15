// Configuration variables for the grid
const MIN_GRID_SIZE = 50; // Minimum size of each grid cell in pixels
const MAX_GRID_SIZE = 50; // Maximum size of each grid cell in pixels
const ANIMATION_DURATION = 2000; // Duration of the square's visibility in milliseconds
const PADDING = 0; // Padding between squares in pixels
const BORDER_ONLY = false; // If true, only draw the border of the div

/**
 * Creates a square div at the mouse position and fades it out
 * @param {number} x - The x-coordinate of the mouse
 * @param {number} y - The y-coordinate of the mouse
 */
export function createSquareAtMouse(x, y) {
    // Generate a random grid size within the configured range
    const GRID_SIZE = Math.floor(Math.random() * (MAX_GRID_SIZE - MIN_GRID_SIZE + 1)) + MIN_GRID_SIZE;

    // Calculate the grid cell position
    const cellX = Math.floor(x / (GRID_SIZE + PADDING)) * (GRID_SIZE + PADDING);
    const cellY = Math.floor(y / (GRID_SIZE + PADDING)) * (GRID_SIZE + PADDING);

    // Check if a square already exists at this position
    const existingSquare = document.querySelector(`div[data-x="${cellX}"][data-y="${cellY}"]`);
    if (existingSquare) {
        return; // If a square already exists, don't create a new one
    }

    // Create the square div
    const square = document.createElement('div');
    square.style.position = 'absolute';
    square.style.left = `${cellX}px`;
    square.style.top = `${cellY}px`;
    square.style.width = `${GRID_SIZE}px`;
    square.style.height = `${GRID_SIZE}px`;
    square.style.mixBlendMode = 'difference'; // This will invert the colors underneath
    square.style.pointerEvents = 'none'; // Ensure it doesn't interfere with other elements
    square.style.transition = 'all ' + ANIMATION_DURATION / 1000 + 's ease-out'; // Add transition for fading effect
    square.style.filter = 'blur(0px)';
    //square.style.borderRadius = '40px';
    square.dataset.x = cellX; // Add data attributes to identify the square's position
    square.dataset.y = cellY;

    if (BORDER_ONLY) {
        square.style.border = '3px solid rgba(255, 255, 255, 0.8)'; // Blue border with 80% opacity
        square.style.backgroundColor = 'transparent'; // Transparent background
    } else {
        square.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // Use blue with 80% opacity
    }

    // Add the square to the document
    document.body.appendChild(square);

    // Start the fading effect after a short delay
    setTimeout(() => {
        square.style.opacity = '0';
        square.style.filter = 'blur(20px)';
    }, 50);

    // Remove the square after the animation completes
    setTimeout(() => {
        document.body.removeChild(square);
    }, ANIMATION_DURATION);
}
