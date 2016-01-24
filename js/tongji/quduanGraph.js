//var temp = '{"shigu":[{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区今日事故数据统计","totalNum":12,"value":[1,2,0,1,3,0,2,0,0,0,0,2,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区简易事故数据统计","totalNum":8,"value":[1,2,0,0,3,0,1,0,0,0,0,0,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区伤人事故数据统计","totalNum":3,"value":[0,0,0,1,0,0,1,0,0,0,0,1,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区死亡事故数据统计","totalNum":1,"value":[0,0,0,0,0,0,0,0,0,0,0,1,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区受伤人数数据统计","totalNum":4,"value":[0,0,0,1,0,0,1,0,0,0,0,2,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区死亡人数数据统计","totalNum":1,"value":[0,0,0,0,0,0,0,0,0,0,0,1,0]}],"weifa":[],"jingli":[]}'
var temp = parent.quduanData;

configEcharts(temp); // 第一次渲染
setInterval(refresh, 1000); // 隔5s刷新

function refresh() {
	var quduanData = parent.quduanData;
	if (temp != quduanData) { // 只有父页面数据发生变化才更新
		configEcharts(quduanData);
	}
	temp = quduanData;
}

function configEcharts(data) {
	var data = JSON.parse(data);
// 路径配置
	require.config({
		paths: {
			echarts: '../js/dist'
		}
	});

//柱状图chart1
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart1'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[0].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[0].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);

// 折线图11
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart11'));

			var option = {

				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[0].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[0].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);

	var test = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key1 = [];
	for (var i = 0; i < test.length; i++) {
		test[i].value = parseInt(data.shigu[0].value[i]);
		if (parseInt(test[i].value) != 0) {
			key1.push(test[i]);
		}
	}

// 饼状图12
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart12'));

			var option = {

				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key1
					}
				]
			};
			myChart.setOption(option);
		}
	);

//柱状图chart2
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart2'));

			var option = {
				tooltip: {
					trigger: 'axis'
				},
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[1].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[1].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);

// 折线图21
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart21'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[1].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[1].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);
	var test2 = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key2 = [];
	for (var i = 0; i < test2.length; i++) {
		test2[i].value = parseInt(data.shigu[1].value[i]);
		if (parseInt(test2[i].value) != 0) {
			key2.push(test2[i]);
		}
	}

// 饼状图22
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart22'));

			var option = {
				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key2
					}
				]
			};
			myChart.setOption(option);
		}
	);
//柱状图chart3
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart3'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[2].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[2].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);
// 折线图31
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart31'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[2].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[2].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);
	var test3 = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key3 = [];
	for (var i = 0; i < test3.length; i++) {
		test3[i].value = parseInt(data.shigu[2].value[i]);
		if (parseInt(test3[i].value) != 0) {
			key3.push(test3[i]);
		}
	}

// 饼状图32
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart32'));

			var option = {
				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key3
					}
				]
			};
			myChart.setOption(option);
		}
	);
//柱状图chart4
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart4'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[3].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[3].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);

// 折线图41
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart41'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[3].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[3].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);
	var test = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key4 = [];
	for (var i = 0; i < test.length; i++) {
		test[i].value = parseInt(data.shigu[3].value[i]);
		if (parseInt(test[i].value) != 0) {
			key4.push(test[i]);
		}
	}

// 饼状图42
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart42'));

			var option = {
				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key4
					}
				]
			};
			myChart.setOption(option);
		}
	);
//柱状图chart5
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart5'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[4].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[4].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);
// 折线图51
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart51'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[4].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[4].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);
	var test = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key5 = [];
	for (var i = 0; i < test.length; i++) {
		test[i].value = parseInt(data.shigu[4].value[i]);
		if (parseInt(test[i].value) != 0) {
			key5.push(test[i]);
		}
	}

// 饼状图52
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart52'));

			var option = {
				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key5
					}
				]
			};
			myChart.setOption(option);
		}
	);
//柱状图chart6
	require(
		[
			'echarts',
			'echarts/chart/bar' // 使用柱状图就加载bar模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart1 = ec.init(document.getElementById('chart6'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1]
					}
				],
				yAxis: [
					{
						type: 'category',
						data: data.shigu[5].key
					}
				],
				series: [
					{
						valuename: '当前值',
						type: 'bar',
						data: data.shigu[5].value
					}
				]
			};

			// 为echarts对象加载数据
			myChart1.setOption(option);
		}
	);
// 折线图61
	require(
		[
			'echarts',
			'echarts/chart/line' // 使用柱状图就加载line模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart61'));

			var option = {
				calculable: true,
				xAxis: [
					{
						type: 'category',
						boundaryGap: false,
						data: data.shigu[5].key
					}
				],
				yAxis: [
					{
						type: 'value',
						boundaryGap: [0, 0.1],
						splitArea: {show: true}
					}
				],
				series: [
					{
						type: 'line',
						data: data.shigu[5].value
					},
				]
			};
			// 为echarts对象加载数据
			myChart.setOption(option);
		}
	);

	var test6 = [{value: 1, name: '江岸区'}, {value: 2, name: '江汉区'}, {value: 0, name: '乔口区'}, {
		value: 1,
		name: '汉阳区'
	}, {value: 0, name: '武昌区'},
		{value: 0, name: '青山区'}, {value: 0, name: '洪山区'}, {value: 0, name: '东西湖区'}, {value: 0, name: '汉南区'}, {
			value: 0,
			name: '蔡甸区'
		},
		{value: 0, name: '江夏区'}, {value: 0, name: '黄陂区'}, {value: 0, name: '新洲区'}];
	var key6 = [];
	for (var i = 0; i < test6.length; i++) {
		test6[i].value = parseInt(data.shigu[5].value[i]);
		if (parseInt(test6[i].value) != 0) {
			key6.push(test6[i]);
		}
	}

// 饼状图62
	require(
		[
			'echarts',
			'echarts/chart/pie' // 使用柱状图就加载pie模块，按需加载
		],
		function (ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById('chart62'));

			var option = {
				calculable: true,
				series: [
					{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: key6
					}
				]
			};
			myChart.setOption(option);
		}
	);
}