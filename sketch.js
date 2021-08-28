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
let mainconnect;
let undo_stack=[]
let redo_stack=[]








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
  
  jointb = createButton('joint');
  jointb.position(148, 4);
  jointb.mousePressed(joinnode);
  
  
  
  
  runb = createButton('▶run');
  runb.position(width-220, 4);
  runb.mousePressed(runthis);
  
  
  
  undo = createButton('↩undo');
  undo.position(width-170, 4);
  undo.mousePressed(undothis);
  

  
  
  redo = createButton('↪redo');
  redo.position(width-110, 4);
  redo.mousePressed(redothis);
  


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
  if(state){
    let linestart
    if(connect_type=="output"){
      linestart=shapes[connect].output
    }else if(connect_type=="input"){
      linestart=shapes[connect].input
    }
    stroke(0)
    strokeWeight(2)
    line(linestart[0],linestart[1],mouseX,mouseY)
    
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
        }else if(type=="joint"){
          visited[i].value=or_func(a)
          print(visited[i].value)
        }
        
    }
  }
 
}



