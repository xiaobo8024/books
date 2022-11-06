# javascript中attr是什么意思

> 在JavaScript中，attr是一种属性操作方法，该方法可以设置或返回被选元素的属性值，语法为“$(selector).attr(attribute)”或者“$(selector).attr(attribute,value)”。

本教程操作环境：windows10系统、javascript1.8.5版、Dell G3电脑。

## javascript中attr是什么意思

attr() 方法设置或返回被选元素的属性值。

**返回被选元素的属性值。**

语法

```
$(selector).attr(attribute)
```

attribute 规定要获取其值的属性。

**设置被选元素的属性和值。**

语法

```
$(selector).attr(attribute,value)
```

attribute 规定属性的名称。

value 规定属性的值。

**设置被选元素的属性和值。**

```
$(selector).attr(attribute,``function``(index,oldvalue))
```

attribute 规定属性的名称。

function(index,oldvalue)规定返回属性值的函数。

该函数可接收并使用选择器的 index 值和当前属性值。

**为被选元素设置一个以上的属性和值。**

语法

```
$(selector).attr({attribute:value, attribute:value ...})
```

attribute:value 规定一个或多个属性/值对。

示例如下：

```
<html>
head>
<script type="text/javascript" src="/jquery/jquery.js"></script>`
<script type="text/javascript">
$(document).ready(function(){
$("button").click(function(){
$("img").attr("width",function(n,v){
return v-50;});
});
});
</script>
</head>
<body>
<img src="/i/eg_smile.gif" width="128" height="128" />
<br /><button>
减少图像的宽0 像素</button>
</body>
</html>
```

输出结果：

![1644290042493690](.\images\1644290042493690.png)

点击按钮后：

![1644290048244634](.\images\1644290048244634.png)