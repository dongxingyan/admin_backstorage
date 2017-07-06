var cc
var gp
var meetingroomid
var meetingroomnum
var time
var themeid
var themeuuid
var themename
var guest_flag
var mC
var gP
var hP
var dP
var mN
function test() {
    var pmwidth = document.body.clientWidth
    var pmheight = document.body.clientHeight
    var heights = pmheight - 72
    var widths = pmwidth - 130
    var names = widths - 570
    $(".box").width(widths)
    $(".names").width(names)
    if (heights < 720) {
        $(".box-left").height(950)
    }
    else {
        $(".box-left").height(950)
    }
    $(".meetingroom2").width(names)
}
$(window).resize(function () {
    var pmwidth = document.body.clientWidth
    var pmheight = document.body.clientHeight
    var heights = pmheight - 72
    var widths = pmwidth - 150
    var names = widths - 570
    console.log(names)
    if (pmwidth < 900) {
        $("body").css("overflow", "scroll");
        $(".head").width(980)
        $(".box").width(850)
        $(".names").width(200)
        if (heights < 720) {
            $(".box-left").height(950)
        }
        else {
            $(".box-left").height(950)
        }
        $(".meetingroom2").width(200)
    }
    else {
        $(".box").width(widths)
        $(".names").width(names)
        if (heights < 720) {
            $(".box-left").height(720)
        }
        else {
            $(".box-left").height(heights)
        }
        $(".meetingroom2").width(names)
        $(".head").width('100%')
    }
})
function testbcg() {
    var na = new Array()
    var counts = $(".li-head-meetingrooms").length
    for (var i = 0; i < counts; i++) {
        if (($(".li-head-meetingrooms").eq(i).children().length) == 0) {
            var b = i
            $(".li-head-meetingrooms").eq(b - 1).nextAll("ul").remove()
        }
    }
}
$.ajaxSetup({cache: false})
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
var admin_id = Request.id
var admin_token = Request.name
var lefts = $(".box-left a")
var a = lefts.length
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
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs?token=' + admin_token, function (data) {
        var totalCount = data.data.length;
        var pageSize = 15; // 每页显示几条记录  
        var pageTotal = Math.ceil(totalCount / pageSize); // 总页数 
        var startPage = pageSize * (pn - 1);
        var endPage = startPage + pageSize - 1;
        var $ul = $(".content-boxes");
        $ul.empty();
        // for (var i = 0; i < pageSize; i++) {  
        //     $ul.append('<ul class="li-head-meetingrooms"></ul>');  
        // }  
        var dataRoot = data.data;
        if (pageTotal == 1) {
            for (var i = 0; i < totalCount; i++) {
                $ul.append('<ul class="li-head-meetingrooms"></ul>');
            }
            // 当只有一页时
            for (var j = 0; j < totalCount; j++) {
                if (dataRoot[j].name == undefined) {
                    dataRoot[j].name = ''
                }
                if (dataRoot[j].meetingRoomNum == undefined) {
                    dataRoot[j].meetingRoomNum = ''
                }
                if (dataRoot[j].capacity == undefined) {
                    dataRoot[j].capacity = ''
                }
                if (dataRoot[j].hostPassword == undefined) {
                    dataRoot[j].hostPassword = ''
                }
                if (dataRoot[j].guestPassword == undefined) {
                    dataRoot[j].guestPassword = ''
                }
                $(".li-head-meetingrooms").eq(j)
                    .append('<li class="meetingroom1">' + dataRoot[j].meetingRoomNum + '</li>')
                    .append('<li class="meetingroom2" title=' + dataRoot[j].name + '>' + dataRoot[j].name + '</li>')
                    .append('<li class="meetingroom3">' + dataRoot[j].capacity + '</li>')
                    .append('<li class="meetingroom4">' + dataRoot[j].hostPassword + '</li>')
                    .append('<li class="meetingroom5">' + dataRoot[j].guestPassword + '</li>')
                    .append('<li class="description6"><img src="image/bianji.png" class="editored" alt=""> </li>')
            }
            test()
            // $(".sursors")
        } else {
            // if(pn==endPage){
            //   var a=
            // }
            for (var i = 0; i < pageSize; i++) {
                $ul.append('<ul class="li-head-meetingrooms"></ul>');
            }
            for (var j = startPage, k = 0; j < endPage, k < pageSize; j++, k++) {
                if (j == totalCount) {
                    break;       // 当遍历到最后一条记录时，跳出循环  
                }
                if (dataRoot[j].name == undefined) {
                    dataRoot[j].name = ''
                }
                if (dataRoot[j].meetingRoomNum == undefined) {
                    dataRoot[j].meetingRoomNum = ''
                }
                if (dataRoot[j].capacity == undefined) {
                    dataRoot[j].capacity = ''
                }
                if (dataRoot[j].hostPassword == undefined) {
                    dataRoot[j].hostPassword = ''
                }
                if (dataRoot[j].guestPassword == undefined) {
                    dataRoot[j].guestPassword = ''
                }
                $(".li-head-meetingrooms").eq(k)
                    .append('<li class="meetingroom1" >' + dataRoot[j].meetingRoomNum + '</li>')
                    .append('<li class="meetingroom2" title=' + dataRoot[j].name + '>' + dataRoot[j].name + '</li>')
                    .append('<li class="meetingroom3">' + dataRoot[j].capacity + '</li>')
                    .append('<li class="meetingroom4">' + dataRoot[j].hostPassword + '</li>')
                    .append('<li class="meetingroom5">' + dataRoot[j].guestPassword + '</li>')
                    .append('<li class="description6"><img src="image/bianji.png" class="editored" alt=""> </li>')
            }
            test()
            testbcg()
        }
        $(".page-count").text(pageTotal);
        $(".content-totals").text(totalCount);
        if (pageTotal == 1) {
            var pagelength = $(".sursors").length;
            $('.editored').click(function () {
                var i = $(this).parent().parent().index();
                $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs?token=' + admin_token, function (data) {
                    meetingroomid = data.data[i].id;
                    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs/' + meetingroomid + '?token=' + admin_token, function (data) {

                        var descrip = data.data.description;
                        var mr = data.data.meetingRoomNum;
                        var di = data.data.departId;
                        var nm = data.data.name;
                        cc = data.data.capacity;
                        var hp = data.data.hostPassword
                        gp = data.data.guestPassword;
                        time = data.data.expirationDate
                        themeid = data.data.themeId;
                        themeuuid = data.data.themeUuid;
                        themename = data.data.themeName;
                        if (descrip == undefined) {
                            descrip = ''
                        }
                        if (nm == undefined) {
                            nm = ''
                        }
                        $.getJSON(url + 'cloudpServer/v1/orgs/vmrs/getmrMes?meetingRoomNum=' + mr + '&token=' + admin_token, function (data) {
                            $(".meetingroom-name").val(nm);
                            $(".meetingroom-num").html(mr);
                            $(".meetingroom-count").val(cc);
                            $(".host-password").val(hp);
                            $(".guest-password").val(gp);
                            $(".description-input").val(descrip)
                        })
                        var spans = ''
                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs/' + meetingroomid + '/alias?token=' + admin_token, function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                                spans += ('<span class="otherspan">' + data.data[i].alias + '</span>')
                            }
                            ;
                            $(".othername-right").append(spans)
                        })
                        $(".true").click(function () {
                            mN = $.trim($(".meetingroom-name").val());
                            mC = $.trim($(".meetingroom-count").val());
                            hP = $(".host-password").val();
                            gP = $(".guest-password").val();
                            dP = $(".description-input").val()
                            meetingroomnum = $(".meetingroom-num").html();
                            guest_flag = $("input[name='radiochooseCreat']:checked").val()
                            var c = /^\d{6}$/;
                            var d = /^[0-9]*$/;
                            // $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/devices-count?token=' + admin_token, function (data) {
                            //     var count1 = Number(data.data.count)
                            //     $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/users-count?token=' + admin_token, function (data) {
                            //         var count2 = Number(data.data.count)
                            //         var counts = count1 + count2
                            //         if ((!gP.match(c)) && (gP != '')) {
                            //             $(".meetingroom-form").hide();
                            //             $(".alerts").show();
                            //             $(".alert-content").html("密码为6位纯数字")
                            //             return false;
                            //         }
                                    if ((cc != mC) || (gp != gP)) {
                                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetingRoomNum/' + meetingroomnum + '?token=' + admin_token, function (data) {
                                            if (data.code == 31) {
                                                tijiao()
                                            }
                                            else {
                                                $(".meetingroom-form").hide()
                                                $(".bcgs").show()
                                                $(".alerts-delet").show()
                                                $("#contentBox5").html('')
                                                html = ''
                                                for (var i = 0; i < data.data.length; i++) {
                                                    var c = i + 1
                                                    html += '<ul><li class="tishileft">' + c + '</li><li class="tishiright">' + data.data[i].meetingName + '</li></ul>'
                                                }
                                                $("#contentBox5").append(html)
                                                $(".delet-cancel").click(function () {
                                                    $(".alerts-delet").hide()
                                                    $(".meetingroom-form").show()
                                                })
                                                $(".delet-sure").click(function () {
                                                    tijiao()
                                                })
                                            }
                                        })

                                    }
                                    // else if (mC > counts) {
                                    //     $(".meetingroom-form").hide();
                                    //     $(".alerts").show();
                                    //     $(".alert-content").html('会议容量不能超过' + counts + '人')
                                    //     return false;
                                    // }
                                    else if ((gP == hP) && (gP != '') && (hP != '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('密码不能相同')
                                        return false;
                                    }
                                    else if (!mC.match(d)) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('会议容量只能为数字')
                                        return false
                                    }
                                    else if ((!hP.match(c)) && (hP != '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('密码为6位纯数字')
                                        return false;
                                    }
                                    if ((mN == '') || (mC == '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('请完善信息')
                                        return false
                                    }
                                    else {
                                        tijiao()
                                    }
                            //     })
                            // })

                        })
                    })
                })
                $('.bcgs').show();
                $(".meetingroom-form").show();
            })
        }
        /*else {
            $('.editored').click(function () {
                var pagecount = ($(".current-page").html() - 1) * 15;
                var i = $(this).parent().parent().index() + pagecount;
                $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs?token=' + admin_token, function (data) {
                    meetingroomid = data.data[i].id;
                    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs/' + meetingroomid + '?token=' + admin_token, function (data) {
                        var descrip = data.data.description
                        var mr = data.data.meetingRoomNum;
                        var di = data.data.departId;
                        var nm = data.data.name;
                        cc = data.data.capacity;
                        var hp = data.data.hostPassword
                        gp = data.data.guestPassword;
                        time = data.data.expirationDate
                        themeid = data.data.themeId;
                        themeuuid = data.data.themeUuid;
                        themename = data.data.themeName;
                        if (descrip == undefined) {
                            descrip = ''
                        }
                        if (nm == undefined) {
                            nm = ''
                        }
                        $.getJSON(url + 'cloudpServer/v1/orgs/vmrs/getvrmCapacity?meetingRoomNum=' + mr + '&token=' + admin_token, function (data) {
                            $(".meetingroom-name").val(nm);
                            $(".meetingroom-num").html(mr);
                            $(".meetingroom-count").val(cc);
                            $(".host-password").val(hp);
                            $(".guest-password").val(gp);
                            $(".description-input").val(descrip)
                        })
                        var spans = ''
                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs/' + meetingroomid + '/alias?token=' + admin_token, function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                                spans += ('<span class="otherspan">' + data.data[i].alias + '</span>')
                            }
                            ;
                            $(".othername-right").append(spans)
                        })
                        $(".true").click(function () {
                            mN = $.trim($(".meetingroom-name").val());
                            mC = $.trim($(".meetingroom-count").val());
                            hP = $(".host-password").val();
                            gP = $(".guest-password").val();
                            dP = $(".description-input").val()
                            meetingroomnum = $(".meetingroom-num").html();
                            guest_flag = $("input[name='radiochooseCreat']:checked").val()
                            var c = /^\d{6}$/;
                            var d = /^[0-9]*$/;
                            // $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/devices-count?token=' + admin_token, function (data) {
                            //     var count1 = Number(data.data.count)
                            //     $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/users-count?token=' + admin_token, function (data) {
                            //         var count2 = Number(data.data.count)
                            //         var counts = count1 + count2
                                    if ((!gP.match(c)) && (gP != '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html("密码为6位纯数字")
                                        return false;
                                    }
                                    // else if (mC > counts) {
                                    //     $(".meetingroom-form").hide();
                                    //     $(".alerts").show();
                                    //     $(".alert-content").html('会议容量不能超过' + counts + '人')
                                    //     return false;
                                    // }
                                    else if ((gP == hP) && (gP != '') && (hP != '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('密码不能相同')
                                        return false;
                                    }
                                    else if (!mC.match(d)) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('会议容量只能为数字')
                                        return false
                                    }
                                    else if ((!hP.match(c)) && (hP != '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('密码为6位纯数字')
                                        return false;
                                    }
                                    else if ((mN == '') || (mC == '')) {
                                        $(".meetingroom-form").hide();
                                        $(".alerts").show();
                                        $(".alert-content").html('请完善信息')
                                        return false
                                    }
                                    else if ((cc != mC) || (gp != gP)) {
                                        $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/meetingRoomNum/' + meetingroomnum + '?token=' + admin_token, function (data) {
                                            if (data.code == 31) {
                                                tijiao()
                                            }
                                            else {
                                                $(".meetingroom-form").hide()
                                                $(".bcgs").show()
                                                $(".alerts-delet").show()
                                                $("#contentBox5").html('')
                                                html = ''
                                                for (var i = 0; i < data.data.length; i++) {
                                                    var c = i + 1
                                                    html += '<ul><li class="tishileft">' + c + '</li><li class="tishiright">' + data.data[i].meetingName + '</li></ul>'
                                                }
                                                $("#contentBox5").append(html)
                                                $(".delet-cancel").click(function () {
                                                    $(".alerts-delet").hide()
                                                    $(".meetingroom-form").show()
                                                })
                                                $(".delet-sure").click(function () {
                                                    tijiao()
                                                })
                                            }
                                        })
                                    }
                                    else {
                                        tijiao()
                                    }
                                // })
                            // })
                        })
                    })
                })
                $('.bcgs').show();
                $(".meetingroom-form").show();
            })
        }*/
    })
}
function getPage() {
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs?token=' + admin_token, function (data) {
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
function clicks() {
    $(".cancel").click(function () {
        $(".bcgs").hide();
        $(".meetingroom-form").hide()
        location.reload();
    })
}
$(function () {
    getPage();
    clicks()

})
/*$(".new-meeting").click(function () {
    $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/depts/?token=' + admin_token, function (data) {
        var departmentcount = data.data.length
        html = '';
        for (var i = 0; i < departmentcount; i++) {

            html += '<option value="' + data.data[i].departName + '">' + data.data[i].departName + '</option>'
        }
        ;
        $('#meetingroom-departname').append(html)
    })

    $(".bcgs").show()
    $(".meetingroom-formtwo").show();
    $(".true").click(function () {
        var a = $.trim($(".host-passwords").val());
        var b = $.trim($(".guest-passwords").val());

        var c = /^\d{6}$/;
        if (!a.match(c)) {
            alert('密码为6位纯数字')
            return false;
        }
        else if (!b.match(c)) {
            alert('密码为6位纯数字')
            return false;
        }
        else if (a.length !== b.length) {
            alert("密码长度必须一致")
            return false;
        }
        else if (a == b) {
            alert("密码不能一样")
        }
        else {


            var valuesname = $("#meetingroom-departname option:selected").val()
            $.getJSON(url + 'cloudpServer/v1/orgs/' + admin_id + '/get-deptsbyname?token=' + admin_token + '&departName=' + valuesname, function (data) {
                var deptids = data.data[0].id;
                var values = $("#meeting-room option:selected").val()
                var host
                if (values == '全屏主要发言者（单个语音切换布局）') {
                    host = 'one_main_zero_pips'
                }
                else if (values == '较大的主要发言者和最多 7 位其他与会者(1 + 7 布局)') {
                    host = 'one_main_seven_pips'
                }
                else if (values == '较小的主要发言者和最多 21 位其他与会者(1 + 21 布局)') {
                    host = 'one_main_twentyone_pips'
                }
                if ((deptids == '') || ($(".meetingroom-names").val() == '') || ($(".meetingroom-counts").val() == '') || ($(".host-passwords").val() == '') || ($(".guest-passwords").val() == '') || ($(".description-inputs").val() == '')) {
                    alert("请填写完整")
                }
                else {


                    var data = {
                        token: admin_token,
                        org_id: admin_id,
                        deptId: deptids,
                        name: $(".meetingroom-names").val(),
                        capacity: $(".meetingroom-counts").val(),
                        hostPassword: $(".host-passwords").val(),
                        guestPassword: $(".guest-passwords").val(),
                        description: $(".description-inputs").val(),
                        host_view: host,

                    }
                    $.ajax({
                        type: 'post',
                        data: data,
                        dataType: 'json',
                        url: url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs',
                        success: function () {
                            location.reload()
                        }
                    })
                }
            })
        }
    })
})*/
$(".page-right").click(function () {
    $(".page").hide();
    $(".bcgs").hide();
})
$(".page-sure").click(function () {
    $(".page").hide();
    $(".bcgs").hide()
})
$(".alert-sure").click(function () {
    $(".alerts").hide()
    $(".meetingroom-form").show()
})
$(".img-right").click(function () {
    $(".alerts").hide()
    $(".meetingroom-form").show()
})
//取消选择
// $(".clear").click(function () {
//     $("#contentBox1").html('')
//     for (var i = Things.length - 1; i >= 0; i--) {
//         Things[i]
//     }
// })
function tijiao() {
    var data = {
        organId: admin_id,
        id: meetingroomid,
        meetingRoomNum: meetingroomnum,
        capacity: parseInt(mC),
        guestPassword: parseInt(gP),
        hostPassword: parseInt(hP),
        description: dP,
        allowGuestFlag: guest_flag,
        expirationDate: time,
        themeId: themeid,
        themeName: themename,
        themeUuid: themeuuid,
        name: mN
    }
    var url1 = url + 'cloudpServer/v1/orgs/' + admin_id + '/vmrs/' + meetingroomid + '?token=' + admin_token;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("put", url1, false);
    // xmlhttp.setRequestHeader("token", this.token);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify(data));

    if (xmlhttp.status == 200) {
        console.log(JSON.parse(xmlhttp.responseText))
        var codes = JSON.parse(xmlhttp.responseText)
        if (codes.code == 999) {
            $(".meetingroom-form").hide();
            $(".alerts").show();
            $(".alerts-delet").hide()
            $(".alert-content").html("服务器内部错误")
        }
        else if (codes.code == 18) {
            $(".meetingroom-form").hide();
            $(".alerts").show();
            $(".alerts-delet").hide()
            $(".alert-content").html("会议室名称已存在")
        }
        else if (codes.code == 4) {
            $(".meetingroom-form").hide();
            $(".alerts").show();
            $(".alerts-delet").hide()
            $(".alert-content").html("没有该资源")
        }
        else if (codes.code == 32) {
            $(".meetingroom-form").hide();
            $(".alerts").show();
            $(".alerts-delet").hide()
            $(".alert-content").html("密码格式错误")
        }
        else {
            $(".meetingroom-form").hide();
            $(".alerts").show();
            $(".alerts-delet").hide()
            $(".alert-content").html("编辑成功")
            $(".alert-sure").click(function () {
                $(".meetingroom-form").hide()
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