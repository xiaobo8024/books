//传统js写法
const useForI=(arr)=>{
    for (let i = 0; i < arr.length; i++) {
        console.log('fori循环中: '+JSON.stringify(arr[i]));
    }
}
//es6写法
const useForOf=(arr)=>{
    for (const arrElement of arr) {
        console.log('forOf循环中: '+JSON.stringify(arrElement));
    }
}
//es5写法
const useForIn=(arr)=>{
    for (let index in arr) {
        console.log('forIn循环中: '+JSON.stringify(arr[index]));
    }
}