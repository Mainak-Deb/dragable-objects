function and_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output && shapes[a[i]].value
    }
    return output
}
function or_func(a){
    output=shapes[a[0]].value
    print(a)
    for(let i=1;i<a.length;i++){
        output=output || shapes[a[i]].value
    }
    return output
}
function not_func(a){
    output=!(shapes[a[0]].value)
    return output
}

function xor_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output ^ shapes[a[i]].value
    }
    return output
}

function nand_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output && shapes[a[i]].value
    }
    return !output
}
function nor_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output || shapes[a[i]].value
    }
    return !output
}
function xnor_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output ^ shapes[a[i]].value
    }
    return !output
}


function display_func(a){
    outputs=[]
    for(let i=0;i<a.length;i++){
        outputs.push([shapes[a[i]].output[1],shapes[a[i]].value])
        //print([shapes[a[i]].output[1],shapes[a[i]].value])
    }
    outputs.sort((a,b)=>{
        return a[0]-b[0];
    })
    //onsole.log("outputs",outputs)
    let sum=0
    for(let i=0;i<outputs.length;i++){
        if(outputs[i][1]){
            sum=sum+parseInt(Math.pow(2,i))
            print(parseInt(Math.pow(2,i)))
        }
    }
    return sum
}


function setclockspeed(){
    clockspeed= this.value()
}