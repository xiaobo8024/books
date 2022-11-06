const useLastIndexOf=(arr) =>{
    //lastIndexOf的使用.js，lastIndexOf的参数是数组的值，只能传入基本类型，lastIndexOf是从后往前查询
// 从索引值的最大值处往前查询，如果数组中不存在传入参数的值，返回-1，存在返回索引值。
   let number=arr.lastIndexOf(7);
    if(number>=0){
        console.log('number=arr.lastIndexOf(7);数组中存在7这个元素，返回值为索引值: '+number);
    }else {
        console.log('number=arr.lastIndexOf(7);数组中不存在7这个元素，返回值为: -1');
    }
//lastIndexOf的多参形式，第二个参数为formIndex(起始索引值)
//证明lastIndexOf是从逆顺序遍历数组，返回第一个遇到的元素的索引值
    number=arr.lastIndexOf(1,14);
    console.log('数组长度是:15, number=arr.lastIndexOf(1,14); 返回的索引值是:'+number);
// 如果formIndex>=arr.length,返回值不为-1,从最大索引值处开始逆顺序遍历数组
    number=arr.lastIndexOf(6,18);
    console.log('数组长度是:15, number=arr.lastIndexOf(6,18); 返回的索引值是:'+number);
//如果formIndex为负数，则从arr.length-Math.abs(formIndex)索引值处开始逆顺序遍历数组
    number=arr.lastIndexOf(1,-5)
    let num=arr.length-Math.abs(-5);
    console.log('从 arr.length-Math.abs(-5)=  '+num+'  开始逆顺序遍历arr数组');
    console.log('数组长度是:15, number=arr.lastIndexOf(1,-5); 返回的索引值是:'+number);
//如果 |Math.abs(-5)|>arr.length ,返回值为-1 及formIndex的值的作用域在[-arr.length,+∞)之间。
    number=arr.lastIndexOf(1,-16);
    console.log('数组长度是:15, number=arr.lastIndexOf(1,-20); 返回的索引值是:'+number)
}