
function findstartpos(){
    startpos=35;
     for(i=0;i<shpcount;i++){
       if(shapes[i].y<=50){
        startpos=shapes[i].x+shapes[i].w+52;
      }
     }
     print(startpos);
  }

  
function and(){
    findstartpos();
    print(shapes);
    shp=new Draggable(startpos, 40, 50, 50,shpcount,"AND",240, 156, 0);
    shpcount++;
    shapes.push(shp)
  }
  
  function or(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 44, 50,shpcount,"OR",0, 227, 19);
    shpcount++;
    shapes.push(shp)
  }
  
  function not(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 54, 50,shpcount,"NOT",224, 11, 65);
    shpcount++;
    shapes.push(shp)
  }
  
  function xor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 54, 50,shpcount,"XOR",195, 0, 217);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function nand(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 66, 50,shpcount,"NAND",255, 98, 0);
    shpcount++;
    shapes.push(shp)
  }
  
  function nor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 54, 50,shpcount,"NOR",0, 223, 247);
    shpcount++;
    shapes.push(shp)
  }

  
  function xnor(){
    findstartpos();print(shapes);
    shp=new Draggable(startpos, 40, 66, 50,shpcount,"XNOR",255, 18, 164);
    shpcount++;
    shapes.push(shp)
  }

  function joinnode(){
    findstartpos();print(shapes);
    shp=new joint(startpos, 40, shpcount);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function display(){
    findstartpos();print(shapes);
    shp=new Display(startpos, 40, 110, 50,shpcount);
    shpcount++;
    shapes.push(shp)
  }
  
  
  function clock(){
    findstartpos();print(shapes);
    shp=new Clock(startpos, 40, 30, 30,shpcount,"clock",0, 174, 255);
    shpcount++;
    shapes.push(shp)
  }
  
   
  
  function edge_triggering(){
    findstartpos();print(shapes);
    shp=new Trigger(startpos, 40, 30,30,shpcount,"trigger",255,255,255);
    shpcount++;
    shapes.push(shp)
  }
  
   
  