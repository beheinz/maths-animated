
var values = [];
var xWidth = 1050;
var yWidth = 700;
var canvas;
let input;
var latest_equation = "x^2";
var xCentre = 525;
var yCentre = 350;
var minX = -0.5*xWidth;
var maxX = 0.5*xWidth;
var minY = -0.5*yWidth;
var maxY = 0.5*yWidth;
var step = 1;
var len = 100;

function preload() {
  fontReg = loadFont('/../../assets/Poppins-Regular.ttf');
}

function setup() {
  textFont(fontReg);

  equation = createInput("x^2");
  equation.size(550, 70);
  equation.style('text-align', 'center');
  equation.style('margin-left', '250px');
  equation.style('font-size', '30px');
  equation.style('background-color', '#000000');
  equation.style('color', '#ffffff');
  equation.style('border-radius', '15px');
  equation.parent("sketch-holder");

  button = createButton('submit');
  button.parent("sketch-holder");
  button.mousePressed(reload);

  canvas = createCanvas(1050, 1000);
  canvas.parent('sketch-holder');

  textAlign(CENTER, CENTER);


  sZoom = new Slider(0.5*width, 0.8*height, 0.2, "zoom   ", 0.01, 1);
}

function draw() {

  background(0);

  zoom = sZoom.val;

  // bigger scale zooms out
  var xScale = zoom;
  var yScale = 1;



  translate(xCentre,yCentre);

  strokeWeight(1.25);
  stroke(69,69,69);
  line(minX,0,maxX,0);
  line(0,minY,0,maxY);

  noFill();
  stroke('white');
  strokeWeight(2.5);
  beginShape();
    for (x=minX; x<maxX; x=x+step) {


      x_scaled_eq = latest_equation.replace("x", "xScale*x");

      let scope = {
        xScale:xScale,
        yScale:yScale,
        x:x
      }

      let y = math.evaluate(x_scaled_eq, scope);

      values[x] = yScale*y;
      //values[x] = -yScale* (pow(xScale*x,3));
      vertex(x, values[x]);
    }
  endShape();
fill('white');

translate(-xCentre,-yCentre);

sZoom.show();
}

function reload() {
  latest_equation = equation.value().toString()
  console.log(latest_equation);
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
        this.val = round(map(this.cx, this.x - this.len, this.x + this.len, this.min, this.max), 2);


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
