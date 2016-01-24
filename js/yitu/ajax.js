var qushifenxiData = {
    time: ['第1周', '第一周', '第一周', '第一周'],
    value: [1, 3, 2, 1],
    valueName: '当前值',
    valueUnit: '条',
    graphName: ['趋势分析', '小标题']
};

;

var qushifenxiString = JSON.stringify(qushifenxiData);
function formatResult(layerBool, attrHTML) {
    var result = [];
    for (var i = 0; i < attrHTML.length; i++) {
        if (layerBool[i]) {
            var oneLayerObj = getOneResult(attrHTML[i], i);
            oneLayerObj.layer = i;
            result.push(oneLayerObj);
        }
    }
    return JSON.stringify(result);
}

function getOneResult(attrHTML, i) {
    var selectAttr = getAttrArray(attrHTML);
    var time = getTime(selectAttr);
    var type = getType(selectAttr);
    var position = getPosition(selectAttr);
    var qushiTime = getQushiTime(selectAttr);
    var oneLayerObj = {};
    oneLayerObj.sgfssj = time;
    oneLayerObj.xzqh = position;
    oneLayerObj.sglx = type;
    oneLayerObj.layer = i;
    oneLayerObj.qushiTime = qushiTime;
    return oneLayerObj;
}

function getAttrArray(attrHTML) {
    var tuceng = $(attrHTML);
    var attrResult = [];
    for (var i = 0; i < tuceng.length; i++) {
        var currentAttr = tuceng[i].getElementsByClassName('text')[0].innerHTML;
        attrResult.push(currentAttr);
    }
    return attrResult;
}

function getTime(selectAttr) {
    var timeArray = [];
    for (var i = 0; i < selectAttr.length; i++) {
        if (selectAttr[i].indexOf('-') != -1) {
            var start = selectAttr[i].split(':')[1].split(' ')[1].split('-');
            var end = selectAttr[i].split(':')[2].split('-');
            start = "" + start[0] + start[1] + start[2] + "000000";
            end = "" + end[0] + end[1] + end[2] + "235959";
            timeArray.push(start);
            timeArray.push(end);
            return timeArray
        }
    }
}

function getType(selectAttr) {
    var typeArray = [];
    for (var i = 0; i < selectAttr.length; i++) {
        if (selectAttr[i].indexOf('事故') != -1) {
            typeArray.push(selectAttr[i]);
        }
    }
    typeArray = getFieldArray(typeArray);
    return typeArray;
}


function getPosition(selectAttr) {
    var positionArray = [];
    for (var i = 0; i < selectAttr.length; i++) {
        if (selectAttr[i].indexOf('市') != -1 || selectAttr[i].indexOf('区') != -1 || selectAttr[i].indexOf('省') != -1) {
            positionArray.push(selectAttr[i]);
        }
    }
    positionArray = getFieldArray(positionArray);
    return positionArray;
}

function getQushiTime(selectAttr) {
    for (var i = 0; i < selectAttr.length; i++) {
        if (selectAttr[i].indexOf('月') != -1) {
            return getFileName(selectAttr[i]);
        }
    }
}


function getFieldArray(nameArray) {
    var fieldArray = []
    for (var i = 0; i < nameArray.length; i++) {
        fieldArray.push(getFileName(nameArray[i]));
    }
    return fieldArray;
}

function getFileName(name) {
    for (var i = 0; i < window.jsonData.length; i++) {
        if (name == window.jsonData[i].name) {
            return window.jsonData[i].fiedName;
        }
    }
}

$('#tucengCancel').click(function () { // 取消
    window.tucengkongzhiHTML[window.layerCurrentNum] = '';
    $('#selectResult').html('');
});


$('#tucengConfirm').click(function () { // 图层确认
    if ($('#selectResult').html().length == 0) {
        return false;
    }

    var result = formatResult(layerBool, window.tucengkongzhiHTML);
    alert(result)

});