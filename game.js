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

// load images for worm and sad face
const wormImage = new Image();
wormImage.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmPn5sKKGL9pDv4qmTfe4HEvf37exJchnRAo8ygjKbhmNd";

const sadFaceImage = new Image();
sadFaceImage.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmfZHhYKx6D2zgkfyXKpvPwRPxR9yaeyBbtFNP6jRt9xfb";


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

// event listeners for 'Yes' and 'No' buttons on modal
document.getElementById("yesButton").addEventListener("click", function() {
    // check for worms at new position
    checkForWorms(robinX, robinY);
    // close the modal
    closeModal();
});

document.getElementById("noButton").addEventListener("click", function() {
    // close the modal
    closeModal();
});

// Event listeners for directional buttons
document.getElementById("upButton").addEventListener("click", function() {
    moveRobin(0, -1); // Move up (decrease y coordinate)
});

document.getElementById("downButton").addEventListener("click", function() {
    moveRobin(0, 1); // Move down (increase y coordinate)
});

document.getElementById("leftButton").addEventListener("click", function() {
    moveRobin(-1, 0); // Move left (decrease x coordinate)
});

document.getElementById("rightButton").addEventListener("click", function() {
    moveRobin(1, 0); // Move right (increase x coordinate)
});

// Event listener for claim button with function call to EarlyBird.sol claimWorms
document.getElementById("claimButton").addEventListener("click", async function() {
    try {
        // call claimWorms on EarlyBird contract
        const contractAddress = "0x9AfE69F67958F2186864D98D1fEe3ca3D880004D";
        const contractAbi = [[ { "inputs": [ { "internalType": "uint256", "name": "totalWormsFound", "type": "uint256" } ], "name": "claimWorms", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_tokenContractAddress", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "worms", "type": "uint256" } ], "name": "WormsClaimed", "type": "event" }, { "inputs": [], "name": "tokenContractAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ]];
        const provider = new ethers.providers.JsonRpcProvider(); // Replace this with your Ethereum provider
        const signer = provider.getSigner(); // Replace this with your signer object

        const earlyBirdContract = new ethers.Contract(contractAddress, contractAbi, signer);

        // Call the claimWorms function on the EarlyBird contract
        await earlyBirdContract.claimWorms(totalWormsFound);
       // assign className show to toast div
        claimButton.className = "show";
        // after 3 seconds, remove className show from toast div
        setTimeout(function(){ claimButton.className = claimButton.className.replace("show", "");}, 3000);

        // Reset totalWormsFound to zero
        totalWormsFound = 0;

        // Optionally, you can add UI updates here to indicate that worms have been claimed
    } catch (error) {
        // Handle error
        console.error("Error: claim unsuccessful", error);
        // Optionally, you can display an error message to the user
    }
});


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

function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
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

        // Clear canvas and redraw background
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(background, 0, 0);

        // Draw robin at new position
        drawRobin();

        // slight delay to allow robin to draw before prompt displays
        setTimeout(function () {
            // ask user if they want to check for worms
            openModal();
        }, 100); //can adjust delay time in milliseconds here
    }
}

// draws a worm above the robin if worm is found
function drawWorm() {
    ctx.drawImage(wormImage, robinX, robinY - 50, 50, 50);
}
// draws a sad face above the robin if no worm is found
function drawSadFace() {
    ctx.drawImage(sadFaceImage, robinX, robinY - 50, 50, 50); 
}


function checkForWorms(x, y) {
    console.log(`Checking for worms at position (${x}, ${y})`);
    // serves as a flag variable to indicate if a worm is found
    let wormFound = false;
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
            // set flag to true since worm is found
            wormFound = true;
            drawWorm();
            // exit loop since can only collect one worm per move
            break;
        } 
    }
    // if no worm is found
    if (!wormFound) {
        drawSadFace();
    }
}


function drawRobin() {
    //load the robin image
    const robinImg = new Image();
    robinImg.src = "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmaKqEGonantGEUkEQszqoS5v6Yy3VBwZJ7f5hjHSiYCr5"

    // once image is loaded, draw it at the current position
    robinImg.onload = function () {
        ctx.drawImage(robinImg, robinX, robinY, 50, 50);
    };
    //use for testing to see coordinates of current robin position
    //console.log(robinX, robinY)
}

function updateUI() {
    // update UI element to display player's total worms found
    document.getElementById('worms-found').innerText = totalWormsFound
}





