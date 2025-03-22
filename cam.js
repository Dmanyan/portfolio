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

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  // Create the canvas and set its parent
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('.top-iframe')); // Ensure this selector matches your HTML structure

  // Create the video capture
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  // Additional visual feedback based on the label
  if (label === "happy") {
    fill(0, 255, 0);
    rect(width / 2 - 30, 20, 60, 25);
  } else if (label === "sad") {
    fill(225, 0, 0);
    rect(width / 2 - 30, 20, 60, 25);
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
