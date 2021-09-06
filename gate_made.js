
function findstartpos(){
    startpos=35;
     for(i=0;i<shpcount;i++){
       if((shapes[i].y<=80) && ((shapes[i].y>=30)) ){
        startpos=shapes[i].x+shapes[i].w+52;
      }
     }
     print(startpos);
  }

  
function and(){
    findstartpos();
    print(shapes);
    shp=new Draggable(startpos, 76, 50, 50,shpcount,"AND",276, 156, 0);
    shpcount++;
    shapes.push(shp)
  }
  
  function or(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 44, 50,shpcount,"OR",0, 227, 19);
    shpcount++;
    shapes.push(shp)
  }
  
  function not(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 54, 50,shpcount,"NOT",224, 11, 65);
    shpcount++;
    shapes.push(shp)
  }
  
  function xor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 54, 50,shpcount,"XOR",195, 0, 217);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function nand(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 66, 50,shpcount,"NAND",255, 98, 0);
    shpcount++;
    shapes.push(shp)
  }
  
  function nor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 54, 50,shpcount,"NOR",0, 223, 247);
    shpcount++;
    shapes.push(shp)
  }

  
  function xnor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 76, 66, 50,shpcount,"XNOR",255, 18, 164);
    shpcount++;
    shapes.push(shp)
  }

  function joinnode(){
    findstartpos();print(shapes);
    shp=new joint(startpos, 76, shpcount);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function display(){
    findstartpos();print(shapes);
    shp=new Display(startpos, 76, 110, 50,shpcount);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function clock(){
    findstartpos();print(shapes);
    shp=new Clock(startpos, 76, 30, 30,shpcount,"clock",0, 174, 255);
    shpcount++;
    shapes.push(shp)
  }
  
   
  
  function edge_triggering(){
    findstartpos();print(shapes);
    shp=new Trigger(startpos, 76, 30,30,shpcount,"trigger",255,255,255);
    shpcount++;
    shapes.push(shp)
  }
  
   
  function alu(){
    findstartpos();print(shapes);
    
    shp=new Alu(startpos+26, 76, 50, 50,shpcount,"ALU",235, 64, 52);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    
    print(shapes.length)
    print(themain)
    print(shapes[themain])
    for(let i=0;i<16;i++){
      let dwn;
      if(i<8) {dwn=150}
      else {dwn=140}
      
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    let i=16
    shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,120);
    shp.setoutput(themain)
    shapes[themain].setinput(shpcount)
    shpcount++;
    shapes.push(shp)
    print(shapes.length)
    print(shapes)

    for(let i=0;i<9;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,80);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    print(shapes.length)
    print(shapes)

    
  }
  
  
   
  function register(){
    findstartpos();print(shapes);
    
    shp=new Memory(startpos+26, 76, 110, 50,shpcount,"register",120, 44, 0);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    
    print(shapes.length)
    print(themain)
    print(shapes[themain])
    for(let i=0;i<8;i++){
      let dwn=90;
      
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    let i=8
    shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,80);
    shp.setoutput(themain)
    shapes[themain].setinput(shpcount)
    shpcount++;
    shapes.push(shp)
    print(shapes.length)
    print(shapes)

    for(let i=0;i<8;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,80);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    print(shapes.length)
    print(shapes)

    
  }
  

  
  function multiplexer(){
    findstartpos();print(shapes);
    
    shp=new Mux(startpos+26, 76, 50, 50,shpcount,"mux",170, 250, 10);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    let dwn;
   
    for(let i=0;i<8;i++){
      dwn=120;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    for(let i=8;i<11;i++){
      dwn=100;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }

    
    for(let i=0;i<8;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,80);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
    
  }
  
  
  function demultiplexer(){
    findstartpos();print(shapes);
    
    shp=new Demux(startpos+26, 76, 80, 50,shpcount,"DEMUX",0, 255, 106);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    let dwn;
   
    for(let i=0;i<1;i++){
      dwn=45;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    for(let i=1;i<4;i++){
      dwn=25;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
    for(let i=0;i<8;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,80);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
  }
  
  
  
  function decoder(){
    findstartpos();print(shapes);
    
    shp=new Demux(startpos+26, 76, 100, 50,shpcount,"DECODER",247, 213, 156);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    let dwn;
   
    
    for(let i=0;i<3;i++){
      dwn=45;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }

    for(let i=3;i<4;i++){
      dwn=25;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
    for(let i=0;i<8;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,80);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
  }
  
  
  
  function encoder(){
    findstartpos();print(shapes);
    
    shp=new Encoder(startpos+26, 76, 112, 50,shpcount,"ENCODER",206, 229, 208);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    let dwn;
   
    
    for(let i=0;i<8;i++){
      dwn=100;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }

    for(let i=8;i<9;i++){
      dwn=90;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
    for(let i=0;i<3;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,28);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
  }
  
  
  
  function Multiplier(){
    findstartpos();print(shapes);
    
    shp=new Multiply(startpos+26, 76, 122, 100,shpcount,"MULTIPLY",255, 222, 222);
    let themain=shpcount;
    shpcount++;
    shapes.push(shp)
    let dwn;
   
    
    for(let i=0;i<8;i++){
      dwn=160;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }

    for(let i=8;i<16;i++){
      dwn=140;
      shp=new input_ports(shapes[themain].input[0]-22, shapes[themain].input[1]+(i*20)-100,shpcount,i,dwn);
      shp.setoutput(themain)
      shapes[themain].setinput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
    for(let i=0;i<16;i++){
      shp=new output_ports(shapes[themain].output[0]+22, shapes[themain].output[1]+(i*20)-100,shpcount,i,160);
      shp.setinput(themain)
      shapes[themain].setoutput(shpcount)
      shpcount++;
      shapes.push(shp)
    }
    
  }
  