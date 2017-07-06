
var urllogin=url+'cloudpServer/getCaptchaImage?'
$(function(){
 $("#code-span").click(function(){
    $(this).attr("src",urllogin+Math.random())
    })
var input1=$('#userName')
	input2=$('#userPassWord')
	input3=$('#codeStr')
input1.blur(function (){ 
		if($.trim(input1.val())==''){
				input1.addClass("changeborder");
				$(".users div").html("请输入用户名")
				$(".users div").show()}
		else{
				input1.removeClass("changeborder")
				$(".users div").hide();
			}
		});
input2.blur(function (){ 
		if($.trim(input2.val())==''){
				input2.addClass("changeborder");
				$(".passwords div").html("请输入密码")
				$(".passwords div").show()}
		else{
				input2.removeClass("changeborder")
				
				$(".passwords div").hide();
			}
		})
input3.blur(function (){ 
		if($.trim(input3.val())==''){
				input3.addClass("changeborder");
				$(".codes div").html("请输入验证码")
				$(".codes div").show()}
		else{
				input3.removeClass("changeborder")
				$(".codes div").hide();
			}
		})
$(".submit").click(check);
$("html").keyup(function(e){
			if(e.keyCode==13){
				$(".submit").click();	
			}})				 
function check(){

		var username = $.trim($('#userName').val());
		var passWord = $.trim($('#userPassWord').val());
		var codeStr = $.trim($('#codeStr').val());
		me=$(this);
		if(username == '' || username == '请输入用户名' ){
			// user_name.focus()
			$(".users div").show()
			$(".users div").html("请输入用户名")
			return false;			
		}
		if(passWord == ''){
			// password.focus()
			$(".passwords div").show()
			$(".passwords div").html("请输入密码")
			return false;			
		}
		if(codeStr == ''){
			// codeStr.focus()
			$(".codes div").show()
			$(".codes div").html('请输入验证码');
			return false;
			
		}
		// var data = {
		// 	action:"login",
		// 	userName:user_name,
		// 	passWord:passWord,	
		// };
		else{	
		
		me.attr('disabled',true);
		$('.submit-error').show();
		$(".submit-error").addClass('changecolor');
		$('.submit-error').html("正在登陆中，请稍后.....")
		var data={
				      timestamp:'',
				      code:codeStr
				    }
				    $.ajax({
				      crossDomain:true,
				      xhrFields:{withCredentials:true},
				      type:"post",
				      url:url+'cloudpServer/checkCaptcha',
				      data:data,
				      dataType:"json",
				      success:function(result){
				      	console.log(result)
				        if(result=='true'){
				         me.attr("disabled",false)	
							$.ajax({ 	
								// data:data,
								type:'get',
								url:url+'cloudpServer/v1/orgs/admin-login?username='+username+'&password='+passWord, 
								        
								dataType:'json',
								success:function(data){
									me.attr('disabled',false);						
									if(data.code==6){
										$('.submit-error').show();
										$(".submit-error").removeClass('changecolor');
										$('.submit-error').html('用户或密码错误！');
										return false;
									}
									else if(data.code==999){
										$('.submit-error').show();
										$(".submit-error").removeClass('changecolor');
										$('.submit-error').html('服务器内部错误!');
									}
									else if(data.code==0){
										var tokens=data.token;
										var org_id=data.data.org_id;
										localStorage.setItem('orgToken', tokens);
										localStorage.setItem('orgId', org_id);
										location.href='status.html?name='+tokens+'&id='+org_id
									}		
								
								},
							error:function(data){
								alert("cuowu")
							}
							})
		     }
		     else{
		     	$('.submit-error').show();
		     	$(".submit-error").removeClass('changecolor')
		         $('.submit-error').html("验证码错误")
		     }
		     }
				 })
	}
	}
	})