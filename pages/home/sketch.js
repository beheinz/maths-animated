let time_in_b = 0;
let time = 0;
let angleDegrees = 90;
let mouse_in_x = 0;
let mouse_in_y = 0;
let mouse_in_x_full = 0;
let mouse_in_y_full = 0;
let x_distance = 0;
let y_distance = 0;
let b_x = 180;
let b_y = 50;
let b_x_full = 180;
let b_y_full = 50;

function preload() {
  fontReg = loadFont('/../../assets/CharterITC-Regu.otf');
  img = loadImage('/../../assets/start.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(fontReg);
  imageMode(CENTER);
  rectMode(CENTER, CENTER);
  frameRate(40);
}

function draw() {

  background('black');

  textAlign(CENTER, CENTER);
  fill('white');
  image(img, width*0.5, height*0.4, width*0.4, width*0.4*0.39863);
  stroke('white');
  noFill();

  //button

  let b_center_x = width*0.44;
  let b_center_y = height*0.5+0.5*width*0.32*0.39863;
  let b_center_x_full = width*0.56;
  let b_center_y_full = height*0.5+0.5*width*0.32*0.39863;

  if (mouseX > b_center_x - 0.5*b_x && mouseX < b_center_x + 0.5*b_x){
    mouse_in_x = 1;
  } else {
    mouse_in_x = 0;
  }

  if (mouseY > b_center_y - 0.5*b_y && mouseY < b_center_y + 0.5*b_y){
    mouse_in_y = 1;
  } else {
    mouse_in_y = 0;
  }

  if (mouseX > b_center_x_full - 0.5*b_x && mouseX < b_center_x_full + 0.5*b_x){
    mouse_in_x_full = 1;
  } else {
    mouse_in_x_full = 0;
  }

  if (mouseY > b_center_y_full - 0.5*b_y && mouseY < b_center_y_full + 0.5*b_y){
    mouse_in_y_full = 1;
  } else {
    mouse_in_y_full = 0;
  }

  // draw explore button
  textSize(24);
  if (mouse_in_x && mouse_in_y) {
    fill('white');
    stroke('white');
    rect(b_center_x, b_center_y, b_x, b_y);
    fill('black');
    noStroke();
    text('Explore', b_center_x, b_center_y-3);
  } else {
    fill('black');
    stroke('white');
    rect(b_center_x, b_center_y, b_x, b_y);
    fill('white');
    noStroke();
    text('Explore', b_center_x, b_center_y-3); }

  // draw git button
  textSize(24);
  if (mouse_in_x_full && mouse_in_y_full) {
    fill('white');
    stroke('white');
    rect(b_center_x_full, b_center_y_full, b_x_full, b_y_full);
    fill('black');
    noStroke();
    text('About', b_center_x_full, b_center_y_full-3);
  } else {
    fill('black');
    stroke('white');
    rect(b_center_x_full, b_center_y_full, b_x_full, b_y_full);
    fill('white');
    noStroke();
    text('About', b_center_x_full, b_center_y_full-3); }

  // set cursor if in either button
  if ((mouse_in_x_full && mouse_in_y_full) || (mouse_in_x && mouse_in_y)) {
    cursor(HAND);
  } else {
    cursor('https://s3.amazonaws.com/mupublicdata/cursor.cur');
  }

  // calculate square speed
  x_distance = abs(mouseX - b_center_x)/width;
  y_distance = abs((mouseY - b_center_y)/height);

  // draw square
  let angle = angleDegrees * PI / 180;
  fill(100+155*(y_distance+x_distance),0,0);
  strokeWeight(3);
  noStroke();
  translate(0.5*width, 0.5*height);
  ellipse(-0.3*width*cos(angle), -0.35*height*sin(angle), 50);
  translate(-0.5*width, -0.5*height);
  print((y_distance+x_distance));
  // increment time
  if (angleDegrees < 360){
    if (1/(y_distance+x_distance) < 15) {
      angleDegrees += ((1/(y_distance+x_distance)));
    }else{
      angleDegrees += 15;
    }
  }else{
    angleDegrees = 0 ;
  }
}

function mousePressed(){
  if (mouse_in_x && mouse_in_y) {
    window.open("shm.html", "_self");
  }
  if (mouse_in_x_full && mouse_in_y_full) {
    window.open("about.html", "_self");
    //var elem = document.documentElement;
    //elem.mozRequestFullScreen();
  }
}
