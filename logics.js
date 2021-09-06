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
    ans=[false,false,false,false,false,false,false,false,false];
    for(let i=0;i<8;i++){
        if(shapes[a[i]].value){add1=add1+"1"}
        else{add1=add1+"0"}

        if(shapes[a[i+8]].value){add2=add2+"1"}
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
    for(let i=0;i<9;i++){
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

function mux_func(a){
    ans=[]
    for(let i=8;i<11;i++){
        ans.push(shapes[a[i]].value)
    }
    print(ans)
    let val=arr_to_str_mem(ans)
    print(val)
    let b=parseInt(bin2dec(val))
    print(b)
    print(shapes[a[b]].value)
    return shapes[a[b]].value;
}

function demux_func(a){
    ans=[false,false,false,false,false,false,false,false]
    bin=[]
    for(let i=1;i<4;i++){
        bin.push(shapes[a[i]].value)
    }
    let val=arr_to_str_mem(bin)
    print(val)
    let b=parseInt(bin2dec(val))
    print(b)
    ans[b]=shapes[a[0]].value
    return ans;
}


function encoder_func(a){
    console.clear()
    let ans=[false,false,false]
    if(shapes[a[8]].value){
        let bin=0;
        for(let i=0;i<8;i++){
            if(shapes[a[i]].value){
                bin=i;break;
            }
        }
        let b=dec2bin(bin)
        if(b.length==1){b="00"+b}
        else if(b.length==2){b="0"+b}
        print(b)
        for(let i=0;i<=b.length;i++){
            if(b[i]=="1"){
                ans[i]=true
            }else{
                ans[i]=false
            }
        }
        print(ans)}
    return ans;
}

function decoder_func(a){
    console.clear()
    ans=[false,false,false,false,false,false,false,false]
    bin=[]
    for(let i=0;i<3;i++){
        bin.push(shapes[a[i]].value)
    }
    let val=arr_to_str_mem(bin)
    print("DECODER",val)
    let b=parseInt(bin2dec(val))
    print(b)
    ans[b]=shapes[a[3]].value
    return ans;
}


function multiply_func(a){
    console.clear()
    ans=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
    let m1=[],m2=[];
    for(let i=0;i<8;i++){
        m1.push(shapes[a[i]].value)
    }
    for(let i=8;i<16;i++){
        m2.push(shapes[a[i]].value)
    }
    console.log(m1,m2)
    let val=arr_to_str_mem(m1)
    let b1=parseInt(bin2dec(val))
    let val2=arr_to_str_mem(m2)
    let b2=parseInt(bin2dec(val2))

    console.log(b1,b2)
    let mul=b1*b2;
    mul=parseInt(mul)

    let bin=dec2bin(mul)
    print(bin)

    for(let i=0;i<bin.length;i++){
        if(bin[bin.length-1-i]=="1"){
            ans[ans.length-1-i]=true
        }else{
            ans[ans.length-1-i]=false
        }
    }

    return ans;
}