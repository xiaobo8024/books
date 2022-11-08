

function paginationNick(opt){
    var pager={
        paginationBox:'',//分页容器-- 必填
        mainBox:'',//内容盒子--必填
        numBtnBox:'',//数字按钮盒子-- 必填
        btnBox:'',//按钮盒子 --必填
        ipt:'',//input class-- 必填
        goBtn:'',//go btn class --必填
        currentBtn:'',//当前按钮class name --必填
        pageCount:5,//每页显示几条数据
        numBtnCount:3,//当前页左右两边各多少个数字按钮
        currentPage:0,//当前页码data-page，首屏默认值
        maxCount:0,//ajax请求数据分成的最大页码
        data:[]//ajax请求的数据
    };
    pager = $.extend(pager,opt);
}

$.pager = undefined;

function goPage(btn){
    var obj={other:{},value:[11,22,33,44,55,66,77,88,99,0,11,22,33,44,55,66,77,88,99,0,11,22,33,44,55,66,77,88,99,0,11,22,33,44,55,66,77,88,99,0]};
    let data=obj.value;

   // let str= $("#aaacc").val();
   // let split = str.split(";");
   data.filter( function(item) {
       return item >= 5
   });
}