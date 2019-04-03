/*
** 动态生成表格
*/

// 封装动态生成表格 parent--父元素, theadData--表头标题,tbodyData--数据行数据
function createTable(parent,theadData,tbodyData){
	// 1 生成表头
	var table = createHead(parent,theadData);
	// 2 生成数据行
	createBody(table,tbodyData);
}

// 生成表头
function createHead(parent,theadData){
	// 创建表格
	var table = document.createElement('table');
	// 将表格添加到box中
	parent.appendChild(table);
	// 生成表头
	var thead = document.createElement('thead');
	// 将表头添加到表格中
	table.appendChild(thead);
	// 生成表头行
	var tr = document.createElement('tr');
	// 将表头行添加到表头中
	thead.appendChild(tr);
	// 遍历theadData
	theadData.forEach(function(item){
		// 生成标题
		var th = document.createElement('th');
		// 将标题添加到表头行中
		tr.appendChild(th);
		// 设置元素之间的内容
		setInnerText(th,item);
	});

	return table;
}

// 生成数据行
function createBody(table,tbodyData){
	// 2 生成数据行
	// 生成tbody
	var tbody = document.createElement('tbody');
	// 将tbody添加到table中
	table.appendChild(tbody);
			
	tbodyData.forEach(function(item,index){
	// 生成tr
	tr = document.createElement('tr');
	// tr添加到tbody中
	tbody.appendChild(tr);

	// 遍历对象
	for(var key in item){// 遍历item对象中的每个属性，赋给key
		// 生成td
		var td = document.createElement('td');
		// 将td添加到tr中
		tr.appendChild(td);
		setInnerText(td,item[key]);
	}

	// 操作列
	td = document.createElement('td');
	// 将td添加到tr中
	tr.appendChild(td);
	// 生成a标签
	var link = document.createElement('a');
	link.href = 'javascript:void(0)';
	// 将a标签添加到td中
	td.appendChild(link);
	// 设置a的内容
	setInnerText(link,'删除');

	// 给删除按钮注册事件
	link.onclick = linkClick;

	});

	function linkClick(){
		// 提示
		var c = confirm('是否确定删除？');
		if(c){
			// 获取当前要删除的行
			var tr = this.parentNode.parentNode;
			// 移除子元素tr
			tbody.removeChild(tr);
		}
	}
}