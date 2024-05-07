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

//

