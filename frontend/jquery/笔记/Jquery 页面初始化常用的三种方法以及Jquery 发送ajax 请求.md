# Jquery 页面初始化常用的三种方法以及Jquery 发送ajax 请求

第一种 

```
$(document).ready(function(){ 
//文档就绪事件   
}); 
```

第二种是第一种的简略写法，效果上和第一种是等效的。 

```
$(function(){
//文档加载事件，整个文档加载完成后执行。就仅仅只需要加载所有的DOM结构，在浏览器把所有的HTML放入DOM tree之前就执行js效果。包括在加载外部图片和资源之前。  });
```

 第三种

```
 jQuery(function($){
 
 });
  window.onload=function(){
 //onload事件是js 中的代码 onload 事件发生在读取HTML,内存中生成DOM 树，渲染页面这三件事情完成后，才发生onload 事件。整个页面的document全部加载完成以后执行。不幸的这种方式不仅要求页面的DOM tree全部加载完成，而且要求所有的外部图片和资源全部加载完成。更不幸的是，如果外部资源，例如图片需要很长时间来加载，那么这个js效果就会让用户感觉失效了。 }
```

 简化写法window.onload没有简化写法$(document).ready(function(){})可以简写成$(function(){}); $ 符号是来自 JS 库常用的 " selector " 意思例如 JQuery 里$ 就是 Selector 的缩写函数例子 $(this)就是 " 选择现在这个 " 的意思。 

```
$.ajax({   

  url:"请求地址", 

  type:"请求方式",  

  data:"请求参数"，

  dataType:"服务器返回数据类型"，

  success:"服务器处理正常后对应的回调函数"

  error:“服务器出错对应的回调函数” });
```

