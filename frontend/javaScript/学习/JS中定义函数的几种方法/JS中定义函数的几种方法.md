# JS中定义函数的几种方法




##### 1.第一种定义方式：

```
function  函数名 () { 函数体 }；
调用：函数名 () ;
```

##### 2.第二种定义方式：

```
var  函数名  =  new  Function("参数列表","函数体");
调用：函数名 () ;
```

##### 3.第二种定义方式：

```
var  函数名  =  new  function () { 函数体 }；
调用：函数名 ;   //直接调用
```

##### 4.第四种定义方式（匿名函数）：

```
var  函数名  =  function () { 函数体 }；

调用：函数名 () ;
```
代码举例：


       <script>
         //第一种定义方式
         function demo1() {
         console.log("hhhh1");
         }
         demo1();
            
       //第二种定义方式：Function("参数列表","函数体");
        var demo2 = new Function("", "console.log('xixixiiixi')");
        demo2();
     
        //第三种定义方式
        var demo3 = new function () {
            console.log("heiheiehiehiehiehi");
        }
        demo3;  //直接调用
     
        //第四种定义方式：最常用的匿名函数法
        var m1 = function () {
            console.log(55555555555);
        }
        m1();
    </script>
