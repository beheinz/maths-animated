let angleDegrees = 0;
var canvas;

function setup() {
  canvas = createCanvas(1000, 800);
}

function draw() {
  // black background
  background(0);

  textSize(40);
  text('2D Matrix Rotations', 350, 35);

  stroke('white');
  strokeWeight(2);
  noFill();
  rect(0, 0, width, height);



  // draw axis
  stroke(255);
  noFill();
  strokeWeight(3);

  let centerX = 250
  let centerY = 250
  let size = 200

  line(centerX-size, centerY, centerX+size, centerY);
  line(centerX, centerY-size, centerX, centerY+size);


  // draw squares
  translate(centerX, centerY);

  let squareX = 50;
  let squareY = - 100;
  let angle = angleDegrees * PI / 180;

  stroke(0, 0, 255);
  strokeWeight(3);
  square(squareX, squareY, 50);

  let squareRotatedX = (cos(angle)*squareX) - (sin(angle)*squareY);
  let squareRotatedY = (sin(angle)*squareX) + (cos(angle)*squareY);

  stroke(255, 0, 0);

  translate(squareRotatedX, squareRotatedY);
  rotate(angle);
  square(0, 0, 50);
  rotate(-angle);
  translate(-squareRotatedX, -squareRotatedY);



  // draw circle
  translate(500, 0);

  stroke(255);
  noFill();
  strokeWeight(3);

  let radius = 125;

  ellipse(0, 0, radius*2);

  let x = radius * cos(angle);
  let y = radius * sin(angle);

  fill(255)
  ellipse(x, y, 15)


  // increment time
  if (angleDegrees < 360){
    angleDegrees -= 0.6;
  }else{
    angleDegrees = 0 ;
  }
}
