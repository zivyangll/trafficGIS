//按区分 每隔1分钟请求
var quduanData = '{"shigu":[{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区今日事故数据统计","totalNum":0,"value":[1,2,0,1,3,0,2,0,0,0,0,2,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区简易事故数据统计","totalNum":0,"value":[1,2,0,0,3,0,1,0,0,0,0,0,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区伤人事故数据统计","totalNum":0,"value":[0,0,0,1,0,0,1,0,0,0,0,1,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区死亡事故数据统计","totalNum":0,"value":[0,0,0,0,0,0,0,0,0,0,0,1,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区受伤人数数据统计","totalNum":0,"value":[0,0,0,1,0,0,1,0,0,0,0,2,0]},{"key":["江岸区","江汉区","乔口区","汉阳区","武昌区","青山区","洪山区","东西湖区","汉南区","蔡甸区","江夏区","黄陂区","新洲区"],"valueName":"当前值","valueUnit":"起","graphName":"各区死亡人数数据统计","totalNum":0,"value":[0,0,0,0,0,0,0,0,0,0,0,1,0]}],"weifa":[],"jingli":[]}'
//按时间段分 每5分钟请求
var shiduanData = '{"shigu":{"key":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],"value":[5,0,1,1,0,0,0,1,2,1,3,2,0,0,0,0,0,0,0,0,0,0,0,0],"valueName":"当前值","valueUnit":"条","graphName":"实时事故时段统计","toalNum":12},"weifa":{},"jingli":{}}'

$(document).ready(function(){
var qdInterval = 1*60*1000;
var fdInterval =  5*60*1000;
    upDateJinRiqdData();
    runjinriData(qdInterval,fdInterval);
})
function runjinriData(qdInterval,fdInterval) {
    upDateJinRiqdData();
    upDateJinRifdData();
    setInterval(upDateJinRiqdData, qdInterval);
    setInterval(upDateJinRiqdData, fdInterval);
}

//请求分区数据
function upDateJinRiqdData(){
    //$.get('http://localhost:8080/TrafficSystem/servlet/Servlet_getSYSG',function(data){
    //    quduanData = data.toString();
        var quduanData = JSON.parse(quduanData);
        $('#tongjiList').html(
                '<div class="oneList">'+
                '    <div class="num">'+quduanData.shigu[0].totalNum+'</div>'+
                '    <div class="descrip">今日事故（起）</div>'+
                '</div>' +
                '<div class="oneList">' +
                '    <div class="num">'+quduanData.shigu[1].totalNum+'</div>'+
                '    <div class="descrip">简易事故</div>'+
                '</div>' +
                '<div class="oneList">'+
                '    <div class="num">'+quduanData.shigu[2].totalNum+'</div>'+
                '    <div class="descrip">伤人事故</div>'+
                '</div>'+
                '<div class="oneList">'+
                '    <div class="num">'+quduanData.shigu[3].totalNum+'</div>'+
                '    <div class="descrip">死亡事故</div>'+
                '</div>'+
                '<div class="oneList">'+
                '    <div class="num">'+quduanData.shigu[4].totalNum+'</div>'+
                '    <div class="descrip">受伤人数</div>'+
                '</div>'+
                '<div class="oneList">'+
                '    <div class="num">'+quduanData.shigu[5].totalNum+'</div>'+
                '    <div class="descrip">死亡人数</div>'+
                '</div>'
        );
    //})
}


function upDateJinRifdData(){
    //$.get('http://localhost:8080/TrafficSystem/servlet/Servlet_getSGFD',function(data){
    //    shiduanData = data.toString();
    //})
}
