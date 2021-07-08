// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, w, h,tx,r,g,b) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    this.txt = tx;
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
  }

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  show() {
    stroke(0);
    // Different fill based on state
    if (this.dragging) {
      fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
       fill(this.r*170,this.g*170,this.b*170);
    } else {  
      fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
     fill(0, 0, 0);
    textSize(this.w/2.5);
    text(this.txt,this.x+4, this.y+(this.h/2)+6);
   
  }

  pressed() {
    // Did I click on the rectangle?
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}