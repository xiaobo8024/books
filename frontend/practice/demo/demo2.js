function f() {
    let xmlHttp=new XMLHttpRequest();
    xmlHttp.onreadystatechange=function () {
        if(xmlHttp.readyState===4 && xmlHttp.status===200){
            console.log(xmlHttp.responseText);
        }
    }
    xmlHttp.open("get","demo.txt",true);
    xmlHttp.send();
}