axios.defaults.baseURL = "http://127.0.0.1:3000"


//封装获取DOM节点函数
function get(node){
    return document.querySelector(node)
}
function getAll(node){
    return document.querySelectorAll(node)
}


//渲染页面
function render(){
    let list = get('.list')
    axios.post('/json/get', {
        path: 'json/index.json'
    }).then(res=>{
        let data = res.data
        for(var key in data){
            let box = document.createElement('div')
            box.className=key
            list.appendChild(box)
            data[key].forEach(i=>{
                let link = document.createElement('a')
                link.innerHTML=i[0]
                link.href=i[1]
                box.appendChild(link)
            })
        }
        getAll('.list > div')[0].classList.add('active')
    })
}

//将json数据排字符序
function sort() {
    axios.post('/json/get', {
        path: 'json/index.json',
    }).then(res => {
        let data = res.data
        for (var key in data) {
            data[key].sort()
        }
        return data
    }).then(data => {
        axios.post('/json/save', {
            path: 'index.json',
            data: data
        }).then(res => {
            console.log(res);
        })
    })
}

//绑定下方栏点击事件
getAll(".tab span").forEach((node,index)=>{
    node.onclick=function(){
        get('.tab .active').className=''
        get('.list .active').classList.remove('active')
        getAll('.list > div')[index].classList.add('active')
        this.className='active'
    }
})

render()
// axios.post('/json/sort')