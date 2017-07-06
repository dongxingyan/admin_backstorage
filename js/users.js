function test(){
var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
var heights=pmheight-72
var widths=pmwidth-130
var names=widths-660
$(".box").width(widths)
$(".names").width(names)
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
  var names=widths-660
  console.log(names)
  if(pmwidth<900){
	  	if(heights<720){
	$(".box-left").height(950)	
	}
	else{
	$(".box-left").height(950)	
	}
    $("body").css("overflow","scroll");
    $(".head").width(980)
    $(".box").width(850)
    $(".names").width(200)
    $(".displayname1").width(200)
  }
  else{
	  	if(heights<720){
	$(".box-left").height(720)	
	}
	else{
	$(".box-left").height(heights)	
	}
    $(".box").width(widths)
    $(".names").width(names)
    $(".displayname1").width(names)
    $(".head").width('100%')
}
})
var pexipname
var pexipname1
var pexipname3
function testbcg(){
	var na=new Array()
	var counts=$(".li-head").length
	for (var i = 0; i <counts; i++) {
		if(($(".li-head").eq(i).children().length)==0){
			var b=i
			$(".li-head").eq(b-1).nextAll("ul").remove()		
		}
	}
}
$.ajaxSetup({ cache: false }) 
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
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'/get-displayname?token='+admin_token,
  dataType:'json',
  success:function(data){
     $(".userss").html('你好,'+data.data)
    console.log(data)
  }
})

function getJSONData(pn) {  
    $.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users-count?token='+admin_token,function(data){
    	var totalCount=data.data.count;// 总记录数
    
    $.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users?token='+admin_token, function(data) {   
        var pageSize = 15; // 每页显示几条记录  
        var pageTotal = Math.ceil(totalCount / pageSize); // 总页数  
        var startPage = pageSize * (pn - 1);  
        var endPage = startPage + pageSize - 1;  
        var $ul = $(".content-boxes");  
        $ul.empty();   
        var dataRoot = data.data;  
        if (pageTotal == 1) {    
             for (var i = 0; i < totalCount; i++) {  
            $ul.append('<ul class="li-head"></ul>');  
        }   // 当只有一页时  
            for (var j = 0; j < totalCount; j++) {
            	if(dataRoot[j].accountAlias==undefined){
            		dataRoot[j].accountAlias=''
            	}
                if(dataRoot[j].displayName==undefined) {
                	dataRoot[j].displayName=''
                }  
                 if(dataRoot[j].userName==undefined) {
                	dataRoot[j].userName=''
                } 
                 if(dataRoot[j].password==undefined) {
                	dataRoot[j].password=''
                } 
                 if(dataRoot[j].userTel==undefined) {
                	dataRoot[j].userTel=''
                }        
                $(".li-head").eq(j)               
                .append('<li class="accountalias1">'+dataRoot[j].accountAlias+'</li>') 
                .append('<li class="displayname1" title='+dataRoot[j].displayName+'>'+dataRoot[j].displayName+'</li>')  
                .append('<li class="username1">'+dataRoot[j].userName+'</li>')
                .append('<li class="accountnum1">'+dataRoot[j].password+'</li>')    
                .append('<li class="useremail1">'+dataRoot[j].userTel+'</li>')  
                .append('<li class="description1"><img src="image/bianji.png" class="sursors" alt=""></li>')             
             }  
             test()
        } else {  
        	     for (var i = 0; i < pageSize; i++) {  
            $ul.append('<ul class="li-head"></ul>');  
        }  
            for (var j = startPage, k = 0; j < endPage, k < pageSize; j++, k++) {  
                if( j == totalCount){  
                    break;       // 当遍历到最后一条记录时，跳出循环  
                }  
                 if(dataRoot[j].displayName==undefined) {
                	dataRoot[j].displayName=''
                }  
                 if(dataRoot[j].userName==undefined) {
                	dataRoot[j].userName=''
                } 
                 if(dataRoot[j].password==undefined) {
                	dataRoot[j].password=''
                } 
                 if(dataRoot[j].userTel==undefined) {
                	dataRoot[j].userTel=''
                } 
                $(".li-head").eq(k)
                .append('<li class="accountalias1">'+dataRoot[j].accountAlias+'</li>') 
                .append('<li class="displayname1" title='+dataRoot[j].displayName+'>'+dataRoot[j].displayName+'</li>')  
                .append('<li class="username1">'+dataRoot[j].userName+'</li>')
                .append('<li class="accountnum1">'+dataRoot[j].password+'</li>')    
                .append('<li class="useremail1">'+dataRoot[j].userTel+'</li>')  
                .append('<li class="description1"><img src="image/bianji.png" class="sursors" alt=""></li>')
            }  
            test()
            testbcg()
        }  
        $(".page-count").text(pageTotal); 
        $(".content-totals").text(totalCount); 
      	if (pageTotal == 1){
      		// $("#prev").addClass("cant-click")
        //     $("#next").addClass("cant-click")
        var pagelength=$(".sursors").length;
          $('.sursors').click(function(){
          		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/depts?token='+admin_token,function(data){
       		var departmentcount=data.data.length
       		html='';
       		for (var i = 0; i <departmentcount; i++) {
       			
       			html+='<option value="'+data.data[i].departName+'">'+data.data[i].departName+'</option>'
       		};
       		html1='<option value="无">无</option>'
       		$('.department-input').append(html).append(html1);
       	})
          	var i=$(this).parent().parent().index();
          	 $.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users?token='+admin_token, function(data) { 
          	 	var  userid=data.data[i].id;
          	 	var  dId=data.data[i].departId;
          	 	//如果有部门id 如果没有部门id 如果上传的时候是无 如果上传的时候不是无
          	 	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/depts/'+dId+'?token='+admin_token,function(data){
          	 		if(data.data==null){
          	 	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token,function(data){
          	 		var aA=data.data.accountAlias;
          	 		var dN=data.data.displayName;
          	 		var uN=data.data.userName;
          	 		pexipname=data.data.pexipName
          	 		var pw=data.data.password;
          	 		var ut=data.data.userTel;
          	 		var ue=data.data.userEmail
          	 		var descrip=data.data.description;
          	 		 if(descrip==undefined){
                    	descrip=''
                    }
                    if(dN==undefined){
                    	dN=''
                    }
          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,function(data){
          	 			var names=data.data.name
          	 			$(".lefts").html(aA)
	          	 		$(".lefts-right").val(dN)
	          	 		$(".editor-user").val(uN)
	          	 		$(".editor-password").val(pw)
	          	 		$(".lefts-department").html(names)
	          	 		$(".admin-tel").val(ut);
	          	 		$(".admin-email").val(ue)
	          	 		$(".description-input").val(descrip)
	          	 		for(var i=0;i<$("#sls option").length;i++) {  
				            if($("#sls option").eq(i).val() == '无') {   	
				                $("#sls option").eq(i).attr('selected',true);  
				                break;  
				            }  
				        } 

          	 		})
          	 	})
          	 $(".true").click(function(){
          	 	var valus=$('#sls option:selected').val()
          	 	// var values= $('#sls option:selected').val()
          	 	if(valus=="无"){
          	 		  var disn=$(".lefts-right").val();
								var usen=$(".editor-user").val();
								var dest=$(".description-input").val()
								var admin_tel=$(".admin-tel").val();
								var admin_email=$.trim($(".admin-email").val())
								var admin_password=$(".editor-password").val()
								var c=/^\d{6}$/;
								var d=/^[a-zA-Z0-9]{6,12}$/
						if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
						else if(!admin_password.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("密码为6-12位字母或数字")
          	 			    return false
						}
						else if(!usen.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("账号为6-12位字母或数字")
							return false
						}
						else{
								var data={
									organId:admin_id,
									id:userid,
									departId:'',
									displayName:disn,
									userName:usen,
									password:admin_password,
									userEmail:admin_email,
									userTel:admin_tel,
									pexipName:pexipname,
									description:dest
								}
								   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
								}

          	 	}
          	 	else{
          	 		  	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/get-deptsbyname?token='+admin_token+'&departName='+valus,function(data){
          	 					dIds=data.data[0].id;
							    var disn=$(".lefts-right").val();
								var usen=$(".editor-user").val();
								var dest=$(".description-input").val()
								var admin_tel=$(".admin-tel").val();
								var admin_email=$.trim($(".admin-email").val())
								var admin_password=$(".editor-password").val()
										var c=/^\d{6}$/;
								var d=/^[a-zA-Z0-9]{6,12}$/
						if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
						else if(!admin_password.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("密码为6-12位字母或数字")
          	 			return false
						}
						else if(!usen.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("账号为6-12位字母或数字")
							return false
						}
						else{
							var data={
								    organId:admin_id,
								    id:userid,
									departId:dIds,
									displayName:disn,
									userName:usen,
									password:admin_password,
									userEmail:admin_email,
									userTel:admin_tel,
									pexipName:pexipname,
									description:dest
								}
										var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }

						           }  
								}) 
          	 	}
        
	
          	               })
          	 		}
          	 		else{
							var ss=data.data.departName;
							$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token,function(data){
			          	 		var aA=data.data.accountAlias;
			          	 		var dN=data.data.displayName
			          	 		var uN=data.data.userName;
			          	 		var pexipname2=data.data.pexipName;
			          	 		var pw=data.data.password;
			          	 		var ut=data.data.userTel;
			          	 		var ue=data.data.userEmail
			          	 		var descrip=data.data.description;
			          	 		 if(descrip==undefined){
                    	descrip=''
                    }
                    if(dN==undefined){
                    	dN=''
                    }
			          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,function(data){
			          	 			var names=data.data.name
			          	 			$(".lefts").html(aA)
				          	 		$(".lefts-right").val(dN)
				          	 		$(".editor-user").val(uN)
				          	 		$(".editor-password").val(pw)
				          	 		$(".lefts-department").html(names)
				          	 		$(".admin-tel").val(ut);
				          	 		$(".admin-email").val(ue)
				          	 		$(".description-input").val(descrip)
				          	 		for(var i=0;i<$("#sls option").length;i++) {  
							            if($("#sls option").eq(i).val() == ss) {   	
							                $("#sls option").eq(i).attr('selected',true);  
							                break;  
							            }  
							        } 
			          	 		})
			          	 })
							$(".true").click(function(){
          	 	      		var valus=$('#sls option:selected') .val()
          	 	      		console.log(valus)
          	 	    			 	 	if(valus=="无"){
			          	 		  			var disn=$(".lefts-right").val();
											var usen=$(".editor-user").val();
											var dest=$(".description-input").val()
											var admin_tel=$(".admin-tel").val();
											var admin_email=$.trim($(".admin-email").val())
											var admin_password=$(".editor-password").val()
											var c=/^\d{6}$/;
								            var d=/^[a-zA-Z0-9]{6,12}$/
						if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
						else if(!admin_password.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("密码为6-12位字母或数字")
          	 			return false
						}
						else if(!usen.match(d)){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("账号为6-12位字母或数字")
							return false
						}
						else{
							var data={
								    organId:admin_id,
								    id:userid,
									departId:'',
									displayName:disn,
									userName:usen,
									password:admin_password,
									userEmail:admin_email,
									userTel:admin_tel,
									pexipName:pexipname2,
									description:dest
								}
										var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								       if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
										}

							          	 	}
							          	 	else{

						          	 		  	 	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/get-deptsbyname?token='+admin_token+'&departName='+valus,function(data){
						          	 					dIds=data.data[0].id;
													    var disn=$(".lefts-right").val();
														var usen=$(".editor-user").val();
														var dest=$(".description-input").val()
														var admin_tel=$(".admin-tel").val();
														var admin_email=$.trim($(".admin-email").val())
														var admin_password=$(".editor-password").val()
																var c=/^\d{6}$/;
														var d=/^[a-zA-Z0-9]{6,12}$/
																if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
																else if(!admin_password.match(d)){
																	$(".forms").hide();
											          	 			$(".alerts").show();
											          	 			$(".alert-content").html("密码为6-12位字母或数字")
											          	 			return false
																}
																else if(!usen.match(d)){
																	$(".forms").hide();
											          	 			$(".alerts").show();
											          	 			$(".alert-content").html("账号为6-12位字母或数字")
																	return false
																}
																else{
																	var data={
																		organId:admin_id,
																		id:userid,
																		departId:dIds,
																		displayName:disn,
																		userName:usen,
																		password:admin_password,
																		userEmail:admin_email,
																		userTel:admin_tel,
																		pexipName:pexipname2,
																		description:dest
																	}
												   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
													}
												             
														}) 
          	 		}


									
          	 })
          	 		}
          	 		
			     	 	   



})

          	 $('.bcgs').show();
             $(".forms").show(); 
          })
         
        })
}
       else{
       		$('.sursors').click(function(){
       			// 获取部门的select
       				$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/depts?token='+admin_token,function(data){
       		var departmentcount=data.data.length
       		html='';
       		for (var i = 0; i <departmentcount; i++) {
       			
       			html+='<option value="'+data.data[i].departName+'">'+data.data[i].departName+'</option>'
       		};
       		html1='<option value="无">无</option>'
       		$('.department-input').append(html).append(html1);
       	})
          	var pagecount=($(".current-page").html()-1)*15;
          	var i=$(this).parent().parent().index()+pagecount;

          	 $.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users?token='+admin_token, function(data) { 
          	 	var  userid=data.data[i].id;
          	 	var  dId=data.data[i].departId;         	 	
          	 	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/depts/'+dId+'?token='+admin_token,function(data){
          	 		if(data.data==null){
          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token,function(data){
          	 		var aA=data.data.accountAlias;
          	 		var dN=data.data.displayName;
          	 		var uN=data.data.userName;
          	 		var pw=data.data.password;
          	 		pexipname1=data.data.pexipName
          	 		var ut=data.data.userTel;
          	 		var ue=data.data.userEmail
          	 		var descrip=data.data.description;
          	 		 if(descrip==undefined){
                    	descrip=''
                    }
                    if(dN==undefined){
                    	dN=''
                    }
          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,function(data){
          	 			var names=data.data.name
          	 			$(".lefts").html(aA)
	          	 		$(".lefts-right").val(dN)
	          	 		$(".editor-user").val(uN)
	          	 		$(".editor-password").val(pw)
	          	 		$(".lefts-department").html(names)
	          	 		$(".admin-tel").val(ut);
	          	 		$(".admin-email").val(ue)
	          	 		$(".description-input").val(descrip)
	          	 		for(var i=0;i<$("#sls option").length;i++) {  
				            if($("#sls option").eq(i).val() == '无') {   	
				                $("#sls option").eq(i).attr('selected',true);  
				                break;  
				            }  
				        } 

          	 		})
          	 	})
          	 $(".true").click(function(){
          	 	var valus=$('#sls option:selected').val()
          	 	if(valus=="无"){
          	 		  var disn=$(".lefts-right").val();
								var usen=$(".editor-user").val();
								var dest=$(".description-input").val();
								var admin_tel=$(".admin-tel").val();
								var admin_email=$.trim($(".admin-email").val())
								var admin_password=$(".editor-password").val()
										var c=/^\d{6}$/;
								var d=/^[a-zA-Z0-9]{6,12}$/
									if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
									else if(!admin_password.match(d)){
										$(".forms").hide();
									    $(".alerts").show();
									    $(".alert-content").html("密码为6-12位字母或数字")
									    return false
									}
									else if(!usen.match(d)){
										$(".forms").hide();
									    $(".alerts").show();
									    $(".alert-content").html("账号为6-12位字母或数字")
										return false
									}
									else{
								var data={
									organId:admin_id,
									id:userid,
									departId:'',
									displayName:disn,
									userName:usen,
									password:admin_password,
									userEmail:admin_email,
									userTel:admin_tel,
									pexipName:pexipname1,
									description:dest
								}
								console.log(data)
									   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
							}

          	 	}
          	 	else{

          	 		  	 	$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/get-deptsbyname?token='+admin_token+'&departName='+valus,function(data){
          	 					dIds=data.data[0].id;
							    var disn=$(".lefts-right").val();
								var usen=$(".editor-user").val();
								var dest=$(".description-input").val()
								var admin_tel=$(".admin-tel").val();
								var admin_email=$.trim($(".admin-email").val())
								var admin_password=$(".editor-password").val()
										var c=/^\d{6}$/;
								var d=/^[a-zA-Z0-9]{6,12}$/
								if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
								else if(!admin_password.match(d)){
									$(".forms").hide();
									$(".alerts").show();
									$(".alert-content").html("密码为6-12位字母或数字")
									return false
								}
								else if(!usen.match(d)){
									$(".forms").hide();
									$(".alerts").show();
									$(".alert-content").html("账号为6-12位字母或数字")
									return false
								}
								else{
								var data={
									organId:admin_id,
									id:userid,
									departId:dIds,
									displayName:disn,
									userName:usen,
									password:admin_password,
									userEmail:admin_email,
									userTel:admin_tel,
									pexipName:pexipname1,
									description:dest
								}
										console.log(data)
							   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
							}
						             
								}) 
          	 	}
        
	
          	               })
          	 		}
          	 		else{
          	 		var ss=data.data.departName;
          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token,function(data){
          	 		var aA=data.data.accountAlias;
          	 		var dN=data.data.displayName;
          	 		var uN=data.data.userName;
          	 		var pw=data.data.password;
          	 		pexipname3=data.data.pexipName
          	 		var ut=data.data.userTel;
          	 		var ue=data.data.userEmail
          	 		var descrip=data.data.description;
          	 		 if(descrip==undefined){
                    	descrip=''
                    }
                    if(dN==undefined){
                    	dN=''
                    }
          	 		$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,function(data){
          	 			var names=data.data.name
          	 			$(".lefts").html(aA)
	          	 		$(".lefts-right").val(dN)
	          	 		$(".editor-user").val(uN)
	          	 		$(".editor-password").val(pw)
	          	 		$(".lefts-department").html(names)
	          	 		$(".admin-tel").val(ut);
	          	 		$(".admin-email").val(ue)
	          	 		$(".description-input").val(descrip)
	          	 		for(var i=0;i<$("#sls option").length;i++) {  
				            if($("#sls option").eq(i).val() == ss) {   	
				                $("#sls option").eq(i).attr('selected',true);  
				                break;  
				            }  
				        } 
          	 		})
          	 })
			     	 	      $(".true").click(function(){
          	 	      				var valus=$('#sls option:selected') .val()
          	 	      				if(valus=='无'){
		          	 	      			 var disn=$(".lefts-right").val();
										var usen=$(".editor-user").val();
										var dest=$(".description-input").val();
										var admin_tel=$(".admin-tel").val();
										var admin_email=$.trim($(".admin-email").val())
										var admin_password=$(".editor-password").val()
												var c=/^\d{6}$/;
										var d=/^[a-zA-Z0-9]{6,12}$/
										if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
										else if(!admin_password.match(d)){
											$(".forms").hide();
											$(".alerts").show();
											$(".alert-content").html("密码为6-12位字母或数字")
											return false
										}
										else if(!usen.match(d)){
											$(".forms").hide();
											$(".alerts").show();
											$(".alert-content").html("账号为6-12位字母或数字")
											return false
										}
										else{
												var data={
											organId:admin_id,		
											id:userid,		
											departId:'',
											displayName:disn,
											userName:usen,
											password:admin_password,
											userEmail:admin_email,
											userTel:admin_tel,
											pexipName:pexipname3,
											description:dest
										}
												console.log(data)
								   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
									}
          	 	      		}
          	 	      		else{
          	 	      			$.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/get-deptsbyname?token='+admin_token+'&departName='+valus,function(data){
											        var dIds=data.data[0].id;  
													var disn=$(".lefts-right").val();
													var usen=$(".editor-user").val();
													var dest=$(".description-input").val();
													var admin_tel=$(".admin-tel").val();
													var admin_email=$.trim($(".admin-email").val())
													var admin_password=$(".editor-password").val()
															var c=/^\d{6}$/;
													var d=/^[a-zA-Z0-9]{6,12}$/
													if((!admin_email.match(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/))&&(admin_email!='')){
							$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("邮箱格式不对")
							return false
						}
						else if((!admin_tel.match(/^(1+\d{10})$/))&&(admin_tel!='')){
								$(".forms").hide();
          	 			$(".alerts").show();
          	 			$(".alert-content").html("手机格式不对")
							return false
						}
													else if(!admin_password.match(d)){
														$(".forms").hide();
														$(".alerts").show();
														$(".alert-content").html("密码为6-12位字母或数字")
														return false
													}
													else if(!usen.match(d)){
														$(".forms").hide();
														$(".alerts").show();
														$(".alert-content").html("账号为6-12位字母或数字")
														return false
													}
													else{
													var data={
														organId:admin_id,
														id:userid,
														departId:dIds,
														displayName:disn,
														userName:usen,
														password:admin_password,
														userEmail:admin_email,
														userTel:admin_tel,
														pexipName:pexipname3,
														description:dest
													}
													console.log(data)
							   var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/users/'+userid+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==15){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("用户名已存在")
										}
										else if(codes.code==999){
											$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("服务器内部错误")
										}
										else if(codes.code==0){
										       $(".forms").hide();
						          	 			$(".alerts").show();
						          	 			$(".alert-content").html("编辑成功")
						          	 			$(".alert-sure").click(function(){
						          	 				$(".forms").hide()
													location.reload()
						          	 			})
						          	 			$(".img-right").click(function(){
						          	 				location.reload()
						          	 			})
						          	 		}
						          	 	else{
						          	 		$(".forms").hide();
						          	 		$(".alerts").show();
						          	 		$(".alert-content").html("编辑失败")	
						          	 	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
												}
										
													})

			}
									
          	 })
   										
         	 	
      
          	 		}
  	
          	 	     })

          	    })
          	 $('.bcgs').show();
             $(".forms").show(); 
          })
       }
    })  
  })
}  
function getPage() {  
    $.getJSON(url+'cloudpServer/v1/orgs/'+admin_id+'/users-count?token='+admin_token, function(data) {  
                pn = 1;  
                var totalCount = data.data.count; // 总记录数  
                var pageSize = 15; // 每页显示几条记录  
                var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
                $("#next").click(function() {  
                            if (pn == pageTotal) {  
                                 $(".page").show()
                                $(".alert-content").html("后面没有了")
                                $(".bcgs").show()   
                                pn = pageTotal;  
                            } else {  
                                pn++;  
                                gotoPage(pn); 
                            }  
                        });  
                $("#prev").click(function() {  
                            if (pn == 1) {  
                                 $(".page").show()
                                $(".alert-content").html("前面没有了")
                                $(".bcgs").show()  
                                pn = 1;  
                            } else {  
                                pn--;  
                                gotoPage(pn); 
                            }  
                        })  
                $("#firstPage").click(function() {  
                            pn = 1;  
                            gotoPage(pn);  
                        });  
                $("#lastPage").click(function() {  
                            pn = pageTotal;  
                            gotoPage(pn);  
                        });  
                $("#page-jump").click(function(){  
                    if($(".page-num").val()  <= pageTotal && $(".page-num").val() != ''){  
                        pn = $(".page-num").val();  
                        gotoPage(pn);  
                    }else{  
                        $(".page").show()
                         $(".alert-content").html("您输入的页码有误")
                         $(".bcgs").show()  
                        $(".page-num").val('').focus();  
                    }  
                })  
                $("#firstPage").trigger("click");  
                  
            })  
}  
function gotoPage(pn) {  
    // alert(pn);  
    $(".current-page").text(pn);  
    getJSONData(pn)  
} 

function clicks(){
	$(".cancel").click(function(){
		$(".bcgs").hide();
		$(".forms").hide()
		location.reload();
	})
} 

$(function() {  
    getPage();  
    clicks()
})  
$(".page-right").click(function(){
	$(".page").hide();
	$(".bcgs").hide();
})
$(".page-sure").click(function(){
	$(".page").hide();
	$(".bcgs").hide()
})
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".forms").show()
})
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".forms").show()
})