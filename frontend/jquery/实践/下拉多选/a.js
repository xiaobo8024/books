// $(function (arr) {
//     // var data = "action=getlink&id="+$(".tel").val()
//     // $.getJSON("cl_sms.php",data,function(json){$("#chk").html(json.message);
//     // });
//
//     let inputName = '';
//     arr = ['北京', '大连', '上海', '济南', '广州', '金华', '武汉', '南京', '深圳', '天津', '成都', '长春', '杭州', '宁波', '青岛', '沈阳', '广东'];
//
//     //隐藏选择列表
//     let nr = document.getElementById("nr");
//     nr.style.display = 'none';
//     for (let i = 0; i < arr.length; i++) {
//         let li = document.createElement('li');
//         li.innerHTML = arr[i];
//         li.setAttribute('id', arr[i]);
//         document.getElementById("ul").appendChild(li);
//     }
//
//     //点击输入框，显示选择列表
//     let search = document.getElementById("search");
//     search.addEventListener("focus", function () {
//         nr.style.display = 'block';
//     });
//
//     // $("#search").focus(function(){
//     //     // $("#nr").show();
//     //     document.getElementById("nr").style.display='block';
//     // });
//
//     //输入内容展示选择列表
//     $("#search").keyup(function () {
//         var search = $("#search").val();
//         $("ul li").each(function () {
//             var name = $(this).attr("name");
//             var cityName = $(this).attr("cityName");
//             if (name.indexOf(search) !== -1
//                 || cityName.indexOf(search) !== -1) {
//                 $(this).show();
//             } else {
//                 $(this).hide();
//             }
//         });
//     });
//
//     //鼠标放在选择框的选择属性上变颜色
//     for (let i = 0; i < arr.length; i++) {
//         let el = document.getElementById(arr[i]);
//         el.addEventListener("mouseover", function () {
//             el.style.color = "red";
//             el.style.background = "#98bf21";
//         })
//
//         // $("#"+arr[i]).mouseover(function () {
//         //     $(this).css({
//         //         "color":"red",
//         //         "background-color":"#98bf21"
//         //     });
//         // })
//
//         el.addEventListener("mouseout", function () {
//             el.style.color = "";
//             el.style.background = "";
//         })
//
//         el.addEventListener("click", function () {
//             if (inputName !== '') {
//                 inputName += ';';
//             }
//             inputName += el.innerText;
//
//             search.val(inputName);
//
//             nr.hide();
//         })
//     }
//     //鼠标放在选择框的选择属性上变颜色
//     // $("ul li").mouseover(function(){
//     //     $(this).css({
//     //         "color":"red",
//     //         "background-color":"#98bf21"
//     //     });
//     // });
//
//
//
//     //鼠标一处选择框的选择属性换为原则框颜色
//     // for (let i = 0; i < arr.length; i++) {
//     //     $("#" + arr[i]).mouseout(function () {
//     //         $(this).css({
//     //             "color": "",
//     //             "background-color": ""
//     //         });
//     //     })
//     // }
//
//     // //鼠标一处选择框的选择属性换为原则框颜色
//     // $("ul li").mouseout(function(){
//     //     $(this).css({
//     //         "color":"",
//     //         "background-color":""
//     //     });
//     // });
//
//
//     // //点击选择框中的属性，赋值给text input
//     // for (let i = 0; i < arr.length; i++) {
//     //     $("#" + arr[i]).click(function () {
//     //         if (inputName !== '') {
//     //             inputName += ';';
//     //         }
//     //         inputName += $(this).text();
//     //
//     //         search.val(inputName);
//     //
//     //        nr.hide();
//     //     });
//     // }
//
//
//     // //点击选择框中的属性，赋值给text input
//     // $("ul li").click(function(){
//     //     if(inputName !==''){
//     //         inputName +=';';
//     //     }
//     //     inputName +=$(this).text();
//     //
//     //     $("#search").val(inputName);
//     //
//     //     $("#nr").hide();
//     // });
// });