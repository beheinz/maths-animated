// an array to add multiple particles
let particles = [];

var mouse_been_down = 0;

function preload() {
  fontReg = loadFont('/../../assets/Poppins-Regular.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(fontReg);
  imageMode(CENTER);
  rectMode(CENTER, CENTER);
  frameRate(25);

  // particles
  for(let i = 0;i<60;i++){
    particles.push(new Particle());
  }
}

function draw() {

  background('black');
  textAlign(CENTER, CENTER);

  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }

  textSize(24);
  noStroke();
  fill('rgba(200,169,169,0.3)');

  if (mouse_been_down == 0 & millis() > 3000) {
  text("Click the background", 0.5*width, 0.8*height);
}


  if (mouseIsPressed) {
    // create new particle
    particles.push(new Particle());
    particles[particles.length-1].setLocation();

    // remove oldest particle
    particles.splice(0,1);

    // log mouse press
    mouse_been_down = 1;
  }
}

// this class describes the properties of a single particle.
class Particle {

  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(2,15);
    this.xSpeed = random(-this.r/5, this.r/5);
    this.ySpeed = random(-this.r/5, this.r/5);
  }

  // set location to mouse location for new particles
  setLocation(){
    this.x = mouseX;
    this.y = mouseY;
  }

  // creation of a particle.
  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

  // setting the particle in motion.
  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles(paraticles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<120 && dis>80) {
        stroke('rgba(255,255,255,0.1)');
        line(this.x,this.y,element.x,element.y);
      }
      if(dis<80) {
        stroke('rgba(255,255,255,0.2)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}
