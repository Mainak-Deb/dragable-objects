

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
  
  
  
function mousePressed() {
    for(i=0;i<shpcount;i++){
      now=shapes[i].pressed(run);
      
      if(!state){
        if(now!=null){
            connect=now[0];
            print(now)
            mainconnect=now
            if(now[1]=="both"){
              let pos=now[0]
              if((pos>=lights) && (pos<2*lights)){
                connect_type="input"
                print("input")
              }else if((pos>=0) && (pos<lights)){
                connect_type="output"
                print("output")
              }
            }else{
              connect_type=now[1]
            }
            
            state=true
            console.log("state",connect,connect_type,state)
        }
      }else{
        if(now!=null){
          if(now[1]!=mainconnect[1]) {
            state=false
            if(connect_type=="output"){
              shapes[connect].setoutput(now[0])
              shapes[now[0]].setinput(connect)
              undo_stack.push([connect,now[0]])
            }else if(connect_type=="input"){
              shapes[connect].setinput(now[0])
              shapes[now[0]].setoutput(connect)
              undo_stack.push([now[0],connect])
            }
            print(undo_stack)
            console.log("state",connect,state)
            
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


function runthis(){
    if(run){
      run=false;
      bg=155
      gridline=[0, 255, 229]
    }
    else{
      queue=[]
      visited=[]
      bfs()
      run=true;
      bg=50
      gridline=[80, 207, 2]
    }
  }

  function gridthis(){
    if(grid){
      grid=false;
    }
    else{
      grid=true;
       
    }
    print(grid)
  }

function undothis(){
    print("undo")
    let l=undo_stack.length
    let reverse;
    if(l>0){
        reverse=undo_stack[l-1]
        print(reverse)
        redo_stack.push(undo_stack[l-1])
        undo_stack.pop()
        shapes[reverse[0]].outputvalues.pop()
        shapes[reverse[1]].inputvalues.pop()
        print(undo_stack)
    }

}


function redothis(){
    print("redo")
    let l=redo_stack.length
    let reverse;
    if(l>0){
        reverse=redo_stack[l-1]
        print(reverse)
        undo_stack.push(redo_stack[l-1])
        redo_stack.pop()
        shapes[reverse[0]].outputvalues.push(reverse[1])
        shapes[reverse[1]].inputvalues.push(reverse[0])
        print(redo_stack)
    }
}
