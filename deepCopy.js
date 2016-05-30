//写一个json对象深拷贝的方法
//json对象可以多层嵌套
//值可以是字符串、数字、布尔、json对象中的任意项

var oldJson = {
	"name": "Byron",

  	"age": 24,

  	"friends":{
	      "John":{
	        "age":23,
	        "address":"BeiJing",
	        "gay":"false"
	      },
	     "Bill":{
	        "age":24,
	        "address":"ChengDu",
	        "gay":"true"
	      }
    }
};
var deepCopy = function(Obj){
	var newObj = {};
	for(var i in Obj){
		if(typeof Obj[i] === 'object'){
			newObj[i] = deepCopy(Obj[i]);
		}
		newObj[i] = Obj[i];
	}
	return newObj;
}
console.log(deepCopy(oldJson))//修改oldJson里面的嵌套对象的值，深拷贝的newObj里面的值也会改掉