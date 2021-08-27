// Click and Drag an object

let shape1;
let shape2;
let shapes=[];
let shpcount=0;
let startpos=100;
let run=false;
let bg=155;
let state=false
let connect;
let visited=[]
let queue=[]
let lights=50
let connect_type;


function bfs(){

  for(let i=lights;i<2*lights;i++){
    let a=bulb_next(shapes[i])
    if(a.length!=0){
      queue.push(shapes[i])
      visited.push(shapes[i])
    }
  }
  console.log("visited",visited)
  console.log("queue",queue)
  while(queue.length>0){
    let a=nextnodes(queue[0])
    if(a.length!=0){
      queue=queue.concat(a)
      visited=visited.concat(a)
      print(queue)
      print(visited)
    }
    queue.shift()
  }


}

function bulb_next(a){
  b=a.inputvalues
  arr=[]
  let pos=a.current_pos;
  for(let i=0;i<b.length;i++){
    if(!visited.includes(shapes[b[i]])){
      if(shapes[b[i]].what()!="node"){
       arr.push(shapes[b[i]])
      }else if((pos>=lights) && (pos<2*lights)){
       arr.push(shapes[b[i]])
      }
    }
   print(shapes[b[i]])
  }
  return arr;
}




function nextnodes(a){
   b=a.inputvalues
   print(b)
   arr=[]
   let pos=a.current_pos;
   for(let i=0;i<b.length;i++){

     if((!visited.includes(shapes[b[i]])) && (shapes[b[i]].what()!="node")){
        arr.push(shapes[b[i]])
     } print(shapes[b[i]])
   }
   return arr;
}






function setup() {
  createCanvas(1540, 65*lights);
  
  andb = createButton('and');
  andb.position(0, 4);
  andb.mousePressed(and);
  
  orb = createButton('or');
  orb.position(40, 4);
  orb.mousePressed(or);
  
  notb = createButton('not');
  notb.position(70, 4);
  notb.mousePressed(not);
  
  xorb = createButton('xor');
  xorb.position(108, 4);
  xorb.mousePressed(xor);
  
  
  
  runb = createButton('run');
  runb.position(width-200, 4);
  runb.mousePressed(runthis);
  

  for(i=0;i<lights;i++){
    shp=new NODE(20,120+ i*60,shpcount);
    shapes.push(shp)
    shpcount++;
  }
  for(i=0;i<lights;i++){
    shp=new NODE(width-40,120+ i*60,shpcount);
    shapes.push(shp)
    shpcount++;
  }


}

function draw() {
  
  background(bg);
  
  stroke(0)
  strokeWeight(4)
  fill(55)
  rect(0,32,50,height)
  rect(width-60,32,60,height)
  fill(255)
  rect(0,32,width,68)
  
  

  for(i=0;i<shpcount;i++){
    if(shapes[i].what()=="node"){
      shapes[i].over()
      shapes[i].show();
      outputnodes=shapes[i].outputvalues
      for(let j=0;j<outputnodes.length;j++){
        let val=shapes[i].value
          l1=[shapes[i].x,shapes[i].y]
          if((outputnodes[j]>=lights) && (outputnodes[j]<lights*2)){
            l2=[shapes[outputnodes[j]].x,shapes[outputnodes[j]].y]
          }else{
            l2=shapes[outputnodes[j]].input
          }
          if(val){
            stroke(255,0,0)
          }else{
            stroke(0)
          }
          //console.log(l1,l2)
          strokeWeight(2)
          line(l1[0],l1[1],l2[0],l2[1])
      }

    }else{
      shapes[i].over();
      shapes[i].inputover();
      shapes[i].outputover();

      shapes[i].update();
      shapes[i].show();
      outputnodes=shapes[i].outputvalues
      for(let j=0;j<outputnodes.length;j++){
          l1=shapes[i].output
          let val=shapes[i].value
          if((outputnodes[j]>=lights) && (outputnodes[j]<2*lights)){
            l2=[shapes[outputnodes[j]].x,shapes[outputnodes[j]].y]
          }else{
            l2=shapes[outputnodes[j]].input
          }
          if(val){
            stroke(255,0,0)
          }else{
            stroke(0)
          }
          strokeWeight(2)
          line(l1[0],l1[1],l2[0],l2[1])
      }
    }
  }
  if(run){
    //print(visited)
    for(let i=visited.length-1;i>=0;i--){
        let a=visited[i].inputvalues
        let type=visited[i].txt
        if(type=="and"){
          visited[i].value=and_func(a)
        }else if(type=="or"){
          visited[i].value=or_func(a)
        }else if(type=="xor"){
          visited[i].value=xor_func(a)
        }else if(type=="not"){
          visited[i].value=not_func(a)
        }else if(type=="node"){
          visited[i].value=or_func(a)
          print(visited[i].value)
        }
        print(visited[i])
    }
  }
}

function mousePressed() {
  for(i=0;i<shpcount;i++){
    now=shapes[i].pressed(run);
    print(now)
    if(!state){
      if(now!=null){
          connect=now;
          state=true
          console.log("state",connect,state)
      }
    }else{
      if(now!=null){
        if(!((i>=0) && (i<lights))){
          shapes[connect].setoutput(now)
          shapes[now].setinput(connect)
          state=false
          console.log("state",connect,state)
          print(shapes[connect].outputvalues)
          print(shapes[now].inputvalues)
        }
      }
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
  print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"and",240, 156, 0);
  shpcount++;
  shapes.push(shp)
}

function or(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"or",0, 227, 19);
  shpcount++;
  shapes.push(shp)
}

function not(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"not",224, 11, 65);
  shpcount++;
  shapes.push(shp)
}

function xor(){
  findstartpos();print(shapes);
  shp=new Draggable(startpos, 40, 50, 50,shpcount,"xor",195, 0, 217);
  shpcount++;
  shapes.push(shp)
}

function findstartpos(){
  startpos=35;
   for(i=0;i<shpcount;i++){
     if(shapes[i].y<=50){
      startpos=shapes[i].x+shapes[i].w+52;
    }
   }
   print(startpos);
}





function runthis(){
  if(run){
    run=false;
    bg=155
    
  }
  else{
    queue=[]
    visited=[]
    bfs()
    run=true;
    bg=50
  }
  
}


