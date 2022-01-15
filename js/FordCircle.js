class FordCircle {
  constructor(x, y, r, index) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rEcho = 0;
    this.dimension = { width: height * 2 };
    this.index = index;
    this.brightness = 0;
    this.realR;
    this.echoIsActivated = false;
  }

  updateZoomLevel(y) {
    //zoom (au cas où)
    // uniquement zoom centré (pas hyper intéressant visuellement)
    // il faudrait décaler l'ensemble des cercles pour une vue plus dans le translate du sketch
    this.dimension = { width: y };
  }

  draw() {
    stroke(255);
    fill(this.brightness);
    // noFill()
   this.realX = this.x * this.dimension.width - this.dimension.width / 2;
   this.realY = -this.r * this.dimension.width;
   this.realR = this.r * this.dimension.width;

  circle( this.realX,  this.realY,  this.realR * 2);
  noFill();
  // this.rEcho += (1000 - this.rEcho) * 0.01; //eased echo
  // console.log(this.rEcho);
  
  if(this.echoIsActivated) {
    this.rEcho += 2;
    circle(this.realX,  this.realY,  this.realR*2+this.rEcho);
  }
  // console.log(this.rEcho
  //   )
  }
}
