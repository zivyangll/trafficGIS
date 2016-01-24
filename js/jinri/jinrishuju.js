var todayData = {
	layerBool: [false, false, false],
	tonjiBool: [false, false, false],
	toogleShow: function(target, index){
		if(todayData.layerBool[index]){ // 显示图层，切换图标
			target.attr('src','../img/jinri/tuceng/'+index+'.png');
			todayData.showLayer(index);
		}else{
			target.attr('src','../img/jinri/tuceng/'+index+'_n.png');
			todayData.hideLayer(index);
		}
	},
	showLayer: function(index){ // 显示图层

	},
	hideLayer: function(index){ // 隐藏图层

	},

	refreshBaseInfo: function(){
		var dayNames = new Array("星期日","星期一","星期二","星期三","星期四","星期五","星期六");
		var today = new Date();
		var baseInfo = {
			time: today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日',
			week: dayNames[today.getDay()],
			weather: '晴天',
			temperature: '10℃',
			pollute: '轻度污染'
		}
        $('.todayTime .time').html(baseInfo.time);
		$('#time').html(
			'<span>'+baseInfo.time+'</span>' +
			'<span>'+baseInfo.week+'</span>' +
			'<span>'+baseInfo.weather+'</span>' +
			'<span>'+baseInfo.temperature+'</span>' +
			'<span>'+baseInfo.pollute+'</span>'
		)
	}
};

$(document).ready(function(){ // 切换图层
    $('#allmap').height($(document).height())
	$('#layer img').click(function(e){
		var target = $(e.target);
		var index = $('#layer img').index(target);
		todayData.layerBool[index] = !todayData.layerBool[index];
		todayData.toogleShow(target,index);
	});

	$('#tongjiMenu').click(function(e){
		var target = $(e.target);
		var index = $('#tongjiMenu div').index(target);
		todayData.tonjiBool[index] = !todayData.tonjiBool[index];
		// 切换
	})
	todayData.refreshBaseInfo(); // 刷新基本信息
});