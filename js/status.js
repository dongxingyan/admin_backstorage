var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
console.log(pmheight)
var heights=pmheight-72
var widths=pmwidth-130
if(heights<720){
$(".box-left").height(950)  
}
else{
$(".box-left").height(950) 
}
$(".box-right").width(widths)
$(window).resize(function(){
  var pmwidth=document.body.clientWidth
  var pmheight=document.body.clientHeight
  var heights=pmheight-72
  var widths=pmwidth-130
$(".box-right").width(widths)
if(heights<720){
$(".box-left").height(950)  
}
else{
$(".box-left").height(950)  
}
})
function GetRequest() {

   var url = location.search; //获取url中"?"符后的字串

   var theRequest = new Object();

   if (url.indexOf("?") != -1) {

      var str = url.substr(1);

      strs = str.split("&");

      for(var i = 0; i < strs.length; i ++) {

         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);

      }

   }

   return theRequest;

}
var Request = new Object();

Request = GetRequest();
var admin_id=Request.id
var admin_token=Request.name

// function fun_a(){
//   location.href='change-password.html?name='+admin_token+'&id='+admin_id;
// }
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,
  dataType:'json',
  success:function(data){
    $(".departments").html(data.data.name)
    // $(".department-time").html(data.data.expirationDate.substring(0,10))
    var dates=$(".department-time").html()
    Date.prototype.diff = function(date){
  return (this.getTime() - date.getTime())/(24 * 60 * 60 * 1000);
}
// 构造两个日期，分别是系统时间和2013/04/08 12:43:45
var now = new Date();
var date = new Date(dates);
// 调用日期差方法，求得参数日期与系统时间相差的天数
var diff = parseInt(date.diff(now));
// 打印日期差
if(diff==0){
    	$(".Days_Remaining").html("已过期")
    }
    else{
    $(".Days_Remaining").html(diff)
 	}
  }
})
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'/get-displayname?token='+admin_token,
  dataType:'json',
  success:function(data){
     $(".userss").html('你好,'+data.data)
  }
})
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'/vmrs-count?token='+admin_token,
  dataType:'json',
  success:function(data){
    $(".id_totals").html(data.data.count)
  }
})
//获取会议室总数
$.ajax({
  type:"get",
    url:url+'cloudpServer/v1/orgs/'+admin_id+'/devices-count?token='+admin_token,
  dataType:'json',
  success:function(data){
    $(".room_totals").html(data.data.count)

  }
})
//获取可用会议室总数
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'/users-count?token='+admin_token,
  dataType:'json',
  success:function(data){
    $(".can_use").html(data.data.count)
  }
})
var lefts=$(".box-left a")
var a=lefts.length
for (var i = 0; i<a; i++) {
	lefts.eq(i).click(function(){
		if($(this).hasClass('a7')){
			location.href='change-password.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a1')){
			location.href='status.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a2')){
			location.href='meeting-management.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a3')){
			location.href='meetingroom-management.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a4')){
			location.href='department-management.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a5')){
			location.href='user-number.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a6')){
			location.href='device-management.html?name='+admin_token+'&id='+admin_id;
		}
        else if($(this).hasClass('a9')){
          location.href='tongxunlu.html?name='+admin_token+'&id='+admin_id;
        }
        else if($(this).hasClass('a10')){
          location.href='video.html?name='+admin_token+'&id='+admin_id;
        }
        else if($(this).hasClass('a8')){
            location.href='meeting-total.html?name='+admin_token+'&id='+admin_id;
        }
        else if($(this).hasClass('J-account')){
            location.href='use-count.html?name='+admin_token+'&id='+admin_id;
            // var $useCount = $('#J-use-count');
            // var $liveCount = $('#J-live-count');
            //
            // if($useCount.hasClass('hide') || $liveCount.hasClass('hide')) {
            // 	$useCount.removeClass('hide');
            // 	$liveCount.removeClass('hide');
            // } else {
            // 	$useCount.addClass('hide');
            // 	$liveCount.addClass('hide');
            // }
        }
        // else if($(this).attr('id') === 'J-use-count'){
        // 	location.href='use-count.html?name='+admin_token+'&id='+admin_id;
        // }
        // else if($(this).attr('id') === 'J-live-count'){
        // 	location.href='live-count.html?name='+admin_token+'&id='+admin_id;
        // }
	})
}
  var series = new Array();
  var cates=new Array()
  var series2=new Array()
  var cates2=new Array()
  $(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
            // margin: [ 50, 50, 100, 80]
        },
        credits: { 
            enabled: false //不显示LOGO 
            },
        title: {
            text: '会议时长统计'
        },
        xAxis: {
            categories: cates,
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '11px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '会议时长 (秒)'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '会议时长: <b>{point.y:.1f} 秒</b>',
        },
        series: [{
            name: '会议时长',
            data: series,
            dataLabels: {
                enabled: false,
                rotation: 0,
                color: '#FFFFFF',
                align: 'center',
                x: 4,
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                    textShadow: '0 0 3px black'
                }
            }
        }]
    });
});
function create() {    
    $.ajax({
      type: "get",
      url: url+'cloudpServer/v1/orgs/'+admin_id+'/getAllDuration?token='+admin_token,
      async: false, //表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
      success: function(result){
        var channels = result.data;
        var a=JSON.parse(channels).data 
        var b=JSON.parse(channels).meetingRoomNum 
        series=a
        cates=b
        console.log(series)
      }
    
  })
}
create()
$(function () {
    var chart;
    
    $(document).ready(function () {
      
      // Build the chart
        $('#container2').highcharts({
            chart: {
                plotBackgroundColor: '#fff',
                plotBorderWidth: null,
                plotShadow: false
            },
            credits: { 
        enabled: false //不显示LOGO 
        },
            title: {
                text: '会议次数统计',
            },
            tooltip: {
                      formatter: function() {
            return '<b>会议名称：'+ this.point.name +'</b><br/>'+'<b>会议数量:'+
                         Highcharts.numberFormat(this.y, 0, ',') +' 个</b>';
         }
            },
            plotOptions: {
                pie: {
                  size:160,
                  innerSize:'120',
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: '会议总数',
                data: series2
            }]
        });
    });
    
});
function create2() {    
    $.ajax({
      type: "get",
      url: url+'cloudpServer/v1/orgs/'+admin_id+'/getAllConferenceTime?token='+admin_token,
      async: false, //表示同步，如果要得到ajax处理完后台数据后的返回值，最好这样设置
      success: function(result){
        var channels = result.data;
        var a=JSON.parse(channels).data 
        var b=JSON.parse(channels).meetingRoomNum.length
        var c=JSON.parse(channels).totalTime
        series2=a
        cates2=b
        console.log(series2)
        $("#contents").html( '<b style="z-index:-999;font-size:13px;">会议室总数：'+ cates2 +'</b><br/>'+'<b style="z-index:-999;font-size:13px;">会议数量:'+
                        c +' 个</b>')
      }
    
  })
}
create2()