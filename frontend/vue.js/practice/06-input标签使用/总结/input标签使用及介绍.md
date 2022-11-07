# input标签使用及介绍

### 定义用法:

```
<input> 标签用于搜集用户信息。根据不同的 type 属性值，输入字段拥有很多种形式。输入字段可以是文本字段、复选框、掩码后的文本控件、单选按钮、按钮等等。 

<input> 标签可定义输入域的开始，在其中用户可输入数据。 
```

对于大量通常的**表单控件**，可以使用 <input> 标签来进行定义，其中包括文本字段、多选列表、可单击的图像和提交按钮等。

```
虽然 <input> 标签中有许多属性，但是对每个元素来说，只有type属性和name属性是必需的（提交或重置按钮只有 type 属性）。 

HTML 与 XHTML 之间的差异

在 HTML 中，<input> 标签没有结束标签。

在 XHTML 中，<input /> 标签必须被正确地关闭。
```

### 实例:

一个简单的 HTML 表单，包含两个文本输入框和一个提交按钮：

```
<form action="form_action.asp" method="get">

First name:

<input type="text" name="fname" />

Last name:

<input type="text" name="lname" />

<input type="submit" value="Submit" />

</form>
```

### 可选属性:

DTD 指示此属性允许在哪种 DTD 中使用。S=Strict, T=Transitional, F=Frameset.

| 属性                                                         | 值                           | 描述                                    | DTD  |
| ------------------------------------------------------------ | ---------------------------- | --------------------------------------- | ---- |
| [accept](https://baike.baidu.com/item/accept?fromModule=lemma_inlink) | *mime_type*                  | 规定通过文件上传来提交的文件的类型。    | STF  |
| [align](https://baike.baidu.com/item/align?fromModule=lemma_inlink) | left right top middle bottom | 不赞成使用。规定图像输入的对齐方式。    | TF   |
| [alt](https://baike.baidu.com/item/alt?fromModule=lemma_inlink) | text                         | 定义图像输入的替代文本。                | STF  |
| [checked](https://baike.baidu.com/item/checked?fromModule=lemma_inlink) | checked                      | 规定此 input 元素首次加载时应当被选中。 | STF  |
| [disabled](https://baike.baidu.com/item/disabled?fromModule=lemma_inlink) | disabled                     | 当 input 元素加载时禁用此元素。         | STF  |
| maxlength                                                    | number                       | 规定输入字段中的字符的最大长度。        | STF  |
| [name](https://baike.baidu.com/item/name?fromModule=lemma_inlink) | field_name                   | 定义 input 元素的名称。                 | STF  |
| readonly                                                     | readonly                     | 规定输入字段为只读。                    | STF  |
| [size](https://baike.baidu.com/item/size?fromModule=lemma_inlink) | number_of_char               | 定义输入字段的宽度。                    | STF  |
| [src](https://baike.baidu.com/item/src?fromModule=lemma_inlink) | URL                          | 定义以提交按钮形式显示的图像的 URL。    | STF  |
| type                                                         | button                       | 规定 input 元素的类型。                 | STF  |
| [value](https://baike.baidu.com/item/value?fromModule=lemma_inlink) | *value*                      | 规定 input 元素的值。                   | STF  |

### 属性:

**标准属性**：id, class, title, style, dir, lang, xml:lang

**事件属性：**tabindex, accesskey, onfocus, onblur, onselect, onchange, onclick, ondblclick, onmousedown, onmouseup, onmouseover, onmousemove, onmouseout, onkeypress, onkeydown, onkeyup

# 表单控件

### 表单控件作用：

在[图形用户界面](https://baike.baidu.com/item/图形用户界面?fromModule=lemma_inlink)(GUI :(Graphical User Interface，简称 GUI，又称图形用户接口))中屏幕上的一种对象，用户可操作该对象来执行对表单设计,修改等操作。

### 表单控件元素:

在HTML中，表单控件存在于Form表单中，例如：

### input 元素

```
可以完成文本输入，按钮，单选按钮，复选框，文本选择框等的设计 [1] 

语法:<input> 或 <input/>
```

### 属性

```
type：根据不同的type值，创建不同的input控件，可以是文本，密码，按钮形式

type取值：

按钮控件：<input type="button"/>

密码框控件：<input type="password"/>

选项框控件：<select></select>

选项框中的选项：<option></option>

隐藏域控件：<input type="hidden"/>【method 必须为 post，enctype 值必须为 multipart/form-data】

文件选择控件：<input type="file"/>

单选框控件：<input type="radio"/>

复选框控件：<input type="checkbox"/>

表单提交控件：<input type="submit">

单行文本输入控件：<input type="text"/>

多行文本输入控件：<textarea></textarea>

表单内容重置控件：<input type="reset"/>

<label></label>控件，此控件中放入以上其他控件，点击<label>标签任意一处都会执行其他

控件方法


```

