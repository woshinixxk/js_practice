
// 构造函数Box
// 属性
//   backgroundColor
//   width
//   height
//   x
//   y

// 方法
//   render	渲染
//   random	随机生成盒子的位置

// "_"代表标识私有属性，不希望被外部引用
var _position = 'absolute';
var _map = null;
var _div = null;
function Box(options){// 构造函数（用来构造小盒子）
	options = options || {};// 即便没有传入，也不希望报错，保证程序健壮性
	// 如果有传入options,则将其赋给当前对象（小盒子），否则用默认样式
	this.backgroundColor = options.backgroundColor || 'red';
	this.width = options.width || 20;
	this.height = options.height || 20;
	this.x = options.x || 0;
	this.y = options.y || 0;
	this._div = null;// 每一个盒子都有一个自己的div,并标识不予许外部使用
}

// 通过原型对象设置盒子对象的方法
// 把盒子对象渲染到地图上
Box.prototype.render = function(map){
	// 动态创建div
	_map = map;
	var div = document.createElement('div');
	this._div = div;// 记录每一个小盒子自己的div
	// 将生成的每个小盒子添加到map中
	map.appendChild(div);

	// 设置样式
	div.style.position = _position;
	div.style.backgroundColor = this.backgroundColor;
	div.style.width = this.width + 'px';
	div.style.height = this.height + 'px';
	div.style.left = this.x + 'px';
	div.style.top = this.y + 'px';
}

// 随机生成盒子的位置
Box.prototype.random = function(){
	if(!_map) return;// 如果_map不存在，停止当前函数
	// map.offsetWidth / this.width - 1 表示最多可以放下多少个小盒子
	this.x = Tool.getRandom(0,map.offsetWidth / this.width - 1) * this.width;
	this.y = Tool.getRandom(0,map.offsetHeight / this.height - 1) * this.height;
	this._div.style.left = this.x + 'px';
	this._div.style.top = this.y + 'px';
}
