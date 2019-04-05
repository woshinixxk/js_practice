
//--------------------------Tools-----------------------
// 自调用函数要在前面加";",防止跟前面的函数结合
// 自调用函数传入window的目的，是让变量名可以被压缩
// 在老版本的浏览器中 undefined 可以被重新赋值，这里传入是防止被修改
;(function(window,undefined){// 这里传入的是形参，是可以被修改的
	// 工具类
	var Tools = {
		// 生成随机数
		getRandom:function(min,max){
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
	// 暴露Tools给window
	window.Tools = Tools;
})(window,undefined)// 这里传入的是实参，是不能被修改的，一旦修改，意义也就发生了变化


//--------------------------Food-----------------------
// Food 构造函数
// 属性
//   backgroundColor
//   width
//   height
//   x
//   y
// 方法
//   render 渲染
//   random 随机生成盒子的位置
// 自调用函数 -- 开启一个新的作用域，避免命名冲突
;(function(window,undefined){
	// 局部作用域
	var _position = 'absolute';
	var _map = null;
	var _div = null;
	// 记录上一次创建的食物，为删除做准备
	// 这里用数组的原因——与蛇的方式保持一致
	var elements = [];

	function Food(options){// 构造函数
		options = options || {};
		// 食物颜色、大小、位置
		this.color = options.color || 'green';
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.x = options.x || 0;
		this.y = options.y || 0;
	}

	// 渲染
	Food.prototype.render = function(map){
		// 删除之前创建的食物
		remove();

		// 动态创建div
		var div = document.createElement('div');

		// 将生成的每个小盒子添加到map中
		map.appendChild(div);

		// 将食物存入数组elements
		elements.push(div);

		// 记录地图
		_map = map;
		// 记录当前食物对应的div元素
		_div = div;

		// 设置样式
		div.style.position = _position;
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
	}

	// 随机生成盒子的位置
	Food.prototype.random = function(){
		// 随机生成颜色
		// var r = Tools.getRandom(0,255);
		// var g = Tools.getRandom(0,255);
		// var b = Tools.getRandom(0,255);
		// var food = new Food({
		// 	// 随机生成颜色
		// 	color:'rgb('+r+','+g+','+b+')'
		// });
		// food.render(_map);

		if(!_map) return;// 如果_map不存在，停止当前函数
		// map.offsetWidth / this.width - 1 表示最多可以放下多少个小盒子
		this.x = Tools.getRandom(0,map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0,map.offsetHeight / this.height - 1) * this.height;
		_div.style.left = this.x + 'px';
		_div.style.top = this.y + 'px';
	}

	function remove(){
		for (var i = elements.length - 1; i >= 0; i--) {
			// 删除div
			elements[i].parentNode.removeChild(elements[i]);
			// 删除数组中的元素
			// 删除数组中的元素
			// 第一个参数,从哪个元素开始删除
			// 第二个参数,删除几个元素
			elements.splice(i,1);
		}
	}

	// 把Food构造函数  让外部可以访问
	window.Food = Food;
})(window,undefined)

//--------------------------Snake-----------------------
// 构造函数
// 属性
// 	width	蛇节的宽度 默认20
// 	height	蛇节的高度 默认20
// 	body	数组 蛇头和蛇身	数组中的第一项是蛇头
// 	direction	方向 默认right -- left	top	 bottom

// 方法
// render	渲染
//   move	移动

// 自调用函数 -- 开启一个新的作用域，避免命名冲突
;(function(window,undefined){
	var _position = 'absolute';
	// 记录之前创建的蛇
	var elements = [];
	function Snake(options){
		options = options || {};
		this.width = options.width || 20;
		this.height = options.height || 20;
		this.direction = options.direction || 'right';
		this.body = [
			{x:3,y:2,color:'red'},// 记录蛇头的位置
			{x:2,y:2,color:'blue'},// 记录蛇身的位置
			{x:1,y:2,color:'blue'}
		];
	}

	// 渲染蛇
	Snake.prototype.render = function(map){
		// 删除之前创建的蛇对象
		remove();
		// 记录当前作用域的this -- 蛇对象
		var that = this;
		// 把蛇显示到界面上
		this.body.forEach(function(item){
			// 此处有一个function 新开了一个作用域，此处的this 是window
			//蛇节
			var div = document.createElement('div');
			map.appendChild(div);

			// 记录当前蛇
			elements.push(div);

			div.style.position = _position;
			div.style.left = item.x * that.width + 'px';
			div.style.top = item.y * that.height + 'px';
			div.style.width = that.width + 'px';
			div.style.height = that.height + 'px';
			div.style.backgroundColor = item.color;
		});
	}

	// 控制蛇移动
	Snake.prototype.move = function(food,map){
		// 1 蛇身 后一节 到 前一节的位置
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}// 蛇身依赖于蛇头，故先设置蛇身位置

		var head = this.body[0];
		// 2 蛇头的位置 根据方向来定
		switch(this.direction){
			case 'right':
				this.body[0].x += 1;
				break;
			case 'left':
				this.body[0].x -= 1;
				break;
			case 'top':
				this.body[0].y -= 1;
				break;
			case 'bottom':
				this.body[0].y += 1;
				break;
		}

		// 2.4 判断蛇头是否和食物的坐标重合
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if(headX === food.x && headY === food.y){
			// 让蛇增加一节
			// 获取蛇的最后一节
			var last = this.body[this.body.length - 1];
			this.body.push({//按照蛇的最后一节样式新增一节
				x:last.x,
				y:last.y,
				color:last.color
			});
			food.random();
		}
	}

	function remove(){
		for (var i = elements.length - 1; i >= 0; i--) {
			// 删除div
			elements[i].parentNode.removeChild(elements[i]);
			// 删除数组中的元素
			// 删除数组中的元素
			// 第一个参数,从哪个元素开始删除
			// 第二个参数,删除几个元素
			elements.splice(i,1);
		}
	}

	// 把Snake构造函数 让外部可以访问
	window.Snake = Snake;
})(window,undefined)

//--------------------------Game-----------------------

// Game 构造函数
// 属性
//   Food 对象
//   Snake 对象

// 方法
//   start 渲染


// 自调用函数 -- 开启一个新的作用域，避免命名冲突
;(function(window,undefined){
	var that;// 记录当前游戏对象
	function Game(map){
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}

	Game.prototype.start = function(){
		// 1 把蛇和食物对象，渲染到地图上
		this.food.render(this.map);
		this.food.random();

		// 2 开始游戏的逻辑
		// 2.1 让蛇移动起来
		// 2.2 当蛇遇到边界游戏结束
		runSnake();
		// 2.3 通过键盘控制蛇移动的方向
		bindKey(); 
		// 2.4 当蛇遇到食物 做相应的处理
	}

	// 通过键盘控制蛇移动的方向
	function bindKey(){
		document.addEventListener('keydown',function(e){
			// 37 - left
			// 38 - top
			// 39 - right
			// 40 - bottom
			switch(e.keyCode){
				case 37:
					that.snake.direction = 'left';
					break;
				case 38:
					that.snake.direction = 'top';
					break;
				case 39:
					that.snake.direction = 'right';
					break;
				case 40:
					that.snake.direction = 'bottom';
					break;
			}
		},false);
	}

	// 私有的函数（在自调用函数内才能访问，外部不能访问）
	// 让蛇移动
	function runSnake(){
		var timeId = setInterval(function(){
			// 让蛇走一格
			// 在定时器的function中this是指向window对象的
			// this.snake
			// 要获取游戏对象中的蛇属性,that.food判断蛇是否吃到了食物
			that.snake.move(that.food,that.map);
			that.snake.render(that.map);

			// 2.2 当蛇遇到边界游戏结束
			// 获取蛇头的坐标
			var maxX = that.map.offsetWidth / that.snake.width;
			var maxY = that.map.offsetHeight / that.snake.height;
			var headX = that.snake.body[0].x;
			var headY = that.snake.body[0].y;
			if(headX < 0 || headX >= maxX){
				alert('Game Over');
				clearInterval(timeId);
			}
			if(headY < 0 || headY >= maxY){
				alert('Game Over');
				clearInterval(timeId);
			}
		},150);
	}

	// 暴露构造函数给外部
	window.Game = Game;
})(window,undefined)

//--------------------------调用-----------------------
;(function(window,undefined){
	var map = document.querySelector('#map');
	var game = new Game(map);
	game.start();
})(window,undefined)
