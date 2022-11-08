const useIndexOf=(arr) =>{
    //indexOf的使用，indexOf分为单参数和多参数，不论那种参数类型，indexOf都是顺序遍历数组
// 单参数的indexOf的参数值是数组中的元素，只能传入基本类型，从起始位0开始索引，
// 如果数组中不存在传入参数的值，返回-1，存在返回索引值。
    let number = arr.indexOf(1); //索引值为1
    console.log('数组长度15,number=arr.indexOf(1);返回的索引值是: '+number);
    number=arr.indexOf(5);
    console.log('数组长度15,number=arr.indexOf(5);返回的索引值是: '+number);
    number=arr.indexOf(false);
    console.log('数组长度15,number=arr.indexOf(false);返回的索引值是: '+number)
//indexOf 的第二个参数fromIndex（起始索引值），
//证明indexOf是顺序遍历arr数组
    number=arr.indexOf(6,14);
//formIndex=14,从索引值=14的位置顺序遍历，包含14，已知arr数组中，元素6的索引是14
    console.log('数组的长度: '+arr.length);
    console.log('数组长度15,number=arr.indexOf(6,14);返回的索引值是: '+number);
//formIndex=14,从索引值=14的位置顺序遍历，包含14，已知arr数组中，元素7的索引是13
    number=arr.indexOf(7,14)
    console.log('数组长度15,number=arr.indexOf(7,14);返回的索引值是: '+number);
//如果formIndex<0,索引起始位置=arr.length-Math.abs(formIndex)
//formIndex的作用域在[-∞,arr.length)之间,及当formIndex<-arr.length时，
// 从0索引值处开始顺序遍历arr数组
    number=arr.indexOf(7,-15);
    console.log('数组长度15,number=arr.indexOf(7,-15);返回的索引值是: '+number)
    number=arr.indexOf(7,-100);
    console.log('数组长度15,number=arr.indexOf(7,-100);返回的索引值是: '+number)
    number=arr.indexOf(7,15);
    console.log('数组长度15,number=arr.indexOf(7,15);返回的索引值是: '+number)

}

