var jiantou = 'shang';
var quanping = false;
window.menuBool = [false, false, false, false, false]; // 控制五个菜单的开关
window.menuName = ['tucengkongzhi', 'shishilukuang', 'kongjianchaxun', 'kongjianfenxi', 'dilibiaozhu'];
window.layerBool = [false, false, false, false, false, false, false, false, false]; // 图层控制九个图层
window.layerCurrentNum = 0;
window.tucengkongzhiHTML = ['', '', '', '', '', '', '', '', '']; //事故图层，违法图层等九个图层
window.kongjianfenxiHTML = ['', '', '']; //第一个是初始值，聚类分析，道路分析，趋势分析
var local;
$(document).ready(function () {
    hideTucengKongzhi(); // 隐藏图层控制
    // 切换箭头
    $('#jiantou').click(function () {
        if (jiantou == 'xia') {
            jiantouUp();
        } else {
            jiantouDown();
        }
    });

    $('.tucengkongzhi span').click(function () {
        menuBool[0] = !menuBool[0];
        controlMenu(0);
    });
    $('.shishilukuang span').click(function () {
        menuBool[1] = !menuBool[1];
        controlMenu(1);
        if(menuBool[1]){
            $('#tcBtn').click();
        }else{
            $('#tcBtn').click();
        }
    });
    $('.kongjianchaxun span').click(function () {
        menuBool[2] = !menuBool[2];
        controlMenu(2);

        if(menuBool[2]) {
            var name = window.prompt("请输入您要查询的信息", "请在此输入您要查询的信息");
            local = new BMap.LocalSearch(map, {
                renderOptions: {map: map}
            });
            local.search(name);
        }else{
            local.clearResults();
        }
    });
    $('.kongjianfenxi span').click(function () {
        menuBool[3] = !menuBool[3];
        controlMenu(3);
        if(menuBool[3]){
            heatmapOverlay.show();
        }else{
            heatmapOverlay.hide();
        }
    });
    $('.dilibiaozhu span').click(function () {
        menuBool[4] = !menuBool[4];
        controlMenu(4);
        if(menuBool[4]){
            map.addEventListener("click", showInfo);
        }else{
            map.removeEventListener("click", showInfo);
        }
    });

    // 控制九个图层的切换
    $('#allLayer .oneLayer').click(function (e) {
        var imgIndex = $('.oneLayer img').index($(e.target));
        if (imgIndex != -1) {
            if(imgIndex < 9) { // 只能点第一个图标 ，n是能点n个，删掉就都可以点
            if (menuBool[0]) { // 九个图层都可以选
                layerBool[imgIndex] = !layerBool[imgIndex]
                convertNineLayers(imgIndex); // 变化一个图层
                if(imgIndex==0){
                    var temparr=new Array();
                    for(var j=0;j<jsonData.length;j++){
                        var tempObj=new Object();
                        tempObj.fieldName=jsonData[j].fieldName;
                        tempObj.id=jsonData[j].id;
                        tempObj.name=jsonData[j].name;
                        tempObj.pid=jsonData[j].pid;
                        temparr.push(tempObj);
                    }
                    jsonDataTree = transData(temparr, 'id', 'pid', 'chindren');
                    initSelect();
                    $('#selectResult').html(window.tucengkongzhiHTML[0]);
                }
                if(imgIndex==1){
                    var temparr=new Array();
                    for(var j=0;j<jsonDataForSYWF.length;j++){
                        var tempObj=new Object();
                        tempObj.fieldName=jsonDataForSYWF[j].fieldName;
                        tempObj.id=jsonDataForSYWF[j].id;
                        tempObj.name=jsonDataForSYWF[j].name;
                        tempObj.pid=jsonDataForSYWF[j].pid;
                        temparr.push(tempObj);
                    }
                    jsonDataTree = transData(temparr, 'id', 'pid', 'chindren');
                    initSelect();
                    $('#selectResult').html(window.tucengkongzhiHTML[1]);
                }
                if(imgIndex==7){
                    var temparr=new Array();
                    for(var j=0;j<jsonDataForJTSS.length;j++){
                        var tempObj=new Object();
                        tempObj.fieldName=jsonDataForJTSS[j].fieldName;
                        tempObj.id=jsonDataForJTSS[j].id;
                        tempObj.name=jsonDataForJTSS[j].name;
                        tempObj.pid=jsonDataForJTSS[j].pid;
                        temparr.push(tempObj);
                    }
                    jsonDataTree = transData(temparr, 'id', 'pid', 'chindren');
                    initSelect();
                    $('#selectResult').html(window.tucengkongzhiHTML[7]);
                }

            }
            }
        }

    });

	// 全屏
	$('#quanping img').click(function(e){
		quanping = !quanping;
		var img = $(e.target);
		if(quanping){
			img.attr('src', '../img/yitu/tool/qp_tc.png');
			fullScreen();
		}else{
			img.attr('src', '../img/yitu/tool/qp.png');
			exitFullScreen();
		}

	})
});
// 进入全屏
function fullScreen() {
	var el = document.documentElement,
		rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
		wscript;

	if(typeof rfs != "undefined" && rfs) {
		rfs.call(el);
		return;
	}

	if(typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if(wscript) {
			wscript.SendKeys("{F11}");
		}
	}
}

// 退出全屏
function exitFullScreen() {
	var el = document,
		cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
		wscript;

	if (typeof cfs != "undefined" && cfs) {
		cfs.call(el);
		return;
	}

	if (typeof window.ActiveXObject != "undefined") {
		wscript = new ActiveXObject("WScript.Shell");
		if (wscript != null) {
			wscript.SendKeys("{F11}");
		}
	}
}

// 图层切换
function convertNineLayers(imgIndex) {
    var img = $('.oneLayer img:eq(' + imgIndex + ')');
    if (menuBool[0]) {
        if (layerBool[imgIndex]) {
            img.attr("src", "../img/yitu/tuceng/" + (imgIndex + 1) + ".png");
            window.layerCurrentNum = imgIndex; // 当前选择的图层
            $('#selectResult').html(window.tucengkongzhiHTML[imgIndex]);
        } else {
            img.attr("src", "../img/yitu/tuceng/" + (imgIndex + 1) + "_n.png");
            window.tucengkongzhiHTML[imgIndex] = '';
        }
    }
}


function jiantouUp() {// 箭头朝上，显示主面板
    $('.fa-chevron-down').html('&#xe694;');
    jiantou = 'shang';
    $('#leftContent').show();
    setJiantouHeight();
}

function setJiantouHeight() {
    if (menuBool[0]) {
        $('#jiantou').css('top', '560px');
    }
}

function jiantouDown() { // 箭头朝下，隐藏主面板
    $('.fa-chevron-down').html('&#xe6fd;');
    jiantou = 'xia';
    $('#leftContent').hide();
    $('#jiantou').css('top', '128px');
}

function controlMenu(n) { // 主菜单控制
//    for (var i = 0; i < menuBool.length; i++) {
//        if (i != n) {
//            menuBool[i] = false;
//            removeMenuClass(menuName[i]);
//        }
//    }
    if (menuBool[n]) { // 切换当前菜单样式
        addMenuClass(menuName[n]);
    } else {
        removeMenuClass(menuName[n]);
    }
    selectOneMenu(n); // 点击菜单的实际操作
}
// 主菜单样式
function addMenuClass(menuName) {
    $('.' + menuName + ' span').addClass(menuName + 'Active');
    $('.' + menuName + ' span').addClass('textColor');
}
function removeMenuClass(menuName) {
    $('.' + menuName + ' span').removeClass(menuName + 'Active');
    $('.' + menuName + ' span').removeClass('textColor');
}


function hideTucengKongzhi() { // 隐藏图层菜单
    $('.fa-chevron-down').html('&#xe694;');
    jiantou = 'shang';
    setJiantouHeight();
    $('#jiantou').hide();
    $('#leftContent').hide();
}

function showTucengKongzhi() { // 显示图层菜单
    $('#jiantou').show();
    $('#leftContent').show();
    $('.fa-chevron-down').html('&#xe694;');
    jiantou = 'shang';
    setJiantouHeight();
}
function controlPanel(boolvalue) {
    setLayersOpenOrClose(); // 重新绘制九个图层是否选中
    if (boolvalue) {
        showTucengKongzhi();
    } else {
        hideTucengKongzhi();
    }
}

function setLayersOpenOrClose() {
    for (var i = 0; i < 10; i++) {
        convertNineLayers(i);
    }
}

function selectOneMenu(n) {
    if (n == 0) { // 图层控制
        $('#selectResult').html('');
        $('#tucenglayerConfirm').show();
        $('#fenxilayerConfirm').hide();
        $('#fenxilayerSelect').hide();
        $('#allLayer').css('height', '194px');
        $('#leftContent').css('height', '430px');
        controlPanel(menuBool[0]);
    }
    if (n == 1 || n == 2 || n == 3 || n == 4) {
        hideTucengKongzhi();
    }
}

