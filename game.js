const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const background = new Image();
background.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmVMKXtK3HPaVzjxnA7uM7PXsxhf9y9Cd7a9jKbkJ1tYor"
background.onload = function(){
    //draw the background
    ctx.drawImage(background,0,0)
    //draw robin at initial position
    drawRobin();
}

// define intial (x,y) position of robin
let robinX = 0;
let robinY = 0;

// define canvas size
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

//define array to store worm positions
let worms = [];

// define variable to track total worms found
let totalWormsFound = 0;

//function to generate random worm positions
// set your condition check to equal desired # worms 
    // i < 10 = 10 worms vs 1 < 20 = 20 worms, etc
// works similar to random move distance function but
    // multiplies decimal x canvasWidth or canvasHeight to 
    // assign coordinates for worms, then push (x,y) to array
function generateWorms() {
    for (let i = 0; i < 20; i++) { // Generate 20 worms
        // 50 is the pixel increment for moves. change as needed
        const wormX = Math.floor(Math.random() * (canvasWidth / 50)) * 50;
        const wormY = Math.floor(Math.random() * (canvasHeight / 50)) * 50;
        worms.push({ x: wormX, y: wormY }); // Add worm position to the worms array
        console.log(`Generated worm at position (${wormX}, ${wormY})`)
    }
}

// call generateWorms to populate the array of worm positions
generateWorms();

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
    // generate random # of moves btwn 2-6 inclusive
    // how it works: math.random generates decimal btwn 0-1
        // multiply by 5 to get decimal # btwn 0-5
        // math.floor rounds down to nearest integer 0-4
        // add 2 to answer to fit desired 2-6 inclusive range
    const randomMoves = Math.floor(Math.random() * 5) + 2;


    // calculate the new position based on random movement distance
    const newRobinX = robinX + dx * randomMoves *50; 
    const newRobinY = robinY + dy * randomMoves *50; 

    // check if new position in within bounds
    if (newRobinX >= 0 && newRobinX < canvasWidth && newRobinY >= 0 && newRobinY < canvasHeight) {
        // Update robin's position
        robinX = newRobinX;
        robinY = newRobinY;

        // check for worms at new position
        checkForWorms(robinX, robinY);

        // Clear canvas and redraw background
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(background, 0, 0);

        // Draw robin at new position
        drawRobin();
    }
}

function checkForWorms(x, y) {
    console.log(`Checking for worms at position (${x}, ${y})`);
    //for each position in array of worm positions
    for (let i = 0; i < worms.length; i++) {
        // use to test if position being check is expected coordinates
        // console.log(`Checking worm at position (${worms[i].x}, ${worms[i].y})`);
        //check if robin position matches a worm position
        if (x === worms[i].x && y === worms[i].y) {
            console.log("Found a worm!");
            // remove the found worm from the array of worm positions
            worms.splice(i, 1);
            //increment player's total worms found
            totalWormsFound++;
            //update UI to display players total worms found
            updateUI();

            //can add sounds or animation here
            // playWormCollectionSound();
            // showWormCollectionAnimation();

            // exit loop since can only collect one worm per move
            break;
        }
    }
}

function drawRobin() {
    //draw robin at current position
    //TODO replace with my art or image
    ctx.fillStyle = 'red';
    ctx.fillRect(robinX, robinY, 50, 50);
    //use for testing to see coordinates of current robin position
    //console.log(robinX, robinY)
}

function updateUI() {
    // update UI element to display player's total worms found
    document.getElementById('worms-found').innerText = totalWormsFound
}

