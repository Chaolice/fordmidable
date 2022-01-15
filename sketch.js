let fordCircles = [];
let handleNumber, handleSize;

let horizontalCursor, verticalCursor;

//both handles
let widthHandle = 25;
let heightHandle = 25;

//horizontal handle
let horizontalx;
let horizontaly;
let overHorizontalHandle = false;
let horizontalLocked = false;
let horizontalxOffset = 0.0;
let horizontalyOffset = 0.0;

//vertical handle turned into a horizontal handle
let verticalx;
let verticaly;
let overVerticalHandle = false;
let verticalLocked = false;
let verticalxOffset = 0.0;
let verticalyOffset = 0.0;

let colourHorizontal = 0;

//mouse constraint

let leftWall
let rightWall
let xc

//colour echo
let d


function setup() {
  rectMode(CENTER);
  horizontalx = widthHandle*1.5;
  horizontaly = 75;
  verticalx = horizontalx;
  verticaly = window.innerHeight-75;
  leftWall = widthHandle*1.5;
  rightWall = window.innerWidth-widthHandle*1.5;
  rectMode(RADIUS);
  createCanvas(window.innerWidth, window.innerHeight);
  generateFordCircles(3);
  
}

function draw() {
  xc = constrain(mouseX, leftWall, rightWall);
  background(0);

  horizontalCursor = new Handle(
    0,
    horizontaly,
    window.innerWidth,
    1,
    widthHandle,
    heightHandle
  );
  verticalCursor = new Handle(
    0,
    window.innerHeight-75,
    window.innerWidth,
    1,
    heightHandle,
    widthHandle
  );
  verticalCursor.drawVertical(verticalx, verticaly);

  push();
  translate(width / 2, (height * 3) / 3.85);
  fordCircles.forEach((ford, index) => {
    if (index < fordCircles.length - 2) {
      //zoom (au cas où)
      let valY = map(
        verticalCursor.handlex, //VERTICAL TO HORIZONTAL
        0,
        height,
        height * 2,
        height * 10  
      );
      ford.updateZoomLevel(valY); //activate the zoom level with the mouseXlevel
      //afficher les cercles
      ford.draw();
    }
  });
  // if (ford.updateZoomLevel) {
  //   Tone.loaded().then(() => {
  //     sampler.triggerAttackRelease(["E#2"], 4);
  //   })
  // }
  pop();
  horizontalCursor.drawHorizontal(horizontalx, horizontaly);


  //horizontal
  if (
    mouseX > horizontalx - widthHandle &&
    mouseX < horizontalx + widthHandle &&
    mouseY > horizontaly - heightHandle &&
    mouseY < horizontaly + heightHandle
  ) {
    overHorizontalHandle = true;
    if (!horizontalLocked) {
      // colourHorizontal = 100;
    }
  } else {
    overHorizontalHandle = false;
  }

  //vertical
  if (
    mouseX > verticalx - widthHandle &&
    mouseX < verticalx + widthHandle &&
    mouseY > verticaly - heightHandle &&
    mouseY < verticaly + heightHandle
  ) {
    overVerticalHandle = true;
    if (!verticalLocked) {}
  } else {
    overVerticalHandle = false;
  }
}

/**
 *
 * fonction pour générer X cercles selon l'equation x = x/y
 */

function generateFordCircles(n) {
  let x1 = 0;
  let y1 = 1;
  let x2 = 1;
  let y2 = n;

  let x;
  let y = 0;
  let index = 0;
  while (y != 1) {
    x = Math.floor((y1 + n) / y2) * x2 - x1;
    y = Math.floor((y1 + n) / y2) * y2 - y1;

    fordCircles.push(new FordCircle(x / y, y, 1 / Math.pow(y, 2) / 2, index));

    x1 = x2;
    x2 = x;
    y1 = y2;
    y2 = y;
    index++;
  }
  // console.log(this.r, index);
}

// function mouseClicked(ford,index){
//   ford=n;
//   index=0;
//   // console.log("click", e.x,e.y);

//   // //check sur quel circle tu es
//   fordCircles.forEach((ford, index) => {
//     let d = dist(mouseX,mouseX,this.y,this.y);
//     if (d<this.r) {
//       this.brightness = 255;
//       console.log('clicked on circle');
//     }
//     console.log('not clicked on circle');
//     } // si tu es à l'intérieur de 1 des cercles, tu output son index

// }

// let d = dist(px, py, this.x, this.y);
//   //   if (d < this.r) {

function mouseClicked(e) {
  fordCircles.forEach((ford, index) => {
    // console.log(ford);
    //translate(width / 2, (height * 3) / 4);
    let d = dist(
      e.x,
      e.y,
      ford.realX + width / 2,
      ford.realY + (height * 3) / 4
    );

    if (d < ford.realR) {
      console.log("clicked on circle");
      let n = Tone.now(); //delay
      ford.rEcho =0;
      // ford.brightness = 255;
      // fill(255,0,0)
      ford.echoIsActivated = true;

      // if (mouseIsPressed) {
      //   this.brightness=255;
      //   hue += 0.1;
      //   if (hue > 255) hue = 0;
      //   ford.brightness = 1+frameCount;
      // }
      // if (d < ford.realR) {
      //   hue += 0.1;
      //   if (hue > 255) hue = 0;
      //   ford.brightness = 1+frameCount;
      // }

      // console.log(ford.rEcho);
      // console.log(ford.realR, ford.rEcho);

      if(ford.realR >100 && ford.realR <250) {          //biggest
        Tone.loaded().then(() => {
          sampler.triggerAttackRelease(["D#4"], 4);
        })      }
      if(ford.realR >60 && ford.realR <100) {
        Tone.loaded().then(() => {
          sampler.triggerAttackRelease(["E#2"], 4);
          sampler.triggerAttackRelease(["E#2"], 4,n+2); ///TATATATA
        })
      }
      if(ford.realR >40 && ford.realR <60) {
        Tone.loaded().then(() => {
          sampler.triggerAttackRelease(["C4"], 4);
          sampler.triggerAttackRelease(["C4"], 4, n+5);

        })
      }
      if(ford.realR <40) {
        Tone.loaded().then(() => {
          sampler.triggerAttackRelease(["A1"], 4);
        })
      }
    }




  });

}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    fordCircles[index].clicked(xc, mouseY);
  }
  horizontalCursor.clicked();
  verticalCursor.clicked();

}

// function mousePressed(){
//   fordCircle.click()
// }

function mousePressed() {
  if (overHorizontalHandle) {
    horizontalLocked = true;
    fill(255, 255, 255);
  } else {
    horizontalLocked = false;
  }
  horizontalxOffset = xc - horizontalx;
  //  verticalyOffset = mouseY - horizontaly;

  if (overVerticalHandle) {
    verticalLocked = true;
    fill(255, 255, 255);
  } else {
    verticalLocked = false;
  }
  verticalyOffset = xc - verticaly;
  
}

function mouseDragged() {
  if (horizontalLocked) {
    horizontalx = xc - horizontalxOffset;
    // horizontaly = mouseY - yOffset;

    // changer les ford

    let val = floor(map(horizontalx, 0, width, 2, 32));
    /**
     * ATTENTION, cette technique va effacer tous les cercles en mémoires
     * Et en créer des nouveaux
     * ça pourrait être un problème pour la gestion du son
     * (si un son est jouer depui un cercle, et qu'il est supprimé de la mémoire, le son aussi...)
     */
    fordCircles = [];
    generateFordCircles(val);

    // if (generateFordCircles){                   //make sound on drag
    //   Tone.loaded().then(() => {
    //     sampler.triggerAttackRelease(["D#4"], 0.1);
    //   })    }
  }
  if (verticalLocked) {
    verticalx = xc - verticalxOffset;
  }
}

function mouseReleased() {
  horizontalLocked = false;
  verticalLocked = false;
  
}