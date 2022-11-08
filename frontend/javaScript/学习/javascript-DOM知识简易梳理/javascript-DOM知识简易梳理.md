

# javascript-DOM知识简易梳理

## HTML DOM 节点

在 HTML DOM (Document Object Model) 中, 每个东西都是 **节点** :

- 文档本身就是一个文档对象
- 所有 HTML 元素都是元素节点
- 所有 HTML 属性都是属性节点
- 插入到 HTML 元素文本是文本节点
- 注释是注释节点

------

## 元素对象

在 HTML DOM 中, **元素对象**代表着一个 HTML 元素。

元素对象 的 **子节点**可以是, 可以是元素节点，文本节点，注释节点。

**NodeList 对象** 代表了节点列表，类似于 HTML元素的子节点集合。

元素可以有属性。属性属于属性节点（查看下一章节）。

## 一、理解

DOM：Document Object Model 文档对象模型

要实现页面的动态交互效果，dom 操作远远不够，需要操作 html 才是核心。如何操作 htm，就是 DOM。简单的说，dom 提供了用程序动态控制 html 接口。DOM即文档对象模型描绘了一个层次化的节点树，运行开发人员添加、移除和修改页面的某一部分。dom 处于javascript 的核心地位上。

每个载入浏览器的 HTML 文档都会成为 Document 对象。Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。Document 对象是 Window 对象的一部分，可通过 window.document 属性对其进行访问。



- JavaScript常用的代码，有DOM操作、CSS操作、对象（Object对象、Array对象、Number对象、String对象、Math对象、JSON对象和Console对象）操作 原文：常用API合集 一、节点 1.1 节点属性 Nod…

- DOM（Document Object Model）： 文档对象模型其实就是操作 html 中的标签的一些能力我们可以操作哪些内容获取一个元素移除一个元素创建一个元素向页面里面添加一个元素给元素绑定…

- DOM 就是我们 html 结构中一个一个的节点构成的不光我们的标签是一个节点，我们写的文本内容也是一个节点，注释，包括空格都是节点DOM节点DOM 的节点我们一般分为常用的三大类 元…

  



![v2-195876a8c545cbd4c9810ed2515fbda1_720w](.\images\v2-195876a8c545cbd4c9810ed2515fbda1_720w.jpg)



## 二、节点

加载 HTML 页面时，Web 浏览器生成一个树型结构，用来表示页面内部结构。DOM 将这种树型结构理解为由节点组成，组成一个节点树。对于页面中的元素，可以解析成以下几种类型的节点：

![v2-1ff025edff511830ede40c019bcc3bd2_720w](.\images\v2-1ff025edff511830ede40c019bcc3bd2_720w.jpg)

```text
<!DOCTYPE html>
<html>
 <head>
 <meta charset="utf-8"   />
 <title>树!树!到处都是树!</title>
 </head>
 <body>
 <div title="属性节点">测试 Div</div>
 </body>
</html>
```

html -->文档节点

div -->元素节点

title -->属性节点

测试 Div -->文本节点

![v2-b3441e77279e002e6d5b4689c3a2c2a9_720w](.\images\v2-b3441e77279e002e6d5b4689c3a2c2a9_720w.jpg)

## 三、元素节点的操作

当HTML文档在被解析为一颗DOM树以后，里面的每一个节点都可以看做是一个一个的对象，我们成为DOM对象，对于这些对象，我们可以进行各式各样的操作，查找到某一个或者一类节点对象，可以创建某种节点对象，可以在某个位置添加节点对象，甚至可以动态地删除节点对象，这些操作可以使我们的页面看起来有动态的效果，后期结合事件使用，就能让我们的页面在特定时机、特定的事件下执行特定的变换。

### 1、获取节点

在进行增、删、改的操作时，都需要指定到一个位置，或者找到一个目标，此时我们就可以通过Document对象提供的方法，查找、定位某个对象（也就是我们说的节点）。

注意：操作 dom 必须等节点初始化完毕后，才能执行。处理方式两种:

a. 把 script 调用标签移到html末尾即可；

b. 使用onload事件来处理JS，等待html 加载完毕再加载 onload 事件里的 JS。

```text
window.onload = function() {
 // 预加载html后执行
 };
```

获取方式如下：

![v2-129ae71275595fc8941c935f5d382c73_720w](.\images\v2-129ae71275595fc8941c935f5d382c73_720w.jpg)

例子：

```text
 <!-- 根据id class获取元素 -->
 <p id="p1" class="paragraph">这是一个段落<span>文本</span></p>
 <p id="p2" class="paragraph">这又是一个段落</p>
 
 <!-- 根据name获取元素 -->
 <input type="text" name="txt" />
 <input type="checkbox" name="hobby" value="游泳" />游泳
 <input type="checkbox" name="hobby" value="篮球" />篮球
 <input type="checkbox" name="hobby" value="足球" />足球
 
 <hr />
 
 <!-- 根据标签名称获取元素 -->
 <!-- href="javascript:void(0)"：伪协议，表示不执行跳转，而执行指定的点击事件。 -->
 <a href="javascript:void(0);" onclick="testById();">根据id获取元素</a>
 <a href="javascript:void(0);" onclick="testByName();">根据name获取元素</a>
 <a href="javascript:void(0);" onclick="testByTagName();">根据标签名称获取元素</a>
 <a href="javascript:void(0);" onclick="testByClass();">根据class获取元素</a>
 
 <script type="text/javascript">
 // 根据id获取元素
 function testById() {
 // 返回单个对象
 var p = document.getElementById("p1");
 console.log(p);
 console.log(p.innerHTML); // 表示获取元素开始标签和结束标签之间的html结构
 console.log(p.innerText); //   表示获取标签之间的普通文本
 }
 
 // 根据name获取元素
 function testByName() {
 // 返回对象数组
 var hobby = document.getElementsByName("hobby");
 console.log(hobby);
 for(var i = 0; i < hobby.length; i++) {
 console.log(hobby[i].value);
 }
 }
 
 // 根据标签名称获取元素
 function testByTagName() {
 // 返回对象数组
 var input_arr = document.getElementsByTagName("input");
 for(var i = 0; i < input_arr.length; i++) {
 if(input_arr[i].type == "text") {
 console.log("text类型");
 } else if(input_arr[i].type == "checkbox") {
 if(input_arr[i].checked) {
 console.log(input_arr[i].value);
 }
 }
 }
 }
 
 // 根据class获取元素
 function testByClass() {
 // 返回对象数组
 var paragraph = document.getElementsByClassName("paragraph");
 console.log(paragraph[0].innerHTML);
 paragraph[0].innerHTML += "，这是一段新的文本";
 }
 </script>
```

说明：href="javascript:void(0)";伪协议，表示不执行跳转，而执行指定的点击事件。

根据ID获取：

![v2-fb6560fe5a9c411173284a4a1c133dd9_720w](.\images\v2-fb6560fe5a9c411173284a4a1c133dd9_720w.jpg)

根据name获取：

![v2-b5245dfe2a8598c0249d02ae443307a4_720w](.\images\v2-b5245dfe2a8598c0249d02ae443307a4_720w.jpg)

根据标签名称获取：

![v2-46ac31192515e337377bef83b0792790_720w](.\images\v2-46ac31192515e337377bef83b0792790_720w.jpg)

根据class获取：

![v2-389eaeb36e52492b85f6e3accd460a4f_720w](.\images\v2-389eaeb36e52492b85f6e3accd460a4f_720w.jpg)

### 2、创建节点和插入节点

很多时候我们想要在某个位置插入一个新的节点，此时我们首先需要有一个节点存在，可以通过以下几种方式创建新节点。

**创建节点**

![v2-609dd8c632f8ec0d0a6efc4d1ec6a179_720w](.\images\v2-609dd8c632f8ec0d0a6efc4d1ec6a179_720w.png)

**插入节点**

![v2-6193e04a0ae28de190dba45b5c7d5271_720w](.\images\v2-6193e04a0ae28de190dba45b5c7d5271_720w.jpg)

### 添加段落

```text
 <button onclick="add_para()">添加段落</button>
 <div id="container"></div>
 
 <script type="text/javascript">
 function add_para() {
 // 第一种方式
 // 根据id获取元素div
 var container = document.getElementById('container');
 // 创建p元素
 var paragraph = document.createElement('p');
 // 创建文本节点
 var txt = document.createTextNode('以后的你会感谢现在努力的你');
 // p元素添加文本节点
 //paragraph.appendChild(txt);
 // div元素添加p元素
 //container.appendChild(paragraph);
 
 // 第二种方式
 // 向p节点中添加内容
 //   paragraph.innerHTML = "以后的你会感谢现在努力的你";
 // 将p节点追加到container节点中
 //   container.appendChild(paragraph);
 
 // 第三种方式
 // 将字符串类型的p标签内容添加到container中
 // var   str = "<p>以后的你会感谢现在努力的你</p>";
 //   container.innerHTML += str;
 }
 </script>
```

![v2-7e0715b3ebfbfe7b20aaa791133fa5b1_720w](.\images\v2-7e0715b3ebfbfe7b20aaa791133fa5b1_720w.jpg)

### 添加图片

```text
 <button onclick="addImg();">添加图片</button>
 
 <div id="container"></div>
 
 <script type="text/javascript">
 // 添加图片
 function addImg() {
 // 创建img元素
 var img = document.createElement("img");
  // 设置属性第一种方式
  // 设置img元素的src属性
  // img.src =   "http://www.baidu.com/img/bd_logo1.png";
 
  // 设置属性第二种方式
  // setAttribute() 方法添加指定的属性，并为其赋指定的值。
  // 设置img元素的src属性
  img.setAttribute('src', 'http://www.baidu.com/img/bd_logo1.png');
  img.style.width = '540px';
  img.style.height = '258px';
  // 获取div元素
  var container = document.getElementById("container");
  // 将img元素节点追加到div元素中
 container.appendChild(img);
 }
 </script>
```

### 添加文本框

```text
<button onclick="addTxt();">添加文本框</button>
 
 <div id="container"></div>
 
 <script type="text/javascript">
 // 添加文本框
 function addTxt() {
 // 创建input元素
  var txt = document.createElement("input");
  // 设置类型第一种方式
  // txt.type ="text"; 
  // txt.value ="添加成功";
 
  // txt.type='password'
  // txt.value='123'
 
  // 设置类型第二种方式
  txt.setAttribute('type', 'text');
  txt.setAttribute('value', '添加成功');
 
  // 获取div元素
  var container = document.getElementById("container");
  // 将input节点追加到div元素中
  container.appendChild(txt);
 }
  </script>
```

![v2-4bae96ed148b9d7015c5a8d27d2e29e8_720w](.\images\v2-4bae96ed148b9d7015c5a8d27d2e29e8_720w.jpg)

### 添加选项框

```text
 <button onclick="addOptions()">添加选项</button>
 <select name="music">
 <option value="0">---请选择---</option>
 <option value="1">南山南</option>
 <option value="2">喜欢你</option>
 </select>
 
 <script type="text/javascript">
  // 添加下拉框的选项 
 function addOptions() {
  // 第一种方式
  // 创建下拉项
  var option = document.createElement("option");
  option.value = "3";
  option.text = "北京北京";
  // 获取下拉框
  var sel = document.getElementsByTagName("select")[0];
  // 添加下拉项 
  sel.appendChild(option);
 
  // 第二种方式
  var option = document.createElement("option");
  option.value = "4";
  option.text = "上海上海";
  // 获取下拉框
 var sel = document.getElementsByTagName("select")[0];
  // 添加下拉项
  sel.options.add(option);
 
  // 第三种方式
  var sel = document.getElementsByTagName("select")[0];
  sel.innerHTML   += "<option value='5'>松江松江</option>";
 }
 </script>
```

![v2-076fd49741739615ae34cd9263eab096_720w](.\images\v2-076fd49741739615ae34cd9263eab096_720w.jpg)

### 3、间接查找节点

![v2-52499dc729d4b3a1a719d55c24a490ec_720w](.\images\v2-52499dc729d4b3a1a719d55c24a490ec_720w.webp)

例子：

```text
 <button type="button" id="btn">测试按钮</button>
 
 <div id="dv">
 <form>
 <table>
 <input />
 <input />
 <input id="inp" />
 <span>
 <p></p>
  </span>
 </table>
 </form>
 </div>
 
 <script type="text/javascript">
 var dv = document.getElementById('dv');
 
 // childNodes返回元素的一个子节点的数组
 function get_childNodes() {
 console.log(dv.childNodes[1]); // 获取到form
 }
 
 // firstChild返回元素的第一个子节点
 function get_firstChild() {
 console.log(dv.firstChild);
 }
 
 // lastChild返回元素的最后一个子节点
 function get_lastChild() {
 console.log(dv.lastChild);
 }
 
 // nextSibling返回元素的下一个兄弟节点
 function get_nextSibling() {
 var inp = document.getElementById('inp');
 console.log(inp.nextSibling);
 }
 
 // parentNode返回元素的父节点
 function get_parentNode() {
 var inp = document.getElementById('inp');
 console.log(inp.parentNode);
 }
 
 // previousSibling返回元素的上一个兄弟节点
 function get_previousSibling()   {
 var inp = document.getElementById('inp');
 console.log(inp.previousSibling);
 }
 
 var btn = document.getElementById('btn');
 btn.onclick = get_previousSibling; // DOM 0级方式处理 解耦
 </script>
```

### 4、替换节点

![v2-a75f84acaa96fd4cbfaf06bd1f5343cb_720w](.\images\v2-a75f84acaa96fd4cbfaf06bd1f5343cb_720w.png)

第一种：获取父节点，然后用新的节点替换旧节点

父节点.replaceChild(newNode, oldNode);

第二种：通过旧节点定位到父节点，然后用新的节点替换旧节点

oldNode.parentNode.replaceChild(newNode, oldNode);

```text
 <div id="dv">
 <button type="button" id="btn">我是一个按钮</button><br />
  <button type="button" onclick="replace_child();">替换</button>
 </div>
 
 <script type="text/javascript">
 function replace_child() {
 // 第一种方式：获取父节点，然后用新的节点替换旧节点
 // 获取button元素
 var btn = document.getElementById('btn');
 // 创建p元素
 var p = document.createElement('p');
 p.innerText = '我是一个段落';
 // 获取到父元素div 用p元素替换button元素
 var dv = document.getElementById('dv');
 dv.replaceChild(p, btn);
 
 // 第二种方式：通过旧节点定位到父节点，然后用新的节点替换旧节点
 // 用p元素替换button元素
 // btn.parentNode.replaceChild(p,   btn);
 }
 </script>
```

替换前：

![v2-f7f7fb6be4f7d7e7330add9d2d827475_720w](.\images\v2-f7f7fb6be4f7d7e7330add9d2d827475_720w.png)

替换后：

![v2-c2a47c19bdacec61ce1b090f0a073e82_720w](.\images\v2-c2a47c19bdacec61ce1b090f0a073e82_720w.jpg)

### 5、克隆节点

var 复制好的节点 = 被复制的节点.cloneNode([true/false]);

true：深度克隆，可以克隆结构和内容

false(默认值)：只克隆结构

![v2-0e3c36b6b8f49827da23b48bebfbc559_720w](.\images\v2-0e3c36b6b8f49827da23b48bebfbc559_720w.png)

```text
 <ul id="src_ul">
 <li>red</li>
 <li>yellow</li>
 <li>blue</li>
 </ul>
 <button onclick="copy();">复制</button>
 <hr />
 <div id="copy_div"></div>
 
 <script type="text/javascript">
 function copy() {
 // 获取要复制的元素
 var src_ul = document.getElementById("src_ul");
 // 复制 true深度克隆，可以克隆结构和内容
 var copy_ul = src_ul.cloneNode(true);
 // 将复制好的内容添加到div中
 document.getElementById("copy_div").appendChild(copy_ul);
 }
 </script>
```

![v2-85f5b3e4ce1664d949695ffc83d1c86e_720w](.\images\v2-85f5b3e4ce1664d949695ffc83d1c86e_720w.jpg)

### 6、删除节点

![v2-a5feb1a0b07cfc56d2e74794b8023230_720w](.\images\v2-a5feb1a0b07cfc56d2e74794b8023230_720w.png)

第一种：获取父节点，然后删除子节点

父节点.removeChild(childNode);

第二种：通过旧节点定位到父节点，然后删除子节点

childNode.parentNode.removeChild(childNode);

```text
 <div id="del_dv">
  <span id="programmer">程序猿</span>
 <a href="javascript:void(0)" onclick="delNode();">删除</a>
 </div>
 
 <script type="text/javascript">
  function delNode() {
  // 第一种方式：获取父节点，然后删除子节点
  var dv = document.getElementById('del_dv');
  var programmer = document.getElementById("programmer");
 dv.removeChild(programmer);
 
 // 第二种方式：通过旧节点定位到父节点，然后删除子节点
 // var   programmer = document.getElementById("programmer");
 // programmer.parentNode.removeChild(programmer);
 }
 </script>
```

删除前：

![v2-2afd0d182e19e0b38a707ddaccdf3afc_720w](.\images\v2-2afd0d182e19e0b38a707ddaccdf3afc_720w.png)

删除后：

![v2-213f7835e7765a131ef2467ef2ab3b08_720w](.\images\v2-213f7835e7765a131ef2467ef2ab3b08_720w.jpg)

## 四、属性操作

在操作DOM对象时，除了可以操作对象整体之外，还可以更加灵活地操作对象中的各个属性。

![v2-1b6851031c27903bbcb9f1381eab5056_720w](.\images\v2-1b6851031c27903bbcb9f1381eab5056_720w.webp)

```text
 <input type="text" value="加油，胜利就在眼前" id="txt" class="test" /><br />
 性别：<input type="radio" checked="true" name="sex" value="1">男
   <input type="radio" name="sex" value="0">女
  <br />
 <img src="img/timg.jpg" id="sxtimg" title="sxt" />
 
 <script type="text/javascript">
 var txt = document.getElementById("txt");
 var sxtimg = document.getElementById("sxtimg");
 var sex = document.getElementsByName("sex")[0];
 
 // 获取值
 //   txt.getAttribute("class")// IE 不支持
 //   txt.getAttribute("className") //IE支持
  // 浏览器兼容操作
 var clz = (txt.getAttribute("class") == 'undefined') ? txt.getAttribute("className")   : txt.getAttribute("class");
 console.log(txt.getAttribute("id") + "-->" + txt.getAttribute("value") + "-->" +   clz);
 console.log(txt.value); // 获取文本
 console.log(sex.checked); // 获取状态是否选中
 
 // 修改值
 txt.className   = 'test1';
 sxtimg.style.display = 'none';
 txt.setAttribute("value", "success");
 txt.setAttribute("aaa", "000000"); // 自定义属性
 console.log(txt.getAttribute("aaa")); // 获取自定义属性值
 
 // 删除属性
 txt.removeAttribute("aaa");
 console.log(txt.getAttribute("aaa"));
 </script>
```

- 


