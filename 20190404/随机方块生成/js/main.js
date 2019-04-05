
// js入口
var map = document.querySelector('#map');
// 生成10个盒子
var arr = [];
for (var i = 0; i < 10; i++) {
	// 随机生成颜色系数
	var r = Tool.getRandom(0,255);
	var g = Tool.getRandom(0,255);
	var b = Tool.getRandom(0,255);

	var box = new Box({
		// 随机生成颜色
		backgroundColor:'rgb('+r+','+g+','+b+')'
	});
	box.render(map);// 每次循环渲染在map中生成小盒子
	arr.push(box);// 把生成的小盒子放入数组中
}

// 定时随机生成盒子的位置
setInterval(random,500);
// 程序运行时调用一次，避免定时器在第一个时间间隔时不工作带来的小盒子位置的影响
// 因为定时器的特点，第一个时间间隔不工作，也就是等过了第一个时间间隔才开始工作
// 故可能导致一开始所有小盒子初始位置都处在0,0
random();

function random(){
	arr.forEach(function(item){
		item.random();
	});
}