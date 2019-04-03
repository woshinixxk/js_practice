
// 获取min - max 之间的随机整数
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

// 解决IE9以下获取第一个子元素不兼容的问题
function getFirstElementChild(parent){
	// 如果当前浏览器支持firstElementChild
	if(parent.firstElementChild){
		return parent.firstElementChild; 
	}
	// var node, nodes = this.childNodes, i = 0;// 函数中this指的是window
	var node,nodes = parent.childNodes,i = 0;
    while (node = nodes[i++]) { // 这里循环条件推荐学习！！！！非常灵活，先获取值，再++,即先获取nodes[0]，之后i++;
        if (node.nodeType === 1) {// 如果是元素节点，
            return node;// 返回元素节点
        }
    }
    return null;// 不是元素节点，则返回空
}


// 设置元素之间的内容（innerText兼容性问题）
// element --创建的元素		content --需要修改/设置的内容
function setInnerText(element,content){
	// 判断element是否支持innerText
	if (typeof element.innerText === 'string') {
		element.innerText = content;
	}else{
		element.textContent = content;
	}
}

// 根据id获取元素
function my$(id){
	return document.getElementById(id);
}

// 获取页面滚动出去的距离  处理Chrome 和ie8的兼容性问题
function getScroll(){
	return { // 返回对象
		scrollTop:document.documentElement.scrollTop || document.body.scrollTop,
		scrollLeft:document.documentElement.scrollLeft || document.body.scrollLeft
	}
}

// 获取鼠标在页面上的坐标
function getPage(e){
	return { // 返回对象
		pageX:e.clientX + getScroll().scrollLeft,
		pageY:e.clientY + getScroll().scrollTop
	}
}



