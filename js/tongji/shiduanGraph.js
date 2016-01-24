$(document).ready(function() {
	var temp = parent.shiduanData;

	configEcharts(temp); // 第一次渲染
	setInterval(refresh, 1000); // 隔5s刷新


	function refresh() {
		var shiduanData = parent.shiduanData;
		if (temp != shiduanData) { // 只有父页面数据发生变化才更新
			configEcharts(shiduanData);
		}
		temp = shiduanData;
	}

	function configEcharts(data) {
		var data = JSON.parse(data);
		var currentHours = new Date().getHours();
		data = {
			time: data.shigu.key,
			value: data.shigu.value.slice(0, currentHours)
		};

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
				'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
			],
			function (ec) {
				// 基于准备好的dom，初始化echarts图表
				var myChart = ec.init(document.getElementById('zhexian'));

				var option = {
					tooltip: {
						trigger: 'axis',
						show: true
					},
					calculable: false,
					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							data: data.time,
							axisLabel: {
								formatter: '{value}时'
							}

						}
					],
					yAxis: [
						{
							type: 'value',
							boundaryGap: [0, 0.1],
							splitArea: {show: true},
							axisLabel: {
								formatter: '{value}起'
							}
						}
					],
					series: [
						{
							type: 'line',
							data: data.value
						},
					]
				};
				// 为echarts对象加载数据
				myChart.setOption(option);
			}
		);
	}
});