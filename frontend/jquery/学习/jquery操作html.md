# 一、jquery操作html

## 1.获取内容和属性

```
text() - 设置或返回所选元素的文本内容 
html() - 设置或返回所选元素的内容（包括 HTML 标记） 
val() - 设置或返回表单字段的值
attr()- 方法用于获取属性值。
```

实例：

```
<span style="font-size:18px;">$("#btn1").click(function(){
  alert("Text: " + $("#test").text());
});
$("#btn2").click(function(){
  alert("HTML: " + $("#test").html());
});
</span>
<pre><span style="font-size:18px;">$("button").click(function(){
  alert($("#w3s").attr("href"));
});
</span>
```

## 2、设置内容 - text()、html() 以及 val()

实例：

```
<span style="font-size:18px;">$("#btn1").click(function(){
  $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
  $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
  $("#test3").val("Dolly Duck");
});
</span>
<pre><span style="font-size:18px;">$("button").click(function(){
  $("#w3s").attr("href","http://www.w3school.com.cn/jquery");
});
</span>
```

## 3、添加元素

```
append() - 在被选元素的结尾插入内容 
prepend() - 在被选元素的开头插入内容 
after() - 在被选元素之后插入内容 
before() - 在被选元素之前插入内容
```

实例：

```
<span style="font-size:18px;">function appendText()
{
var txt1="<p>Text.</p>";               // 以 HTML 创建新元素
var txt2=$("<p></p>").text("Text.");   // 以 jQuery 创建新元素
var txt3=document.createElement("p");  // 以 DOM 创建新元素
txt3.innerHTML="Text.";
$("p").append(txt1,txt2,txt3);         // 追加新元素
}
</span>
<pre><span style="font-size:18px;">function afterText()
{
var txt1="<b>I </b>";                    <span class="code_comment">// 以 HTML 创建新元素</span>
var txt2=$("<i></i>").text("love ");     <span class="code_comment">// 通过 jQuery 创建新元素</span>
var txt3=document.createElement("big");  <span class="code_comment">// 通过 DOM 创建新元素</span>
txt3.innerHTML="jQuery!";
$("img").after(txt1,txt2,txt3);          <span class="code_comment">// 在 img 之后插入新元素</span>
}
</span>
```

## 4、删除元素

```
remove() - 删除被选元素（及其子元素） 
empty() - 从被选元素中删除子元素 
```

## 5、操作css

```
addClass() - 向被选元素添加一个或多个类 
removeClass() - 从被选元素删除一个或多个类 
toggleClass() - 对被选元素进行添加/删除类的切换操作 
css() - 设置或返回样式属性 
```

举例：

```
<span style="font-size:18px;">$("button").click(function(){
  $("h1,h2,p").addClass("blue");
  $("div").addClass("important");
});
</span>
```

# 二、JQuery遍历

## 1、什么是遍历？

jQuery 遍历，意为“移动”，用于根据其相对于其他元素的关系来“查找”（或选取）HTML 元素。以某项选择开始，并沿着这个选择移动，直到抵达您期望的元素为止。

![20140815173357359](.\images\20140815173357359.png)

解释：



```
①<div> 元素是 <ul> 的父元素，同时是其中所有内容的祖先。 
②<ul> 元素是 <li> 元素的父元素，同时是 <div> 的子元素 
③左边的 <li> 元素是 <span> 的父元素，<ul> 的子元素，同时是 <div> 的后代。 
④<span> 元素是 <li> 的子元素，同时是 <ul> 和 <div> 的后代。 
⑤两个 <li> 元素是同胞（拥有相同的父元素）。 
⑥右边的 <li> 元素是 <b> 的父元素，<ul> 的子元素，同时是 <div> 的后代。 
⑦<b> 元素是右边的 <li> 的子元素，同时是 <ul> 和 <div> 的后代。 
```

## 2、向上遍历

```
parents() 方法返回被选元素的所有祖先元素，它一路向上直到文档的根元素 (<html>)。

parent() 方法返回被选元素的直接父元素。

parentsUntil() 方法返回介于两个给定元素之间的所有祖先元素
```

举例

```
<span style="font-size:18px;">$(document).ready(function(){
  $("span").parentsUntil("div");
});
</span>
```

## 3、向下遍历

```
children() 方法返回被选元素的所有直接子元素。

find() 方法返回被选元素的后代元素，一路向下直到最后一个后代。
```

## 4、同辈遍历

```
next() 方法返回被选元素的下一个同胞元素。
nextAll() 方法返回被选元素的所有跟随的同胞元素。
nextUntil() 方法返回介于两个给定参数之间的所有跟随的同胞元素
```

## 5、过滤

```
first() 方法返回被选元素的首个元素。
last() 方法返回被选元素的最后一个元素。
eq() 方法返回被选元素中带有指定索引号的元素。
filter() 方法允许您规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回。
not() 方法返回不匹配标准的所有元素。
```


例如

```
<span style="font-size:18px;">$(document).ready(function(){
  $("p").not(".intro");
});
</span>
```

```
<pre><span style="font-size:18px;">$(document).ready(function(){
  $("div p").last();
});
</span>
```

```
$(document).ready(function(){
  $("div p").last();
});
```