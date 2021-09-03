function and_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output && shapes[a[i]].value
    }
    }
    return output
}
function or_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
   
    for(let i=1;i<a.length;i++){
        output=output || shapes[a[i]].value
    }
    }
    return output
}
function not_func(a){
    output=false;
    if(a.length>0){
    output=!(shapes[a[0]].value)
    }return output
}

function xor_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output ^ shapes[a[i]].value
    }
    }return output
}

function nand_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output && shapes[a[i]].value
    }
    }return !output
}
function nor_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output || shapes[a[i]].value
    }
    }return !output
}
function xnor_func(a){
    output=false;
    if(a.length>0){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output ^ shapes[a[i]].value
    }
    }return !output
}


function display_func(a){
    outputs=[]
    for(let i=0;i<a.length;i++){
        outputs.push([shapes[a[i]].output[1],shapes[a[i]].value])
        //print([shapes[a[i]].output[1],shapes[a[i]].value])
    }
    outputs.sort((a,b)=>{
        return b[0]-a[0];
    })
    //onsole.log("outputs",outputs)
    let sum=0
    for(let i=0;i<outputs.length;i++){
        if(outputs[i][1]){
            sum=sum+parseInt(Math.pow(2,i))
            
        }
    }
    return sum
}


function setclockspeed(){
    clockspeed= this.value()
}

function bin2dec(bin){
    print(parseInt(bin, 2))
  return parseInt(bin, 2);
}
function dec2bin(dec){
    print((dec >>> 0).toString(2));
    return (dec >>> 0).toString(2);
}

function arr_to_str_mem(a){
    let ans=""
    for(let i=0;i<a.length;i++){
        if(a[i]){ans=ans+"1"}
        else{ans=ans+"0"}
    }return ans;
}


function alu_func(a){
    add1=""
    add2=""
    let decide=shapes[a[a.length-1]].value
    let ret;
    ans=[false,false,false,false,false];
    for(let i=0;i<4;i++){
        if(shapes[a[i]].value){add1=add1+"1"}
        else{add1=add1+"0"}

        if(shapes[a[i+4]].value){add2=add2+"1"}
        else{add2=add2+"0"}
    }
    console.log("add1",add1,"add2",add2);
    console.log("decide",decide)
    if(decide){
        ret=bin2dec(add1)-bin2dec(add2);
    }else{
        ret=bin2dec(add1)+bin2dec(add2);
    }
    print(ret)
    ret=dec2bin(String(ret))
    for(let i=0;i<5;i++){
        if(ret[ret.length-1-i]=="1"){ans[ans.length-1-i]=true;print("1")}
    }
    print(ans)
    return ans;
}



function memory_func(a){
    ans=[]
    for(let i=0;i<8;i++){
        ans.push(shapes[a[i]].value)
    }
    return ans;
}