let time_in_b = 0;
let time = 0;
let angleDegrees = 90;

// an array to add multiple particles
let particles = [];

function preload() {
  fontReg = loadFont('/../../assets/Poppins-Regular.ttf');
  img = loadImage('/../../assets/start.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(fontReg);
  imageMode(CENTER);
  rectMode(CENTER, CENTER);
  frameRate(20);

  // particles
  for(let i = 0;i<70;i++){
    particles.push(new Particle());
  }
}

function draw() {

  background('black');

  textAlign(CENTER, CENTER);
  fill('white');
  //image(img, width*0.5, height*0.4, width*0.4, width*0.4*0.39863);
  stroke('white');
  noFill();


  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
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
    this.xSpeed = random(-3,3);
    this.ySpeed = random(-2,2);
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
      if(dis<120) {
        stroke('rgba(255,255,255,0.1)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}
