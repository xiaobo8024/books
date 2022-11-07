window.onload = function(){
    let paginationUlEvent = document.getElementById("pagination-ul");
    let leftButton = document.createElement("button");
    let rightButton = document.createElement("button");
    let leftIcon = document.createElement("i");
    let rightIcon = document.createElement("i");
    let clickIndex = 0;

    leftButton.id = "pagination-btn-left";
    leftButton.style.cursor = "not-allowed";
    leftButton.appendChild(leftIcon);
    paginationUlEvent.appendChild(leftButton);

    for(let j = 1;j<8;j++){
        let li = document.createElement("li");
        let a = document.createElement("a");
        if(j === 1){
            li.className = "li-checked";
            a.className = "a-checked";
        }
        a.innerHTML = j;
        li.appendChild(a);
        paginationUlEvent.appendChild(li);
    }

    rightButton.id = "pagination-btn-right";
    rightButton.className = "isSelect";
    rightButton.style.cursor = "pointer";
    rightButton.appendChild(rightIcon);
    paginationUlEvent.appendChild(rightButton);


    let liEvent = document.getElementsByTagName("li");
    let aEvent = document.getElementsByTagName("a");

    for(let i=0;i<liEvent.length;i++){
        liEvent[i].onclick = function(e){
            removeCheckedClass();
            liEvent[i].className = "li-checked";
            aEvent[i].className = "a-checked";
            clickIndex = i;
            console.log(i,liEvent.length-1)
            select(i);
        }
    }

    function removeCheckedClass(){
        for(let i = 0;i<liEvent.length;i++){
            if(liEvent[i].className === "li-checked"){
                liEvent[i].className = "";
                aEvent[i].className = "";
            }
        }
    }

    function clickButtonEvent(i){
        removeCheckedClass();
        liEvent[i].className = "li-checked";
        aEvent[i].className = "a-checked";
        clickIndex = i;
        select(i);
    }

    leftButton.onclick = function () {
        console.log(leftButton.style)
        if(leftButton.style.cursor === "not-allowed"){
            return false;
        }else if(leftButton.style.cursor === "pointer"){
            if(clickIndex <= 0){
                return false;
            }else{
                let index = clickIndex - 1;
                clickButtonEvent(index);
            }
        }
    }

    rightButton.onclick = function () {
        if(rightButton.style.cursor === "not-allowed"){
            return false;
        }else if(rightButton.style.cursor === "pointer"){
            if(clickIndex >= liEvent.length-1){
                return false;
            }else{
                let index = clickIndex + 1;
                clickButtonEvent(index);
            }
        }
    }

    function select(i) {
        switch (i){
            case 0:
            {
                leftButton.style.cursor = "not-allowed";
                rightButton.style.cursor = "pointer";
                leftButton.className = "noSelect";
                rightButton.className = "isSelect";
            }
                break;
            case (liEvent.length - 1):
            {
                leftButton.style.cursor = "pointer";
                rightButton.style.cursor = "not-allowed";
                leftButton.className = "isSelect";
                rightButton.className = "noSelect";
            }
                break;
            default:
            {
                leftButton.style.cursor = "pointer";
                rightButton.style.cursor = "pointer";
                leftButton.className = "isSelect";
                rightButton.className = "isSelect";
            }
        }
    }

}
