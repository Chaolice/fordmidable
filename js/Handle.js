class Handle {
    constructor(x, y, width,height, widthHandle, heightHandle) {
      this.y = y;
      this.x = x;
      this.width = width;
      this.height = height;
      this.widthHandle = widthHandle;
      this.heightHandle = heightHandle;

      this.handlex =x;
      this.handley  =y;
      // this.positionX
      // this.positionY


      // console.log(this.x,this.y,this.width,this.height);
    }

    drawHorizontal(x, y){

      this.handlex = x;
      this.handley = y;

      stroke(255)
      line(this.x, this.y, this.width, this.y);
      fill(0)
      rect(x, y, this.widthHandle, this.heightHandle, 20);
    }

    drawVertical(x, y){
      this.handlex = x;
      this.handley = y;
      stroke(255)
      line(this.x, this.y, this.width, this.y);
      fill(0)
      rect(x, y, this.widthHandle, this.heightHandle, 20); 
    }

    
    // clicked() {
    //   // let d = dist(x, y, this.x, this.y);
    //   if (
    //     mouseX > this.x &&
    //     mouseX < this.x + this.width &&
    //     mouseY > this.y &&
    //     mouseY < this.y + this.height == 0) {
    //     console.log("yes");
    //   } else {
    //     console.log("no")
    //   }
    // }  
    
}