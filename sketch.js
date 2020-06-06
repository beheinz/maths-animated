let angleDegrees = 0;
var canvas;
var slide_x, slide_y, slide_t;
var len;
var mouseReady = true;
let mouse_in_x = 0;
let mouse_in_y = 0;
let b_x = 100;
let b_y = 30;
let auto_rotate = 1;

function preload() {
  fontReg = loadFont('CharterITC-Regu.otf');
  img = loadImage('assets/matrix.png');
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  textFont(fontReg);
  imageMode(CENTER);
  frameRate(40);

  len = 100;
  textAlign(CENTER, CENTER);
  textSize(20);
  rectMode(CENTER);

  slide_x = new Slider(width * 0.2, height * 0.5 - 50, 50, "X ", 0.35*height);
  slide_y = new Slider(width * 0.2, height * 0.5 + 0, 50, "Y ", 0.35*height);
  slide_t = new Slider(width * 0.2, height * 0.5 + 50, 30, "θ ", 360);
}

function draw() {
  // black background
  background(0);

  fill('white');
  noStroke();
  textSize(40);
  text('2D Matrix Rotations', 0.5*width, height*0.06);

  image(img, width*0.2, height*0.3, width*0.22, width*0.22*0.1921708);

  stroke('white');
  strokeWeight(2);
  noFill();



  // draw axis
  stroke(255);
  noFill();
  strokeWeight(3);

  let centerX = width/2;
  let centerY = height/2;
  let size = 0.35*height;

  line(centerX-size, centerY, centerX+size, centerY);
  line(centerX, centerY-size, centerX, centerY+size);




  // draw squares
  translate(centerX, centerY);

  let squareX = slide_x.val;
  let squareY = -slide_y.val;


  let angle = 0;
  if (auto_rotate == 0){
    angle = slide_t.val * PI / 180;
  } else {
    angle = angleDegrees * PI / 180;
  }

  stroke(0, 0, 255);
  strokeWeight(3);
  square(squareX, squareY, 0.02*width);

  let squareRotatedX = (cos(angle)*squareX) - (sin(angle)*squareY);
  let squareRotatedY = (sin(angle)*squareX) + (cos(angle)*squareY);

  stroke(255, 0, 0);

  translate(squareRotatedX, squareRotatedY);
  rotate(angle);
  square(0, 0, 0.02*width);
  rotate(-angle);
  translate(-squareRotatedX, -squareRotatedY);

  translate(-centerX, -centerY);


  // button
  let b_center_x = width*0.2;
  let b_center_y = height*0.5+0.5*width*0.34*0.39863;

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

  textSize(20);
  if ((mouse_in_x && mouse_in_y) || auto_rotate==1) {
    fill('white');
    stroke('white');
    rect(b_center_x, b_center_y, b_x, b_y);
    fill('black');
    noStroke();
    text('Rotate', b_center_x, b_center_y-3);
  } else {
    fill('black');
    stroke('white');
    rect(b_center_x, b_center_y, b_x, b_y);
    fill('white');
    noStroke();
    text('Rotate', b_center_x, b_center_y-3); }

  // set cursor if in either button
  if (mouse_in_x && mouse_in_y) {
    cursor(HAND);
  } else {
    cursor('https://s3.amazonaws.com/mupublicdata/cursor.cur');
  }

  stroke('white');
  fill('white');
  strokeWeight(2);
  textSize(20);
  slide_x.show();
  slide_y.show();
  if (auto_rotate == 0){
    // hide slider
    slide_t.show();

  }else{
    // increment time
    if (angleDegrees < 360){
      angleDegrees += 1;
    }else{
      angleDegrees = 0 ;
    }
  }
}

function mouseReleased(){
  if (mouse_in_x && mouse_in_y) {
    if (auto_rotate == 1){
      auto_rotate = 0;
    } else {
      auto_rotate = 1;
    }
  }
}

var Slider = function(x, y, val, sym, max) {
    this.x = x;
    this.y = y;
    this.val = constrain(val, 0, max);
    this.sym = sym;
    this.max = max;
    this.cx = map(this.val, 0, max, x - len, x + len);
    this.sz = 16;
    this.len = len;
    this.drag = false;

    this.inCir = function() {
        if (mouseIsPressed) {
            if (mouseReady) {
                if (mouseX < this.cx + (this.sz/2) && mouseX > this.cx - (this.sz/2)) {
                    if (mouseY < this.y + (this.sz/2) && mouseY > this.y - (this.sz/2)) {
                        this.drag = true;
                        mouseReady = false;
                    }
                }
            }
        } else {
            this.drag = false;
            mouseReady = true;
        }
    };

    this.show = function() {
        this.inCir();
        if (this.drag) {
            this.cx = constrain(mouseX, this.x - this.len, this.x + this.len);
        }
        this.val = round(map(this.cx, this.x - this.len, this.x + this.len, 0, this.max));


        stroke('white');
        line(this.x - this.len, this.y, this.x + this.len, this.y);
        fill('white');
        noStroke();
        text(this.sym, this.x - this.len - 36, this.y-4);



        text(this.val, this.x + this.len + 10, this.y-4);
        fill('black');
        stroke('white');
        ellipse(this.cx, this.y, this.sz);
    };
};
