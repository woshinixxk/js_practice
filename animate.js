// 将动画进行封装
function animate(element,target,callback){
	// 判断之前是否开启了定时器
	if(element.timeId){// 利用javascript的动态特性，所以给对象动态添加一个属性timeId
		clearInterval(element.timeId);
	}
	element.timeId = setInterval(function(){
		// 当前位置
		var current = element.offsetLeft;
		// 步进
		var step = 10;
		// 当现在的位置 > 目标位置 step 应该是负数
		if(current > target){
			step = - Math.abs(step);
		}
		// if(current >= 500)
		if(Math.abs(current - target) <= Math.abs(step)){
			element.style.left = target + 'px';
			clearInterval(element.timeId);
			if(callback){// 判断是否传入回调函数
				callback();// 回调函数
			}
			return;
		}
		current += step;
		element.style.left = current + 'px';
	},20);
}