// JavaScript Document
var curIndex=0;
var timeInterval=6000;
var timeOut;
var mainPicArr=new Array();
var menuPicArr=new Array();
var bGColorArr=new Array();
mainPicArr[0]="./img/login/pic1.png";
mainPicArr[1]="./img/login/pic2.png";
mainPicArr[2]="./img/login/pic3.png";
menuPicArr[0]="./img/login/menu1.png";
menuPicArr[1]="./img/login/menu2.png";
menuPicArr[2]="./img/login/menu3.png";
bGColorArr[0]="#2D92E0";
bGColorArr[1]="#31A2A0";
bGColorArr[2]="#728AB8";

$(document).ready(function() {
  timeOut=setInterval(changeImg,timeInterval);

  $("#dotSwitcha").click(function(){
	changeIndexImg(0);
	curIndex=0;
	resetTimer(timeOut);
  });  
  $("#dotSwitchb").click(function(){
	changeIndexImg(1);
	curIndex=1;
	resetTimer(timeOut);
  });  
   $("#dotSwitchc").click(function(){
	changeIndexImg(2);
	curIndex=2;
	resetTimer(timeOut);
  });
    
  $("#loginBtn").click(function(){
	  var user = $('#loginIdInput').val();
	  var password = $('#loginPwdInput').val();
	  if(user != '' && password != ''){
		  window.location.href="./page/yitu.html";
	  }else{
		  $('.loginFormInput').css('border','red 1px solid');
		  $('#loginIdInput').val('');
		  $('#loginPwdInput').val('');
		  $('#loginPwdInput').attr('placeholder','密码有误，请重新输入');
	  }
  });
  
});
function resetTimer(Timer)
{
	clearInterval(Timer);
	timeOut=setInterval(changeImg,timeInterval);
}

function changeImg()
{
    if (curIndex==mainPicArr.length-1) 
    { curIndex=0; }
    else
    { curIndex+=1; }
    changeIndexImg(curIndex);
}

function changeIndexImg(curIndex)
{
	$("#mainpicPlaceHolder").css("opacity","0");
	$("#mainpicPlaceHolder").attr("src",mainPicArr[curIndex]);	
	$("#mainpicPlaceHolder").animate({opacity:'1'},1000);
    
	$("#menupicPlaceHolder").css("opacity","0");
	$("#menupicPlaceHolder").attr("src",menuPicArr[curIndex]);
	$("#menupicPlaceHolder").animate({opacity:'1'},1000);
	
/*	$("body").css("opacity","0");
	$("body").css("background-color",bGColorArr[curIndex]);
	$("body").animate({opacity:'1'},"slow");*/
	
/*	$("body").css("background-color","transparent");*/
	$("body").css("background-color",bGColorArr[curIndex]);
	/*$("body").animate({backgroundColor:bGColorArr[curIndex]},"slow");*/
	$("body").animate({opacity:'1'},1000);
	
	if(curIndex ==0) 
	{changeDotStyle("dotSwitcha");
	$("#contentPH1").fadeIn(1000);
	//$("#contentPH1").css("display","block");
	$("#contentPH2").css("display","none");
	$("#contentPH3").css("display","none");}
	if(curIndex ==1) 
	{changeDotStyle("dotSwitchb");
	$("#contentPH2").fadeIn(1000);	
	$("#contentPH1").css("display","none");
	//$("#contentPH2").css("display","block");
	$("#contentPH3").css("display","none");}
	if(curIndex ==2) 
	{changeDotStyle("dotSwitchc");
	$("#contentPH3").fadeIn(1000);
	$("#contentPH1").css("display","none");
	$("#contentPH2").css("display","none");
	//$("#contentPH3").css("display","block");
	}
	


}

function changeDotStyle(idName)
{
	$(".dotSwitch").each(function() {
		if($(this).attr("id") == idName)
		{ $(this).css("background-image","url(./img/login/click.png)");}
		else
		{ $(this).css("background-image","url(./img/login/nomal.png)");}       
    });
	
}



