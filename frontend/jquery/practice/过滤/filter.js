window.onload=function demo() {
    let arr=[
        {name: '张三',age:18,address: '深圳'},
        {name: '张四',age:18,address: '深圳'},
        {name: '张三',age:19,address: '深圳'},
        {name: '张四',age:20,address: '深圳'},
        {name: '张五',age:18,address: '上海'},
        {name: '张三',age:18,address: '深圳'},
        {name: '张六',age:19,address: '上海'},
        {name: '张三',age:18,address: '深圳'},
        {name: '张四',age:18,address: '上海'},
        {name: '张三',age:19,address: '深圳'},
        {name: '张六',age:18,address: '上海'},
        {name: '张三',age:20,address: '深圳'},
        {name: '张六',age:18,address: '深圳'},
        {name: '张三',age:19,address: '深圳'},
        {name: '张四',age:18,address: '上海'},
        {name: '张三',age:20,address: '深圳'},
    ]

    let aaa='张三;张四;张六;';
    arr=arr.filter(function (item) {

        return aaa.includes(item.name);
    })

    console.log(arr);

}