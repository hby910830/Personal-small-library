//下面的代码输出多少？修改代码让fnArri 输出 i。使用两种以上的方法

var fnArr = [];
for(var i = 0; i < 10; i++){
	fnArr[i] = function(){
		return i
	};
}
console.log(fnArr[3]());//10
//使用闭包实现：
var fnArr = [];
for(var i = 0; i < 10; i++){
	fnArr[i] = (function(i){
		return function(){
			return i;
		}
	}(i));
}
console.log(fnArr[4]());//4

//使用闭包封装一个汽车对象，可以通过如下方式获取汽车状态
var Car = (function(){
	var speed;
	function setSpeed(s){
		speed = s;
	}
	function getSpeed(){
		console.log(speed);
	}
	function accelerate(){
		speed += 10;
	}
	function decelerate(){
		speed -= 10;
		if(speed < 0){
			speed = 0;
		}
	}
	function getStatus(){
		if (speed > 0) {
			console.log('running');
		}else{
			console.log('stop');
		}
	}

	return {
		setSpeed:setSpeed,
        getSpeed:getSpeed,
        accelerate:accelerate,
        decelerate:decelerate,
        getStatus:getStatus
	}
})()
    Car.setSpeed(30);
    Car.getSpeed(); //30
    Car.accelerate();
    Car.getSpeed(); //40;
    Car.decelerate();
    Car.decelerate();
    Car.getSpeed(); //20
    Car.getStatus(); // 'running';
    Car.decelerate(); 
    Car.decelerate();
    Car.getStatus();  //'stop';
    console.log(Car.speed);  //undefined

 //下面这段代码输出？如何输出delayer: 0, delayer:1…（使用闭包来实现）
for(var i=0;i<5;i++){
    setTimeout(function(){
         console.log('delayer:' + i );
    }, 0);
    console.log(i);
}//0,1,2,3,4,delayer:5

//闭包实现：
for(var i=0;i<5;i++){
    (function (i) {
        setTimeout(function(){
            console.log('delayer:' + i );
        }, 0);
    })(i);          
    console.log(i);
}//0,1,2,3,4,delayer:0,delayer:1,delayer:2,delayer:3,delayer:4