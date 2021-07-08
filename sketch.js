// Click and Drag an object

let shape1;
let shape2;
let shapes=[];
let shpcount=0;
let startpos=100;
let run=false;

function setup() {
  createCanvas(1540, 760);

  
  andb = createButton('and');
  andb.position(0, 0);
  andb.mousePressed(and);
  
  orb = createButton('or');
  orb.position(40, 0);
  orb.mousePressed(or);
  
  notb = createButton('not');
  notb.position(80, 0);
  notb.mousePressed(not);
  
  xorb = createButton('xor');
  xorb.position(120, 0);
  xorb.mousePressed(xor);
  
  
  
  runb = createButton('run');
  runb.position(width-200, 0);
  runb.mousePressed(runthis);
  
}

function draw() {
  
  background(155);
  if(!run){
    for(i=0;i<shpcount;i++){
      shapes[i].over();
      shapes[i].update();
      shapes[i].show();
    }
  }
  else{
    for(i=0;i<shpcount;i++){
      
      shapes[i].show();
    }
  }


}

function mousePressed() {
  if(!run){
    for(i=0;i<shpcount;i++){
      shapes[i].pressed();
    }
  }
}

function mouseReleased() {
  if(!run){
     for(i=0;i<shpcount;i++){
      shapes[i].released();
    }
  }
}

function and(){
  findstartpos();
  shpcount++;
  shp=new Draggable(startpos, 40, 50, 50,"and",240, 156, 0);
  shapes.push(shp)
}

function or(){
  findstartpos();
  shpcount++;
  shp=new Draggable(startpos, 40, 50, 50,"or",0, 227, 19);
  shapes.push(shp)
}

function not(){
  findstartpos();
  shpcount++;
  shp=new Draggable(startpos, 40, 50, 50,"not",224, 11, 65);
  shapes.push(shp)
}

function xor(){
  findstartpos();
  shpcount++;
  shp=new Draggable(startpos, 40, 50, 50,"xor",195, 0, 217);
  shapes.push(shp)
}

function findstartpos(){
  startpos=0;
   for(i=0;i<shpcount;i++){
     if(shapes[i].y<=50){
      startpos=shapes[i].x+shapes[i].w+6;
    }
   }
   print(startpos);
}





function runthis(){
  if(run){
    run=false;
  }
  else{
    run=true;
  }
  
}
