function and_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output && shapes[a[i]].value
    }
    return output
}
function or_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output || shapes[a[i]].value
    }
    return output
}
function not_func(a){
    output=!(shapes[a[0]].value)
    console.log("not",a,output)
    return output
}

function xor_func(a){
    output=shapes[a[0]].value
    for(let i=1;i<a.length;i++){
        output=output ^ shapes[a[i]].value
    }
    return output
}