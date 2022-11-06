
const useIncludes=(arr)=>{
    //includes的使用,arr.includes(arr[index]),如果存在返回true,不存在返回false,
    let flag = arr.includes(1);
    console.log('数组长度15,flag=arr.includes(1);返回的boolean值是: ' + flag)
    flag = arr.includes("abc");
    console.log('数组长度15,flag=arr.includes(abc);返回的boolean值是: ' + flag)
    flag = arr.includes(false);
    console.log('数组长度15,flag=arr.includes(false);返回的boolean值是: ' + flag)
    flag = arr.includes(null);
    console.log('数组长度15,flag=arr.includes(null);返回的boolean值是: ' + flag)
    flag = arr.includes(NaN);
    console.log('数组长度15,flag=arr.includes(NaN);返回的boolean值是: ' + flag)
}