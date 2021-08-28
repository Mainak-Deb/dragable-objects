
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
  
  function joinnode(){
    findstartpos();print(shapes);
    shp=new joint(startpos, 40, shpcount);
    shpcount++;
    shapes.push(shp)
  }
  
   
  