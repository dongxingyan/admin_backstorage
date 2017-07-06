var addnode;
var contents;
var contents1;
var listarray;
function test() {
    var pmwidth = document.body.clientWidth;
    var pmheight = document.body.clientHeight;
    var heights = pmheight - 72;
    var widths = pmwidth - 130;
    var names = widths - 570;
    $(".box").width(widths);
    $(".names").width(names);
    if (heights < 720) {
        $(".box-left").height(950)
    }
    else {
        $(".box-left").height(950)
    }
    $(".accountalias").width(names)
}
$(window).resize(function () {
    var pmwidth = document.body.clientWidth;
    var pmheight = document.body.clientHeight;
    var heights = pmheight - 72;
    var widths = pmwidth - 150;
    var names = widths - 570;
    console.log(names);
    if (pmwidth < 900) {
        $("body").css("overflow", "scroll");
        $(".head").width(980);
        $(".box").width(850);
        $(".names").width(200);
        if (heights < 720) {
            $(".box-left").height(950)
        }
        else {
            $(".box-left").height(950)
        }
        $(".accountalias").width(200)
    }
    else {
        if (heights < 720) {
            $(".box-left").height(720)
        }
        else {
            $(".box-left").height(heights)
        }
        $(".box").width(widths);
        $(".names").width(names);
        $(".accountalias").width(names);
        $(".head").width('100%')
    }
});
function testbcg() {
    var na = new Array()
    var counts = $(".li-headtwos").length;
    for (var i = 0; i < counts; i++) {
        if (($(".li-headtwos").eq(i).children().length) == 0) {
            var b = i
            $(".li-headtwos").eq(b - 1).nextAll("ul").remove()
        }
    }
}
$.ajaxSetup({cache: false});
//获取location参数
function GetRequest() {

    var url = location.search; //获取url中"?"符后的字串

    var theRequest = new Object();

    if (url.indexOf("?") != -1) {

        var str = url.substr(1);

        strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {

            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

        }

    }
    return theRequest;

}
var Request = new Object();

Request = GetRequest();
var admin_id = Request.id;
var admin_token = Request.name;
var lefts = $(".box-left a");
var a = lefts.length;
for (var i = 0; i < a; i++) {
    lefts.eq(i).click(function () {
        if ($(this).hasClass('a7')) {
            location.href = 'change-password.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a1')) {
            location.href = 'status.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a2')) {
            location.href = 'meeting-management.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a3')) {
            location.href = 'meetingroom-management.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a4')) {
            location.href = 'department-management.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a5')) {
            location.href = 'user-number.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a6')) {
            location.href = 'device-management.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a9')) {
            location.href = 'tongxunlu.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a10')) {
            location.href = 'video.html?name=' + admin_token + '&id=' + admin_id;
        }
        else if ($(this).hasClass('a8')) {
            location.href = 'meeting-total.html?name=' + admin_token + '&id=' + admin_id;
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
    type: "get",
    url: url + 'cloudpServer/v1/orgs/' + admin_id + '/get-displayname?token=' + admin_token,
    dataType: 'json',
    success: function (data) {
        $(".userss").html('你好,' + data.data)
    }
})
function getJSONData(pn) {
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
        var totalCount = data.data.length;
        var pageSize = 15; // 每页显示几条记录  
        var pageTotal = Math.ceil(totalCount / pageSize); // 总页数 
        var startPage = pageSize * (pn - 1);
        var endPage = startPage + pageSize - 1;
        var $ul = $(".content-boxes");
        $ul.empty();
        var dataRoot = data.data;
        if (pageTotal == 1) {
            for (var i = 0; i < totalCount; i++) {
                $ul.append('<ul class="li-headtwos"></ul>');
            }    // 当只有一页时
            for (var j = 0; j < totalCount; j++) {
                $(".li-headtwos").eq(j)
                    .append('<li class="accountnum">' + dataRoot[j].meetingRoomNum + '</li>')
                    .append('<li class="accountalias"title=' + dataRoot[j].meetingName + '>' + dataRoot[j].meetingName + '</li>')
                    .append('<li class="displayname">' + dataRoot[j].beginTime.substring(0, 16) + '</li>')
                    .append('<li class="username">' + dataRoot[j].endTime.substring(0, 16) + '</li>')
                    .append('<li class="description66"><img src="image/bianji.png" class="editored" alt=""> <img src="image/delet.png"  class="delet" alt=""/></li>')
            }
            test()
            // $(".sursors")
        } else {
            for (var i = 0; i < pageSize; i++) {
                $ul.append('<ul class="li-headtwos"></ul>');
            }
            for (var j = startPage, k = 0; j < endPage, k < pageSize; j++, k++) {
                if (j == totalCount) {
                    break;       // 当遍历到最后一条记录时，跳出循环  
                }
                $(".li-headtwos").eq(k)
                    .append('<li class="accountnum">' + dataRoot[j].meetingRoomNum + '</li>')
                    .append('<li class="accountalias" title=' + dataRoot[j].meetingName + '>' + dataRoot[j].meetingName + '</li>')
                    .append('<li class="displayname">' + dataRoot[j].beginTime.substring(0, 16) + '</li>')
                    .append('<li class="username">' + dataRoot[j].endTime.substring(0, 16) + '</li>')

                    .append('<li class="description66"><img src="image/bianji.png" class="editored" alt=""><img src="image/delet.png"  class="delet" alt=""/></li>')
            }
            test();
            testbcg();
        }
        $(".page-count").text(pageTotal);
        $(".content-totals").text(totalCount);
        if (pageTotal == 1) {
            var pagelength = $(".sursors").length;
            $('.editored').click(function () {
                var i = $(this).parent().parent().index();
                $("#datetime1").datetimepicker();
                $("#datetime2").datetimepicker();
                $("#datetime1").change(function () {
                    $(".editor-can-use").attr("disabled", false);
                    $(".editor-can-use").removeClass("change-background")
                })
                $("#datetime2").change(function () {
                    $(".editor-can-use").attr("disabled", false);
                    $(".editor-can-use").removeClass("change-background")
                })
                $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
                    var meetingid = data.data[i].id;
                    var ss = data.data[i].meetingRoomNum;
                    var bT = data.data[i].beginTime;
                    var eT = data.data[i].endTime;
                    var mN = data.data[i].meetingName;
                    var btarry = bT.substring(0, 16);
                    var etarry = eT.substring(0, 16);
                    $("#datetime1").val(btarry);
                    $("#datetime2").val(etarry);
                    $(".meeting-topic").val(mN);
                    $("#editor-meetingroom").append('<option selected="selected">' + ss + '</option>')
                    $(".editor-can-use").click(function () {
                        $('#editor-meetingroom').html('');
                        $(".editor-can-use").addClass("change-background");
                        $(".editor-can-use").attr("disabled", true);
                        var bTs = $("#datetime1").val();
                        var eTs = $("#datetime2").val();
                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/usablevmrs/?beginTime=' + bTs + '&endTime=' + eTs + '&token=' + admin_token, function (data) {
                            var departmentcount = data.data.length;
                            html = '';
                            for (var i = 0; i < departmentcount; i++) {

                                html += '<option value="' + data.data[i] + '">' + data.data[i] + '</option>'
                            }
                            $('#editor-meetingroom').append(html)
                        })
                    })
                    $(".editor-can-use").click();
                    $('#editor-meetingroom').html('');
                    $("#editor-meetingroom").append('<option selected="selected">' + ss + '</option>')
                    $(".trues").click(function () {
                        if (($(".editor-can-use").hasClass("change-background"))) {
                            var valus = $('#editor-meetingroom option:selected').val();
                            var bTs = $("#datetime1").val() + ':00';
                            var eTs = $("#datetime2").val() + ':00';
                            var mNs = $.trim($(".meeting-topic").val());

                            Date.prototype.diff = function (date) {
                                return (this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
                            };

                            // 构造两个日期，分别是系统时间和2013/04/08 12:43:45
                            var ds = eTs;
                            ds = ds.replace(/-/g, '/');
                            ds = ds.replace('T', ' ');
                            ds = ds.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
                            now = new Date(ds);
                            var dt = bTs;
                            dt = dt.replace(/-/g, '/');
                            dt = dt.replace('T', ' ');
                            dt = dt.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
                            date = new Date(dt);
                            // 调用日期差方法，求得参数日期与系统时间相差的天数
                            var diff = now.diff(date);
                            if (diff < 0) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("会议结束时间应大于开始时间");
                                return false
                            }
                            if ((bTs == '') || (eTs == '') || (mNs == '')) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("请完善信息");
                                return false
                            }
                            else if (bTs == eTs) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("开始和结束时间不能相同");
                                return false
                            }
                            else {
                                var data = {
                                    organId: admin_id,
                                    id: meetingid,
                                    beginTime: bTs,
                                    endTime: eTs,
                                    meetingName: mNs,
                                    meetingRoomNum: valus
                                };
                                var url1 = url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings/' + meetingid + '?token=' + admin_token;
                                var xmlhttp = new XMLHttpRequest();
                                xmlhttp.open("put", url1, false);
                                // xmlhttp.setRequestHeader("token", this.token);
                                xmlhttp.setRequestHeader("Content-Type", "application/json");
                                xmlhttp.send(JSON.stringify(data));

                                if (xmlhttp.status == 200) {
                                    console.log(JSON.parse(xmlhttp.responseText))
                                    var codes = JSON.parse(xmlhttp.responseText)
                                    if (codes.code == 14) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("此时间段内有其他会议")
                                    }
                                    else if (codes.code == 17) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("会议主题已存在")
                                    }
                                    else if (codes.code == 999) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("服务器内部错误")
                                    }
                                    else {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("编辑成功");
                                        $(".alert-sure").click(function () {
                                            $(".meeting-form").hide();
                                            location.reload()
                                        });
                                        $(".img-right").click(function () {
                                            location.reload()
                                        })

                                    }
                                } else {
                                    console.log("faile");
                                    console.log(JSON.parse(xmlhttp.responseText));
                                }
                            }
                        }
                        else {

                            $(".meeting-form").hide();
                            $(".alerts").show();
                            $(".alert-content").html("请获取可用会议室")
                        }

                    })


                });
                $('.bcgs').show();
                $(".meeting-form").show();
            });
            $(".delet").click(function () {
                var pagecount = ($(".current-page").html() - 1) * 10;
                var i = $(this).parent().parent().index() + pagecount;
                $(".alerts-delet").show();
                $(".bcgs").show();
                $(".delet-sure").click(function () {
                    $(".alerts-delet").hide();
                    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
                        var meetingid = data.data[i].id;
                        $.ajax({
                            type: "delete",
                            dataType: "json",
                            url: url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings/' + meetingid + '?token=' + admin_token,
                            success: function () {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("删除成功")
                                $(".alert-sure").click(function () {
                                    $(".meeting-form").hide()
                                    location.reload()
                                })
                                $(".img-right").click(function () {
                                    location.reload()
                                })
                            }
                        })
                    })
                })
                $(".delet-cancel").click(function () {
                    $(".alerts-delet").hide()
                    $(".bcgs").hide()
                })
                $(".delet-right").click(function () {
                    $(".alerts-delet").hide()
                    $(".bcgs").hide()
                })

            })

        }
        else {
            $('.editored').click(function () {

                //    			$(".editor-can-use").attr("disabled",true)
                // $(".editor-can-use").addClass("change-background")
                var pagecount = ($(".current-page").html() - 1) * 10;
                var i = $(this).parent().parent().index() + pagecount;
                $("#datetime1").datetimepicker();
                $("#datetime2").datetimepicker();
                $("#datetime1").change(function () {
                    $(".editor-can-use").attr("disabled", false)
                    $(".editor-can-use").removeClass("change-background")
                })
                $("#datetime2").change(function () {
                    $(".editor-can-use").attr("disabled", false)
                    $(".editor-can-use").removeClass("change-background")
                })
                $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
                    var meetingid = data.data[i].id;
                    var ss = data.data[i].meetingRoomNum;
                    var bT = data.data[i].beginTime;
                    var eT = data.data[i].endTime;
                    var btarry = bT.substring(0, 16)
                    var etarry = eT.substring(0, 16)
                    var mN = data.data[i].meetingName;
                    $("#datetime1").val(btarry)
                    $("#datetime2").val(etarry)
                    $(".meeting-topic").val(mN)
                    $("#editor-meetingroom").append('<option selected="selected">' + ss + '</option>')
                    $(".editor-can-use").click(function () {
                        $('#editor-meetingroom').html('');
                        $(".editor-can-use").addClass("change-background")
                        $(".editor-can-use").attr("disabled", true)
                        var bTs = $("#datetime1").val();
                        var eTs = $("#datetime2").val();
                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/usablevmrs/?beginTime=' + bTs + '&endTime=' + eTs + '&token=' + admin_token, function (data) {
                            var departmentcount = data.data.length
                            html = '';
                            for (var i = 0; i < departmentcount; i++) {

                                html += '<option value="' + data.data[i] + '">' + data.data[i] + '</option>'
                            }
                            ;
                            $('#editor-meetingroom').append(html)
                        })
                    })
                    $(".editor-can-use").click()
                    $('#editor-meetingroom').html('');
                    $("#editor-meetingroom").append('<option selected="selected">' + ss + '</option>')
                    $(".trues").click(function () {

                        if (($(".editor-can-use").hasClass("change-background"))) {
                            var valus = $('#editor-meetingroom option:selected').val()
                            var bTs = $("#datetime1").val() + ':00';
                            var eTs = $("#datetime2").val() + ':00';
                            var mNs = $.trim($(".meeting-topic").val())
                            Date.prototype.diff = function (date) {
                                return (this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
                            }
                            var ds = eTs;
                            ds = ds.replace(/-/g, '/');
                            ds = ds.replace('T', ' ');
                            ds = ds.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
                            now = new Date(ds);
                            var dt = bTs;
                            dt = dt.replace(/-/g, '/');
                            dt = dt.replace('T', ' ');
                            dt = dt.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
                            date = new Date(dt);
                            // 构造两个日期，分别是系统时间和2013/04/08 12:43:45
                            // 调用日期差方法，求得参数日期与系统时间相差的天数
                            var diff = now.diff(date)

                            if (diff < 0) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("会议结束时间应大于开始时间")
                                return false
                            }
                            if ((bTs == '') || (eTs == '') || (mNs == '')) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("请完善信息")
                                return false
                            }
                            else if (bTs == eTs) {
                                $(".meeting-form").hide();
                                $(".alerts").show();
                                $(".alert-content").html("开始和结束时间不能相同")
                                return false
                            }
                            else {
                                var data = {
                                    organId: admin_id,
                                    id: meetingid,
                                    beginTime: bTs,
                                    endTime: eTs,
                                    meetingName: mNs,
                                    meetingRoomNum: valus
                                }
                                console.log(data)
                                var url1 = url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings/' + meetingid + '?token=' + admin_token;
                                var xmlhttp = new XMLHttpRequest();
                                xmlhttp.open("put", url1, false);
                                // xmlhttp.setRequestHeader("token", this.token);
                                xmlhttp.setRequestHeader("Content-Type", "application/json");
                                xmlhttp.send(JSON.stringify(data));

                                if (xmlhttp.status == 200) {
                                    console.log(JSON.parse(xmlhttp.responseText))
                                    var codes = JSON.parse(xmlhttp.responseText)
                                    if (codes.code == 14) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("此时间段内有其他会议")
                                    }
                                    else if (codes.code == 17) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("会议主题已存在")
                                    }
                                    else if (codes.code == 999) {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("服务器内部错误")
                                    }
                                    else {
                                        $(".meeting-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("编辑成功")
                                        $(".alert-sure").click(function () {
                                            $(".meeting-form").hide()
                                            location.reload()
                                        })
                                        $(".img-right").click(function () {
                                            location.reload()
                                        })

                                    }
                                } else {
                                    console.log("faile");
                                    console.log(JSON.parse(xmlhttp.responseText));
                                }
                            }
                        }
                        else {

                            $(".alerts").show();
                            $(".meeting-form").hide();
                            $(".alert-content").html("请获取可用会议室")
                        }
                    })
                })
                // $('.bcgs').show();
                //  $(".meeting-form").show();
            })
            $(".delet").click(function () {
                var pagecount = ($(".current-page").html() - 1) * 10;
                var i = $(this).parent().parent().index() + pagecount;
                $(".alerts-delet").show()
                $(".bcgs").show()
                $(".delet-sure").click(function () {
                    $(".alerts-delet").hide()
                    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
                        var meetingid = data.data[i].id;
                        $.ajax({
                            type: "delete",
                            dataType: "json",
                            url: url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings/' + meetingid + '?token=' + admin_token,
                            success: function () {
                                alert("删除成功")
                                location.reload();
                            }
                        })
                    })
                })
                $(".delet-cancel").click(function () {
                    $(".alerts-delet").hide()
                    $(".bcgs").hide()
                })
                $(".delet-right").click(function () {
                    $(".alerts-delet").hide()
                    $(".bcgs").hide()
                })

            })
        }
    })
}
function getPage() {
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token, function (data) {
        pn = 1;
        var totalCount = data.data.length; // 总记录数
        var pageSize = 15; // 每页显示几条记录
        var pageTotal = Math.ceil(totalCount / pageSize); // 总页数
        $("#next").click(function () {
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
        $("#prev").click(function () {
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
        $("#firstPage").click(function () {
            pn = 1;
            gotoPage(pn);
        });
        $("#lastPage").click(function () {
            pn = pageTotal;
            gotoPage(pn);

        });
        $("#page-jump").click(function () {
            if ($(".page-num").val() <= pageTotal && $(".page-num").val() != '') {
                pn = $(".page-num").val();
                gotoPage(pn);
            } else {
                $(".page").show()
                $(".alert-content").html("你输入的页码有误")
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
function clicks() {
    $(".cancels").click(function () {
        $(".bcgs").hide();
        $(".forms").hide()
        location.reload();
    })
}
$(function () {
    getPage();
    clicks()
});
$(".new-meeting").click(function () {
    $.ajax({
        type: "get",
        url: url + 'cloudpServer/v1/orgs/' + admin_id + '/teams?token=' + admin_token,
        success: function (data) {
            firstShowList(data);
        },
        error: function (erro) {
            console.log(erro);
        }
    });
    $("#datetime3").datetimepicker();
    $("#datetime4").datetimepicker();
    $("#datetime3").datetimepicker('setDate', (new Date()));
    $("#datetime4").datetimepicker('setDate', (new Date()));
    // var contrast=$("#datetime3").val().parse();
    $(".bcgs").show();
    $(".add-meeting").show();
    $("#datetime4").change(function () {
        $(".can-use").attr("disabled", false);
        $(".can-use").removeClass("change-background")
    });
    $("#datetime3").change(function () {
        $(".can-use").attr("disabled", false);
        $(".can-use").removeClass("change-background")
    });
    $(".can-use").click(function () {
        $(".can-use").addClass("change-background");
        $(".can-use").attr("disabled", true);
        var bTs = $("#datetime3").val();
        var eTs = $("#datetime4").val();
        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/usablevmrs/?beginTime=' + bTs + '&endTime=' + eTs + '&token=' + admin_token, function (data) {
            var departmentcount = data.data.length;
            if (departmentcount == 0) {
                $(".add-meeting").hide();
                $(".alerts").show();
                $(".alert-content").html("没有可用的会议室");
                $(".img-right").click(function () {
                    $(".alerts").hide();
                    $(".meeting-form").hide();
                    $(".add-meeting").show();
                });
                $(".alert-sure").click(function () {
                    $(".alerts").hide();
                    $(".meeting-form").hide();
                    $(".add-meeting").show();
                });

                return false
            }
            else {
                $("#meetingroom").html('');
                html = '';
                for (var i = 0; i < departmentcount; i++) {

                    html += '<option value="' + data.data[i] + '">' + data.data[i] + '</option>'
                }

                $('#meetingroom').append(html);
                // $("#meetingroom").val('')
                var changeone = $("#meetingroom").val();
                $.getJSON(url + 'cloudpServer/v1/orgs/vmrs/getmrMes?meetingRoomNum=' + changeone + '&token=' + admin_token, function (data) {
                    $.get(url + 'cloudpServer/v1/orgs/'+admin_id+'/vmrs?token=' + admin_token + '&meetingRoomNum=' + changeone).success(function (res) {
                        console.log(data, res);
                        var conferenceId = $("#meetingroom").val();
                        var targetMeetingRoom = res.data.filter(function (item) {
                            return item.meetingRoomNum == conferenceId;
                        })[0];
                        $(".manaccount").html(data.data[0].capacity + "人");
                        console.log('guest pass:',targetMeetingRoom.guestPassword);
                        $("#guest-pass-create").val(targetMeetingRoom.guestPassword);
                    });
                });
                $("#meetingroom").change(function () {
                    var changes = $("#meetingroom option:selected").val();
                    $.getJSON(url + 'cloudpServer/v1/orgs/vmrs/getmrMes?meetingRoomNum=' + changes + '&token=' + admin_token, function (data) {
                        $.get(url + 'cloudpServer/v1/orgs/'+admin_id+'/vmrs?token=' + admin_token + '&meetingRoomNum=' + changeone).success(function (res) {
                            console.log(data, res);
                            var conferenceId = $("#meetingroom").val();
                            var targetMeetingRoom = res.data.filter(function (item) {
                                return item.meetingRoomNum == conferenceId;
                            })[0];
                            $(".manaccount").html(data.data[0].capacity + "人");
                            console.log('guest pass:',targetMeetingRoom.guestPassword);
                            $("#guest-pass-create").val(targetMeetingRoom.guestPassword);
                        });
                    })
                })
            }
        })
    });


    $(".trues").click(function () {
        if (($(".can-use").hasClass("change-background"))) {
            var meetingrooms = $('#meetingroom option:selected').val()
            var meetingtypes = $('#meetingtype option:selected').val()
            var isemail = $("input[name='radiochooseCreat1']:checked").val()
            var qtpeople = $(".emailpeople").val()
            var startpeople = $("#input1").val()
            var phone = $("#input2").val()
            var email = $("#input3").val()
            chooseall()
            var bTs = $("#datetime3").val() + ':00';
            var eTs = $("#datetime4").val() + ':00';
            var mNs = $.trim($(".meeting-topics").val());
            Date.prototype.diff = function (date) {
                return (this.getTime() - date.getTime()) / (24 * 60 * 60 * 1000);
            }
            var ds = eTs;
            ds = ds.replace(/-/g, '/');
            ds = ds.replace('T', ' ');
            ds = ds.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
            now = new Date(ds);
            var dt = bTs;
            dt = dt.replace(/-/g, '/');
            dt = dt.replace('T', ' ');
            dt = dt.replace(/(\+[0-9]{2})(\:)([0-9]{2}$)/, ' UTC\$1\$3');
            date = new Date(dt);
            // 构造两个日期，分别是系统时间和2013/04/08 12:43:45
            // 调用日期差方法，求得参数日期与系统时间相差的天数
            var diff = now.diff(date)
            if (diff < 0) {
                $(".add-meeting").hide();
                $(".alerts-add").show();
                $(".alert-content").html("会议结束时间应大于开始时间")
                return false
            }
            if ((meetingrooms == undefined) || (mNs == '')) {
                $(".add-meeting").hide();
                $(".alerts-add").show();
                $(".alert-content").html("请完善会议信息")
                return false
            }
            else if (bTs == eTs) {
                $(".add-meeting").hide();
                $(".alerts-add").show();
                $(".alert-content").html("开始和结束时间不能相同")
                return false
            }
            else if ((startpeople == '') || (email == '') || (phone == '')) {
                $(".add-meeting").hide();
                $(".alerts-add").show();
                $(".alert-content").html("请完善会议信息")
                return false
            }
            else {
                var data = {
                    organId: admin_id,
                    meetingRoomNum: meetingrooms,
                    meetingName: mNs,
                    sendName: startpeople,
                    sendMail: email,
                    sendPhone: phone,
                    receiveOut: qtpeople,
                    personList: listarray,
                    beginTime: bTs,
                    endTime: eTs
                }
                console.log(data)
                console.log(listarray)
                var url1 = url + 'cloudpServer/v1/orgs/' + admin_id + '/meetings?token=' + admin_token + '&flag=' + isemail;
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open("post", url1, false);
                // xmlhttp.setRequestHeader("token", this.token);
                xmlhttp.setRequestHeader("Content-Type", "application/json");
                xmlhttp.send(JSON.stringify(data));

                if (xmlhttp.status == 200) {
                    console.log(JSON.parse(xmlhttp.responseText))
                    var codes = JSON.parse(xmlhttp.responseText)
                    if (codes.code == 14) {
                        $(".add-meeting").hide();
                        $(".alerts-add").show();
                        $(".alert-content").html("此时间段内有其他会议")
                    }
                    else if (codes.code == 17) {
                        $(".add-meeting").hide();
                        $(".alerts-add").show();
                        $(".alert-content").html("会议主题已存在")
                    }
                    else if (codes.code == 999) {
                        $(".add-meeting").hide();
                        $(".alerts-add").show();
                        $(".alert-content").html("服务器内部错误")
                    }
                    else {
                        $(".add-meeting").hide();
                        $(".alerts-add").show();
                        $(".alert-content").html("创建成功")
                        $(".add-sure").click(function () {
                            $(".add-meeting").hide()
                            location.reload()
                        })
                        $(".add-right").click(function () {
                            location.reload()
                        })
                    }
                } else {
                    console.log("faile");
                    console.log(JSON.parse(xmlhttp.responseText));
                }
            }
        }
        else {
            $(".add-meeting").hide();
            $(".alerts-add").show();
            $(".alert-content").html("请获取可用会议室")
        }
    })


});
$(".alert-sure").click(function () {
    $(".alerts").hide()
    $(".meeting-form").show()
});
$(".img-right").click(function () {
    $(".alerts").hide()
    $(".meeting-form").show()
});
$(".add-right").click(function () {
    $(".alerts-add").hide();
    $(".add-meeting").show()
});
$(".add-sure").click(function () {
    $(".alerts-add").hide();
    $(".add-meeting").show()
});
$(".page-right").click(function () {
    $(".page").hide();
    $(".bcgs").hide();
});
$(".page-sure").click(function () {
    $(".page").hide();
    $(".bcgs").hide()
});
//通讯录
function firstShowList(data) {
    meetingRoomData = data.data;
    totals = meetingRoomData.length;
    paging_mode(0, totals);
}

function paging_mode(start, end) {
    document.getElementById("contentBox").innerHTML = "";
    for (var i = start; i < end; i++) {
        var new_meetingroom = new MeetingRoom1(meetingRoomData[i]);
    }
}
function gets(gid) {
    $.ajaxSettings.async = false
    contents = ''
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/persons?token=' + admin_token + '&teamId=' + gid, function (data) {
        if (data.code == 31) {
            contents = ''
        }
        else {
            for (var i = 0; i < data.data.length; i++) {
                contents += '<div><input type="checkbox" style="position:absolute;clip: rect(6 15 15 6)" value="' + data.data[i].email + '" name="check" onclick="choose()"/>' + data.data[i].cName + '</div>'
            }
        }
        contents1 = contents
        console.log(contents1)
    })

}

function MeetingRoom1(meetingroom_data) {
    //DATA
    this.ids = meetingroom_data.id;
    this.names = meetingroom_data.tName;
    this.accounts = meetingroom_data.account;
    //DOM
    gets(this.ids)
    this.li_num = document.createElement("div");
    this.li_num.innerHTML = this.names + '(' + this.accounts + ')';
    this.li_num.className = "meetinggroup";
    this.li_num.name = 1
    this.li_num.addEventListener("click", this.showpeople.bind(this), false);
    this.li_num1 = document.createElement("div");
    this.li_num1.className = "meetinggroup1"
    this.li_num1.innerHTML = contents1
    document.getElementById("contentBox").appendChild(this.li_num)
    document.getElementById("contentBox").appendChild(this.li_num1)
}
MeetingRoom1.prototype.showpeople = function () {
    if (this.li_num.name == 1) {
        this.li_num.name = 2
        this.li_num.setAttribute('class', 'zhankai')
        this.li_num1.style.display = "block"
    }
    else {
        this.li_num.name = 1
        this.li_num.setAttribute('class', 'meetinggroup')
        this.li_num1.style.display = "none"
    }

};
function choose() {
    var check = document.getElementsByName("check");
    var a = ''
    var c = {}
    var chooseAll = "";
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            a += '<div>' + check[i].nextSibling.nodeValue + '</div>';
            c = {'cName': check[i].value, 'email': check[i].nextSibling.nodeValue}

        }
    }
    $("#contentBox1").html('')
    $("#contentBox1").append(a)
}
function chooseall() {
    var check = document.getElementsByName("check")
    var c = {}
    var listarray1 = new Array()
    var chooseAll = "";
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            a += '<div>' + check[i].nextSibling.nodeValue + '</div>';
            c = {'cName': check[i].nextSibling.nodeValue, 'email': check[i].value}
            listarray1.push(c)
        }
    }
    listarray = listarray1
}

//添加所有分组人员
html = '';
$.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/persons?token=' + admin_token + '&teamId=0', function (data) {
    console.log(data);
    for (var i = 0; i < data.data.length; i++) {
        html += '<div><input type="checkbox" style="position:absolute;clip: rect(6 15 15 6)" value="' + data.data[i].email + '" name="check" onclick="choose()"/>' + data.data[i].cName + '</div>'
    }
    $(".allgroup").html('未分组人员(' + data.data.length + ')');
    $("#contentBox2").append(html);
});
$(".allgroup").click(function () {

    if ($(".allgroup").attr('name') == 1) {
        $(".allgroup").attr('name', 2);
        $(".allgroup").addClass("zhankai");
        $("#contentBox2").show()
    }
    else {
        $(".allgroup").attr('name', 1);
        $(".allgroup").removeClass("zhankai");
        $("#contentBox2").hide()
    }

});
//取消选择
$(".clear").click(function () {
    $("#contentBox1").html('')
    var check = document.getElementsByName("check")
    for (var i = 0; i < check.length; i++) {
        if (check[i].checked) {
            check[i].click();
        }
    }
});