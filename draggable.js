// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

class Draggable {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.txt = tx;
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=15
    this.value=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)




    fill(0, 0, 0);
    textSize(this.h/2.5);
    text(this.txt,this.x+4, this.y+(this.h/2)+6);
    
   
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return [this.current_pos,"input"]
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}



class NODE {
  constructor(x, y,index) {
    this.txt = "node";
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    
    this.value=false
    this.port=20
    this.inputvalues=[]
    this.outputvalues=[]
    this.current_pos=index;
    this.w= this.port;
    this.h = this.port;
    this.input=[this.x,this.y]
    this.output=[this.x,this.y]
  }

  setinput(x){
      this.inputvalues.push(x);
  }
  setoutput(x){
    this.outputvalues.push(x);
  }


  over() {
    // Is mouse over object
    if ( (mouseX > this.x-this.port/2) && (mouseX < this.x+this.port/2+this.w) && (mouseY > this.y-this.port/2) && ( mouseY < this.y + this.h+this.port/2)) {
      this.rollover = true;
      print("rolled")
    } else {
      this.rollover = false;
    }
  }

  what(){
    return "node"
  }

  show() {
    stroke(0);
    
    if((this.rollover) && (!this.value)){
       fill(250, 237, 0);
    } else if (this.value) {
      fill(255,20,20);
   }else {  
      fill(0,0,0);
    }
    ellipse(this.x, this.y, this.port,this.port);
     
  }

  pressed(state) {
    if ( (mouseX > this.x-this.port/2) && (mouseX < this.x+this.port/2+this.w) && (mouseY > this.y-this.port/2) && ( mouseY < this.y + this.h+this.port/2)) {
      if(state){
        if(this.value){
          this.value=false;
        }else{
          this.value=true;
        }        
        print(this.value)
      }else{
        print(this.current_pos)
        return [this.current_pos,"both"]
      }
    }
  }

  released() {
    
  }

 
}



class joint {
  constructor(x, y,index) {
    this.txt ="joint";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = 26;
    this.h = 20;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=255;
    this.g=255;
    this.b=255;
    this.input=[this.x+20, this.y+this.h/2]
    this.output=[this.x+this.w-20, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=20
    this.value=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  manualupdate(x,y){
    this.input=[x, y+this.h/2]
    this.output=[x+this.w,y+this.h/2]
  }


  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x, this.y+this.h/2]
    this.output=[this.x+this.w, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   
    //rectangle color
    
    strokeWeight(2)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0,255,0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h);
    strokeWeight(1)

   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,255,60);
    } else {  
      fill(0,0,0);
      stroke(0,255,0);
    }
    
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,255,60);
   } else {  
     fill(0,0,0);
     stroke(0,255,0);
   }
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
      if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
        print(this.current_pos)
          return [this.current_pos,"input"]
      } 
      if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
        print(this.current_pos)
        return [this.current_pos,"output"]
      }
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
     }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}


class Display {
  constructor(x, y, w, h,index) {
    this.txt = "display";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=0;
    this.g=0;
    this.b=0;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=15
    this.value=0;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    stroke(252, 240, 3);
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);

    strokeWeight(1)
    stroke(255, 0, 0)

    fill(255, 0, 0);
    textSize(this.h/1.6);
    text(this.value,this.x+4, this.y+(this.h/2)+12);
    
   
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return [this.current_pos,"input"]
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}


class Clock {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.txt = "clock";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=15
    this.value=false;
  }

  setclock(counter,cycle){
      let sp=counter%(2*cycle)
      if(sp<cycle){
        this.value=true
      }else{
        this.value=false
      }
  }

  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)



    textSize(this.h/1.2);
      if(this.value){
        fill(255, 0, 0);
        text("1",this.x+6, this.y+(this.h/2)+8);
      }else{
        fill(0, 0, 0);
        text("0",this.x+6, this.y+(this.h/2)+8);
      }
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}


class Trigger {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.txt = "trigger";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=15
    this.value=false;
    this.prev=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)

    textSize(this.h/1.2);
    if(this.value){
      fill(255, 0, 0);
      text("1",this.x+6, this.y+(this.h/2)+8);
    }else{
      fill(0, 0, 0);
      text("0",this.x+6, this.y+(this.h/2)+8);
    }
   
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return [this.current_pos,"input"]
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}



class input_ports{
  constructor(x, y,index,c_port,down) {
    this.txt ="inputpoints";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = 22;
    this.h = 20;
    this.offsetX = 0;
    this.offsetY = 0;
    this.connected_port=c_port;
    this.r=255;
    this.g=255;
    this.b=255;
    this.input=[this.x+20, this.y+this.h/2]
    this.output=[this.x+this.w-20, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]

    this.down=down
    this.port=20
    this.value=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  
  update() {
    let portpos=shapes[this.outputvalues[0]].input
   
    this.x=portpos[0]-22
    this.y=portpos[1]+(this.h*this.connected_port)-this.down
    this.input=[this.x, this.y+this.h/2]
    this.output=[this.x+this.w, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   
    //rectangle color
    
    strokeWeight(2)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0,255,0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h);
    strokeWeight(1)

   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,255,60);
    } else {  
      fill(0,0,0);
      stroke(0,255,0);
    }
    
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)




  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
      if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
        print(this.current_pos)
          return [this.current_pos,"input"]
      } 
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}



class output_ports{
  constructor(x, y,index,c_port,down) {
    this.txt ="outputpoints";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = 22;
    this.h = 20;
    this.offsetX = 0;
    this.offsetY = 0;
    this.connected_port=c_port;

    this.r=255;
    this.g=255;
    this.b=255;
    this.input=[this.x+20, this.y+this.h/2]
    this.output=[this.x+this.w-20, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]

    this.down=down
    this.port=20
    this.value=false;
  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    let portpos=shapes[this.inputvalues[0]].output
    
    this.x=portpos[0]
    this.y=portpos[1]+(this.h*this.connected_port)-this.down
    this.input=[this.x, this.y+this.h/2]
    this.output=[this.x+this.w, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   
    //rectangle color
    
    strokeWeight(2)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0,255,0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h);
    strokeWeight(1)

   


//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,255,60);
   } else {  
     fill(0,0,0);
     stroke(0,255,0);
   }
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
       
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } 
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
   }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

class Alu {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.txt = tx;
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=10
    this.value=false
    this.valuelist=[false,false,false,false,false];
    

  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)




    fill(0, 0, 0);
    textSize(this.h/2.5);
    text(this.txt,this.x+4, this.y+(this.h/2)+6);
    
   
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return [this.current_pos,"input"]
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}


class Memory {
  constructor(x, y, w, h,index,tx,r,g,b) {
    this.txt = "MEMORY";
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.input_rollover = false; 
    this.output_rollover = false; 
    this.current_pos=index;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.r=r/255;
    this.g=g/255;
    this.b=b/255;
    this.input=[this.x-15, this.y+this.h/2]
    this.output=[this.x+ this.w+15, this.y+this.h/2]
    this.inputvalues=[]
    this.outputvalues=[]
    this.port=10
    this.value=false
    this.valuelist=[false,false,false,false,false,false,false,false];
    

  }



  what(){
    return "device"
  }
  
  setinput(x){
    this.inputvalues.push(x);
}
setoutput(x){
  this.outputvalues.push(x);
}

  over() {
    // Is mouse over object
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }
  inputover(x) {
    // Is mouse over object
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      this.input_rollover = true;
    } else {
      this.input_rollover = false;
    }
  }
  outputover(x) {
    // Is mouse over object
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      this.output_rollover = true;
    } else {
      this.output_rollover = false;
    }
  }
  update() {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
    this.input=[this.x-10-this.port/2, this.y+this.h/2]
    this.output=[this.x+ this.w+10+this.port/2, this.y+this.h/2]
  }

  show() {
    stroke(0);
    // Different fill based on state
    
   

//input color
    if ((this.input_rollover) ||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
    } else {  
      fill(0,0,0);
      stroke(0);
    }
    strokeWeight(6)
    line(this.x, this.y+this.h/2,this.x-10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.input[0],this.input[1],this.port,this.port)



//output color
    if( (this.output_rollover)||(this.value)) {
      fill(255,60,60);
      stroke(255,60,60);
   } else {  
     fill(0,0,0);
     stroke(0);
   }
   strokeWeight(6)
    line(this.x+ this.w, this.y+this.h/2,this.x+ this.w+10, this.y+this.h/2);
    strokeWeight(1)
    ellipse(this.output[0],this.output[1],this.port,this.port)


    //rectangle color
    
    strokeWeight(4)
    if(this.value){
      stroke(255,60,60);
    }else{
      stroke(0);
    }
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
      fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);
    strokeWeight(1)


//rectangle color
      
    strokeWeight(4)
    stroke(252, 240, 3);
    if (this.dragging) {
    fill(this.r*90,this.g*90,this.b*90);         
    } else if (this.rollover) {
    fill(this.r*170,this.g*170,this.b*170);
    } else {  
    fill(this.r*255,this.g*255,this.b*255);
    }
    rect(this.x, this.y, this.w, this.h,5);

    strokeWeight(1)
    stroke(255, 0, 0)

    fill(255, 255,255);
    textSize(this.h/2.9);
    text("Memory",this.x+24, this.y+15);

    fill(0,0,0);
    rect(this.x+3, this.y+this.h/2.9, this.w-6, this.h/1.7,5);
    let pastetext=arr_to_str_mem(this.valuelist)
    fill(255, 0, 0);
    textSize(this.h/2.2);
    text(pastetext,this.x+4, this.y+(this.h/2)+16);
  }

  pressed(state) {
    // Did I click on the rectangle?
    if(!run){
    if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
      this.dragging = true;
      
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - mouseX;
      this.offsetY = this.y - mouseY;
      return null
      
    }
    if (mouseX > this.input[0]-this.port/2 && mouseX < this.input[0]+this.port/2 && mouseY > this.input[1]-this.port/2 && mouseY < this.input[1]+this.port/2) {
      print(this.current_pos)
        return [this.current_pos,"input"]
    } 
    if (mouseX > this.output[0]-this.port/2 && mouseX < this.output[0]+this.port/2 && mouseY > this.output[1]-this.port/2 && mouseY < this.output[1]+this.port/2) {
      print(this.current_pos)
      return [this.current_pos,"output"]
    } }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
}

