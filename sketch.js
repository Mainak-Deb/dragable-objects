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
let lights=80
let connect_type;
let connect_port_number;
let mainconnect;
let undo_stack=[]
let redo_stack=[]
let clockspeed=50
let grid=false;
let gridline=[0, 157, 230]








function setup() {
  createCanvas(1540, 44*lights);
  
  andb = createButton('AND',true,'rgb(230, 5, 207)');
  andb.position(0, 108);
  andb.mousePressed(and);
  
  orb = createButton('OR',true,'rgb(156, 0, 252)');
  orb.position(45, 108);
  orb.mousePressed(or);
  
  notb = createButton('NOT',true,'rgb(0, 113, 252)');
  notb.position(82, 108);
  notb.mousePressed(not);
  
  xorb = createButton('XOR',true,'rgb(20, 244, 252)');
  xorb.position(128, 108);
  xorb.mousePressed(xor);
  
  nandb = createButton('NAND',true,'rgb(0, 252, 189)');
  nandb.position(174, 108);
  nandb.mousePressed(nand);
  
  norb = createButton('NOR',true,'rgb(49, 245, 91)');
  norb.position(230, 108);
  norb.mousePressed(nor);
  
  xnorb = createButton('XNOR',true,'rgb(113, 255, 25)');
  xnorb.position(277, 108);
  xnorb.mousePressed(xnor);
  




  jointb = createButton('Joint',true,'rgb(240, 232, 2)');
  jointb.position(354, 108);
  jointb.mousePressed(joinnode);
  
  
  displayb = createButton('Display',true,'rgb(255, 157, 10)');
  displayb.position(400, 108);
  displayb.mousePressed(display);
  
  
  clockb = createButton('Clock',true,'rgb(255, 0, 0)');
  clockb.position(462, 108);
  clockb.mousePressed(clock);
  
  clockinput = createInput('50');
  clockinput.position(510, 108);
  clockinput.size(30);
  clockinput.input(setclockspeed);

  
  triggerb = createButton('Trigger',true,'rgb(255, 0, 115)');
  triggerb.position(552, 108);
  triggerb.mousePressed(edge_triggering);
  
  alub = createButton('8-bit ALU',true,'#FD6F96');
  alub.position(0, 140);
  alub.mousePressed(alu);
  
  memoryb = createButton('8-bit memory',true,'#FFEBA1');
  memoryb.position(74, 140);
  memoryb.mousePressed(register);
  
  muxb = createButton('8x1 MUX',true,'#95DAC1');
  muxb.position(172, 140);
  muxb.mousePressed(multiplexer);

  demuxb = createButton('1x8 DEMUX',true,'#6F69AC');
  demuxb.position(246, 140);
  demuxb.mousePressed(demultiplexer);

  encodeb = createButton('8x3 Encoder',true,'#FFC2E9');
  encodeb.position(340, 140);
  encodeb.mousePressed(encoder);

  decodeb = createButton('3x8 Decoder',true,'#DB996C');
  decodeb.position(440, 140);
  decodeb.mousePressed(decoder);

  multib = createButton('8-bit Multiplier',true,'#B3E283');
  multib.position(540, 140);
  multib.mousePressed(Multiplier);


  gridb = createButton('Grid',true,'#FF2442');
  gridb.position(width-270, 108);
  gridb.mousePressed(gridthis);
  
  
  
  runb = createButton('▶run',true,'#FFB830');
  runb.position(width-220, 108);
  runb.mousePressed(runthis);
  
  
  
  undo = createButton('↩undo',true,'#FFEDDA');
  undo.position(width-170, 108);
  undo.mousePressed(undothis);
  

  
  
  redo = createButton('↪redo',true,'#3DB2FF');
  redo.position(width-110, 108);
  redo.mousePressed(redothis);
  


  for(i=0;i<lights;i++){
    shp=new NODE(20,160+ i*40,shpcount);
    shapes.push(shp)
    shpcount++;
  }
  for(i=0;i<lights;i++){
    shp=new NODE(width-40,160+ i*40,shpcount);
    shapes.push(shp)
    shpcount++;
  }


}

function draw() {
  
  background(bg);
  
  if(grid){
    stroke(gridline[0],gridline[1],gridline[2],155)
    strokeWeight(1)
    for(let i=0;i<2.5*lights;i++){
      line(0,120+i*30,width,120+ i*30)
    }
    for(let i=0;i<lights;i++){
      line(50+i*30,32,50+i*30,height)
    }
  }

  
  fill(0)
  stroke(255)
  rect(-2,0,width,80)
  stroke(0)

  
  strokeWeight(4)
  fill(55)
  rect(0,68,50,height)
  rect(width-60,68,60,height)
  fill(255)
  rect(0,68,width,68)
  
  

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
        }else if(type=="inputpoints"){
          visited[i].value=or_func(a)
        }else if(type=="outputpoints"){
          print(visited[i].connected_port)
          print(shapes[a[0]].valuelist)
          print(shapes[a[0]].valuelist[visited[i].connected_port])
          visited[i].value=shapes[a[0]].valuelist[visited[i].connected_port]
        }else if(type=="ALU"){
          console.log("alu",a)
          visited[i].valuelist=alu_func(a)
        }else if(type=="MEMORY"){
          console.log("memory",a)
          if(shapes[a[8]].value){
          visited[i].valuelist=memory_func(a)}
        }else if(type=="MUX"){
          visited[i].value=mux_func(a)
        }else if(type=="DEMUX"){
          visited[i].valuelist=demux_func(a)
        }else if(type=="ENCODER"){
          visited[i].valuelist=encoder_func(a)
        }else if(type=="DECODER"){
          visited[i].valuelist=decoder_func(a)
        }else if(type=="MULTIPLY"){
          visited[i].valuelist=multiply_func(a)
        }
    }
  }
  counter=(counter+1)%100000;
}
