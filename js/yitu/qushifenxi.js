var temp = parent.qushifenxiString;
configEcharts(temp); // 第一次渲染
setInterval("refresh()", 10); // 隔1s刷新


function refresh() {
	var qushifenxiString = parent.qushifenxiString;
	if (temp != qushifenxiString) { // 只有父页面数据发生变化才更新
		configEcharts(qushifenxiString);
	}
	temp = qushifenxiString;
}

function configEcharts(myData) {
	var myData = JSON.parse(myData);
	// 路径配置
	require.config({
		paths: {
			echarts: '../js/dist'
		}
	});

	// 使用
	require(
		[
			'echarts',
			'echarts/chart/line', // 使用柱状图就加载bar模块，按需加载
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {

			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('qushiGraph'));
			var option = {
				tooltip: {
					trigger: 'axis'
				},
				toolbox: {
					show: true,
					feature: {
						mark: {show: true},
						dataView: {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore: {show: true},
						saveAsImage: {show: true}
					}
				},
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: myData.time
					}
				],
				yAxis: [
					{
						type: 'value',
						axisLabel: {
							formatter: '{value} ' + myData.valueUnit
						}
					}
				],
				series: [
					{
						name: myData.valueName,
						type: 'line',
						data: myData.value,
						markPoint: {
							data: [
								{type: 'max', name: '最大值', xAxis: 1, yAxis: -1.5},
								{type: 'min', name: '最小值', xAxis: 1, yAxis: -1.5}
							]
						},
						markLine: {
							data: [
								{type: 'average', name: '平均值'}
							]
						}
					}
				]
			};
			myChart.setOption(option);
		}
	);
}
