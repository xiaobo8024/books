let select = function (obj) {
    let id = obj.id;
    let name = obj.name + ":";
    let items = obj.seArr;
    let marginLeft = (name.length - 1) * 14 + 4;
    let inputValue = '';
    let selectValue = '';
    //隐藏选择列表
    // let nr = document.getElementById("txb-nr");
    // nr.style.display = 'none';
    //获取div的id
    let win = document.getElementById(id);

    //生成不重复的inputId
    let selectId = Number(Math.random() + Date.now()).toString(36)
    //创建label标签
    let label = document.createElement("label");
    label.setAttribute("for", selectId);
    let span = document.createElement("span");
    span.innerText = name;
    label.appendChild(span);
    //创建input标签
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", selectId);
    input.setAttribute("name", "selectId");
    input.style.width = '200px';
    //添加到组件标签内
    win.appendChild(label);
    win.appendChild(input);

    //创建下拉框div
    let div = document.createElement("div");
    // div.style.cssText = "  margin-top:0;position:absolute;margin-left: 36px;height:300px;overflow-y:auto;display:none;"
    div.style.cssText = "  margin-top:0;position:absolute;height:300px;overflow-y:auto;display:none;"
    div.style.marginLeft = marginLeft + 'px';
    //创建ul标签
    let ul = document.createElement("ul");
    ul.style.cssText = "list-style:none;padding:0px;margin:0px;width:200px;line-height:22px;border:1px solid #99CC00; border-top:0px;font-size:12px;background-color:#FFFFFF;";

    div.appendChild(ul);
    //将下拉框div添加到组件div中
    win.appendChild(div);
    //点击输入框，显示选择列表
    let search = document.getElementById(selectId);
    search.addEventListener("mouseenter", function () {
        div.style.display = 'block';
    });

    for (let i = 0; i < items.length; i++) {
        let el = document.createElement('li');
        el.innerHTML = items[i];
        el.setAttribute('id', items[i]);
        ul.appendChild(el);

        el.addEventListener("mouseover", function () {
            el.style.color = "red";
            el.style.background = "#98bf21";
        })

        el.addEventListener("mouseout", function () {
            el.style.color = "";
            el.style.background = "";
        })

        el.addEventListener("click", function () {
            selectValue = this.innerText;
            inputValue = search.value;
            if (inputValue === '') {
                inputValue = selectValue + ';';
            } else {//inputValue
                let inputArr = inputValue.split(";");
                //去重
                inputArr = inputArr.reduce((pre, cur) => {
                    if (!pre.includes(cur)) {
                        return pre.concat(cur)
                    } else {
                        return pre
                    }
                }, []);
                //当前选择的是否在数组中
                if (inputArr.includes(this.innerText)) {
                    let temp = '';
                    for (let i = 0; i < inputArr.length; i++) {
                        if (inputArr[i] === '') {
                            continue;
                        }
                        temp += inputArr[i] + ';';
                    }
                    inputValue = temp;
                } else {
                    let temp = '';
                    for (let i = 0; i < inputArr.length; i++) {
                        if (inputArr[i] === '') {
                            continue;
                        }
                        temp += inputArr[i] + ';';
                    }
                    inputValue = temp + this.innerText + ';';
                }
            }

            search.value = inputValue;
            div.style.display = 'none';
        })
    }
    div.addEventListener("mouseleave", function () {
        div.style.display = 'none';
    });


    search.addEventListener("change", function () {
        let inputValue = search.value;
        let values = inputValue.split(';');
        inputValue = '';

        //将正确的条件重新拼接
        for (let i = 0; i < values.length; i++) {
            if (items.includes(values[i])) {
                if (inputValue !== '') {
                    inputValue += ';';
                }
                inputValue += values[i];
            }
        }

        inputValue = inputValue === '' ? '' : inputValue + ';';
        search.value = inputValue;
    })

    //输入内容展示选择列表
    search.addEventListener("keyup", function () {
        let value = search.value;
        let values = value.split(';');
        for (let i = 0; i < items.length; i++) {
            if (items[i].includes(values[values.length - 1])) {
                document.getElementById(items[i]).style.display = 'block';
            } else {
                document.getElementById(items[i]).style.display = 'none';
            }
        }
    })
};
