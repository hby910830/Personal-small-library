//封装一个 ajax 函数，能通过如下方式调用
function ajax(opts){
  var xmlHttp=new xmlHttpRequest();
  var str='';
  for(k in opts.data){
    str += k+'='+opts.data[k]+'&';
  }
  str=str.substr(0,str.length-1);
  if (opts.type.toLowerCase()==='get') {
    xmlHttp.open('GET',opt.url+'?'+str,true);
    xmlHttp.send();
  }
  if (opts.type.toLowerCase()==='post') {
    xmlHttp.open('POST',opt.url,true);
    xmlHttp.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xmlHttp.send(str);
  }
  xmlHttp.onreadystatechange=function(){
    if (xmlHttp.readyState===4&&xmlHttp.status===200) {
      var responsetext =JSON.parse(xmlHttp.responseText);
      opts.success(responsetext);
    }
    if (xmlHttp.readyState===4&&xmlHttp.status===404) {
      opts.error();
    }
  }
}
var isLoading=false;//设置一个状态锁，防止重复点击触发事件。
    var count=3;
    document.querySelector('.btn').addEventListener('click', function(e){
      if(isLoading){//状态锁为true，正在进行数据交换，直接返回
        return;
      }
      document.querySelector('.btn').innerText="载入中..";
      isLoading=true;
      e.preventDefault();
      ajax({
        url: 'getData.php',   //接口地址
        type: 'get',               // 类型， post 或者 get,
        data: {
          start: count,
          len: 6
        },
        success: function(ret){
          repeat=false;
          var docFrag=document.createDocumentFragment();
          for (var i=0;i<ret.length;i++){
            var li=document.createElement('li');
            li.innerText=ret[i];
            docFrag.appendChild(li);
          }
          var ct=document.getElementById('list');   
          console.log(ct);    // {status: 0}
          ct.appendChild(docFrag);
          document.querySelector('.btn').innerText="加载更多";
          count += 6;
        },
        error: function(){
         alert('出错了');
       }
     })
    });



//点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击?
//因为ajax与后台交互数据的过程有5步（0-4），为了防止重复点击，影响程序运行，需要防止重复点击触发事件。
//可以设置一个状态锁，用户点击之后，状态锁变为ture，之后再点击就不会触发监听事件。
var isLoading = false;//状态锁为false，允许触发ajax
btn.addEventlistener('click',function(e){
    e.preventDefault();
    if(isLoading) {//状态锁为true，正在进行数据交换，直接返回
        return;
    }
    isLoading = true;//进行数据交换，将状态锁设置为true，防止重复点击
})