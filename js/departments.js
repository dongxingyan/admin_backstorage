var pmwidth=document.body.clientWidth
var pmheight=document.body.clientHeight
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
  var heights=pmheight-75
  var widths=pmwidth-130
$(".box-right").width(widths)
if(heights<720){
$(".box-left").height(950)	
}
else{
$(".box-left").height(950)	
}
})
$.ajaxSetup({ cache: false })  
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
  }
})
$.ajax({
  type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'?token='+admin_token,
  dataType:'json',
  success:function(data){
     var names=data.data.name
  

 	var arr={
  		"id":0,
  		"parentId":-1,
  		"departName":names,
  		"org_id":admin_id,
  		open:true,
  	}
$.ajax({
	 type:"get",
  url:url+'cloudpServer/v1/orgs/'+admin_id+'/depts?token='+admin_token,
  dataType:'json',
  success:function(data){
  	var zNodes=data.data.concat(arr);
  	var setting = {
			view: {
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false,
				showLine:false,
			},
			edit: {
				enable: true,
				editNameSelectAll: true,
				showRemoveBtn: showRemoveBtn,
				showRenameBtn: true,
				removeTitle:'删除',
				renameTitle:"重命名",
				addmoreTitle:"添加子节点",

			},
			data: {
				simpleData: {
					enable: true,
					idKey:'id',
					pIdKey:'parentId',
					rootPId:null,
				},
				key:{
					name:"departName"
				}
			},
				callback: {
				beforeDrag: beforeDrag,
				beforeEditName: beforeEditName,
				beforeRemove: beforeRemove,
				beforeRename: beforeRename,
				onRemove: onRemove,
				onRename: onRename
			},
		};
  		var log, className = "dark";
  		
		function beforeDrag(treeId, treeNodes) {
			return false;
		}
		function beforeEditName(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.departName);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			// $(".alerts-delet").show()
			// $(".bcgs").show()
			// $(".alert-content").html("进入节点 -- " + treeNode.departName + " 的编辑状态吗？")
			// return false
			return confirm("进入节点 -- " + treeNode.departName + " 的编辑状态吗？");
		}
		function beforeRemove(treeId, treeNode) {
			className = (className === "dark" ? "":"dark");
			showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.departName);
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.selectNode(treeNode);
			return confirm("确认删除 节点 -- " + treeNode.departName + " 吗？");
		}
		function onRemove(e, treeId, treeNode) {
			$.ajax({
				type:'delete',
				url:url+'cloudpServer/v1/orgs/{org_id}/depts/{dept_id}?token='+admin_token+'&dept_id='+treeNode.id+'&org_id='+admin_id,
				dataType:'json',
				success:function(){
					showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.departName);
				}
			})
					
					
			// 	}
			// })
			
		}
		function beforeRename(treeId, treeNode, newName, isCancel) {
			var flag
			className = (className === "dark" ? "":"dark");
			showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
			newName=$.trim(newName)
			console.log(newName)
				if (newName.length == 0) {
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				setTimeout(function(){zTree.editName(treeNode)}, 10);
				$(".bcgs").show();
                $(".alerts").show()
                 $(".alert-content").html("部门名称不能为空")
				flag=false;
				$(".alert-sure").click(function(){
                     			location.reload()
                     		})
                     		$(".img-right").click(function(){
                     			location.reload()
                     		})
			}
		}
       	
		function onRename(e, treeId, treeNode, isCancel) {

			$.ajax({
				type:"get",
				dataType:"json",
				url:url+'cloudpServer/v1/orgs/'+admin_id+'/depts/'+treeNode.id+'?token='+admin_token,
				success:function(data){
					var parentidss=data.data.parentId;
					var c=treeNode.id;
					var d=treeNode.departName
						var data={
	          	 					  deptId:c,
									  parentId:parentidss,
									  departName:d									 									  
	          	 			}
	          	 			console.log(data)
	          	 						var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/depts/'+c+'?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("put", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								              					if(codes.code==19){
									      						$(".bcgs").show();
									                     		$(".alerts").show()
									                     		$(".alert-content").html("创建失败，部门名称不能重复")
									                     		$(".alert-sure").click(function(){
									                     			location.reload()
									                     		})
									                     		$(".img-right").click(function(){
									                     			location.reload()
									                     		})

                     		
                     		

       }
       						else{
       							showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.departName + (isCancel ? "</span>":""));
       						}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }

				}
			})				
		}
		function showRemoveBtn(treeId, treeNode) {
			return !treeNode.isParent;
		}
		function showRenameBtn(treeId, treeNode) {
			return !treeNode.isLastNode;
		}
		function showLog(str) {
			if (!log) log = $("#log");
			log.append("<li class='"+className+"'>"+str+"</li>");
			if(log.children("li").length > 8) {
				log.get(0).removeChild(log.children("li")[0]);
			}
		}
		function getTime() {
			var now= new Date(),
			h=now.getHours(),
			m=now.getMinutes(),
			s=now.getSeconds(),
			ms=now.getMilliseconds();
			return (h+":"+m+":"+s+ " " +ms);
		}

		var newCount = 1;
		function addHoverDom(treeId, treeNode) {
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='add node' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				var prompts=$.trim(prompt("请输入部门名称"))
				// alert(prompts)
					$.ajax({
					 type:"get",
					 dataType:"json",
					 url:url+'cloudpServer/v1/orgs/'+admin_id+'/depts?token='+admin_token,
					 success:function(data){
					 	var content=data.data;
					 	var lengths=data.data.length;
					 	var array=new Array();
						for (var i =0; i <lengths; i++) {	
							array.push(content[i].departName)													
							}
                     	var d=array.indexOf(prompts)
                     	if((d==-1)&&(prompts!=='')){
                     		var data={
						parentId:treeNode.id,
						departName:prompts
					}
					var url1 = url+'cloudpServer/v1/orgs/'+admin_id+'/depts?token='+admin_token;
										var xmlhttp = new XMLHttpRequest();
								        xmlhttp.open("post", url1, false);           
								        // xmlhttp.setRequestHeader("token", this.token);
								        xmlhttp.setRequestHeader("Content-Type", "application/json");
								        xmlhttp.send(JSON.stringify(data));

								        if(xmlhttp.status==200){
								        	console.log(JSON.parse(xmlhttp.responseText))
								        	var codes=JSON.parse(xmlhttp.responseText)
								        	if(codes.code==0){
									        	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
												zTree.addNodes(treeNode, {id:(100 + newCount),parentId:treeNode.id, departName:encodeURI(prompts)});
												location.reload()
												return false;	
								        	}
								        }else{
											console.log("faile");
								            console.log(JSON.parse(xmlhttp.responseText));
								        }
                     	}
                     	else if(prompts==''){
                     		$(".bcgs").show();
                     		$(".alerts").show()
                     		$(".alert-content").html("部门名称不能为空")
                     	}
                     	else{
                     		$(".bcgs").show();
                     		$(".alerts").show()
                     		$(".alert-content").html("部门名称不能重复")
                     	}
						}

					 })
				 

				})

		};
		function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};
		function selectAll() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
		}
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			$("#selectAll").bind("click", selectAll);
		});
  }
})
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
$(".delet-sure").click(function(){
	return true;
	$(".alerts-delet").hide();
	$(".bcgs").hide()
})
 document.onkeydown=function(ev)
        {
            var oEvent=ev||event;//获取事件对象(IE和其他浏览器不一样，这里要处理一下浏览器的兼容性event是IE；ev是chrome等)
            //Esc键的keyCode是27
            if(oEvent.keyCode==27)
            {
                $(".bcgs").hide();
                $(".alerts").hide()
            }
        }