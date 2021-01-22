var slide_g, slide_l, slide_t;
var len;
var mouseReady = true;
let time = 0;
var canvas;
let wave = [];
let img;
let initialWidth;
let initialHeight;
let t_multiply = 1;

function preload() {
  fontReg = loadFont('/../../assets/Poppins-Regular.ttf');
}

function setup() {
  canvas = createCanvas(1050, 1100);
  canvas.parent('sketch-holder');
  background('black');

  textFont(fontReg);

  frameRate(40);

  len = 100;
  textAlign(CENTER, CENTER);
  textSize(20);
  rectMode(CENTER);

  slide_g = new Slider(width * 0.5,  850, 10, "g ", 400);
  slide_l = new Slider(width * 0.5,  900, 250, "L ", 700);
  slide_t = new Slider(width * 0.5,  950, 30, "theta max        ", 80);
  slide_tm = new Slider(width * 0.5,  1000, 5, "time ", 10);
}

function draw() {

    if (time == 0) {
      initialWidth = width;
      initialHeight = height;
    }

    // setup drawing
    background(0);

    fill('white');
    noStroke();
    textSize(40);


    noFill();
    stroke('white');
    strokeWeight(2);


    // initilise variables
    let length = slide_l.val;
    let thetaMaxDegrees = slide_t.val;
    let g = slide_g.val;

    let thetaMax = thetaMaxDegrees * PI / 180;
    let theta = thetaMax;
    let timePeriod = 2*PI*sqrt(length/g);


    // translate to fixed point
    translate(0.5*width, 100);

    // calculate theta
    theta = thetaMax*cos(2*PI*time/timePeriod);

    // calculate x and y
    let x = length*sin(theta);
    let y = length*cos(theta);

    // calculate wave
    wave.unshift(x);

    stroke(255, 0, 0);
    noFill();
    beginShape();
    for (let i =0; i<wave.length; i++){
      vertex(wave[i], i+length+10);
    }
    endShape();

    // remove off screen wave
    if (wave.length > 1000){
      wave.pop();
    }

    // create arc
    noFill();
    stroke(169,169,169);
    line(0,0,0,25);
    if (theta > 0 && theta < PI/2)
      {
      arc(0, 0, 50, 50, -theta+(PI/2), PI/2);
      }
    else
      {
      arc(0, 0, 50, 50, PI/2, -theta+(PI/2));
      }

    // draw weight
    stroke('white');
    line(0,0,x,y);
    noStroke();
    fill(255,255,255);
    ellipse(x,y,15);

    fill(255,0,0);
    //ellipse(wave[0],length+10,10);

    // increment time
    t_multiply = slide_tm.val;
    time += t_multiply * 0.025;

    // reset to origin
    translate(-0.5*width, -100);

    stroke('white');
    fill('white');



    textSize(20);
    slide_g.show();
    slide_l.show();
    slide_t.show();
    slide_tm.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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



        text(this.val, this.x + this.len + 30, this.y-4);
        fill('white');
        stroke('white');
        ellipse(this.cx, this.y, this.sz);
    };
};
