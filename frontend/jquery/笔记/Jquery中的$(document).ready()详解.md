# Jquery中的$(document).ready()详解

# $(document).ready()和onload的区别

  $(document).ready()和传统的方法<body οnlοad=”load()”> 相似，不同的是onload()的方法是在页面加载完成后才发生，这包括DOM元素和其他页面元素（例如图片）的加载。而$(document).ready()所要执行的代码是在DOM元素被加载完成的情况下执行，所以，使用document.ready()方法的执行速度比onload()的方法要快。

  Javascript 只有在DOM元素已经定义以后才可以对其执行某种操作，jQuery使用document.ready来保证所要执行的代码是在DOM元素被加载完成的情况下执行。

------

**比如**：

复制代码 代码如下:

```
< script type="text/javascript">
$(document).ready(function () {
alert("我的第一个jQuery代码!");
});
< /script>
```


这段代码的意思是：当Dom Tree加载完成后，显示警告信息。document.ready()和传统的方法<body οnlοad=”load()”> 相似，不同的是onload()的方法是在页面加载完成后才发生，这包括DOM元素和其他页面元素（例如图片）的加载，因此，使用document.ready()方法的执行速度比onload()的方法要快。



**最后要注意两点：**

确保在 <body> 元素的onload事件中没有注册函数，否则可能不会触发$(document).ready()事件。(
我尝试用下面的例子来演示这个情况，但是没有成功，所以我想这种情况只是可能发生。)

复制代码 代码如下:

```php+HTML
< html>
< head>
< title>My second jQuery</title>
< script type="text/javascript" src="/js/jquery.js"></script>
< script type="text/javascript">
//下面是load的函数含有jquery注册函数
$function load(){   $("p").append("<b>Hello</b>");}
//下面是jQuery的代码
$(document).ready(function () {$("p").append("我的第一个jQuery代码!");
$("p").append("<b>Hello</b>");});
< /script>
< /head>
< body οnlοad="load()">
< h2>jQuery 简单例子2</h2>
< p>I would like to say: </p>
< /body>
< /html>
```



可以在同一个页面中无限次地使用$(document).ready()事件。其中注册的函数会按照（代码中的）先后顺序依次执行。

**$(function(){…});** 

jQuery(function($) {…});  

$(document).ready(**function(){…}**)

这三个的作用是一样的，第一种、书写简单。

文档载入完成后执行的函数。



# $(function() {})”与“$(document).ready(function()

常能在页面中看到如下语句：

```xml
<script type="text/javascript">

 $(function(){
    
  $("#titleDiv").load("content.do?type=list");
    
 });
</script>
```

那么

```javascript
$(function() {})
```

是什么意思呢？这其实是一个jQuery函数，是当文档载入完成的时候执行的，也就是说文档载入完成后，执行：

```ruby
$("#titleDiv").load("content.do?type=list");
```

这里执行相当于：

```javascript
 $(document).ready(function(){ 

    $("#titleDiv").load("content.do?type=list");

 })
```

当然，如果两种方式都有的话：

```javascript
 $(document).ready(function(){ 

    $("#titleDiv").load("content.do?type=list");

 })

$(function(){

  $("#titleDiv").load("content.do?type=list");

 });
```

那么

```javascript
$(document).ready(function(){})
```

先被执行，而：

```javascript
$(function(){})
```

后被执行。