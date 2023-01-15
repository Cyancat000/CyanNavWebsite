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
    axios.post('/json/get', {
        path: 'json/index.json'
    }).then(res=>{
        let data = res.data
        for(var key in data){
            console.log(data[key], key);
        }
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
getAll(".tab span").forEach(node=>{
    node.onclick=function(){
        get('.tab .active').className=''
        this.className='active'
    }
})


// render()
// axios.post('/json/sort')