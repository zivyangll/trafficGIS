jQuery(function($){
    $(".flipper").click(flipped);
});
function flipped(){
    var flag = $(this).hasClass('isfront');
    console.log(flag);
    if(flag==true){
        $(this).css({
            '-webkit-transform' : 'rotateY(180deg)',
            '-moz-transform' :'rotateY(180deg)',
            '-ms-transform' : 'rotateY(180deg)',
            '-o-transform' : 'rotateY(180deg)',
            'transform' :'rotateY(180deg)'
        });
        $(this).removeClass('isfront');
    } else {
        $(this).css({
            '-webkit-transform' : 'rotateY(0deg)',
            '-moz-transform' :'rotateY(0deg)',
            '-ms-transform' : 'rotateY(0deg)',
            '-o-transform' : 'rotateY(0deg)',
            'transform' :'rotateY(0deg)'
        });
        $(this).addClass('isfront');
    }
}

window.onload =function() {
    refreshJinriData();
    setInterval(refreshJinriData,2000)
};

function refreshJinriData(){
    var data = {
        dataSource: [
            {today: '333', total:'455',yesterday:'325'},
            {today: '323', total:'640',yesterday:'879'},
            {today: '455', total:'523',yesterday:'535'},
            {today: '640', total:'325',yesterday:'333'},
            {today: '523', total:'879',yesterday:'323'},
            {today: '325', total:'535',yesterday:'455'},
            {today: '879', total:'326',yesterday:'640'},
            {today: '535', total:'321',yesterday:'523'},
            {today: '326', total:'680',yesterday:'321'}
        ],
        nineNumber :[{"number":"423"},{"number":"319"},{"number":"312"},{"numbe   r":"23974"},{"number":"321"},{"number":"42224"},{"number":"8374"},{"number":"234  "},{"number":"2350"}],
        totalNum:78531
    };

    //$.get('http://localhost:8080/TrafficSystem/servlet/Servlet_getSJZL',function(data) {
    //    data = JSON.parse(data);
        TonumberPlaceHolderSmall(data.dataSource);
        ToEveryNumberPlaceHolder(data.nineNumber);
        scrollNumber(data.totalNum);
    //});
}

function TonumberPlaceHolder(number) {
    var numNodes = document.getElementsByClassName("numberPlaceHolderSpan");
    var numberstring =number.toString();
    var num =  numberstring.length;
    var arrayObj = new Array();
    arrayObj = numberstring.split("");
    for(var i=0;i<(12-num);i++)
    {
        $(numNodes[i]).css("background-position","0px 0px");
    }
    for(var i=0;i<num;i++)
    {
        $(numNodes[(12-num+i)]).css("background-position","0px "+ arrayObj[i]*(-36)+"px");
    }
}
function ToEveryNumberPlaceHolder(str){
    var jsonList=str;
    var everynumNodes = document.getElementsByClassName("nineNumberPlaceHolderSpan");
    for(var i=0;i<jsonList.length;i++){
        for(var key in jsonList[i]){
            everynumNodes[i].innerHTML=jsonList[i][key];
        }
    }
}

function ToTwelveNum(str){
    str ='000000000000'+str;
    return str.substring(str.length-12,str.length);
}

function scrollNumber(latestNumber){
    var numNodes = document.getElementsByClassName("numberPlaceHolderSpan");
    var latestnumberstring = ToTwelveNum(latestNumber).toString();
    var latestLen =  latestnumberstring.length;
    var latestArrayObj = latestnumberstring.split("");
    for(var i=0;i<latestLen;i++) {
        $(numNodes[i]).animate({
            //backgroundPosition:'(0 '+(-36)*latestArrayObj[i]+'px)'
            "background-position-y":(-36)*latestArrayObj[i]+'px'
        },2000);
    }
}

/*九个小图的统计数据*/
function TonumberPlaceHolderSmall(dataSource) {
    var numNodesAccident = document.getElementById("numberDisplayAccidentDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringAccident =dataSource[0].today;
    TonumberPlaceHolderSmall_toString(numNodesAccident,numberstringAccident);
    var numNodesAccident1 = document.getElementById("numberDisplayAccident1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringAccident1 =dataSource[0].total;
    TonumberPlaceHolderSmall_toString(numNodesAccident1,numberstringAccident1);
    var numNodesAccident2 = document.getElementById("numberDisplayAccident2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringAccident2 =dataSource[0].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesAccident2,numberstringAccident2);
    var numNodesIrregularity = document.getElementById("numberDisplayIrregularityDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringIrregularity =dataSource[1].today;
    TonumberPlaceHolderSmall_toString(numNodesIrregularity,numberstringIrregularity);
    var numNodesIrregularity1 = document.getElementById("numberDisplayIrregularity1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringIrregularity1 =dataSource[1].total;
    TonumberPlaceHolderSmall_toString(numNodesIrregularity1,numberstringIrregularity1);
    var numNodesIrregularity2 = document.getElementById("numberDisplayIrregularity2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringIrregularity2 =dataSource[1].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesIrregularity2,numberstringIrregularity2);
    var numNodesRoad = document.getElementById("numberDisplayRoadDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringRoad =dataSource[2].today;
    TonumberPlaceHolderSmall_toString(numNodesRoad,numberstringRoad);
    var numNodesRoad1 = document.getElementById("numberDisplayRoad1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringRoad1 =dataSource[2].total;
    TonumberPlaceHolderSmall_toString(numNodesRoad1,numberstringRoad1);
    var numNodesRoad2 = document.getElementById("numberDisplayRoad2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringRoad2 =dataSource[2].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesRoad2,numberstringRoad2);
    var numNodesDriver = document.getElementById("numberDisplayDriverDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringDriver =dataSource[3].today;
    TonumberPlaceHolderSmall_toString(numNodesDriver,numberstringDriver);
    var numNodesDriver1 = document.getElementById("numberDisplayDriver1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringDriver1 =dataSource[3].total;
    TonumberPlaceHolderSmall_toString(numNodesDriver1,numberstringDriver1);
    var numNodesDriver2 = document.getElementById("numberDisplayDriver2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringDriver2 =dataSource[3].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesDriver2,numberstringDriver2);
    var numNodesCar = document.getElementById("numberDisplayCarDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCar =dataSource[4].today;
    TonumberPlaceHolderSmall_toString(numNodesCar,numberstringCar);
    var numNodesCar1 = document.getElementById("numberDisplayCar1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCar1 =dataSource[4].total;
    TonumberPlaceHolderSmall_toString(numNodesCar1,numberstringCar1);
    var numNodesCar2 = document.getElementById("numberDisplayCar2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCar2 =dataSource[4].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesCar2,numberstringCar2);
    var numNodesCompany = document.getElementById("numberDisplayCompanyDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCompany =dataSource[5].today;
    TonumberPlaceHolderSmall_toString(numNodesCompany,numberstringCompany);
    var numNodesCompany1 = document.getElementById("numberDisplayCompany1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCompany1 =dataSource[5].total;
    TonumberPlaceHolderSmall_toString(numNodesCompany1,numberstringCompany1);
    var numNodesCompany2 = document.getElementById("numberDisplayCompany2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringCompany2 =dataSource[5].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesCompany2,numberstringCompany2);
    var numNodesParking = document.getElementById("numberDisplayParkingDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringParking =dataSource[6].today;
    TonumberPlaceHolderSmall_toString(numNodesParking,numberstringParking);
    var numNodesParking1 = document.getElementById("numberDisplayParking1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringParking1 =dataSource[6].total;
    TonumberPlaceHolderSmall_toString(numNodesParking1,numberstringParking1);
    var numNodesParking2 = document.getElementById("numberDisplayParking2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringParking2 =dataSource[6].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesParking2,numberstringParking2);
    var numNodesTraffic = document.getElementById("numberDisplayTrafficDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringTraffic =dataSource[7].today;
    TonumberPlaceHolderSmall_toString(numNodesTraffic,numberstringTraffic);
    var numNodesTraffic1 = document.getElementById("numberDisplayTraffic1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringTraffic1 =dataSource[7].total;
    TonumberPlaceHolderSmall_toString(numNodesTraffic1,numberstringTraffic1);
    var numNodesTraffic2 = document.getElementById("numberDisplayTraffic2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringTraffic2 =dataSource[7].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesTraffic2,numberstringTraffic2);
    var numNodesPolice = document.getElementById("numberDisplayPoliceDiv").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringPolice =dataSource[8].today;
    TonumberPlaceHolderSmall_toString(numNodesPolice,numberstringPolice);
    var numNodesPolice1 = document.getElementById("numberDisplayPolice1Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringPolice1 =dataSource[8].total;
    TonumberPlaceHolderSmall_toString(numNodesPolice1,numberstringPolice1);
    var numNodesPolice2 = document.getElementById("numberDisplayPolice2Div").getElementsByClassName("numberPlaceHolderSpan");
    var numberstringPolice2 =dataSource[8].yesterday;
    TonumberPlaceHolderSmall_toString(numNodesPolice2,numberstringPolice2);
}

function TonumberPlaceHolderSmall_toString(numNodes,numberstring) {
    numberstring = numberstring.toString();
    var num =  numberstring.length;
    var arrayObj = new Array();
    numberstring = JSON.stringify(numberstring);
    var arrayObj = numberstring.split("");
    for(var i=0;i<(12-num);i++)
    {
        numNodes[i].innerHTML="0";
    }
//    alert(arrayObj.toString())
    for(var i=0;i<num;i++)
    {
        numNodes[(12-num+i)].innerHTML=arrayObj[i+1];
    }
}
