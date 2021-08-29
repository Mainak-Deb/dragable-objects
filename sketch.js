// Click and Drag an object

let counter=0;
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
let clockspeed=50
let grid=false;
let gridline=[0, 157, 230]







function setup() {
  createCanvas(1540, 65*lights);
  
  andb = createButton('AND');
  andb.position(0, 4);
  andb.mousePressed(and);
  
  orb = createButton('OR');
  orb.position(45, 4);
  orb.mousePressed(or);
  
  notb = createButton('NOT');
  notb.position(82, 4);
  notb.mousePressed(not);
  
  xorb = createButton('XOR');
  xorb.position(128, 4);
  xorb.mousePressed(xor);
  
  nandb = createButton('NAND');
  nandb.position(174, 4);
  nandb.mousePressed(nand);
  
  norb = createButton('NOR');
  norb.position(230, 4);
  norb.mousePressed(nor);
  
  xnorb = createButton('XNOR');
  xnorb.position(277, 4);
  xnorb.mousePressed(xnor);
  




  jointb = createButton('Joint');
  jointb.position(354, 4);
  jointb.mousePressed(joinnode);
  
  
  displayb = createButton('Display');
  displayb.position(400, 4);
  displayb.mousePressed(display);
  
  
  clockb = createButton('Clock');
  clockb.position(462, 4);
  clockb.mousePressed(clock);
  
  clockinput = createInput('50');
  clockinput.position(510, 4);
  clockinput.size(30);
  clockinput.input(setclockspeed);

  
  triggerb = createButton('Trigger');
  triggerb.position(552, 4);
  triggerb.mousePressed(edge_triggering);
  
  
  
  runb = createButton('Grid');
  runb.position(width-270, 4);
  runb.mousePressed(gridthis);
  
  
  
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
  
  if(grid){
    stroke(gridline[0],gridline[1],gridline[2])
    strokeWeight(1)
    for(let i=0;i<2.5*lights;i++){
      line(0,120+i*30,width,120+ i*30)
    }
    for(let i=0;i<lights;i++){
      line(50+i*30,32,50+i*30,height)
    }
  }



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
      if(shapes[i].txt=="clock"){
        shapes[i].setclock(counter,clockspeed)
      }
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
        if(type=="AND"){
          visited[i].value=and_func(a)
        }else if(type=="OR"){
          visited[i].value=or_func(a)
        }else if(type=="XOR"){
          visited[i].value=xor_func(a)
        }else if(type=="NOT"){
          visited[i].value=not_func(a)
        }else if(type=="NAND"){
          visited[i].value=nand_func(a)
        }else if(type=="NOR"){
          visited[i].value=nor_func(a)
        }else if(type=="XNOR"){
          visited[i].value=xnor_func(a)
        }else if(type=="node"){
          visited[i].value=or_func(a)
        }else if(type=="joint"){
          visited[i].value=or_func(a)
        }else if(type=="display"){
          visited[i].value=display_func(a)
        }else if(type=="trigger"){
          let trig=or_func(a)
          if(trig!=visited[i].prev){
            visited[i].value=true;
            visited[i].prev=trig
          }else{
            visited[i].value=false;
            visited[i].prev=trig
          }
        }
        
    }
  }
  counter=(counter+1)%100000;
}



