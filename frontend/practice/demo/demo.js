$(function () {
    //隐藏下拉框
    $("#conditionItem").hide();
    //input输入框的值
    let item='';
    //下拉框选中的值
    let selectValue='';

    let conditionItem=['A-你','A-好','B-啊','B-他','C-五','C-六'];
    let xmlHttp=new XMLHttpRequest();
   // let conditionItem;


    //发请求
    // $("#conditionBut").click(function () {
    //     if(conditionItem==='undefined'){
    //         xmlHttp.onreadystatechange=function () {
    //             if(xmlHttp.readyState===4 && xmlHttp.status===200){
    //                 conditionItem=xmlHttp.responseText;
    //             }
    //         }
    //         xmlHttp.open("get","demo.txt",true);
    //         xmlHttp.send();
    //     }
    // })

    //遍历列表里的条件添加到下拉框中
    for (let i = 0; i < conditionItem.length; i++) {
        $("#conditionItem").append("<li style='list-style: none' id="+conditionItem[i]+">"+conditionItem[i]+"</li>");

        // $("#conditionItem[i]").click(function () {
        //     //对下拉框的值进行追加
        //     if(item!==''){
        //         if(item.lastIndexOf(";")!==(item.length-1)){
        //             item +=';';
        //         }
        //     }
        //     selectValue=$(this).text();
        //     item += selectValue;
        //     $("#search").val(item);
        //
        //     $("#conditionItem").hide();
        // })
    }
    //鼠标移动到输入框，显示下拉框
    $("#search").mouseover(function (){
        $("#conditionItem").show();
    });
    //鼠标移动出下拉框，隐藏下拉框
    $("#conditionItem").mouseleave(function (){
        $("#conditionItem").hide();
    });

    //点击选中的下拉框的值，放入到输入框中
    for (let i = 0; i < conditionItem.length; i++) {
        $("#"+conditionItem[i]).click(function () {
            //对下拉框的值进行追加
            if(item!==''){
                if(item.lastIndexOf(";")!==(item.length-1)){
                    item +=';';
                }
            }
            selectValue=$(this).text();
            item += selectValue;
            $("#search").val(item);

            $("#conditionItem").hide();
        })
    }

    // $("ul li").click(function () {
    //     //对下拉框的值进行追加
    //     if(item!==''){
    //         if(item.lastIndexOf(";")!==(item.length-1)){
    //             item +=';';
    //         }
    //     }
    //     selectValue=$(this).text();
    //     item += selectValue;
    //     $("#search").val(item);
    //
    //     $("#conditionItem").hide();
    // });

    //如果输入框改变
    $("#search").change(function () {

        item=$("#search").val();
        let items = item.split(";");
        item='';

        //如果输入的值不包含在数组里就搜索。
        if(!conditionItem.includes(items[items.length])){
            //TODO
        }

        for (let i = 0; i < items.length; i++) {
            if(conditionItem.includes(items[i])){
                if(item!==''){
                    item +=';';
                }
                item += items[i];
            }
        }
        $("#search").val(item);
    });

});