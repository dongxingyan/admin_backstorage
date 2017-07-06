var qstarttime
var qendtime
var highmonth=new Array()
var hightime=new Array()
var highduration=new Array()
var highparticipant=new Array()
var currentCount=30

var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
console.log(pmheight)
var heights=pmheight-72
var widths=pmwidth-130

if(heights<720){
$(".box-left").height(950)
$(".total-left").width(pmwidth-750)  
}
else{
$(".box-left").height(950) 
$(".total-left").width(pmwidth-750) 
}
$(".box-right").width(widths)
$(window).resize(function(){
  var pmwidth=document.body.clientWidth
  var pmheight=document.body.clientHeight
  var heights=pmheight-72
  var widths=pmwidth-130
$(".box-right").width(widths)
$(".total-left").width(pmwidth-750)
if(heights<720){
$(".box-left").height(950)
$(".total-left").width(pmwidth-750)  
}

else{
$(".box-left").height(950)
$(".total-left").width(pmwidth-750)  
}
})
var format = function(time, format){
    var t = new Date(time);
    var tf = function(i){return (i < 10 ? '0' : '') + i};
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
        switch(a){
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        }
    })
}
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
$(".buttons button").click(function(){
	$(".buttons button").removeClass("buttonclick")
	$(this).addClass("buttonclick")
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
//激活日期
$("#datatime1").datetimepicker();
$("#datatime2").datetimepicker();
//分页获取数据
function addcontent(startime,endtime,pagenum,pagecount){
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/getAllHistory?token='+admin_token+'&startTime='+startime+'&endTime='+endtime+'&pageNum='+pagenum+'&pageCount='+pagecount,function(data){
		document.getElementById("contentBox").innerHTML="";
		console.log(data)
		var countlength=data.data.length
		// totalPage = Math.ceil(countlength/currentCount);
		$(".current-page").html(pagenum);
		// $(".page-count").html(totalPage);
		// $(".content-totals").html(countlength);
		for(var i=0;i<countlength;i++){
		 	var new_meetingroom = new MeetingRoom(data.data[i]);
		}
	})
}

//会议室列表跳到首页
	$("#firstPage").click(function(){
		var currentPage = $(".current-page").html();//当前页码
		var pageCount = $(".page-count").html();//总页数
		var countTotal = $(".content-totals").html();//总条数
		if(currentPage==1 || currentPage==null){
			return;
		}
		addcontent(qstarttime,qendtime,'1',currentCount)
	});
	//前一页
	$("#prev").click(function(){
		var currentPage = $(".current-page").html();//当前页码
		var pageCount = $(".page-count").html();//总页数
		var countTotal = $(".content-totals").html();//总条数
		if(currentPage==1){
			$(".bcgs").show()
			$(".alerts").show()
			$(".alert-content").html('当前为第一页')
			return;
		}

      var yema=parseInt(currentPage)-1;//当前页码
      	addcontent(qstarttime,qendtime,yema,currentCount)
	});
	//下一页
	$("#next").click(function(){
		var currentPage = $(".current-page").html();//当前页码
		var pageCount = $(".page-count").html();//总页数
		var countTotal = $(".content-totals").html();//总条数
		if(currentPage == totalPage){
			$(".bcgs").show()
		$(".alerts").show()
		$(".alert-content").html('已经是最后一页')
			return ; 
		}
		// if(pageCount-currentPage==1){
		// 	paging_mode(currentPage*currentCount,totals);
		// }else{
		// 	paging_mode(currentPage*currentCount,(parseInt(currentPage)+1)*currentCount);
		// }
		var yema=parseInt(currentPage)+1;//当前页码
		addcontent(qstarttime,qendtime,yema,currentCount)
		console.log(qstarttime)
		console.log(qendtime)
	});
	//会议室列表跳到尾页
	$("#lastPage").click(function(){
		var currentPage = $(".current-page").html();//当前页码
		var pageCount = $(".page-count").html();//总页数
		var countTotal = $(".content-totals").html();//总条数
		if(currentPage == pageCount){
			console.log("已经是尾页");
			return;
		}
		addcontent(qstarttime,qendtime,pageCount,currentCount)
	});
	//按输入框值跳转页码
	$("#page-jump").click(function(){
		var currentPage = $(".current-page").html();//当前页码
		var pageCount = $(".page-count").html();//总页数
		var countTotal = $(".content-totals").html();//总条数
		var str = parseInt($(".page-num").val());
        if(str.length!=0){    
        	var reg=/^[0-9]*$/;     
	        if(reg.test(str)){
	        	if(str<=pageCount){
	        		addcontent(qstarttime,qendtime,str,currentCount)
		        	
	        	}
	        }
    	$(".page-num").val("");
    	}
	});

	$(".page-num").keyup(function(e){
			if(e.keyCode==13){
				$("#page-jump").click();			
			}});	
function MeetingRoom(meetingroom_data){
		if(meetingroom_data.meetingRoomNum==undefined){
			meetingroom_data.meetingRoomNum="";
		}
		if(meetingroom_data.startTime==undefined){
			meetingroom_data.startTime="";
		}
		if(meetingroom_data.endTime==undefined){
			meetingroom_data.endTime="";
		}
		if(meetingroom_data.totalDuration==undefined){
			meetingroom_data.totalDuration="";
		}
		if(meetingroom_data.totalParticipant==undefined){
			meetingroom_data.totalParticipant="";
		}
		//DATA
		this.roomNum = meetingroom_data.meetingRoomNum;
		this.capacity = meetingroom_data.totalParticipant;
		this.startimes = meetingroom_data.startTime.substring(0,16);
		this.endtimes=meetingroom_data.endTime.substring(0,16);
		this.thid=Math.ceil(meetingroom_data.totalDuration / 60);
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-meetingrooms";
		this.li_name = document.createElement("li");
		this.li_name.id = "meetingroom-name";
		this.li_name.innerHTML=this.roomNum
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.startimes;
		this.li_num.className = "meetingroom-number";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.endtimes;
		this.li_cap.className = "meetingroom-people";
		this.li_org = document.createElement("li");
		this.li_org.className = "meetingroom-org";
		this.li_org.innerHTML=this.thid
		this.li_date = document.createElement("li");
		this.li_date.innerHTML = this.capacity;
		this.li_date.className = "meetingroom-data";
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_date);
		document.getElementById("contentBox").appendChild(this.ul_element);
	}
$(".button1").click(function(){
	var a = new Date();
    a =a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes();
var b=new Date()
var newy=b.getFullYear()-1
var newa=newy+ "-"+(b.getMonth()+1)+"-"+b.getDate()+" "+b.getHours()+":"+b.getMinutes();
$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countAllHistory?token='+admin_token+'&startTime='+newa+'&endTime='+a,function(data){
	var countlength=data.data
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
})
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countmeetings?token='+admin_token+'&startTime='+newa+'&endTime='+a+'&timeType=month',function(data){
	console.log(data.data)		
	qstarttime=newa
	qendtime=a
	addcontent(qstarttime,qendtime,'1',currentCount)
	highmonth=JSON.parse(data.data).WeekOrMonth
	console.log(highmonth)
	hightime=JSON.parse(data.data).time
	highduration=JSON.parse(data.data).duration
	highparticipant=JSON.parse(data.data).participant
	console.log(hightime)
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议次数统计',
             style:{
                fontWeight: 'bold',
            }

        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '次数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: hightime
    })
	$('#container2').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议时长统计',
             style:{
                fontWeight: 'bold',
            }
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '时长（分钟）'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highduration
    });
$('#container3').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议人数统计',
             style:{
                fontWeight: 'bold',
            }
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '人数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y:20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highparticipant
    })

	})
})
$(".button2").click(function(){
	var a = new Date();
    a =a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes();
    console.log(a)
    var today=new Date();
    var begin=(today.getTime()-30*24*3600*1000);
    var newa=(format(begin,'yyyy-MM-dd HH:mm:ss'))
$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countAllHistory?token='+admin_token+'&startTime='+newa+'&endTime='+a,function(data){
	var countlength=data.data
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
})
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countmeetings?token='+admin_token+'&startTime='+newa+'&endTime='+a+'&timeType=week',function(data){
	console.log(data)	  	
	qstarttime=newa
	qendtime=a
	addcontent(qstarttime,qendtime,'1',currentCount)
	highmonth=JSON.parse(data.data).WeekOrMonth
	console.log(highmonth)
	hightime=JSON.parse(data.data).time
	highduration=JSON.parse(data.data).duration
	highparticipant=JSON.parse(data.data).participant
	console.log(hightime)
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议次数统计',
             style:{
                fontWeight: 'bold',
            }
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '次数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: hightime
    })
	$('#container2').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议时长统计',
            style:{
                fontWeight: 'bold',
            }

        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '时长（分钟）'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highduration
    });
$('#container3').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议人数统计',
             style:{
                fontWeight: 'bold',
            }
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '人数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    '总共: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highparticipant
    })

	})
})
$(".button3").click(function(){
	var a = new Date();
    a =a.getFullYear()+ "-"+(a.getMonth()+1)+"-"+a.getDate()+" "+a.getHours()+":"+a.getMinutes();
    console.log(a)
    var today=new Date();
    var begin=(today.getTime()-7*24*3600*1000);
    var newa=(format(begin,'yyyy-MM-dd HH:mm:ss'))
    console.log(newa)
$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countAllHistory?token='+admin_token+'&startTime='+newa+'&endTime='+a,function(data){
	var countlength=data.data
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
})
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countmeetings?token='+admin_token+'&startTime='+newa+'&endTime='+a+'&timeType=day',function(data){
	console.log(data.data)	
    if(data.code!=0){
        alert(data.message)
        return false
    }
    else{


	qstarttime=newa
	qendtime=a
	addcontent(qstarttime,qendtime,'1',currentCount)
	highmonth=JSON.parse(data.data).WeekOrMonth
	console.log(highmonth)
	hightime=JSON.parse(data.data).time
	highduration=JSON.parse(data.data).duration
	highparticipant=JSON.parse(data.data).participant
	console.log(hightime)
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '会议次数统计',
             style:{
                fontWeight: 'bold',
            }
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '次数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: hightime
    })
	$('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '会议时长统计',
             style:{
                fontWeight: 'bold',
            }
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '时长（分钟）'
            },
            stackLabels: {
                enabled:true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highduration
    });
$('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '会议人数统计',
             style:{
                fontWeight: 'bold',
            }
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '人数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highparticipant
    })
}
	})
})
$(".button2").click()
$(".chaxun").click(function(){
	var a=$("#datatime2").val()
	var newa=$("#datatime1").val()
	console.log(a)
	console.log(newa)
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countAllHistory?token='+admin_token+'&startTime='+newa+'&endTime='+a,function(data){
	if(data.data==0){
		$(".bcgs").show()
		$(".alerts").show()
		$(".alert-content").html('没有数据')
		return false
	}
	var countlength=data.data

	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
})
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/countmeetings?token='+admin_token+'&startTime='+newa+'&endTime='+a+'&timeType=week',function(data){
	if(data.code!=="0"){
        alert("暂无统计数据")
        return false
    }
    else{
	qstarttime=newa
	qendtime=a
	addcontent(qstarttime,qendtime,'1',currentCount)
	highmonth=JSON.parse(data.data).WeekOrMonth
	console.log(highmonth)
	hightime=JSON.parse(data.data).time
	highduration=JSON.parse(data.data).duration
	highparticipant=JSON.parse(data.data).participant
	console.log(hightime)
	$('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '会议次数统计',
             style:{
                fontWeight: 'bold',
            }
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '次数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: hightime
    })
	$('#container2').highcharts({
        chart: {
            type: 'column'
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        title: {
            text: '会议时长统计',
             style:{
                fontWeight: 'bold',
            }
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '时长'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: false,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highduration
    });
$('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '会议人数统计',
             style:{
                fontWeight: 'bold',
            }
        },
             credits: { 
        enabled: false //不显示LOGO 
        },
        xAxis: {
            categories:highmonth
        },
        yAxis: {
            min: 0,
            title: {
                text: '人数'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: 0,
            verticalAlign: 'top',
            y: 20,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.x +'</b><br/>'+
                    this.series.name +': '+ this.y +'<br/>'+
                    'Total: '+ this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: false,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: highparticipant
    })
}

	})
})
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})