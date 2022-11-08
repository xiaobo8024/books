# js监听事件几种方法

### 1、通过方法响应点击事件

```
<div onclick="fn()" id="demo">点击</div>
function fn(){
	alert(111)
}
```

### 2、点击事件

```

<div id="demo">点击</div>

var aDiv=document.getElementById("demo")
aDiv.onclick=function(){
	alert(111)
}
```

### 3、监听点击事件

```
<div id="demo">点击</div>
<script>
var aDiv=document.getElementById("demo")
aDiv.addEventListener('click', function(){
	alert(111)
})
```

