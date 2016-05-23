/**
 * @authors     Li Weidong (https://github.com/onvno)
 * @email       leewei2020@gmail.com
 * @contributer
 * @company     Deep (www.deeping.cn) 
 * @date        2016-05
 * @version     0.1
 * @commit      This is first time to build some components , just want to get a more easy way for working . Before do this, most time work with jQuery, so i'm a worse JSer , please give us more confidence , more time & suggestions , thx !
 * Released under the MIT license.
 */

function deepSelect (options) {

	var defaults = {
		selWrap : ''
	};

	var options,content,stepsize,distance,steptime;

	// change default config
	function inputArguments(source,attribute) {
		var attr;
		for (attr in attribute) {
			if (attribute.hasOwnProperty(attr)) {
				source[attr] = attribute[attr];
			}
		}
		return source;
	}

	// change default
	if(arguments[0] && typeof arguments[0] === 'object') {
		options = inputArguments(defaults,arguments[0]);
	}else if(!arguments[0]){
		options = defaults;
	}

	// create new select
	var selWrap = options.selWrap;

	// forEach
	var unboundForEach = Array.prototype.forEach;
    var forEach = Function.prototype.call.bind(unboundForEach);

    forEach(selWrap, function(sel){
    	// console.log(sel);
		var selOri = sel.getElementsByTagName('select')[0];
		// 此处正则必须有大写，对付奇葩ie8
		var newCont = selOri.outerHTML.replace(/option|OPTION/g,"li").replace(/select|SELECT/g,"ol");
		var addtCont = '<div class="de_select"><span><b></b></span>' + newCont +'</div>';
		var selWrapOri = sel.innerHTML;
		sel.innerHTML = sel.innerHTML + addtCont;
		// 修正selOri因selWrap内容调整后无法取值的问题
		selOri = sel.getElementsByTagName('select')[0];
		var optionOri = selOri.getElementsByTagName('option');

		/**
		 *	new select init
		**/
		var selNewWrap = sel.querySelectorAll('.de_select')[0];
		// origin select hide
		selOri.style.display="none";

		// new select menu tit
		var selTit = selNewWrap.getElementsByTagName('b')[0];
		selTit.className = "de_tit";
		selTit.textContent = selOri.firstElementChild.textContent;
		
		// new select menu wrap
		var selMenu = selNewWrap.getElementsByTagName('ol')[0];
		// 判断高度时发现getcomputedstyle直接获取了没有添加样式的高度，故暂时取消slideup效果
		// var selMenuHeight = parseInt(getComputedStyle(selMenu)['height']);
		selMenu.className = "de_downmenu";
		selMenu.style.display = "none";
		
		// new select menu list
		var selList = selMenu.getElementsByTagName('li');
		var selListLen = selList.length;

		/**
		 *	new select init
		**/
		selNewWrap.addEventListener('click', function(event){
			selMenu.style.display = "block";
			var change = {
				opacity : 1
			};
			deepEase(selMenu , change , 400 , 'easeOutQuad');
			
			event.stopPropagation()
		});

		for(var i=0; i<selListLen; i++){
			selList[i].addEventListener('click', listsel);
		}

		document.addEventListener('click' , function(){
			var change = {
				opacity:0
			};
			deepEase(selMenu , change , 400 , 'easeOutQuad',function(){
				selMenu.style.display = "none";
			});
		});

		function listsel(event){
			event = event || window.event;

			var nowVal = this.textContent;
			selTit.textContent = nowVal;
			
			var change = {
					opacity : 0
			};
			deepEase(selMenu , change , 500 , 'easeOutQuad',function(){
				selMenu.style.display = "none";
			});

			var nowIndex = Array.prototype.indexOf.call(selList, this);

			for(var i=0; i<optionOri.length; i++){
				var isShow = (i == nowIndex) ? true : false ;
				if(isShow){
					optionOri[i].setAttribute('selected','');
				} else {
					optionOri[i].removeAttribute('selected');
				}
			}
			
			event.stopPropagation();
		}

    });

}