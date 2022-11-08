### label标签 的for属性

for属性其实就是将label和表单控件绑定在一起，

##### 带label标签:

  选中输入框获得焦点，加了label 标签 input情况下，把label和input绑定在一起后，点击label也可以选中输入框。

##### 不带label标签：

选中输入框获得焦点，只有input情况下，我只能选中输入框。

    不加label用户名:
    <input type="text" name="" id="">
    <br>
    <label for="text">加了label用户名:</label>
    <input type="text" name="" id="text">
![1](../笔记/html\images\1.gif)