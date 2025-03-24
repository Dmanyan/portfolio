// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/7XDlpPnGQ/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let pg;
let x, y, w, h;
let full;
let low;
let uc;
let fafeng;
let previousLabel = "";
// Load the model first
function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
    full = loadImage('full.jpg');
    () => console.error("Failed to load full.png");
  }
  

function setup() {
  low = loadImage('low.jpg');
  fafeng = loadSound('fafeng.mp3');
  // Create the canvas and set its parent
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('.top-iframe')); // Attach it to the correct container
  
  // Create the video capture
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
  uc = loadFont('uc.otf');
  w = 100;
  h = 100;
  x = video.width - w;
  y = 0;
  pg = createGraphics(w, h);
  uc = loadFont('uc.otf');
}

function draw() {
  background(0);
  image(flippedVideo, 0, 0);

  // Copy the desired section to the graphics buffer
  pg.copy(flippedVideo, x, y, w, h, 0, 0, w, h);

  // Apply pixelation effect
  let pixelSize = 10;
  pg.loadPixels();
  for (let i = 0; i < pg.width; i += pixelSize) {
    for (let j = 0; j < pg.height; j += pixelSize) {
      let index = (i + j * pg.width) * 4;
      let r = pg.pixels[index];
      let g = pg.pixels[index + 1];
      let b = pg.pixels[index + 2];
      pg.fill(r, g, b);
      pg.noStroke();
      pg.rect(i, j, pixelSize, pixelSize);
    }
  }
    if (label === "happy") {
      fafeng.stop();
  } else if (label === "sad") {
    y= random(windowHeight)
    x=random(windowWidth)
    if (label === "sad" && previousLabel !== "sad") {
      if (!fafeng.isPlaying()) {
        fafeng.play();
      }
    }
      image(pg, random(windowWidth), random(windowHeight));
     textSize(70);
     textFont(uc);
    fill(random(255),0,0);
      text('COME UP CHEER UP!!!', width / 2, height/2);
  
  } 
  pg.updatePixels();

  // Draw the pixelated section on the main canvas

  // image(pg, width - w, 0);
  previousLabel = label;


  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  // Additional visual feedback based on the label
  if (label === "happy") {
    image(full, windowWidth -300, 25,200,100)
  } else if (label === "sad") {
   image(low, windowWidth -300, 25,200,100)
  } else {
    fill(random(255), random(255), random(255));
    textSize(30);
    text('Come in the Cam!!!', width / 2, 25);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  // Classify again!
  classifyVideo();
}
