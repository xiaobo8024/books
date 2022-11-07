# CSS——选择器的使用

# 1、常用选择器

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>选择器</title>
    <style>
      /* 需求一：h1标题变红色 */
      h1{
        color: red;
      }
      /* 1、元素选择器
         作用：选中对应的标签
         语法：标签名{}
         例如：h1{},h3{},p{}
      */
      /* 需求二：将第一句诗变绿色 */
      #p1{
        color: green;
      }
      /* 2、id选择器  
        作用：选中对应的id属性值的内容,id属性值不能复用
        语法：#id属性值{}
      */
      /* 需求三：将第二句诗、第三句诗都变棕色 */
      .p2{
        color: orange;
      }
      /* 3、class选择器
       作用：选中对应的class属性值的内容，可以复用属性值
       语法：.class属性值{}
       */
      /* 需求四：给所有的标签字体变为24px */
      *{
        font-size: 34px;
      }
      /* 4、通配选择器
         语法：*{}
      */
    </style>
  </head>
  <body>
    <div>
      <h1>登高</h1>
      <h3>杜甫</h3>
      <p id="p1">风急天高猿啸哀，渚清沙白鸟飞回。</p>
      <p class="p2">无边落木萧萧下，不尽长江滚滚来。</p>
      <p class="p2">万里悲秋常作客，百年多病独登台。</p>
      <p>艰难苦恨繁霜鬓，潦倒新停浊酒杯。</p>
    </div>
  </body>
</html>
```

# 2、复合选择器

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 复合选择器 
      1、交集选择器
      作用：选中符合多个选择器条件的内容
      语法：选择器1选择器2选择器3···{}
      例如：div.red{},#div2.red{}
       注意：如果选择器中有元素选择器，必须把元素选择器放在前面
      2、并集选择器
        作用：同时选中符合多个选择器对应的内容
        语法：选择器1,选择器2,选择器3····{}
        例如：.red,#p2,h1{}
    -->
    <style>
      /* 需求一：将class为red的诗句变为红色，同时将class为red的div字体变为24px */
      .red {
        color: red;
      }
      div.red {
        font-size: 24px;
      }
      /* 需求二：将h1,h3字体颜色变为黄色*/
      h1,h3 {
        color: orange;
      }
    </style>
  </head>
  <body>
    <h1>满江红·写怀</h1>
    <h3>岳飞·宋</h3>
    <p class="red">怒发冲冠，凭栏处、潇潇雨歇。</p>
    <div class="red">抬望眼，仰天长啸，壮怀激烈。</div>
    <div>三十功名尘与土，八千里路云和月。</div>
    <p>莫等闲，白了少年头，空悲切！</p>
    <p>靖康耻，犹未雪。臣子恨，何时灭！</p>
    <p>驾长车，踏破贺兰山缺。</p>
    <p>壮志饥餐胡虏肉，笑谈渴饮匈奴血。</p>
    <p>待从头、收拾旧山河，朝天阙。</p>
  </body>
</html>
```

# 3、关系选择器

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 需求一：通过父元素div，给它的子元素p设置一个字体颜色红色 */
      /* #school > p {
        color: red;
      } */
      /* 1、子元素选择器
      作用：通过指定的父元素找到指定的子元素
      语法：父元素>子元素{}
      */
      /* 需求二：div里的span元素字体都变为30px */
      /* #school span {
        font-size: 30px;
      } */
      /* 2、后代选择器 
       作用：通过指定的祖先元素找到指定的后代元素
       
       语法：祖先元素 后代元素{}
      */
      /* 需求三： 通过前端，找到java，然后java字体颜色变为blue*/
      .p1 + .p2 {
        color: blue;
      }
      /* 3、选择下一个兄弟选择器
      作用：通过指定的元素找到下一个兄弟元素
      语法：兄+弟{}
      
      */
 
      /* 四:选择下面所有的兄弟(前面的不选)
      语法：兄～弟{}  
      */
      .p1 ~ p {
        font-size: 40px;
      }
    </style>
  </head>
  <body>
    <div id="school">
      学校
      <p class="p1">
        前端
        <span>web2208 </span>
        <span>web2209</span>
      </p>
      <p class="p2">
        后端
        <span>java2214</span>
        <span>java2215</span>
      </p>
      <p>设计</p>
    </div>
 
    <!-- 元素之间的关系
       父元素  直接包含子元素的元素
       子元素  直接被父元素包含的元素
       祖先元素  直接或间接包含元素的元素   包括父元素
       后代元素  直接或间接被包含元素的元素  包括子元素
       兄弟关系  拥有共同的父元素的元素
    -->
  </body>
</html>
```

# 4、属性选择器

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>属性选择器</title>
    <style>
      /* 需求一：有title属性的p标签，颜色变为红色 */
      /* 1:属性选择器
            语法：[属性名]{} 选择含有指定属性的元素
                 [属性名=属性值]{} 选择含有指定属性和属性值的元素
                 [属性名^=属性值]{} 选择属性值以指定值开头的元素  
                 [属性名$=属性值]{} 选择属性值以指定值结尾的元素
                 [属性名*=属性值]{} 选择属性值含有某值的元素
    */
      [title*="ab"] {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1 title="a" id="hh" class="hhh">满江红·写怀</h1>
    <h3 title="b">岳飞·宋</h3>
    <p>····</p>
    <p title="abc">靖康耻，犹未雪。臣子恨，何时灭！</p>
    <p title="abcda">驾长车，踏破贺兰山缺。</p>
    <p>壮志饥餐胡虏肉，笑谈渴饮匈奴血。</p>
    <p>待从头、收拾旧山河，朝天阙。</p>
  </body>
</html>
```

# 5、伪类选择器

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*知识点1:去掉项目符号*/
 
      /* 一 、伪类（不存在的类，特殊的类）
          -伪类用来描述一个元素的特殊状态
          -比如：第一个元素，被点击的元素，鼠标移入的元素···
          -特点：一般请情况下，使用：开头
             1、 :first-child  第一个子元素
             2、 :last-child   最后一个子元素
             3、 :nth-child()  选中第n个子元素
                   特殊值： n    所有的
                          2n或even  选中偶数
                          2n+1或odd  选中奇数
          —以上这些伪类都是根据所有的子元素进行排序
             1、:first-of-type   第一个子元素
             2、:last-of-type     最后一个子元素
             3、:nth-of-type()    选中第n个子元素
                  功能跟上面相似，
              不同的是，这是在同类型的子元素中去选择           
               */
      /* 二、:not() 否定伪类
           -将符合条件的元素从选择器中去除 
     */
 
      /* 需求一：将ul里的第一个li一直设置为红色 */
      li:not(.l1){
        color: red;
      }
    </style>
  </head>
  <body>
    <h1>沁园春·雪</h1>
    <h3>毛泽东</h3>
    <ul>
      <span>测试</span>
      <li class="l1">望长城内外，惟余莽莽；大河上下，顿失滔滔。</li>
      <li>北国风光，千里冰封，万里雪飘。</li>
      <li>山舞银蛇，原驰蜡象，欲与天公试比高。</li>
      <li>须晴日，看红装素裹，分外妖娆。</li>
      <li>江山如此多娇，引无数英雄竞折腰。</li>
      <li>惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。</li>
      <li>一代天骄，成吉思汗，只识弯弓射大雕。</li>
    </ul>
  </body>
</html>
```

# 6、选择器的权重

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 样式冲突 通过不同的选择器选中同一个元素，进行一样的样式设定
         发生样式冲突时，应用哪一个样式由选择器的权重（优先级）决定-->
    <style>
      /* 选择器的权重    
           !important               最高优先级  
           内联样式                                1000  
           id选择器                                100
           类和伪类选择器/属性选择器                   10
           元素选择器                                1
           通配符、子选择器、相邻选择器等。如*、>、+     0000
           继承的样式      没有优先级
        
        注意：
            1、比较优先级时，需要将所有选择器的优先级进行相加计算，最后优先级越高，则优先显示
            2、(并集选择器)分组选择器是单独计算的
            3、如果优先级计算后相同，此时则优先使用靠下的样式
            4、选择器的累加，不会超过上一级数量级，例如：类选择器再高也不会超过id选择器  量变达不到质变 
          
            一般来说：
            选择器越具体，优先级越高
            
            !important  慎用   */
 
      /* div{
        background-color: red;
      } */
      /* [class]{
        background-color: royalblue;
      }  */
      #d1 {
        background-color: slategray;
      }
 
      .dd.ddc.ddce.ddcf {
        background-color: pink;
      }
 
      /* .dd{
        background-color: powderblue;
      }*/
 
      /* span{
        background-color: sienna;
      } */
    </style>
  </head>
  <body>
    <!-- style="background-color: seagreen"  -->
    <div id="d1" class="dd ddc ddce ddcf">
      我是div元素
      <span>我是div中的span元素</span>
      <em>我是div中的em元素</em>
    </div>
  </body>
</html>
```

