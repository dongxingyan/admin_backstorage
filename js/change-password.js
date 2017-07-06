//获取location参数
var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
var heights=pmheight-72
var widths=pmwidth-150
if(heights<720){
$(".box-left").height(950)	
}
else{
$(".box-left").height(950)	
}
console.log(widths)
$(".box-right").width(widths)
$(window).resize(function(){
  var pmwidth=document.body.clientWidth
  var pmheight=document.body.clientHeight
  var heights=pmheight-75
  var widths=pmwidth-150
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
$(".change-password-submit").click(submit)					
function submit(){
	var old_password=$.trim($(".old-password").val())
		new_password=$.trim($(".new-password").val())
		re_password=$.trim($(".news-password").val())
	me=$(this);
	if(new_password==''||re_password==''){

		$(".alerts").show();
		$(".bcgs").show();
		$(".alert-content").html("密码不能为空")
		return false;
	}
	if(new_password!=re_password){
		$(".alerts").show();
		$(".bcgs").show();
		$(".alert-content").html("两次输入的密码不一致")
		return false;
	}
	else{
		me.attr('disabled',true);
		var data={
				newPassword:new_password,
				oldPassword:old_password
			}
								var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/change-admin-password?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        		if(codes.code==11){
														$(".alerts").show();
														$(".bcgs").show();
														$(".alert-content").html("密码错误")
													}
													else if(codes.code==13){
														$(".alerts").show();
														$(".bcgs").show();
														$(".alert-content").html("密码长度必须在6-20个字符之间")
													}
													else if(codes.code==0){
														$(".alerts").show();
														$(".bcgs").show();
														$(".alert-content").html("修改成功")
														$(".alert-sure").click(function(){
															location.reload()
										                })
														$(".img-right").click(function(){
														    location.reload()						          	 								          	 			
															          	 			})
													}
													else if(codes.code==999){
														$(".alerts").show();
														$(".bcgs").show();
														$(".alert-content").html("内部错误")
													}
													me.attr('disabled',false);
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }

}
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
$(".alert-sure").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})
$(".img-right").click(function(){
	$(".alerts").hide()
	$(".bcgs").hide()
})