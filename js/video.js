var xuhao=1
var currentCount=5
var names=''
var listlength
function test(){
var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
var heights=pmheight-72
var widths=pmwidth-130
var names=widths-1100
var names1=widths-850
$(".boxes1").width(names)
$(".changeluzhi").width(names)
$(".meetingroom-data").width(names1)
if(heights<720){
$(".box-left").height(950)  
}
else{
$(".box-left").height(950)  
}
$(".displayname1").width(names)
}
$(window).resize(function(){
  var pmwidth=document.body.clientWidth
    var pmheight=document.body.clientHeight
var heights=pmheight-72
  var widths=pmwidth-130
  var names=widths-1100
  var names1=widths-850
  console.log(names)
  if(pmwidth<900){
    $("body").css("overflow","scroll");
    $(".boxes1").width(150)
	$(".changeluzhi").width(150)
    $(".meetingroom-data").width(500)
  }
  else{
        if(heights<720){
    $(".box-left").height(950)  
    }
    else{
    $(".box-left").height(950)  
    }
    $(".boxes1").width(names)
$(".changeluzhi").width(names)
$(".meetingroom-data").width(names1)
    $(".displayname1").width(names)
    $(".head").width('100%')
}
})
//提示窗口关闭或者提示控制
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
function alerts(mes){
	$(".bcgs").show()
	$(".alerts").show()
	$(".alert-content").html(mes)
	return false
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
//分页获取数据
function addcontent(pagenum,pagecount){
	$.getJSON(url+'cloudpServer/v1/streaming/file/orgId/'+admin_id+'?token='+admin_token+'&pageNum='+pagenum+'&pageCount='+pagecount,function(data){
		document.getElementById("contentBox").innerHTML="";
		console.log(data)
		if(data.code==31){
			alert("暂无数据")
			test()
		}
		else{
		var countlength=data.data.length
		$(".current-page").html(pagenum);
		for(var i=0;i<countlength;i++){
		 	var new_meetingroom = new MeetingRoom(data.data[i]);
		}
		$(".video-bofang").click(function(){
		var newa=$(this).attr("name");
		console.log(newa)
		$(".bcgs").show()
		$("#a2").show()
		 var myPlayer = videojs('example_video_1');
     	myPlayer.src(newa)
        myPlayer.play();
    });

		$(".video-shanchu").click(function(){
			var a=$(this).attr("name")
			$(".bcgs").show()
			$(".alerts-delet").show()
			$(".delet-sure").click(function(){
			var url1 =url+'cloudpServer/v1/streaming/file/orgId/'+admin_id+'?token='+admin_token+'&fileName='+a;
			var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open("delete", url1, false);           
	        xmlhttp.setRequestHeader("Content-Type", "application/json");
	        xmlhttp.send();
	        if(xmlhttp.status==200){
	        	console.log(JSON.parse(xmlhttp.responseText))
	        	var codes=JSON.parse(xmlhttp.responseText)
	        	if(codes.code==0){
	        			$(".alerts-delet").hide()
	        			alerts("删除成功")
	        			$(".alert-sure").click(function(){
	        				location.reload()
	        			})		        			        	
	        	}
	        	else{
	        		$(".alerts-delet").hide()
	        		alerts(codes.mes)
	        		$(".alert-sure").click(function(){
	        				location.reload()
	        			})
	        	}	        	
	        }else{
	        	$(".alerts-delet").hide()
	        	alerts("服务器内部错误")
				$(".alert-sure").click(function(){
	        				location.reload()
	        			})
	        }
			})
			$(".delet-cancel").click(function(){
				$(".alerts-delet").hide()
				$(".bcgs").hide()
			})
			$(".delet-right").click(function(){
				$(".alerts-delet").hide()
				$(".bcgs").hide()
			})
		})
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
		addcontent('1',currentCount)
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
      	addcontent(yema,currentCount)
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
		addcontent(yema,currentCount)
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
		addcontent(pageCount,currentCount)
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
	        		addcontent(str,currentCount)
		        	
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
		if(meetingroom_data.liveStartTime==undefined){
			meetingroom_data.liveStartTime="";
		}
		if(meetingroom_data.liveEndTime==undefined){
			meetingroom_data.liveEndTime="";
		}
		//DATA
		
		this.record=meetingroom_data.recordStatus;
		this.live=meetingroom_data.liveStatus;
		if((this.record==0)&&(this.live==1)){
			moshistatus="直播"
			livedom(meetingroom_data)
		}
		if((this.record==1)&&(this.live==0)){
			moshistatus="录制"
			dom(meetingroom_data)
		}
		if((this.record==1)&&(this.live==1)){
			moshistatus="录制直播"
			dom(meetingroom_data)
		}
		
}
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$.getJSON(url+'cloudpServer/v1/streaming/streams/'+admin_id+'/?token='+admin_token,function(data){
	if(data.data==0){
		test()
		alert("暂无数据")
		return false
	}
	else{
		var countlength=data.data
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
	addcontent('1',currentCount)
	}
	
})
// console.log($(".video-bofang").length)
$("#chaimg").click(function(){
	$(".bcgs").hide()
	$("#a2").hide()
})
function dom(meetingroom_data){
	//DOM
	    this.meetingRoomNums= meetingroom_data.meetingRoomNum;
		this.capacity = meetingroom_data.totalParticipant;
		this.startimes = meetingroom_data.startTime.substring(0,19);
		this.endtimes=meetingroom_data.endTime.substring(0,19);
		this.ids=meetingroom_data.id;	
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-meetingrooms";
		this.li_name = document.createElement("li");
		this.li_name.id = "meetingroom-name";
		this.li_name.innerHTML=this.ids
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.meetingRoomNums;
		this.li_num.className = "meetingroom-number";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.startimes;
		this.li_cap.className = "meetingroom-people";
		this.li_org = document.createElement("li");
		this.li_org.className = "meetingroom-org";
		this.li_org.innerHTML=this.endtimes
		this.moshi=document.createElement("li")
		this.moshi.className="meeting-moshi"
		this.moshi.innerHTML=moshistatus
		this.li_date = document.createElement("li");
		this.li_date.className = "meetingroom-data";
		if(meetingroom_data.list.length==0){			
					listlength=41
					this.lis1=document.createElement("ul")
					this.lis1.id="contentbox"
					this.lis2=document.createElement("li")
					this.lis2.innerHTML="已删除"
					this.lis2.className="boxes1"
					this.lis3=document.createElement("li")
					this.lis3.innerHTML="已删除"
					this.lis3.className="boxes2"
					this.lis4=document.createElement("li")
					this.lis4.className="boxes3"
					this.lis4.innerHTML="已删除"				
					this.lis1.appendChild(this.lis2)
					this.lis1.appendChild(this.lis3)
					this.lis1.appendChild(this.lis4)
					this.li_date.appendChild(this.lis1)
					this.ul_element.appendChild(this.li_name);
					this.ul_element.appendChild(this.li_num);
					this.ul_element.appendChild(this.li_cap);
					this.ul_element.appendChild(this.li_org);
					this.ul_element.appendChild(this.li_date);
					this.ul_element.style.height=41
					this.ul_element.style.lineHeight=41
					document.getElementById("contentBox").appendChild(this.ul_element);
			        test()
					}
		else{
			for (var i = 0; i<meetingroom_data.list.length; i++) {
					 listlength=(meetingroom_data.list.length)*41
					this.box1=meetingroom_data.list[i].name
					this.box2=meetingroom_data.list[i].path
					this.box3=meetingroom_data.list[i].size
					this.lis1=document.createElement("ul")
					this.lis1.id="contentbox"
					this.lis2=document.createElement("li")
					this.lis2.innerHTML=this.box1
					this.lis2.className="boxes1"
					this.lis3=document.createElement("li")
					this.lis3.innerHTML=this.box3
					this.lis3.className="boxes2"
					this.lis4=document.createElement("li")
					this.lis4.className="boxes3"
					this.img1=document.createElement("img")
					this.img1.src="image/xiazai.png"
					this.img1.className="video-xiazai"
					this.img1.setAttribute("name",this.box2)
					this.img2=document.createElement("img")
					this.img2.src="image/bofang.png"
					this.img2.className="video-bofang"
					this.img2.setAttribute("name",this.box2)
					this.img3=document.createElement("img")
					this.img3.src="image/shanchu.png"
					this.img3.className="video-shanchu"
					this.img3.style.width="16px"
					this.img3.setAttribute("name",this.box1)
					this.address=document.createElement('a')
					this.address.download=this.box1
					this.address.href=this.box2
					this.address.appendChild(this.img1)
					this.lis1.appendChild(this.lis2)
					this.lis1.appendChild(this.lis3)
					this.lis1.appendChild(this.lis4)
					this.lis4.appendChild(this.address)
					this.lis4.appendChild(this.img2)
					this.lis4.appendChild(this.img3)
					this.li_date.appendChild(this.lis1)
		}
		}
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.moshi)
		this.ul_element.appendChild(this.li_date);
		this.ul_element.style.height=listlength+"px"
		this.ul_element.style.lineHeight=listlength+"px"
		document.getElementById("contentBox").appendChild(this.ul_element);
        test()
	}
function livedom(meetingroom_data){
	//DOM
	    this.meetingRoomNums= meetingroom_data.meetingRoomNum;
		this.capacity = meetingroom_data.totalParticipant;
		this.startimes = meetingroom_data.liveStartTime.substring(0,19);
		this.endtimes=meetingroom_data.liveEndTime.substring(0,19);
		this.ids=meetingroom_data.id;	
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-meetingrooms";
		this.li_name = document.createElement("li");
		this.li_name.id = "meetingroom-name";
		this.li_name.innerHTML=this.ids
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.meetingRoomNums;
		this.li_num.className = "meetingroom-number";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.startimes;
		this.li_cap.className = "meetingroom-people";
		this.li_org = document.createElement("li");
		this.li_org.className = "meetingroom-org";
		this.li_org.innerHTML=this.endtimes
		this.moshi=document.createElement("li")
		this.moshi.className="meeting-moshi"
		this.moshi.innerHTML=moshistatus
		this.li_date = document.createElement("li");
		this.li_date.className = "meetingroom-data";
		if(meetingroom_data.list.length==0){			
					listlength=41
					this.lis1=document.createElement("ul")
					this.lis1.id="contentbox"
					this.lis2=document.createElement("li")
					this.lis2.innerHTML="—"
					this.lis2.className="boxes1"
					this.lis3=document.createElement("li")
					this.lis3.innerHTML="—"
					this.lis3.className="boxes2"
					this.lis4=document.createElement("li")
					this.lis4.className="boxes3"
					this.lis4.innerHTML="—"				
					this.lis1.appendChild(this.lis2)
					this.lis1.appendChild(this.lis3)
					this.lis1.appendChild(this.lis4)
					this.li_date.appendChild(this.lis1)
					this.ul_element.appendChild(this.li_name);
					this.ul_element.appendChild(this.li_num);
					this.ul_element.appendChild(this.li_cap);
					this.ul_element.appendChild(this.li_org);
					this.ul_element.appendChild(this.li_date);
					this.ul_element.style.height=41
					this.ul_element.style.lineHeight=41
					document.getElementById("contentBox").appendChild(this.ul_element);
			        test()
					}
		else{
			for (var i = 0; i<meetingroom_data.list.length; i++) {
					 listlength=(meetingroom_data.list.length)*41
					this.box1=meetingroom_data.list[i].name
					this.box2=meetingroom_data.list[i].path
					this.box3=meetingroom_data.list[i].size
					this.lis1=document.createElement("ul")
					this.lis1.id="contentbox"
					this.lis2=document.createElement("li")
					this.lis2.innerHTML=this.box1
					this.lis2.className="boxes1"
					this.lis3=document.createElement("li")
					this.lis3.innerHTML=this.box3
					this.lis3.className="boxes2"
					this.lis4=document.createElement("li")
					this.lis4.className="boxes3"
					this.img1=document.createElement("img")
					this.img1.src="image/xiazai.png"
					this.img1.className="video-xiazai"
					this.img1.setAttribute("name",this.box2)
					this.img2=document.createElement("img")
					this.img2.src="image/bofang.png"
					this.img2.className="video-bofang"
					this.img2.setAttribute("name",this.box2)
					this.img3=document.createElement("img")
					this.img3.src="image/shanchu.png"
					this.img3.className="video-shanchu"
					this.img3.style.width="16px"
					this.img3.setAttribute("name",this.box1)
					this.address=document.createElement('a')
					this.address.download=this.box1
					this.address.href=this.box2
					this.address.appendChild(this.img1)
					this.lis1.appendChild(this.lis2)
					this.lis1.appendChild(this.lis3)
					this.lis1.appendChild(this.lis4)
					this.lis4.appendChild(this.address)
					this.lis4.appendChild(this.img2)
					this.lis4.appendChild(this.img3)
					this.li_date.appendChild(this.lis1)
		}
		}
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.moshi)
		this.ul_element.appendChild(this.li_date);
		this.ul_element.style.height=listlength+"px"
		this.ul_element.style.lineHeight=listlength+"px"
		document.getElementById("contentBox").appendChild(this.ul_element);
        test()
	}