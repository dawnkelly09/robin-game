const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmVMKXtK3HPaVzjxnA7uM7PXsxhf9y9Cd7a9jKbkJ1tYor"
background.onload = function(){
    ctx.drawImage(background,0,0)
}

// define intial (x,y) position of robin
let robinX = 300;
let robinY = 300;

// define canvas size
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// define arrow key codes (ASCII key codes)
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

// event listener for arrow key presses
document.addEventListener('keydown', handleKeyDown);

// function to respond to arrow key presses 
function handleKeyDown(event) {
    switch(event.keyCode) {
        case ARROW_LEFT:
            moveRobin(-1, 0);
            break;
        case ARROW_UP:
            moveRobin(0, -1);
            break;
        case ARROW_RIGHT:
            moveRobin(1, 0);
            break;
        case ARROW_DOWN:
            moveRobin(0, 1);
            break;
    }
}

function moveRobin(dx, dy) {
    // calculate the new position
    const newRobinX = robinX + dx *50; //move 50 px at a time
    const newRobinY = robinY + dy *50 

    // check if new position in within bounds
    if (newRobinX >= 0 && newRobinX < canvasWidth && newRobinY >= 0 && newRobinY < canvasHeight) {
        // Update robin's position
        robinX = newRobinX;
        robinY = newRobinY;

        // Clear canvas and redraw background
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(background, 0, 0);

        // Draw robin at new position
        drawRobin();
    }
}

function drawRobin() {
    //draw robin at current position
    //TODO replace with my art or image
    ctx.fillStyle = 'red';
    ctx.fillRect(robinX, robinY, 50, 50);
}

