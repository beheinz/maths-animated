let nCircles;
let circleSize;
let circleGap;
let barHeight;
let barWidth;
var canvas;

function preload() {
  fontReg = loadFont('/../../assets/Poppins-Regular.ttf');
}

function setup() {
  canvas = createCanvas(1050, 1300);
  canvas.parent('sketch-holder');
  background('black');

  textFont(fontReg);

  frameRate(40);
  imageMode(CENTER);
  len = 100;
  textAlign(CENTER, CENTER);
  textSize(20);

  slideCircleSize = new Slider(width * 0.5, height * 0.5 + 25, 250, "r ", 300, 150);
  slideNoCircles = new Slider(width * 0.5, height * 0.5-25, 50, "dx ", 75, 1);
}

function draw() {


    // setup drawing
    background(0);

    fill('white');
    noStroke();
    textSize(40);



    translate(0.5*width, 0.25*height);
    noStroke();
    fill(255,0,0);

    circleGap = slideNoCircles.val;
    circleSize = 2*slideCircleSize.val;
    nCircles = floor(circleSize / circleGap);

    for (let i=nCircles+0; i>0; i--)
    {
      fill(35+(i/nCircles)*220,0,0);
      ellipse(0,0,circleGap*i);
    }
    translate(-0.5*width, -0.25*height);



    translate(0.5*width, 0.72*height);
    let totalArea = 0;
    noStroke();
    for (let i=0; i<nCircles; i++)
    {
      fill(255-(i/nCircles)*220+35,0,0);
      barHeight = 0.25*(circleSize-((i)*circleGap))*PI;
      barWidth = 0.5*circleGap;
      rect(-0.5*circleGap*i+150,0.2*height-barHeight,barWidth,barHeight);
      totalArea = totalArea + barWidth*barHeight;
      print(barWidth*barHeight);
    }
    stroke(169,169,169);
    //line(-0.5*circleGap*0+150,0.1*height,-0.5*circleGap*(nCircles)+150,0.1*height);
    //line(-0.5*circleGap*0+150,0.1*height,-0.5*circleGap*0+150,0.1*height-(circleSize+(0*circleGap))*PI*0.25);
    //line(-0.5*circleGap*(nCircles+0)+150,0.1*height,-0.5*circleGap*0+150,(0.1*height-(circleSize+(0*circleGap))*PI*0.25));
    translate(-0.5*width, -0.72*height);



    stroke('white');


    textSize(20);
    noStroke();
    fill('white');
    text("Area = "  + round(4*totalArea,0) + " = " + round(100*16*totalArea/(PI*circleSize*circleSize),1) + "% of the actual area", 0.5*width, 0.95*height);

    slideCircleSize.show();
    slideNoCircles.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

var Slider = function(x, y, val, sym, max, min) {
    this.x = x;
    this.y = y;
    this.val = constrain(val, 0, max);
    this.sym = sym;
    this.max = max;
    this.min = min;
    this.cx = map(this.val, min, max, x - len, x + len);
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
        this.val = round(map(this.cx, this.x - this.len, this.x + this.len, this.min, this.max));


        stroke('white');
        line(this.x - this.len, this.y, this.x + this.len, this.y);
        fill('white');
        noStroke();
        text(this.sym, this.x - this.len - 36, this.y-4);



        text(this.val, this.x + this.len + 10, this.y-4);
        fill(255,255,255);
        stroke('white');
        ellipse(this.cx, this.y, this.sz);
    };
};
