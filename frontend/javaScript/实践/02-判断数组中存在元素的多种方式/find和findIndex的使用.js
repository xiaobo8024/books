const useFind=(arr)=>{
    //find的使用，find()方法返回数组中满足提供的测试函数的第一个元素的值，否则返回undefined.
    //find()方法无法检测数组中的undefined元素
    let number = arr.find((item) => item === 7);//找到了元素7，返回7
    console.log('数组长度15,number=arr.find((item)=>item===7);返回的值是: ' + number);
    number = arr.find((item) => item === 5);//没找到元素5，返回undefined
    console.log('数组长度15,number=arr.find((item)=>item===5);返回的值是: ' + number);
    number = arr.find((item) => item === undefined);//返回undefined,也不知道找到没找到undefined
    console.log('数组长度15,number=arr.find((item)=>item===undefined);返回的值是: ' + number);
    //对于复杂类型,需要特殊的判断
    number= arr.find((item)=> typeof item==='number' && isNaN(item));//NaN
    console.log('数组长度15,number= arr.find((item)=> typeof item===\'number\' && isNaN(item));返回的值是: ' + number);

    //array和object类型比较时，情况很复杂，因为每个元素类型都无法确定。
    //如果确定都是基本类型，如string,number,boolean,undefined,null等，可以将其转为字符串再进行比较
    //转字符串的方式也很多，如JSON.stringify(arr),arr.toString,arr.split('|')等
    //复杂点的，只能一项一项比较，或者使用递归
    console.log(['q', 'w', 'e'].toString());
    number=arr.find((item) => item.toString() ==='abc'); // abc
    console.log('数组长度15,number=arr.find((item)=>item.toString()===\'abc\');返回的值是: ' + number)
    // let arrJson = JSON.stringify(['q','w','e']);
    // console.log(arrJson);
    //数组比较
    number=arr.find((item)=>JSON.stringify(item) ===JSON.stringify(['q','w','e']));
    console.log('数组长度15,number=arr.find((item)=>JSON.stringify(item) ===JSON.stringify([\'q\',\'w\',\'e\']))返回的值是: ' + number);
    // console.log(typeof null);
    // number=arr.find((item)=>typeof item ==="object");
    //console.log(number);
    //对象比较
    number=arr.find((item)=>JSON.stringify(item) === JSON.stringify({id: 1, name: '十万个为什么', price: 100}));
    console.log('数组长度15,number=arr.find((item)=>JSON.stringify(item) === JSON.stringify({id: 1, name: \'十万个为什么\', price: 100}));返回的值是: ' + JSON.stringify(number));
};
const useFindIndex=(arr)=>{};