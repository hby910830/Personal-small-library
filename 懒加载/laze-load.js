$(function (){
	$(window).on('scroll', function(){
		checkShow();
	});
	checkShow();//监听窗口滚动事件，检查元素是否在可视范围内

	function checkShow(){
		$('.container img').each(function(){
			var $cur = $(this);
			if(!!isloaded($cur)){return;}//判断是否已加载
			if (isShow($cur)) {
				setTimeout(function(){
					showImg($cur);
				},300)//设置时间是为了更好的看出效果
			}
		})
	};

	function isShow($cur){

		var scrollH = $(window).scrollTop(),//获取窗口滚动高度
			winH = $(window).height(),//获取窗口高度
			top = $cur.offset().top;//获取元素距离窗口顶部高度

		if (top < scrollH + winH) {
			return true;
		}else{
			return false;
		}
	}

	function showImg($cur){
		$cur.attr('src',$cur.attr('data-src'));//元素显示的时候把之前的默认照片替换成data-src里的照片
		$cur.data('isloaded',true);
	}

	function isloaded($el){
  		return $el.data('isloaded');
	}
});

// 第二种，写成一个方法来调用,用户只需要传递一个选择器参数即可调用懒加载功能

var lazyImg = {

	init: function($imgs){
		this.$c = $(window),
		this.$target = $imgs;

		this.bind();
	},

	bind: function(){
		var me = this;
		this.$c.on('scroll', function(){
			me.checkShow();
		});
	},

	checkShow: function (){
		var me = this;
		this.$target.each(function(){
			var $cur = $(this);
			if (me.isShow($cur)) {
				setTimeout(function(){
					me.showImg($cur);
				},300);
			}
		});
	},

	isShow: function($el){
		var scrollH = $(window).scrollTop(),
			winH = this.$c.height(),
			top = $el.offset().top;

		if (top < winH + scrollH) {
			return true;
		}else{
			return false;
		}
	},

	showImg: function($el){
		$el.attr('src',$el.attr('data-src'));
	}
}

lazyImg.init($('img'));


//第三种，升级成不仅仅是图片懒加载，其他元素也懒加载，即曝光加载，给参数穿回调函数
// 优化：1、已经展示的图片滚动的时候依旧重复加载图片（$el.attr('src',$el.attr('data-src'))；
// 		 2、滚动的时候重复监听滚动事件，造成性能差；
//缺点： 下面的调用会覆盖上面的

var Exposure = {

	init: function($el, handler){
		this.$c = $(window);
		this.$target = $el;
		this.handler = handler;
		this.bind();
	},

	bind: function(){
		var me = this,
			timer = null,
			interval = 100;

		$(window).on('scroll', function(e){
			timer && clearTimeout(timer);//解决滚动的时候重复监听滚动事件，造成性能差；
			timer = setTimeout(function(){
				me.checkShow();
			}, interval);
		});
	},

	checkShow: function(){
		console.log(1)
		var me = this;
		this.$target.each(function(){
			var $cur = $(this);
			if (me.isShow($cur) && !me.hasLoaded($cur)) {
				me.handler && me.handler.call(this, this);
				$cur.data('loaded', true);
			}//加上一个标识，避免重复执行handler
		});
	},

	isShow: function($el){
		var scrollH = this.$c.scrollTop(),
			winH = this.$c.height(),
			top = $el.offset().top;

		if (top < winH + scrollH) {
			return true;
		}else{
			return false;
		}
	},

	hasLoaded: function($el){
		if($el.data('loaded')){
			return true;
		}else{
			return false;
		}
	}
}

// Exposure.init($('p'), function(el){
// 	console.log($(this).text());
// });

Exposure.init($('img'), function(el){
	var $el = $(this);
	$el.attr('src', $el.attr('data-src'));
});


//第四种，优化使其可以通用，不被多个调用覆盖
//缺点：没有进行封装，私有变量暴露在外面

function showImg($el){
  $el.attr('src', $el.attr('data-src'));
}
var Exposure = {
	one: function($selectors,callback){
		this._add($selectors,callback);
		this._init();
	},

	_queue:[],

	/*[{
		el: $el,
		cb: cb1
		},
		{
		el: $el2,
		cb: cb2
	}]*/

	_isBind: false,

	_add: function($selector, callback){
		var me = this;
		$selector.each(function(){
			$cur = $(this);

			var o = {
				el: $cur,
				cb: callback
			};
			me._queue.push(o);//将要执行的元素和回调放入_queue数组中
		});
	},

	_init: function(){
		if (!this._isBind) {
			this._bind();
		}else{
			this._do();
		}
	},

	_bind: function(){
		var me = this,
			timer = null,
			interval = 300;

		$(window).on('scroll', function(e){
			timer && clearTimeout(timer);
			timer = setTimeout(function(){
				me._do();
			}, interval);
		});
		this._isBind = true;
	},

	_do: function(){
		var me = this,
			arrTmp = [];
		for (var i = 0; i < this._queue.length; i++) {
			var item = this._queue[i];
			if(this._isShow(item.el)){
				item.cb.call(item.el[0])
			}else{
				arrTmp.push(item)//把剩下没有调用的对象放回arrTmp数组中
			}
		}
		this._queue = arrTmp//放回_queue数组中
	},

	_isShow: function($el) {
		var scrollH = $(window).scrollTop(),
			winH = $(window).height(),
			top = $el.offset().top;

		return (top < scrollH + winH) ? true : false;
	}
}
var $imgs = $('img');
Exposure.one($imgs, function(){
	showImg($(this));
});

Exposure.one($('p'), function(el){
	console.log($(this).text());
})