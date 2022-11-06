function pager(obj) {

    //模拟数据
    // let obj = {
    //     other: {},
    //     value: [11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55,11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 100, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 0]
    //     //value: [12, 3, 4, 5, 6, 7, 8, 9, 10, 11, 2, 3, 4, 5, 6, 7]
    // };

    //ajax请求的数据
    let data = obj;
    // 　　几个必填的容器class，和几个可以修改的默认数据参数
    let pager = {
        paginationBox: 'pagination-nick',//分页容器--必填
        mainBox: 'main-box-nick',//内容盒子--必填
        btnBoxCon: 'btn-box-con', //按钮盒子容器
        numBtnBox: 'num-box-nick',//数字按钮盒子-- 必填
        btnBox: 'btn-box-nick',//按钮盒子 --必填
        ipt: 'page-ipt-nick',//input class-- 必填
        goBtn: 'go-btn-nick',//go btn class --必填
        currentBtn: 'active-nick',//当前按钮class name --必填
        pageSize: 5,//每页显示几条数据
        numBtnCount: 6,//当前页左右两边各多少个数字按钮
        currentPage: 1,//当前页码data-page，首屏默认值
        pageMaxCount: 0,//ajax请求数据分成的最大页码
        firstIndex: 0, //起始索引位置
        lastIndex: 0, //末尾索引位置
        dataMaxCount: 0, //数据总条数

    };
    //设置总索引数
    pager.dataMaxCount = data.length;
    //设置总页数
    pager.pageMaxCount = (pager.dataMaxCount % pager.pageSize) === 0 ? pager.dataMaxCount / pager.pageSize : Math.trunc(pager.dataMaxCount / pager.pageSize) + 1;
   // showFirstPage(pager.pageSize,data);
    pager=createNumBtn(pager);

    return pager;
}

// //首页展示
// function showFirstPage(size,data) {
//     for (let i = 0; i < size ; i++) {
//        let row = data[i];
//
//        console.log(row);
//     }
// }
//
// //跳转页展示
//
// //创建表单
// function createTable() {
//     //表单字符串
//     let strTable='';
//
// }


//填充pager的属性
function setPager(pager) {
    //起始索引位置
    pager.firstIndex = (pager.currentPage - 1) * pager.pageSize;
    //末尾索引位置
    pager.lastIndex = pager.currentPage * pager.pageSize <= pager.dataMaxCount ? pager.pageSize * pager.currentPage - 1 : pager.dataMaxCount - 1;
    return pager;
}


// 创建数字按钮
function createNumBtn(pager) {

    // 将数字按钮，需要注意的地方都加注释了
    let str = '';

    if (pager.pageMaxCount > pager.numBtnCount ) {//若最大页码数大于等于固定数字按钮总数（pager.numBtnCount）时
        //此页左边右边各numBtnCount个数字按钮
        str += "<button data-page='first' >首页</button>";
        str += "<button data-page='prev'   >上一页</button>";
        for (let i = 1; i <= pager.numBtnCount ; i++) {
            str += '<button data-page="' + i + '">' + i + '</button>';
        }

        //添加跳转
        str += "<button data-page='next'  >下一页</button>";
        str += "<button data-page='last'  >尾页</button>";

    } else {

        str = str += "<button data-page='first' >首页</button>";
        str += "<button data-page='prev'   >上一页</button>";
        for (let i = 1; i <= pager.pageMaxCount; i++) {
            str += '<button data-page="' + i + '">' + i + '</button>';
        }
        pager.numBtnCount=pager.pageMaxCount;
        //添加跳转
        str += "<button data-page='next'  >下一页</button>";
        str += "<button data-page='last'  >尾页</button>";

    }

    str += '<button id="go-btn-nick" data-page="go-btn-nick">跳转</button>' + '<input id="page-ipt-nick" type="text" name="page-ipt-nick">页';
    str += '<span>，  共'+pager.pageMaxCount+'页</span>'
    $('.' + pager.btnBoxCon).html(str);

    //每个btn绑定请求数据页面跳转方法
    $('.' + pager.btnBoxCon + ' button').each(function (i, v) {
        let btn = v.getAttribute('data-page');
        if (!isNaN(btn)) {
            $(this).addClass(pager.numBtnBox);
        }else {
            $(this).addClass(pager.btnBox);
        }

        $(this).click(function () {
            goPage(btn, pager);
        });
    });
 return pager;
}

//跳转页
function goPage(btn, pager) {

    let buts = $('.' + pager.btnBoxCon + ' button');

    //设置当前页码
    if (!isNaN(btn)) {//数字按钮
        $("button[data-page = " + pager.currentPage + "]").removeClass(pager.currentBtn);
        buts.each(function (i, v) {
            let index=i-1;
            let bt = v.getAttribute('data-page');
            if (!isNaN(bt)) {
                if(btn === index.toString()){
                    pager.currentPage = parseInt(bt);
                }
            }
        });
        $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
        pager = setPager(pager);
    } else {
        switch (btn) {
            //返回首页
            case 'first':
                buts.each(function (i, v) {
                    let btn = v.getAttribute('data-page');
                    if (!isNaN(btn)) {
                        $(this).text(i - 1  );
                        $(this).attr('data-page', i - 1 );
                    }
                });
                $("."+pager.currentBtn).removeClass(pager.currentBtn);
                pager.currentPage = 1;
                $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);

                pager = setPager(pager);
                break;
            //上一页
            case 'prev':

                if ( pager.currentPage > pager.pageMaxCount-pager.numBtnCount  + 1 && pager.currentPage <= pager.pageMaxCount) {
                    $("button[data-page = " + pager.currentPage + "]").removeClass(pager.currentBtn);
                    pager.currentPage--;
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                } else if ( pager.currentPage > 1 && pager.currentPage  <= pager.pageMaxCount-pager.numBtnCount  + 1) {

                    $("button[data-page = " + pager.currentPage + "]").removeClass(pager.currentBtn);
                    pager.currentPage--;
                    buts.each(function (i, v) {
                        let btn = v.getAttribute('data-page');
                        if (!isNaN(btn)) {
                            $(this).text(pager.currentPage + i - 2);
                            $(this).attr('data-page', pager.currentPage + i - 2);
                        }
                    });
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                 }
                pager = setPager(pager);
                break;
            //下一页
            case 'next':
                if (pager.currentPage >= 1 && pager.currentPage < pager.numBtnCount ) {
                    $("button[data-page = " + pager.currentPage + "]").removeClass(pager.currentBtn);
                    pager.currentPage = pager.currentPage + 1;
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);

                } else if (pager.currentPage >= pager.numBtnCount  && pager.currentPage < pager.pageMaxCount ) {
                    $("button[data-page = " + pager.currentPage + "]").removeClass(pager.currentBtn);
                    pager.currentPage++;
                    buts.each(function (i, v) {
                        let btn = v.getAttribute('data-page');
                        if (!isNaN(btn)) {
                            $(this).text(pager.currentPage -pager.numBtnCount  +i -1);
                            $(this).attr('data-page', pager.currentPage -pager.numBtnCount  +i -1);
                        }
                    });
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                }
                pager = setPager(pager);
                break;
            case 'last':
                pager.currentPage = pager.pageMaxCount;
                buts.each(function (i, v) {
                    let btn = v.getAttribute('data-page');
                    if (!isNaN(btn)) {
                        $(this).text(pager.currentPage - pager.numBtnCount + i-1);
                        $(this).attr('data-page', pager.currentPage - pager.numBtnCount + i-1);
                    }
                });
                $("."+pager.currentBtn).removeClass(pager.currentBtn);

                $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);

                pager = setPager(pager);
                break;
            case 'go-btn-nick':

                let page = parseInt($("#page-ipt-nick").val());
                if (page >= 1 && page <= pager.pageMaxCount) {
                    pager.currentPage = page;
                } else {
                    window.alert('不合理的跳转页数')
                }
                if(pager.currentPage >=1 && pager.currentPage <= pager.numBtnCount ){
                    buts.each(function (i, v) {
                        let btn = v.getAttribute('data-page');
                        if (!isNaN(btn)) {
                            $(this).text(i-1);
                            $(this).attr('data-page', i-1);
                        }
                    });
                    $("."+pager.currentBtn).removeClass(pager.currentBtn);
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                }else if(pager.currentPage<=pager.pageMaxCount && pager.currentPage > pager.pageMaxCount- pager.numBtnCount ){

                    buts.each(function (i, v) {
                        let btn = v.getAttribute('data-page');
                        if (!isNaN(btn)) {
                            $(this).text(pager.pageMaxCount-pager.numBtnCount+i -1);
                            $(this).attr('data-page',pager.pageMaxCount-pager.numBtnCount+i -1);
                        }
                    });
                    $("."+pager.currentBtn).removeClass(pager.currentBtn);
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                }else if(pager.currentPage>pager.numBtnCount && pager.currentPage<=pager.pageMaxCount-pager.numBtnCount){
                    buts.each(function (i, v) {
                        let btn = v.getAttribute('data-page');
                        if (!isNaN(btn)) {
                            $(this).text(pager.currentPage + i - 4);
                            $(this).attr('data-page', pager.currentPage + i - 4);
                        }
                    });
                    $("."+pager.currentBtn).removeClass(pager.currentBtn);
                    $("button[data-page = " + pager.currentPage + "]").addClass(pager.currentBtn);
                }
                pager = setPager(pager);
                break;
        }
    }

}
