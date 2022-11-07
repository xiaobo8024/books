$(function () {
    //模拟数据
    let obj = {
        other: {},
        value: [11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 100, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0]
       // value: [12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 2, 3, 4, 5, 6, 7]
    };


    let pagerPop = pager(obj.value);
    CreateNewTabel();
    // setInterval(function () {
    //     console.log(pager1.currentPage);
    // },1000);

    $("." +pagerPop.btnBoxCon +' button').each(function () {
        //每点击一次是一页
        $(this).click(function () {
            let str='';
            console.log(pagerPop.currentPage);
            for (let j =pagerPop.firstIndex ; j <=pagerPop.lastIndex ; j++) {
                str += "<tr><td></td><td></td><td></td><td></td><td></td></tr>";
            }
            $("#inspector-table").append(str);
        });
    })

})


function CreateNewTabel() {
    let tableStr='<table id="inspector-table"  style="height: auto"; border="1px">' +
        '<thead><tr class="active">' +
        '<th>#</th>' +
        '<th>实例名</th>' +
        '<th>状态</th>' +
        '<th>实例总数</th>' +
        '<th>节点ID</th>' +
        '<th>节点IP</th>' +
        '<th>消费进度</th>' +
        '</tr>' +
        '</thead>' +
        '</table>';

    $(".main-box-nick").append(tableStr)
}

