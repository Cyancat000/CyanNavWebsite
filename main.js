const express = require('express')
const app = express()
var fs = require("fs");

// 允许跨域
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
    res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
    next();
});

// 公开指定目录
app.use('/app', express.static('./'));

//JSON处理
app.use(express.json())

//读取json文件数据
app.post('/json/get', (req, res) => {
    console.log(req.body);
    fs.readFile('json/index.json', function (err, data) {
        if (err) {
            res.send(err)
        } else {
            res.send(data)
        }
    })
})

//向json文件添加数据
app.post('/json/append', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

//创建新的json文件, 已存在则覆盖原文件
app.post('/json/create', (req, res) => {
    console.log(req.body);
    res.send(req.body)
})

app.post('/json/save', (req,res)=>{
    fs.writeFile(req.body.path,JSON.stringify(req.body.data), err=>{
        if(err){
            res.send('文件保存失败')
        }else{
            res.send('文件保存成功')
        }
    })
})




//启动服务
app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})