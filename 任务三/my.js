#!/usr/bin/node

const http = require('http'),
      url  = require('url'),
      fs   = require('fs'),
      qs   = require('querystring'),
      log  = console.log;

var chapterList = JSON.parse(fs.readFileSync('./js/data.js','utf8'));

//管理员信息
var userList = [{username: "admin", pwd: "admin"},{username: "sh", pwd: "111"}];

//响应
http.createServer((req,res)=>{
  log(`${req.method} ${req.url} HTTP/${req.httpVersion}`);
  log(req.headers);
  log('');
  
  if(req.method === 'GET'){
      getHtml(req,res);
  }else if(req.method === 'POST'){
      retHtml(req,res);
  }else{
      process.exit();
  }
  
}).listen(8083);

function getHtml(req,res){
  var file = __dirname;
  if(req.url === '/listmanager/bg.jpg'){
    log(req.url);
  }

  //切换页面
  if(req.url === '/list/'){
    file += '/chapterList.html';
    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }
    })
  }else if(req.url === '/login/'){
    file += '/login.html';
    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }
    })
  }else if(req.url === '/listmanager/'){
    file += '/list.html';
    //读取文件到页面
    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }
    })
  }else if(req.url === '/addChapter/'){
    file += '/addChapter.html';
    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }
    })
  }else if(req.url.split('?')[0] === '/detail'){
    file += '/chapter.html';
    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
      }
    })
  }else if(req.url !=='/'){
    //加载其他资源路径
    let listurl = req.url.split('?')[0];
    let listurls = listurl.split('/');
    for(var i =1 ;i<listurls.length;i++){
        if(listurls[i] === 'list' || listurls[i] ==='login'|| listurls[i] ==='listmanager' || listurls[i] === "addChapter")
          continue;
        else
        file =file+'/' +listurls[i];
    }

    fs.readFile(file,(err,data)=>{
      if(err){
        res.statusCode = 404;
        res.end(err.message);
      }else{
        res.writeHead(200,{'Content-Type':'text/css'});
        res.end(data);
      }
    })
  }

  if(req.url === '/getDetail/'){
    var index = qs.parse(req.headers.referer.split('?')[1]).chapterId-1;
    res.writeHead(200,{'Content-Type':'text/json'});
    res.end(JSON.stringify(chapterList[index]));
  }
  if(req.url === '/mylist/'){
    res.writeHead(200,{'Content-Type':'text/json'});
    res.end(JSON.stringify(chapterList));
  }
  
}

function retHtml(req,res){
  //登陆页面跳转 用户名和密码正确返回响应状态码
  var data = '';
  if(req.url == '/login/'){
    req.on('data',(chunk)=>{
      data += chunk;
    });
    req.on('end',()=>{
      data = JSON.parse(data);
      userList.forEach((userlist)=>{
        if(userlist.username === data.username && userlist.pwd === data.pwd){
          res.statusCode = 200;
          res.end('OK');
        }else{
          res.statusCode = 404;
          res.end('no');
        }
      });
    })
  }
  //添加页面 /add
  if(req.url ==='/add'){
    var newlist = {};
    var data = '';
    req.addListener("data", function (postdata) {
      data += postdata;
      // log(qs.parse(data));
      var postdatas = qs.parse(data)
      var title=postdatas.title;
      var content=postdatas.content;

      newlist.chapterId = chapterList.length+1;
      newlist.chapterName = title;
      newlist.imgPath = "images/1442457564979540.jpeg";
      newlist.chapterDes = content;
      newlist.chapterContent = content;
      newlist.publishTimer = "2019-08-19";
      newlist.author = "admin";
      newlist.views = 1022;
      chapterList.push(newlist);
      process.on('SIGINT',()=>{
        fs.writeFileSync('./js/data.js',JSON.stringify(chapterList));
      })
    });
  }
}
