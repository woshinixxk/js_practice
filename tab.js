// 构造函数 Tab
// 属性
// 	container		容器
// 	tabMenuSelected	菜单的选中样式	
// 	tabMainSelected	详细内容的选中样式
// 方法
//  autoPlay()

;(function(window,undefined){
	var _menus = null;
	var _mains = null;
	var _that = null;
	function Tab(options){
		options = options || {};
		this.container = options.container || '#wrapper';
		this.tabMenuSelected = options.tabMenuSelected || 'selected';
		this.tabMainSelected = options.tabMainSelected || 'selected';

		_that = this;
		// 实现tab栏切换的功能
		_tab.call(this);
	}

	function _tab(){
		// 1 获取需要的元素
		var container = document.querySelector(this.container);
		// 菜单的容器
		var tabMenu = container.children[0];
		// 详细内容的容器
		var tabMain = container.children[1];

		// 
		_menus = tabMenu.children;
		_mains = tabMain.children;

		// 2 给tab栏注册点击事件
		var i = 0,len = _menus.length;
		for(;i < len;i++){
			var menu = _menus[i];
			// 记录当前索引
			menu.index = i;
			menu.onclick = _menuLick;
		}
	}

	function _menuLick(){
		// 3 点击的时候 切换tab栏
		// 3.1 取消所有menu的选中效果
		var i = 0, len = _menus.length;
		for (; i < len; i++) {
			var menu = _menus[i];
			// 用replace替换其中的slected类名，不影响其它类名
			menu.className = menu.className.replace(_that.tabMenuSelected,'');
		}

		// 3.2 让当前点击的menu选中
		this.className =this.className +' '+ _that.tabMenuSelected;
		
		// 4 点击的时候 切换详细内容
		// 清空所有main选中状态
		for (i = 0; i < len; i++) {
			var item = _mains[i];
			item.className = item.className.replace(_that.tabMainSelected,'');
		}

		// 获取当前menu的索引
		var index = this.index;
		// 当前menu对应的详细内容
		var main = _mains[index];
		main.className = main.className + _that.tabMainSelected;
	}

	// 暴露Tab给window
	window.Tab = Tab;

})(window)