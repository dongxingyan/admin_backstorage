var teamid='-1'
var currentCount=15
var peopleteamid
var peopleid
var deletid
var groupid
function test(){
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
if(widths<1500){
	$(".fenzu").width(widths-1170)
	$(".meetingroom-org1").width(widths-1170)
}
else{
	$(".fenzu").width(widths-1170)
$(".meetingroom-org1").width(widths-1170)
}
$(".box-right").width(widths)
}
$(window).resize(function(){
  var pmwidth=document.body.clientWidth
  var pmheight=document.body.clientHeight
  var heights=pmheight-72
  var widths=pmwidth-130
$(".box-right").width(widths)
$(".fenzu").width(widths-1170)
$(".meetingroom-org1").width(widths-1170)
if(heights<720){
$(".box-left").height(950)
}
else{
$(".box-left").height(950)
}
if(widths<1500){
	$("body").css("overflow","scroll");
	$(".fenzu").width(widths-1170)
	$(".meetingroom-org1").width(widths-1170)
}
else{
	$(".fenzu").width(widths-1170)
	$(".meetingroom-org1").width(widths-1170)
}
})
//获取location参数
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
		else if($(this).hasClass('a10')){
			location.href='video.html?name='+admin_token+'&id='+admin_id;
		}
		else if($(this).hasClass('a9')){
		  	location.href='tongxunlu.html?name='+admin_token+'&id='+admin_id;
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
function addcontent(pagenum,pagecount,teamids){
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token+'&pageNum='+pagenum+'&count='+pagecount+'&teamId='+teamids,function(data){
		document.getElementById("contentBox").innerHTML="";
		console.log(data)
		
		if(data.code==31){
			alert("暂无数据")
			test()
		}
		else{
			var countlength=data.data.length
		// totalPage = Math.ceil(countlength/currentCount);
		$(".current-page").html(pagenum);
		// $(".page-count").html(totalPage);
		// $(".content-totals").html(countlength);
		for(var i=0;i<countlength;i++){
		 	var new_meetingroom = new MeetingRoom(data.data[i]);
		}}
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
		addcontent('1',currentCount,teamid)
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
      	addcontent(yema,currentCount,teamid)
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
		addcontent(yema,currentCount,teamid)

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
		addcontent(pageCount,currentCount,teamid)
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
	        		addcontent(str,currentCount,teamid)
		        	
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
		if(meetingroom_data.cName==undefined){
			meetingroom_data.cName="";
		}
		if(meetingroom_data.email==undefined){
			meetingroom_data.email="";
		}
		if(meetingroom_data.phoneNum==undefined){
			meetingroom_data.phoneNum="";
		}
		if(meetingroom_data.tName==undefined){
			meetingroom_data.tName="";
		}
		//DATA
		this.names = meetingroom_data.cName;
		this.emails = meetingroom_data.email;
		this.phones = meetingroom_data.phoneNum;
		this.groups=meetingroom_data.tName;
		this.ids=meetingroom_data.id;
		this.remarks=meetingroom_data.remark
		this.teamidss=meetingroom_data.teamId
		//DOM
		this.ul_element = document.createElement("ul");
		this.ul_element.className = "li-head-meetingrooms";
		this.li_name = document.createElement("li");
		this.li_name.id = "meetingroom-name1";
		this.li_name.innerHTML=this.names
		this.li_num = document.createElement("li");
		this.li_num.innerHTML = this.emails;
		this.li_num.className = "meetingroom-number1";
		this.li_cap = document.createElement("li");
		this.li_cap.innerHTML = this.phones;
		this.li_cap.className = "meetingroom-people1";
		this.li_org = document.createElement("li");
		this.li_org.className = "meetingroom-org1";
		this.li_org.innerHTML=this.groups
		this.li_org.title=this.groups
		this.li_date = document.createElement("li");
		this.li_date.className = "meetingroom-data1";
		this.img2 = document.createElement("img");
		this.img2.src = "image/description2.png";
		this.img2.title = "修改"
		this.img2.addEventListener("click",this.updateRoom.bind(this),false);
		this.img3 = document.createElement("img");
		this.img3.src = "image/description3.png";
		this.img3.title = "删除"
		this.img3.addEventListener("click",this.deleteRoom.bind(this),false);
		this.li_date.appendChild(this.img2)
		this.li_date.appendChild(this.img3)
		this.ul_element.appendChild(this.li_name);
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.li_cap);
		this.ul_element.appendChild(this.li_org);
		this.ul_element.appendChild(this.li_date);
		document.getElementById("contentBox").appendChild(this.ul_element);
			test()
	}
	MeetingRoom.prototype.updateRoom = function(){
		peopleid=this.ids
		peopleteamid=this.teamidss
		$(".bcgs").show()
		$(".editor-people").show()
		$("#add-a111").val(this.names)
		$("#add-a222").val(this.emails)
		$("#add-a333").val(this.phones)
		$("#add-a555").val(this.remarks)
		$("#groups1").html('')
		$("#groups1").html('<option value="0" >未分组</option>')
		$.ajax({
		type:"get",
		url:url+'cloudpServer/v1/orgs/'+admin_id+'/teams?token='+admin_token,
		dataType:"json",
    	success: function(data){            
				var departmentcount=data.data.length
       		     html='';
       		    for (var i = 0; i <departmentcount; i++) {
       			html+='<option value="'+data.data[i].id+'">'+data.data[i].tName+'</option>'
       		      }
       		    $('#groups1').append(html)
       		   	   for(var i=0;i<$("#groups1 option").length;i++) {  
				            			if($("#groups1 option").eq(i).val() ==peopleteamid) {   	
				                		$("#groups1 option").eq(i).attr('selected',true);  
				                		break;  
				            }  
				        }
		},
		error: function(erro){
			openAlertWin("查询所有机构失败",true);
		}
	});

	}
	MeetingRoom.prototype.deleteRoom = function(){
		peopleid=this.ids
		$(".bcgs").show()
		$(".alerts-delet").show()
			$(".delet-sure").click(function(){ 
	          	 						var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/person/'+peopleid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("DELETE", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send();

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
								        		$(".alerts-delet").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("删除成功")
									        		$(".alert-sure").click(function(){
									        		location.reload()									        		
									        	})
									        			$(".img-right").click(function(){
									        		location.reload()									        		
									        	})
								        	}
								        	else{
								        		$(".alerts-delet").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("删除失败")
									        		$(".alert-sure").click(function(){									        			
									        		location.reload()
									        	})
									        		$(".img-right").click(function(){
									        		location.reload()									        		
									        	})
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
          	 				
		})		
	}
	$(".editortrue").click(function(){
		var a=$("#add-a111").val()
		var b=$("#add-a222").val()
		var c=$("#add-a333").val()
		var d=$("#add-a555").val()
		var e=$("#groups1 option:selected").val()
		if((a=='')||(b=='')||(c=='')||(e=='')){
			$(".editor-people").hide()
			$(".bcgs").show()
			$(".alerts").show()
			$(".alert-content").html("请完善信息")
			$(".alert-sure").click(function(){       	 				
          	 				$(".editor-people").show() 
          	 				$(".bcgs").show()          	 				
          	 				$(".alerts").hide()
		})
		}
		else{
			var data={
	          	 					  id:peopleid,
									  orgId:admin_id,
									  teamId:e,
									  cName: a,
									  phoneNum: c,
									  email: b,
									  remark: d

	          	 			}
	          	 		console.log(data)
	          	 						var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/person?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("PUT", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
								        		$(".editor-people").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("编辑成功")
									        		$(".alert-sure").click(function(){
									        			$(".add-user").hide()
									        		location.reload()
									        	})
								        	}
								        	else{
								        		$(".editor-people").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("编辑失败")
									        		$(".alert-sure").click(function(){
									        			$(".add-user").hide()
									        		location.reload()
									        	})
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
		}
	})
$(".editorcancel").click(function(){
	$(".editor-people").hide()
	$(".bcgs").hide()
})
$(".cancel").click(function(){
	$(".add-people").hide()
	$(".bcgs").hide()
})
//提示框控制
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".delet-right").click(function(){
	$(".alerts-delet").hide()
	$(".bcgs").hide()
})
$(".delet-cancel").click(function(){
	$(".alerts-delet").hide()
	$(".bcgs").hide()
})
$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token,function(data){
	if(data.code==31){
		$(".count1 span").html('(0人)')
	}
	else{
		$(".count1 span").html('('+data.data.length+'人)')
	}
	
})
$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token+'&teamId=0',function(data){
	if(data.code==31){
		$(".count2").html('(0人)')
	}
	else{
		$(".count2").html('('+data.data.length+'人)')
	}
	

})
//控制所有联系人未分组联系人显示
$(".count11").click(function(){
	teamid=-1
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token,function(data){
		if(data.code==31){
		// alert("暂无数据")
		test()
	}
	else{
	var countlength=data.data.length
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
	addcontent('1',currentCount,teamid)
}
})
})
$(".count11").click()
$(".count2").click(function(){
	teamid=0
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token+'&teamId=0',function(data){
	if(data.code==31){
		alert("暂无数据")
		test()
	}
	else{
		var countlength=data.data.length
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
	addcontent('1',currentCount,teamid)
	}
	
})
})
//获取通讯录分组
function paging_mode(start,end){
		document.getElementById("contentBox1").innerHTML="";
		for(var i=start;i<end;i++){
		 	var new_meetingroom = new MeetingRoom1(meetingRoomData[i]);
		}
	}
function MeetingRoom1(meetingroom_data){
		//DATA
		this.ids = meetingroom_data.id;
		this.names = meetingroom_data.tName;
		this.accounts = meetingroom_data.account;
		//DOM
		this.ul_element = document.createElement("div");
		this.ul_element.className = "group-box";
		this.li_num = document.createElement("div");
		this.li_num.innerHTML = this.names;
		this.li_num.className = "groupname";
		this.li_num1 = document.createElement("span");
		this.li_num1.innerHTML = '('+this.accounts+'人)';
		this.li_num1.className = "groupname11";
		this.li_num1.addEventListener("click",this.showpeople.bind(this),false);
		this.img2 = document.createElement("img");
		this.img2.className="group-editor"
		this.img2.src = "image/description5.png";
		this.img2.title = "修改"
		this.img2.addEventListener("click",this.updategroup.bind(this),false);
		this.img3 = document.createElement("img");
		this.img3.src = "image/description6.png";
		this.img3.title = "删除"
		this.img3.className="group-delet"
		this.img3.addEventListener("click",this.shanchu.bind(this),false);
		this.ul_element2=document.createElement("div")
		this.ul_element2.className = "add-group";
		this.ul_element2.setAttribute("name","adds")
		this.bcg1=document.createElement("input")
		this.bcg1.placeholder="请输入组名称"
		this.bcg2=document.createElement("span")
		this.bcg2.className="addspan1"
		this.bcg2.innerHTML="保存"
		this.bcg2.addEventListener("click",this.save.bind(this),false);
		this.bcg3=document.createElement("span")
		this.bcg3.className="addspan2"
		this.bcg3.innerHTML="取消"
		this.bcg3.addEventListener("click",this.quxiao.bind(this),false);
		this.li_num.appendChild(this.li_num1)
		this.ul_element.appendChild(this.li_num);
		this.ul_element.appendChild(this.img3);
		this.ul_element.appendChild(this.img2);
		this.ul_element2.appendChild(this.bcg1);
		this.ul_element2.appendChild(this.bcg2);
		this.ul_element2.appendChild(this.bcg3);
		document.getElementById("contentBox1").appendChild(this.ul_element)
		document.getElementById("contentBox1").appendChild(this.ul_element2);
	}
	MeetingRoom1.prototype.showpeople=function(){

			teamid=this.ids
	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/persons?token='+admin_token+'&teamId='+teamid,function(data){
	if(data.code==31){
		alert("暂无数据")
		test()
	}
	else{
	var countlength=data.data.length
	totalPage = Math.ceil(countlength/currentCount);
	$(".page-count").html(totalPage);
	$(".content-totals").html(countlength);	
	addcontent('1',currentCount,teamid)
}
	})

	}
	MeetingRoom1.prototype.updategroup=function(){
		groupid=this.ids
		var a=document.getElementsByName('adds')
		for (var i =0; i <a.length; i++) {
			a[i].style.display="none"
		}
		this.ul_element2.style.display="block"
		this.bcg1.placeholder=this.names

	}
	MeetingRoom1.prototype.quxiao=function(){
		this.ul_element2.style.display="none"
	}
	MeetingRoom1.prototype.shanchu=function(){
		deletid=this.ids
		$(".bcgs").show()
		$(".alerts-delet").show()
		$(".delet-sure").click(function(){
			var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/team/'+deletid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("DELETE", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send();

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
								        		$(".alerts-delet").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("删除成功")
									        		$(".alert-sure").click(function(){
									        		location.reload()									        		
									        	})
									        			$(".img-right").click(function(){
									        		location.reload()									        		
									        	})
								        	}
								        	else{
								        		$(".alerts-delet").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("删除失败")
									        		$(".alert-sure").click(function(){									        			
									        		location.reload()
									        	})
									        		$(".img-right").click(function(){
									        		location.reload()									        		
									        	})
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
		})
	}
	MeetingRoom1.prototype.save=function(){
		groupid=this.ids
		var a=this.bcg1.value
		if(a==''){
			alert("组名不能为空")
		}
		else{
			var data={
	          	 					  id:groupid,
									  tName:a

	          	 			}
	          	 		console.log(data)
	          	 						var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/team?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("PUT", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
									        		location.reload()		
								        	}
								        	else{
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("编辑失败")
									        		$(".alert-sure").click(function(){
									        		location.reload()
									        	})
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
		}
	}
function firstShowList(data){
		meetingRoomData = data.data;
		totals = meetingRoomData.length;
		paging_mode(0,totals);
	}
$.ajax({
		type: "get",
		url:url+'cloudpServer/v1/orgs/'+admin_id+'/teams?token='+admin_token,
		success: function(data){
			if(data.code==0){
				firstShowList(data);
			}
			else{
				test()
			}
			
		},
		error: function(erro){
			console.log(erro);
		}
	});
//添加人员
$(".tianjiapeople").click(function(){
	$(".bcgs").show()
	$(".add-people").show()
	$("#groups").html('')
	$("#groups").html('<option value="0" check="checked">未分组</option>')
	$.ajax({
		type:"get",
		url:url+'cloudpServer/v1/orgs/'+admin_id+'/teams?token='+admin_token,
		dataType:"json",
    	success: function(data){            
				var departmentcount=data.data.length
       		     html='';
       		    for (var i = 0; i <departmentcount; i++) {
       			html+='<option value="'+data.data[i].id+'">'+data.data[i].tName+'</option>'
       		      }
       		    $('#groups').append(html)

		},
		error: function(erro){
			openAlertWin("查询所有机构失败",true);
		}
	});

})
$(".true").click(function(){

	    var a=$("#add-a11").val()
		var b=$("#add-a22").val()
		var c=$("#add-a33").val()
		var d=$("#add-a55").val()
		var e=$("#groups option:selected").val()
		if((a=='')||(b=='')||(c=='')){
			$(".add-people").hide()
			$(".bcgs").show()
			$(".alerts").show()
			$(".alert-content").html("请完善信息")
			$(".alert-sure").click(function(){       	 				
          	 				$(".add-people").show()
          	 				$(".bcgs").show()        	 				
          	 				$(".alerts").hide()
		})
		}
		else{
			var data={
	          	 					  id:peopleid,
									  orgId:admin_id,
									  teamId:e,
									  cName: a,
									  phoneNum: c,
									  email: b,
									  remark: d

	          	 			}
	          	 		console.log(data)
	          	 						var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/person?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("POST", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
								        		$(".add-people").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("添加成功")
									        		$(".alert-sure").click(function(){
									        			$(".add-user").hide()
									        		location.reload()
									        	})
								        	}
								        	else{
								        		$(".add-people").hide()
									        	$(".alerts").show()
									        	$(".bcgs").show()
									        	$(".alert-content").html("添加失败")
									        		$(".alert-sure").click(function(){
									        			$(".add-user").hide()
									        		location.reload()
									        	})
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
		}
})
//添加分组
$(".groupadd").click(function(){
	$(".add-group").hide()
	$(".add-group1").show()
	$(".addspan1").click(function(){
		var a=$("#add-newgroup").val()
		if(a==''){
			alert("请填写组名")
		}
		else{
			var data={
									  orgId:admin_id,
										tName:a

	          	 			}
	          	 		console.log(data)
	          	 						var url1 =url+'cloudpServer/v1/orgs/'+admin_id+'/team?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("POST", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
													$(".add-group1").hide()
													$(".bcgs").show()
													$(".alerts").show()
													$(".alert-content").html("添加成功")
									        			$(".alert-sure").click(function(){
									        			$(".add-user").hide()
									        		location.reload()
									        	})
									        	
								        	}
								        	else{
								        		alert("添加失败")
								        	}
								        	
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
		}
	})
    $(".addspan2").click(function(){
    	$(".add-group1").hide()
    })
})
