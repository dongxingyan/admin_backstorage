(function () {
    var useCount = {
        url: url,
        adminID: null,
        adminToken: null,
        meetingUseTimes: echarts.init(document.getElementById('meeting-use-times')),
        meetingTimes: echarts.init(document.getElementById('meeting-times')),
        meetingConcurrent: echarts.init(document.getElementById('meeting-concurrent')),
        $calendarStart: $("#calendarStart"),
        $calendarEnd: $("#calendarEnd"),
        $nearlyYear: $('#J-nearly-year'),
        $meetingRoomInput: $('#J-meeting-room'),
        $nearlyMonth: $('#J-nearly-month'),
        $meetingUseTimeContainer: $('#meeting-use-times'),
        $meetingConcurrentContainer: $('#meeting-concurrent'),
        $meetingTimesContainer: $('#meeting-times'),
        $searchButton: $('#J-search'),
        $nearlyWeek: $('#J-nearly-week'),
        $outputChartsBtn: $('#J-output-charts'),
        $meetingTimesTable: $('#J-meeting-times-table'),
        $meetingConcurrentTable: $('#J-meeting-concurrent-table'),
        $dateRow: $('#J-date-row'),
        $participantTimeRow: $('#J-participant-time-row'),
        $meetingUseTimeRow: $('#J-meeting-use-time-row'),
        $meetingDurationTable: $('#J-meeting-duration-table'),

        init: function() {
            this.searchCountData();
            this.adjustShowSize();
            this.getAdminInfo();
            this.leftNavClickEvent();
            this.activationTimePlugIn();
            this.getOneYearData();
            this.getOneMonthData();
            this.clickOfNearlyWeek();
            this.getOneWeekData();
            this.outputCharts();
            this.meetingTimesChartClick();
            this.concurrentChartClick();
        },
        /* 页面显示的大小 */
        adjustShowSize: function () {
            var pmwidth = document.body.clientWidth;
            var pmheight = document.body.clientHeight;
            var heights = pmheight - 72;
            var widths = pmwidth - 130;
            if (heights < 720) {
                $(".box-left").height(950);
            } else {
                $(".box-left").height(950);
            }
            $(".box-right").width(widths);
            $(window).resize(function(){
                var pmwidth = document.body.clientWidth
                var pmheight = document.body.clientHeight
                var heights = pmheight - 72
                var widths = pmwidth - 130
                $(".box-right").width(widths)
                if (heights < 720) {
                    $(".box-left").height(950)
                } else {
                    $(".box-left").height(950)
                }
            })
        },
        /* 点击左侧导航点击事件 */
        leftNavClickEvent: function () {
            var that = this;
            var lefts = $(".box-left a")
            var a = lefts.length
            for (var i = 0; i<a; i++) {
                lefts.eq(i).click(function(){
                    if($(this).hasClass('a7')){
                        location.href='change-password.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a1')){
                        location.href='status.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a2')){
                        location.href='meeting-management.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a3')){
                        location.href='meetingroom-management.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a4')){
                        location.href='department-management.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a5')){
                        location.href='user-number.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a6')){
                        location.href='device-management.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a9')){
                        location.href='tongxunlu.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a10')){
                        location.href='video.html?name='+that.adminToken+'&id='+that.adminID;
                    }
                    else if($(this).hasClass('a8')){
                        location.href='meeting-total.html?name='+that.adminToken+'&id='+that.adminID;
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

        },
        /* 获取地址后面的参数列表 */
        GetRequest: function () {
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
        },
        /* 获取管理员的相关信息（id值和token）*/
        getAdminInfo: function () {
            var that = this;
            var Request = new Object();
            Request = this.GetRequest();
            this.adminID = Request.id;
            this.adminToken = Request.name;
        },
        meetingTimesChartClick: function () {
            var that = this;
            that.meetingUseTimes.on('click', function (params) {
                var paramsName = params.name;   // 获取横坐标
                var vmrStr = that.$meetingRoomInput.val();
                var requestData = null;
                var startTime = '';
                var endTime = '';
                if (paramsName.length <= 7) {
                    startTime = paramsName + '-01 00:00:00';
                    var currentYear = paramsName.substring(0, 4);
                    var currentMonth = paramsName.substring(5);
                    if (currentMonth == '12') {
                        // 如果当前月是12月
                        endTime = paramsName + '-31 23:59:59';
                    } else if (currentMonth < '12'){
                        // 否则的话(不是12月)
                        endTime = currentYear + '-' + (Number(currentMonth) + 1) + '-01 00:00:00';
                    }
                } else {
                    startTime = paramsName + ' 00:00:00';
                    endTime = paramsName + ' 23:59:59';
                }
                if (!vmrStr) {
                    requestData = {
                        'token': that.adminToken,
                        'startTime': startTime,
                        'endTime': endTime,
                    }
                } else {
                    requestData = {
                        'token': that.adminToken,
                        'startTime': startTime,
                        'endTime': endTime,
                        'vmrList': vmrStr.replace(/，/g, ",")
                    }
                }
                var meetingTimesUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/conferenceCount';
                $.ajax({
                    'url': decodeURI(meetingTimesUrl),
                    'dataType': 'json',
                    'data': requestData,
                    success: function (res) {
                        if (res.code === '0') {
                            that.renderMeetingTimesList(res.data.vmrDetail);
                        } else {
                            that.warnInfoTipModal(res.message);
                        }
                    },
                    error: function (error) {
                        that.warnInfoTipModal('服务器内部错误，请稍后重试');
                    }
                })
            })
        },
        /* 渲染会议次数图表 */
        renderMeetingTimesChart: function (data) {
            var that = this;
            var option = {
                color:  [
                    '#f36f6d'
                ],
                toolbox: {
                    show : true,
                    right: '30px',
                    feature : {
                        magicType : {show: true, type: ['line', 'bar']}
                    }
                },
                title: {
                    text: '会议室使用次数',
                    x: 'center'
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: '#e8f4fe',
                            width: '30px',
                            opacity: 0.8
                        }
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        data : data.map(function (item) {
                            return item.time;
                        }),
                        axisTick: {
                            alignWithLabel: true
                        },
                        boundaryGap: true,
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name": "次数",
                        "type": "bar",
                        "label": {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        "barMaxWidth": '25px',
                        "data": data.map(function (item) {
                            return item.totalCount;
                        })
                    }
                ]
            };
            that.meetingUseTimes.hideLoading();
            that.meetingUseTimes.setOption(option);
        },
        /* 根据时间点渲染出对应的会议室使用次数的列表 */
        renderMeetingTimesList: function (data) {
            var that = this;
            that.$meetingTimesTable.html('');
            var roomUseTimesTpl = '<tr>' +
                '<th>会议室</th>' +
                '<th>次数</th>' +
                '</tr>';
            if (!data.length) {
                roomUseTimesTpl = '暂无数据';
            } else {
                for (var i = 0; i < data.length; i++) {
                    roomUseTimesTpl += '<tr>' +
                        '<td>' + data[i].vmrNum + '</td>' +
                        '<td>' + data[i].vmrCount + '</td></tr>'
                }
            }
            that.$meetingTimesTable.html(roomUseTimesTpl);
        },
        concurrentChartClick: function () {
            var that = this;
            that.meetingConcurrent.on('click', function (params) {
                var paramsName = params.name;   // 获取横坐标
                var vmrStr = that.$meetingRoomInput.val();
                var requestData = null;
                var startTime = '';
                var endTime = '';
                if (paramsName.length <= 7) {
                    startTime = paramsName + '-01 00:00:00';
                    var currentYear = paramsName.substring(0, 4);
                    var currentMonth = paramsName.substring(5);
                    if (currentMonth == '12') {
                        // 如果当前月是12月
                        endTime = paramsName + '-31 23:59:59';
                    } else if (currentMonth < '12'){
                        // 否则的话(不是12月)
                        endTime = currentYear + '-' + (Number(currentMonth) + 1) + '-01 00:00:00';
                    }
                } else {
                    startTime = paramsName + ' 00:00:00';
                    endTime = paramsName + ' 23:59:59';
                }
                if (!vmrStr) {
                    requestData = {
                        'token': that.adminToken,
                        'startTime': startTime,
                        'endTime': endTime,
                    }
                } else {
                    requestData = {
                        'token': that.adminToken,
                        'startTime': startTime,
                        'endTime': endTime,
                        'vmrList': vmrStr.replace(/，/g, ",")
                    }
                }
                var concurrentUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/simultaneous';
                $.ajax({
                    'url': concurrentUrl,
                    'data': requestData,
                    success: function (res) {
                        if (res.code === '0') {
                            that.renderConcurrentList(res.data.vmrDetail);
                        } else {
                            that.warnInfoTipModal(res.message);
                        }
                    },
                    error: function (error) {
                        that.warnInfoTipModal('服务器内部错误，请稍后重试');
                    }
                })
            })
        },
        /* 渲染最高并发图表 */
        renderConcurrentChart: function (data) {
            var that = this;
            var concurrentOption = {
                color:  [
                    '#169bd5'
                ],
                toolbox: {
                    show : true,
                    right: '30px',
                    feature : {
                        magicType : {show: true, type: ['line', 'bar']}
                    }
                },
                title: {
                    text: '最高并发',
                    x: 'center'
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: '#e8f4fe',
                            width: '30px',
                            opacity: 0.8
                        }
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        boundaryGap: true,
                        data : data.map(function (item) {
                            return item.time;
                        })
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "size": ['60%', '60%'],
                        "name": "并发数",
                        "type": "bar",
                        "label": {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        "barMaxWidth": '25px',
                        "data": data.map(function (item) {
                            return item.simultaneous;
                        })
                    }
                ]
            };
            that.meetingConcurrent.hideLoading();
            that.meetingConcurrent.setOption(concurrentOption);
        },
        /* 根据时间点渲染出对应的会议室并发数的列表 */
        renderConcurrentList: function (data) {
            var that = this;
            that.$meetingConcurrentTable.html('');
            var roomConcurrentTpl = '<tr>' +
                '<th>会议室</th>' +
                '<th>并发</th>' +
                '</tr>';
            if (!data.length) {
                roomConcurrentTpl = '暂无数据';
            } else {
                for (var i = 0; i < data.length; i++) {
                    roomConcurrentTpl += '<tr>' +
                        '<td>' + data[i].vmrNum + '</td>' +
                        '<td>' + data[i].simultaneous + '</td></tr>'
                }
            }
            that.$meetingConcurrentTable.html(roomConcurrentTpl);
        },
        /* 渲染会议时长图表 */
        renderMeetingDurationChart: function (data) {
            var that = this;
            var meetingTimesOption = {
                color:  [
                    '#1d94f5', '#ffa800'
                ],
                title : {
                    text: '会议时长（小时）',
                    'x': 'center'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
                        shadowStyle: {
                            color: '#e8f4fe',
                            width: '30px',
                            opacity: 0.8
                        }
                    }
                },
                legend: {
                    data:['会议室时长','参会总时长'],
                    top: 'top',
                    left: 'left'
                },
                toolbox: {
                    show : true,
                    right: '30px',
                    feature : {
                        magicType : {show: true, type: ['line', 'bar']},
                    }
                },

                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : data.conference.map(function (item) {
                            return item.time;
                        }),
                        axisTick: {
                            alignWithLabel: true
                        },
                        boundaryGap: true,
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLabel : {
                            formatter: '{value} 小时'
                        }
                    }
                ],
                series : [
                    {
                        name:'参会总时长',
                        type:'line',
                        "label": {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        "barMaxWidth": '25px',
                        data: data.participant.map(function (item) {
                            return (Math.ceil(item.duration / 60) / 60).toFixed(1);
                        }),
                    },
                    {
                        name:'会议室时长',
                        type:'line',
                        "label": {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        "barMaxWidth": '25px',
                        data: data.conference.map(function (item) {
                            return (Math.ceil(item.duration / 60) / 60).toFixed(1);
                        }),
                    }
                ]
            };
            that.meetingTimes.hideLoading();
            that.meetingTimes.setOption(meetingTimesOption);
        },
        /* 渲染会议时长表格 */
        renderMeetingDurationTable: function (data) {
            var that = this;
            that.$dateRow.html('');
            that.$meetingUseTimeRow.html('');
            that.$participantTimeRow.html('');

            var dataRowTpl = '<td></td>';
            if (data.conference.length) {
                for (var i = 0; i < data.conference.length; i++) {
                    dataRowTpl += '<td style="width: 106px">' + data.conference[i].time + '</td>';
                }
            }
            that.$dateRow.html(dataRowTpl);
            if (that.$meetingDurationTable.width() > 1030) {
                that.$meetingDurationTable.css({
                    'width': '300%'
                });
            } else {
                that.$meetingDurationTable.css({
                    'width': ''
                });
            }

            var meetingUseTimeRowTpl = '<td>参会总时长</td>';
            if (data.participant.length) {
                for (var j = 0; j < data.participant.length; j++) {
                    meetingUseTimeRowTpl += '<td style="width: 106px">' + (Math.ceil(data.participant[j].duration / 60) / 60).toFixed(1) + '</td>';
                }
            }
            that.$meetingUseTimeRow.html(meetingUseTimeRowTpl);

            var participantTimeRowTpl = '<td>会议室时长</td>';
            if (data.conference.length) {
                for (var k = 0; k < data.conference.length; k++) {
                    participantTimeRowTpl += '<td style="width: 106px">' + (Math.ceil(data.conference[k].duration / 60) / 60).toFixed(1) + '</td>';
                }
            }
            that.$participantTimeRow.html(participantTimeRowTpl);
        },
        /* 激活时间插件 */
        activationTimePlugIn: function () {
            var that = this;
            that.$calendarStart.datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true
            });
            that.$calendarEnd.datepicker({
                showOtherMonths: true,
                selectOtherMonths: true,
                changeMonth: true,
                changeYear: true
            });
        },
        /* 获取近一年的数据 */
        getOneYearData: function () {
            var that = this;
            that.$nearlyYear.off('click').on('click', function (event) {
                that.meetingUseTimes.showLoading();
                that.meetingTimes.showLoading();
                that.meetingConcurrent.showLoading();
                var $selectedBtn = $(event.target);
                $selectedBtn.addClass('selected').siblings().removeClass('selected');
                that.$meetingDurationTable.css('width', '');
                var nowDate = new Date();
                // 先把时间字符串转换称日期格式
                var prevYear = nowDate.getFullYear() - 1 + '';
                var nowYear = nowDate.getFullYear() + '';
                var month = (nowDate.getMonth() + 1) + '';
                var date = nowDate.getDate() + '';

                // 格式化每个日期节点的个数
                if (month.length === 1) month = '0' + month;
                if (date.length === 1) date = '0' + date;

                // 开始时间、结束时间（前一年的时间作为开始时间，现在的时间作为结束时间）
                var preOneYear = prevYear + '-' + month + '-' + date;
                nowDate = nowYear + '-' + month + '-' + date;

                that.$calendarStart.val(preOneYear);
                that.$calendarEnd.val(nowDate);

                // 会议室
                var $meetingRoomStr = $.trim(that.$meetingRoomInput.val());
                that.getCountData(preOneYear, nowDate, $meetingRoomStr);
            })
        },
        /* 获取近一月的数据 */
        getOneMonthData: function () {
            var that = this;
            that.$nearlyMonth.off('click').on('click', function (event) {
                that.meetingUseTimes.showLoading();
                that.meetingTimes.showLoading();
                that.meetingConcurrent.showLoading();
                var $selectedBtn = $(event.target);
                $selectedBtn.addClass('selected').siblings().removeClass('selected');
                that.$meetingDurationTable.css('width', '300%');
                var nowDate = new Date();
                // 先把时间字符串转换称日期格式
                // 如果是某年的一月份 则前一个月为上一年的12月
                var nowYear = nowDate.getFullYear();
                var preMonth = nowDate.getMonth();
                if(!preMonth) {
                    preMonth = 12 + '';
                    nowYear = (nowYear - 1) + '';
                } else {
                    preMonth = preMonth + '';
                    nowYear = nowYear + '';
                }
                var nowMonth = (nowDate.getMonth() + 1) + '';
                var date = nowDate.getDate() + '';

                // 格式化每个日期节点的个数
                if (preMonth.length === 1) preMonth = '0' + preMonth;
                if (nowMonth.length === 1) nowMonth = '0' + nowMonth;
                if (date.length === 1) date = '0' + date;

                // 开始时间、结束时间（前一月的时间作为开始时间，现在的时间作为结束时间）
                var preOneMonth = nowYear + '-' + preMonth + '-' + date;
                nowDate = nowYear + '-' + nowMonth + '-' + date;

                that.$calendarStart.val(preOneMonth);
                that.$calendarEnd.val(nowDate);

                // 会议室
                var $meetingRoomStr = $.trim(that.$meetingRoomInput.val());
                that.getCountData(preOneMonth, nowDate, $meetingRoomStr);
            })
        },
        /* 获取近一周点击事件*/
        clickOfNearlyWeek: function () {
            var that = this;
            that.$nearlyWeek.off('click').on('click', function (event) {
                var $selectedBtn = $(event.target);
                $selectedBtn.addClass('selected').siblings().removeClass('selected');
                that.$meetingDurationTable.css('width', '');
                that.getOneWeekData();
            })
        },
        /* 获取近一周的数据 */
        getOneWeekData: function () {
            var that = this;
            that.meetingUseTimes.showLoading();
            that.meetingTimes.showLoading();
            that.meetingConcurrent.showLoading();
            var preWeekTimeStamp = new Date().getTime();
            var preWeekOfDate = new Date(preWeekTimeStamp - 7 * 24 * 3600 * 1000);
            var nowDate = new Date();
            // 先把时间字符串转换称日期格式
            var preWeekOfYear = preWeekOfDate.getFullYear() + '';
            var nowYear = nowDate.getFullYear() + '';

            var preWeekOfMonth = (preWeekOfDate.getMonth() + 1) + '';
            var nowMonth = (nowDate.getMonth() + 1) + '';

            var preWeekOfDay = preWeekOfDate.getDate() + '';
            var date = nowDate.getDate() + '';

            // 格式化每个日期节点的个数
            if (preWeekOfMonth.length === 1) preWeekOfMonth = '0' + preWeekOfMonth;
            if (nowMonth.length === 1) nowMonth = '0' + nowMonth;

            if (preWeekOfDay.length === 1) preWeekOfDay = '0' + preWeekOfDay;
            if (date.length === 1) date = '0' + date;

            // 开始时间、结束时间（前一周的时间作为开始时间，现在的时间作为结束时间）
            var preOneWeek = preWeekOfYear + '-' + preWeekOfMonth + '-' + preWeekOfDay ;
            nowDate = nowYear + '-' + nowMonth + '-' + date;

            that.$calendarStart.val(preOneWeek);
            that.$calendarEnd.val(nowDate);
            // 会议室
            var $meetingRoomStr = $.trim(that.$meetingRoomInput.val());
            that.getCountData(preOneWeek, nowDate, $meetingRoomStr);
        },
        /* 获取统计的数据*/
        getCountData: function (startTime, endTime, vmrStr) {
            var that = this;
            var requestData = null;
            if (!vmrStr) {
                requestData = {
                    'token': that.adminToken,
                    'startTime': startTime + ' 00:00:00',
                    'endTime': endTime + ' 00:00:00',
                }
            } else {
                requestData = {
                    'token': that.adminToken,
                    'startTime': startTime + ' 00:00:00',
                    'endTime': endTime + ' 00:00:00',
                    'vmrList': vmrStr.replace(/，/g, ",")
                }
            }
            var meetingTimesUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/conferenceCount';
            $.ajax({
                'url': decodeURI(meetingTimesUrl),
                'dataType': 'json',
                'data': requestData,
                success: function (res) {
                    if (res.code === '0') {
                        that.renderMeetingTimesChart(res.data.timeline);
                        that.renderMeetingTimesList(res.data.vmrDetail);
                    } else {
                        that.warnInfoTipModal(res.message);
                        that.$meetingUseTimeContainer.text('暂无数据');
                    }
                },
                error: function (error) {
                    that.warnInfoTipModal('获取会议次数失败，请稍后重试');
                    that.$meetingUseTimeContainer.text('暂无数据');
                }
            })
            var concurrentUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/simultaneous';
            $.ajax({
                'url': concurrentUrl,
                'data': requestData,
                success: function (res) {
                    if (res.code === '0') {
                        that.renderConcurrentChart(res.data.timeline);
                        that.renderConcurrentList(res.data.vmrDetail);
                    } else {
                        that.warnInfoTipModal(res.message);
                        that.$meetingConcurrentContainer.text('暂无数据');
                    }
                },
                error: function (error) {
                    that.warnInfoTipModal('获取最高并发数失败，请稍后重试');
                    that.$meetingConcurrentContainer.text('暂无数据');
                }
            })
            var meetingDurationUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/duration';
            $.ajax({
                'url': meetingDurationUrl,
                'data': requestData,
                success: function (res) {
                    if (res.code === '0') {
                        that.renderMeetingDurationChart(res.data);
                        that.renderMeetingDurationTable(res.data);
                    } else {
                        that.warnInfoTipModal(res.message);
                        that.$meetingTimesContainer.text('暂无数据');
                    }
                },
                error: function (error) {
                    that.warnInfoTipModal('获取会议时长失败，请稍后重试');
                    that.$meetingTimesContainer.text('暂无数据');
                }
            })
        },
        /* 执行搜索操作 */
        searchCountData: function () {
            var that = this;
            that.$searchButton.off('click').on('click', function (event) {
                var startTime = $.trim(that.$calendarStart.val());
                var endTime = $.trim(that.$calendarEnd.val());
                var meetingRoomStr = $.trim(that.$meetingRoomInput.val());
                var timeReg = /^(\d{4})\-(\d{2})\-(\d{2})$/;
                if (!startTime) {
                    that.warnInfoTipModal('请选择开始时间');
                    return ;
                }
                if (!endTime) {
                    that.warnInfoTipModal('请选择结束时间');
                    return ;
                }
                // 判断选择的日期是否合法（如果是选择的话不存在合法的问题，但是如果用户是手动填写的话，就有可能）
                if (!timeReg.test(startTime) || !timeReg.test(endTime)) {
                    that.warnInfoTipModal('请选择合法的日期');
                    return ;
                }
                // 判断搜索的多个会议室之前是否用英文逗号隔开（如果是中文的话，会搜索不到对应的数据）
                if (meetingRoomStr && meetingRoomStr.indexOf('，') != -1) {
                    meetingRoomStr.replace(/，/g, ",");
                }
                if (startTime >= endTime) {
                    that.warnInfoTipModal('开始时间不能大于或等于结束时间');
                    return ;
                }
                that.meetingUseTimes.showLoading();
                that.meetingTimes.showLoading();
                that.meetingConcurrent.showLoading();
                that.getCountData(startTime + ' 00:00:00', endTime + ' 00:00:00', meetingRoomStr);
                // that.successInfoTipModal('操作成功');
            })
        },
        /* 封装一个用于警告消息提示的模态框 */
        warnInfoTipModal: function (msg) {
            var $warnModal = $('#J-warn-modal');
            $('#J-warn-tip-text').text(msg);
            $warnModal.fadeIn(1000);
            setTimeout(function () {
                $warnModal.fadeOut(1000)
            }, 1500);
        },
        /* 封装一个用于成功消息提示的模态框 */
        successInfoTipModal: function (msg) {
            var $successModal = $('#J-success-modal');
            $('#J-success-tip-text').text(msg);
            $successModal.fadeIn(1000);
            setTimeout(function () {
                $successModal.fadeOut(1000)
            }, 1500);
        },
        /* 获取导出报表所需要的参数 */
        outputCharts: function () {
            var that = this;
            that.$outputChartsBtn.off('click').on('click', function () {
                var startTime = $.trim(that.$calendarStart.val());
                var endTime = $.trim(that.$calendarEnd.val());
                var timeReg = /^(\d{4})\-(\d{2})\-(\d{2})$/;
                var meetingRoomStr = $.trim(that.$meetingRoomInput.val());
                if (!startTime) {
                    that.warnInfoTipModal('请选择开始时间');
                    return ;
                }
                if (!endTime) {
                    that.warnInfoTipModal('请选择结束时间');
                    return ;
                }
                // 判断选择的日期是否合法（如果是选择的话不存在合法的问题，但是如果用户是手动填写的话，就有可能）
                if (!timeReg.test(startTime) || !timeReg.test(endTime)) {
                    that.warnInfoTipModal('请选择合法的日期');
                    return ;
                }
                if (startTime >= endTime) {
                    that.warnInfoTipModal('开始时间不能大于或等于结束时间');
                    return ;
                }
                that.outputChartsService(startTime, endTime, meetingRoomStr);
            })
        },
        /* 导出报表*/
        outputChartsService: function (startTime, endTime, meetingRoomStr) {
            var that = this;
            var newWindow = window.open();
            var outputDataUrl = that.url+'cloudpServer/v1/stats/org/'+that.adminID+'/exportConferenceData';
            var requestData = null;
            if (!meetingRoomStr) {
                requestData = {
                    'token': that.adminToken,
                    'startTime': startTime + ' 00:00:00',
                    'endTime': endTime + ' 00:00:00',
                }
            } else {
                requestData = {
                    'token': that.adminToken,
                    'startTime': startTime + ' 00:00:00',
                    'endTime': endTime + ' 00:00:00',
                    'vmrList': meetingRoomStr.replace(/，/g, ",")
                }
            }
            $.ajax({
                'url': outputDataUrl,
                'data': requestData,
                success: function (res) {
                    if (res.code === '0') {
                        newWindow.location.href = that.url + res.data.url;
                    }
                },
                error: function (error) {
                    that.warnInfoTipModal('导出报表失败，请稍后重试');
                }
            })
        }
    };
    useCount.init();
})()

