$(document).ready(function() {

	//top 隐藏菜单
	$('#supuy_app,#supuy_service,#supuy_user,#supuy_life,#supuy_oversea').hover(function() {
		var hover_id = this.id.split('_')[1];
		$(this).find('.top_nav_menu').addClass('top_nav_hover');
		$('#' + hover_id + '_con').show();
	}, function() {
		var hover_id = this.id.split('_')[1];
		$(this).find('.top_nav_menu').removeClass('top_nav_hover');
		$('#' + hover_id + '_con').hide();
	});


	//小购物车 隐藏菜单
	$('.cart_box_small').hover(function() {
		$('.cart_list').stop(true, true).slideDown(100);
	}, function() {
		$('.cart_list').stop(true, true).slideUp(100);
	});

    //主分类列表hover
    $(".cateMenu li").hover(function(){
        $(this).find(".cate-tag a").css("color","#e5004a");
        $(this).find(".icon_1").css("background-position","-35px -152px");
        $(this).find(".icon_2").css("background-position","-35px -180px");
        $(this).find(".icon_3").css("background-position","-35px -210px");
        $(this).find(".icon_4").css("background-position","-35px -237px");
        $(this).find(".icon_5").css("background-position","-35px -267px");
        $(this).find(".icon_6").css("background-position","-35px -296px");
        $(this).find(".icon_7").css("background-position","-35px -328px");
        $(this).find(".icon_8").css("background-position","-35px -356px");
        $(this).find(".icon_9").css("background-position","-35px -385px");
        $(this).find(".icon_10").css("background-position","-35px -418px");
    },function(){
        $(this).find(".cate-tag a").css("color","#ffffff");
        $(this).find(".icon_1").css("background-position","0 -152px");
        $(this).find(".icon_2").css("background-position","0 -180px");
        $(this).find(".icon_3").css("background-position","0 -210px");
        $(this).find(".icon_4").css("background-position","0 -237px");
        $(this).find(".icon_5").css("background-position","0 -267px");
        $(this).find(".icon_6").css("background-position","0 -296px");
        $(this).find(".icon_7").css("background-position","0 -328px");
        $(this).find(".icon_8").css("background-position","0 -356px");
        $(this).find(".icon_9").css("background-position","0 -385px");
        $(this).find(".icon_10").css("background-position","0 -418px");
    });
	//head 弹出菜单部分

	var cateMenu = function() {
		var cateLiNum = $(".cateMenu li").length;
		$(".cateMenu li").each(function(index, element) {
			if (index < cateLiNum) {
				$(this).mouseenter(function() {
					var sub = $(this).find(".list-item");
					$(this).find(".cate-tag").addClass("on");
					sub.stop().show();
				});
				$(this).mouseleave(function() {

					$(this).find('.cate-tag').removeClass("on");
					$(this).find(".list-item").hide();
				});
			}
		});

		$('.navCon_on').bind({
			mouseenter: function() {
				$('.cateMenu').stop().show();
			},
			mouseleave: function() {
				$('.cateMenu').stop().hide();
			}
		});
		if ($('.main').hasClass('home')) {
			$('.cateMenu').removeClass('hide');
			$('.navCon_on').unbind('mouseenter').unbind('mouseleave');
		};

	}();
    //购物车编辑框显示
    $(".cart_edit").click(function(){
        $(this).parent().parent().parent().find(".good_edit_open").toggle();
    });
    //领券框
    $(".btn_get_coupon").click(function(){
        $(this).parent().find(".lingquan_content").toggle();
    });
    //选择地址
    $("#address_box li").click(function(){
        $(this).siblings().removeClass("address_active");
        $(this).addClass("address_active");
    });

    //设置右侧导航栏高度
    $(".nav_right").css("height",($(window).height()));
    $(window).resize(function(){
        $(".nav_right").css("height",($(window).height()));
    });
    $(".nav_right ul li").hover(function(){
        $(this).find("span").css("left",-$(this).find("span").width());
    },function(){
        $(this).find("span").css("left","60px");
    });
    //返回顶部平滑滚动
    $('.scroll_top').click(function(){$('html,body').animate({scrollTop: '0px'}, 700);});

    //倒计时
    $(".deadline_time").each(function(i){
        var objid=$(this).attr("id");
        var endtime=$(this).attr("end");
        countDown(endtime,"#"+objid);
    });

    //今日特价切换
    $(".effect-li").click(function(){
        var myDate = new Date();
        $(".clicktime").hide();
        var cnow=$(this).attr("point");
        var now=myDate.getHours();
        var status=$(this).find(".time_tip").text();
        if(cnow < now && status.indexOf("疯抢中")==-1){
            status="已结束";
        }
        $(this).find(".clicktime").html(status);
        $(this).find(".clicktime").show();
        $.ajax({
            type: "POST",
            url: "/Index/getTodaySale/",
            data: "type=ajax&cnow="+cnow,
            success: function(msg){
                $(".bottom_rec_goodpos ul").html(msg);
            }
        });
    });
    //明日特价
    $(".tomorrow").click(function(){
        $.ajax({
            type: "POST",
            url: "/Index/getTodaySale/",
            data: "type=ajax&cnow="+cnow,
            success: function(msg){
                $(".bottom_rec_goodpos ul").html(msg);
            }
        });
    });

    //搜索框验证
    $("#search_btn").click(function(){
        var seach=$("#search_text").val();
        if(seach ==''){
            return false;
        }else{
            return true;
        }
    });
});


    //倒计时
    function countDown(time,id){
        var day_elem = $(id).find('.day');
        var hour_elem = $(id).find('.hour');
        var minute_elem = $(id).find('.minute');
        var second_elem = $(id).find('.second');
        var end_time = new Date(time).getTime(),    //月份是实际月份-1
            sys_second = (end_time-new Date().getTime())/1000;
        var timer = setInterval(function(){
            if (sys_second > 1) {
                sys_second -= 1;
                var day = Math.floor((sys_second / 3600) / 24);
                var hour = Math.floor((sys_second / 3600) % 24);
                var minute = Math.floor((sys_second / 60) % 60);
                var second = Math.floor(sys_second % 60);
                day_elem && $(day_elem).text(day);//计算天
                $(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
                $(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
                $(second_elem).text(second<10?"0"+second:second);//计算秒杀
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

