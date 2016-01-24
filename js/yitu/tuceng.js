
/**
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
function transData(a, idStr, pidStr, chindrenStr){
	var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
	for(; i < len; i++){
		hash[a[i][id]] = a[i];
	}
	for(; j < len; j++){
		var aVal = a[j], hashVP = hash[aVal[pid]];
		if(hashVP){
			!hashVP[children] && (hashVP[children] = []);
			hashVP[children].push(aVal);
		}else{
			r.push(aVal);
		}
	}
	return r;
}

var jsonDataTree = transData(jsonData, 'id', 'pid', 'chindren');
//console.log(JSON.stringify(jsonDataTree));
var jiantou = 'down';
var selectLevel = 0;
var levelContent = [[],[],[],[]]; // 最多显示四级菜单，当前显示内容分级数组
var levelNumber = [-1,-1,-1,-1]; // 每层点击的是第几个

$(document).ready(function(){
	initSelect();
	var dateRange = new pickerDateRange('date_demo3', { // 初始化日历
		isTodayValid : false,
		calendars : 1,
		defaultText : ' 至 ',
		inputTrigger : 'null',
		theme : 'ta',
		success : function(obj) {
			var selectTime = '开始: ' + obj.startDate + '  结束: ' + obj.endDate
            if(delTimeAttr($('#selectResult').html())) {
                $('#selectResult').html($('#selectResult').html() + '<div class="oneContent"><span class="text">' + selectTime + '</span><div class="img"></div></div>')
            } else{
                hideSelectContent();
            }
			setAttriContent();
			hideSelectContent();
		}
	});
	$('.selectTop').click(function(){ // 点击选择的顶部
		if(jiantou == 'up') {
			hideSelectContent();
		}else { // 箭头是下，需要显示
			showSelectContent();
		}
	});
	//点击下拉框中的内容
	$('.selectContent ul').on('click','li',function(e){
		var currentLi = $(e.target);
        if(menuBool[0] ||( menuBool[3] && fenxiButton[0])||( menuBool[3] && fenxiButton[1])) {
            if(currentLi.html() == '事故时间' || currentLi.html() == '违法时间'){
			    return;
		    }
        }
		if(currentLi.html().indexOf('上一级') != -1){ // 点击返回上一级
            levelNumber[selectLevel] = -1;
			selectLevel--;
			var updateSelect = converToSelectString(levelContent[selectLevel]);
			$('.selectContent ul').html(updateSelect);
			prevTopInfo();
			return;
		}
		var currentIndex = $('.selectContent li').index(currentLi);
		clickOneSelect(currentIndex);
	});
	$('#selectResult').on('click','.img',function(e){
		var currentNode = $(e.target).parent();
		currentNode.remove();
        setAttriContent();
	});

});


function setAttriContent(){ // 将属性选择框中的内容赋值给全局变量
	if(window.menuBool[0]){
		window.tucengkongzhiHTML[window.layerCurrentNum] = $('#selectResult').html();

	}else if(window.menuBool[3]){
        for(var i = 0; i < window.fenxiButton.length; i++){
            if(window.fenxiButton[i]){
                window.kongjianfenxiHTML[i] =  $('#selectResult').html();
            }
        }
	}
}

function showSelectContent(){
    if(window.menuBool[0]) { // 选中图层控制
//        if (window.layerBool.indexOf(true) == -1) { // 控制必须选择图层才能选择属性
//            return false;
//        }
    }
	$('.selectContent').animate({opacity: '1'});
	$('.selectContent').show();
	jiantou = 'up';
	$('.selectTop').css('background','url(../img/yitu/up.png) no-repeat  220px 2.5px');
	$('.selectContent').css('z-index','3');
}
function hideSelectContent(){
	$('.selectContent').animate({opacity: '0'});
	$('.selectContent').hide();
	jiantou = 'down';
	$('.selectTop').css('background','url(../img/yitu/down.png) no-repeat  220px 2.5px');
	$('.selectContent').css('z-index','2');
}
function prevTopInfo(){// 确定上一级时候select头部信息
	if(selectLevel == 0){
		$('.selectTop p').html('请拖拽属性');
	}else if(selectLevel == 1){
		$('.selectTop p').html(levelContent[0][levelNumber[0]]);
	}else if(selectLevel == 2){
		$('.selectTop p').html(levelContent[1][levelNumber[1]]);
	}
}

function initSelect(){ // 初始化
	selectLevel = 0;
    //levelContent[0]=[];
    levelContent = [[],[],[],[]];
	for(var i = 0; i < jsonDataTree.length; i++){
		levelContent[0].push(jsonDataTree[i].name);
	}
	var updateSelect = converToSelectString(levelContent[selectLevel]);
	$('.selectContent ul').html(updateSelect);
}


function clickOneSelect(currentIndex){
	levelNumber[selectLevel] = currentIndex; // 当前单机的是第几层的第几个
	var current = getCurrentJson(currentIndex);
	if(current.hasOwnProperty('chindren')){ // 该元素有子元素
		selectLevel++ ; // 当前层级+1
		levelContent[selectLevel] = []; //清空当前内容
		for(var i = 0; i < current.chindren.length; i++){
			levelContent[selectLevel].push(current.chindren[i].name);
		}
		var updateSelect = converToSelectString(levelContent[selectLevel]);
		$('.selectContent ul').html(updateSelect);
		$('.selectTop p').html(current.name);
	}else{
		console.log('没有子元素');
	}
}

function getCurrentJson(currentIndex){
	var current;
	if(selectLevel == 0){ // 当前单机第0层
		current = jsonDataTree[currentIndex];
	}else if(selectLevel == 1){ // 当前单机第1层
		current = jsonDataTree[levelNumber[0]].chindren[currentIndex];
	}else if(selectLevel == 2){ // 当前单机第2层
		current = jsonDataTree[levelNumber[0]].chindren[levelNumber[1]].chindren[currentIndex];
	}
	return current;
}

function converToSelectString(currentArray){
	var updateSelect = '';
	for(var i = 0; i < currentArray.length; i++){
		updateSelect += '<li id="'+currentArray[i]+'" draggable="true" ondragstart="drag(event)">' + currentArray[i] + '</li>';
		//updateSelect += '<li id="'+currentArray[i]+Math.random()+'" draggable="true" ondragstart="drag(event)">' + currentArray[i] + '</li>';
	}
	if(selectLevel > 0) {
		updateSelect += '<li>上一级...</li>';
	}
	return updateSelect;
}

function delRepeatAttr(attrHTML, currentContent){ // 删除属性面板重复的属性
	var attrResult = [];
	var tuceng = $(attrHTML);
	for(var i = 0 ; i < tuceng.length; i++){
		attrResult.push(tuceng[i].getElementsByClassName('text')[0].innerHTML);
	}
	if(attrResult.indexOf(currentContent) == -1){
		return true; // 不存在为真
	}else{
		return false;
	}
}

function delTimeAttr(attrHTML){ // 删除属性面板多余的时间属性
    var attrResult = [];
    var tuceng = $(attrHTML);
    for(var i = 0 ; i < tuceng.length; i++){
        attrResult.push(tuceng[i].getElementsByClassName('text')[0].innerHTML);
    }
	for (var i = 0; i < tuceng.length; i++) { // 生成属性数组
		if (attrResult.toString().indexOf('月') != -1) {
			return false;
		}
		if (attrResult.toString().indexOf('开始') != -1) {
			return false;
		}
	}
	return true;
}

function allowDrop(ev) { // 允许拖放
	ev.preventDefault();
}
function drag(ev) { //设置被拖数据的数据类型和值
	ev.dataTransfer.setData("Text",ev.target.id);
}
function drop(ev) {
	ev.preventDefault();
	var data=ev.dataTransfer.getData("Text");
	var currentContent = $('#'+data).selector.split('#')[1].split('0')[0];
    if(currentContent != '事故时间' || currentContent != '违法时间') {
        levelNumber[selectLevel] = $('.selectContent ul li').index($('#' + data)); // 当前单机的是第几层的第几个
        addMoreSelect(currentContent);
        setAttriContent();
    }

	hideSelectContent();
}

function addMoreSelect(currentContent){
//    selectLevel 点击的当前层的第几个
//    levelNumber 当前点击的第几层  [-1,-1,-1,-1]
//    jsonDataTree json树
//    console.log(selectLevel + '   ' + levelNumber.toString())
    if(levelNumber[1] == -1){ // 当前点击的第0层
        var currentNode = jsonDataTree[levelNumber[0]];
        addZeroLevel(currentNode);
    } else if(levelNumber[2] == -1){ //当前点击的第1层
        var currentNode = jsonDataTree[levelNumber[0]].chindren[levelNumber[1]];
        addFirstLevel(currentNode);
    } else if(levelNumber[3] == -1){// 当前点击的第2层
        var currentNode = jsonDataTree[levelNumber[0]].chindren[levelNumber[1]].chindren[levelNumber[2]];
        addTowLevel(currentNode);
    } else { // 点击最后一层，直接添加
        addOneSelect(currentContent);
    }
}

function addZeroLevel(currentNode){ // 第0层节点拖拽
    if(currentNode.hasOwnProperty('chindren')){ //有子节点
        for(var i = 0; i < currentNode.chindren.length; i++){
            addFirstLevel(currentNode.chindren[i])
        }
    }else {
        addOneSelect(currentNode.name);
    }
}

function addFirstLevel(currentNode){ // 第1层节点拖拽
    if(currentNode.hasOwnProperty('chindren')){ //有子节点
        for(var i = 0; i < currentNode.chindren.length; i++){
            addTowLevel(currentNode.chindren[i]);
        }
    }else {
        addOneSelect(currentNode.name);
    }
}

function addTowLevel(currentNode){ // 第2层节点拖拽
    if(currentNode.hasOwnProperty('chindren')){ //有子节点
        for(var i = 0; i < currentNode.chindren.length; i++){
            addOneSelect(currentNode.chindren[i]);
        }
    }else{
        addOneSelect(currentNode.name);
    }
}

function addOneSelect(currentContent){
    var currentHTML = $('#selectResult').html();
        if (delRepeatAttr(currentHTML, currentContent)) { // 限制只能出现一次
            if((currentContent.indexOf('月') != -1) && delTimeAttr(currentHTML)) {
                $('#selectResult').html(currentHTML + '<div class="oneContent"><span class="text">' + currentContent + '</span><div class="img"></div></div>');
            }else if(currentContent.indexOf('月') == -1){
				$('#selectResult').html(currentHTML + '<div class="oneContent"><span class="text">' + currentContent + '</span><div class="img"></div></div>');
			}
    }
}