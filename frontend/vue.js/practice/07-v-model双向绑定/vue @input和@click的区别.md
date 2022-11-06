# vue @input和@click的区别

@input 一般用于[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)事件

```
只要输入的值变化了就会触发input
   <input 
        :type="type" 
        :value="value" 
        :placeholder="placeholder" 
        :name="name" 
        @input="$emit('input',$event.target.value)"
    />
```


@click 事件触发事件

        <input type="text" @click="clickFn">
