# js中循环遍历的三种写法

定义数组；

```
<script>
let arr=[
    {id: 1, name: "百年孤独", price: 100},
    {id: 2, name: "去看你", price: 50},
    {id: 3, name: "白夜行", price: 80},
    {id: 4, name: "简爱", price: 90},
    {id: 5, name: "格林童话", price: 70},
];
useForI(arr);
useForIn(arr);
useForOf(arr);
</script>
```

#### 1、传统js写法

```
const useForI=(arr)=>{
    for (let i = 0; i < arr.length; i++) {
        console.log('fori循环中: '+JSON.stringify(arr[i]));
    }
}
```

#### 2、es5写法

```
const useForIn=(arr)=>{
    for (let index in arr) {
        console.log('forIn循环中: '+JSON.stringify(arr[index]));
    }
}
```

#### 3、es6写法

```
const useForOf=(arr)=>{
    for (const arrElement of arr) {
        console.log('forOf循环中: '+JSON.stringify(arrElement));
    }
}
```

#### 结果:

![1](.\images\1.png)

