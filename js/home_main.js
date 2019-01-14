$(document).ready(function() {
    //侧边栏
    (function($) {
        $(window).scroll(function() {
            var scroll_len = $(window).scrollTop();
            if (scroll_len > 10) {
                $('.side_bar').fadeIn();
            } else {
                $('.side_bar').fadeOut();
            };
        });
    })(jQuery);

    //百度统计代码
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?411f0c19f484b8e6b3e5394af6426ef4";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();

    //主页楼层选项卡
    (function() {
        $('.home-tabtitle-list li a').mouseenter(function(e) {
            e.preventDefault();
            var liindex = $('.home-tabtitle-list li a').index(this);
            var liwidth = $('.home-tabtitle-list li').width();
            $(this).addClass('on').parent().siblings().find('a').removeClass('on');
            $('.home-tabtitle-list p').stop(false, true).animate({
                left: liwidth * liindex
            }, 300);
            $('.home_tabbox').eq(liindex).fadeIn(150).siblings('.home_tabbox').hide();
        });

    })();

    $(".notice small").click(function () {
        $(this).parent().hide();
    });

    //通用选项卡  跨境选项卡

    function func_tabs(e) {
        var ee = "." + e;
        var number = 0; //默认显示第几个选项卡
        var className = "current"; //当前状态类名
        $(ee).each(function() {
            /*默认状态*/
            $(this).find(".tabsTitle li").eq(number).addClass(className);
            $(this).find(".tabsTitle2 li").eq(number).addClass(className);
            $(this).find(".tabsContent").eq(number).show();
            /*切换状态*/
            $(this).find(".tabsTitle li").click(function() {
                $(this).parent().find("li").removeClass(className);
                $(this).addClass(className);
                $(this).parent().parent().find(".tabsContent").hide();
                $(this).parent().parent().find(".tabsContent").eq($(this).find("i").text()).show();
                $("#tab_child").find(".tabsContent").eq(0).show();
//                alert('bbb');
                fun_slide("collection_box");
                return false;
            })

            $(this).find(".tabsTitle2 li").click(function() {
                $(this).parent().find("li").removeClass(className);
                $(this).addClass(className);
                $(this).parent().parent().find(".tabsContent").hide();
                $(this).parent().parent().find(".tabsContent").eq($(this).find("i").text()).show();
//                fun_slide("collection_box");
            })
        })
    }
    func_tabs("tabs");

    //写入高度
    function fun_setdata() {
        var $more_libox = $('.choose_morelibox');
        $more_libox.show();
        var $tagbox = $('.choose_tagbox');
        $tagbox.each(function(index) {
            var li_h = $tagbox.eq(index).height();
            $tagbox.eq(index).data("lih", li_h);

        });
        $more_libox.hide();
    }

    //判断是否与选项卡组合，是-不执行，否-执行
    if ($('.selected_libox').length == 1) {
        fun_setdata();
    }

    //商品筛选
    (function() {
        var $more_libox = $('.choose_morelibox');
        var labelnum = $more_libox.find('.choose_libox').length;
        var $morelabel = $('.choose_morelabel');
        var $tagbox = $('.choose_tagbox');
        var $li_box = $('.choose_libox');
        var $moretag = $('.choose_moretag');
        //判定
        $li_box.each(function(index) {

            var li_h = $tagbox.eq(index).height();
            var tagnum = $tagbox.eq(index).find('a').length;
            if (li_h > 90 && tagnum > 0) {
                $moretag.eq(index).show();
                $tagbox.eq(index).css("height", "90px");
            } else {
                $moretag.eq(index).hide();
            }
            //moretag点击
            $moretag.eq(index).toggle(
                function() {
                    $tagbox.eq(index).animate({
                            height: li_h
                        },
                        200);
                    $moretag.eq(index).addClass('fold').find('span').text("收起");
                },
                function() {
                    $tagbox.eq(index).animate({
                            height: "90px"
                        },
                        200);
                    $moretag.eq(index).removeClass('fold').find('span').text("更多");
                });

        });

        //morelabel点击
        if (labelnum > 0) {
            $morelabel.show();
            $morelabel.toggle(function() {
                $more_libox.show();
                $morelabel.addClass('fold').find('span').text("收起选项");
            }, function() {
                $more_libox.hide();
                $morelabel.removeClass('fold').find('span').text("更多选项");
            })
        } else {
            $morelabel.hide();
        };

    })();

        //商品列表hover
        (function() {
            $('.list_pergood.fl').hover(
                function() {
                    $(this).css({
                        border: "3px solid #e5004b"
                    });
                    $(this).find('.list_good_addcart').addClass('added');
                },
                function() {
                    $(this).css({
                        border: "3px solid #FFF"
                    });
                    $(this).find('.list_good_addcart').removeClass('added');
                });
        })();





        //我的收藏
        (function() {
            function fun_slide(o) {
                var oo = "#" + o;
                var page = 1;
                var i = 6;
                var $Outerbox = $(oo).find('.bottom_rec_goodul');
                var $Innerbox = $(oo).find('.bottom_rec_goodpos');
                var $pre = $(oo).find('.bottom_rec_pre');
                var $next = $(oo).find('.bottom_rec_next');
                var $autoFun;

                var width = $Outerbox.outerWidth();
                var len = $Innerbox.find('li').length;
                var page_count = Math.ceil(len / i);

                //		//auto 自动滚动
                //		autoSlide();

                //next
                $next.click(function() {
                    width= 1140;
                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == page_count) {
                            $Innerbox.animate({
                                left: '0px'
                            }, "slow");
                            page = 1;
                        } else {
                            $Innerbox.animate({
                                left: present_left - width
                            }, "slow");

                            page++;
                        }
                    }
                });
                //pre
                $pre.click(function() {
                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == 1) {
                            $Innerbox.animate({
                                left: -width * (page_count - 1)
                            }, "slow");
                            page = page_count;
                        } else {
                            $Innerbox.animate({
                                left: present_left + width
                            }, "slow")
                            page--;
                        }
                    }
                });

                //		//停止滚动
                //		clearFun($Innerbox);
                //		clearFun($pre);
                //		clearFun($next);
                //
                //		//事件划入时停止自动滚动
                //		function clearFun(elem) {
                //			elem.hover(function() {
                //				clearAuto();
                //			}, function() {
                //				autoSlide();
                //			});
                //		};
                //
                //		//自动滚动
                //		function autoSlide() {
                //			$next.trigger('click');
                //			$autoFun = setTimeout(autoSlide, 8000); //此处不可使用setInterval,setInterval是重复执行传入函数,这会引起第二次划入时停止失效
                //		};
                //
                //		//清除自动滚动
                //		function clearAuto() {
                //			clearTimeout($autoFun);
                //		};
            }
            fun_slide("collection_box");
        })();
    //商品推荐
    (function() {
        function fun_slide(o) {
            var oo = "#" + o;
            var page = 1;
            var i = 6;
            var $Outerbox = $(oo).find('.bottom_rec_goodul');
            var $Innerbox = $(oo).find('.bottom_rec_goodpos');
            var $pre = $(oo).find('.bottom_rec_pre');
            var $next = $(oo).find('.bottom_rec_next');
            var $autoFun;

            var width = $Outerbox.outerWidth();
            var len = $Innerbox.find('li').length;
            var page_count = Math.ceil(len / i);
//                alert('aa'+width);

            //		//auto 自动滚动
            //		autoSlide();

            //next
            $next.click(function() {
                var present_left = $Innerbox.position().left;
                if (!$Innerbox.is(':animated')) {
                    if (page == page_count) {
                        $Innerbox.animate({
                            left: '0px'
                        }, "slow");
                        page = 1;
                    } else {
                        $Innerbox.animate({
                            left: present_left - width
                        }, "slow");

                        page++;
                    }
                }
            });
            //pre
            $pre.click(function() {
                var present_left = $Innerbox.position().left;
                if (!$Innerbox.is(':animated')) {
                    if (page == 1) {
                        $Innerbox.animate({
                            left: -width * (page_count - 1)
                        }, "slow");
                        page = page_count;
                    } else {
                        $Innerbox.animate({
                            left: present_left + width
                        }, "slow")
                        page--;
                    }
                }
            });

            //		//停止滚动
            //		clearFun($Innerbox);
            //		clearFun($pre);
            //		clearFun($next);
            //
            //		//事件划入时停止自动滚动
            //		function clearFun(elem) {
            //			elem.hover(function() {
            //				clearAuto();
            //			}, function() {
            //				autoSlide();
            //			});
            //		};
            //
            //		//自动滚动
            //		function autoSlide() {
            //			$next.trigger('click');
            //			$autoFun = setTimeout(autoSlide, 8000); //此处不可使用setInterval,setInterval是重复执行传入函数,这会引起第二次划入时停止失效
            //		};
            //
            //		//清除自动滚动
            //		function clearAuto() {
            //			clearTimeout($autoFun);
            //		};
        }
        fun_slide("rec_box");
        fun_slide("guess_box");
        fun_slide("guess_box2");
        fun_slide("lastsee_box");
        fun_slide("coudan_box");
        fun_slide("refund_box");
    })();
        //商品列表-猜你喜欢
        (function() {
            function fun_slide(o) {
                var oo = "#" + o;
                var page = 1;
                var i = 5;
                var $Outerbox = $(oo).find('.bottom_rec_goodullk');
                var $Innerbox = $(oo).find('.bottom_rec_goodposlk');
                var $pre = $(oo).find('.bottom_rec_pre');
                var $next = $(oo).find('.bottom_rec_next');
                var $autoFun;

                var width = $Outerbox.outerWidth();
                var len = $Innerbox.find('li').length;
                var page_count = Math.ceil(len / i);
                //next
                $next.click(function() {

                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == page_count) {
                            $Innerbox.animate({
                                left: '0px'
                            }, "slow");
                            page = 1;
                        } else {
                            $Innerbox.animate({
                                left: present_left - width
                            }, "slow")
                            page++;
                        }
                    }
                });
                //pre
                $pre.click(function() {
                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == 1) {
                            $Innerbox.animate({
                                left: -width * (page_count - 1)
                            }, "slow");
                            page = page_count;
                        } else {
                            $Innerbox.animate({
                                left: present_left + width
                            }, "slow")
                            page--;
                        }
                    }
                });
            }
            fun_slide("details_like");
        })();

        //选择收货地址
        (function() {
            function fun_slide(o) {
                var oo = "#" + o;
                var page = 1;
                var i = 3;
                var $Outerbox = $(oo).find('.bottom_rec_goodul');
                var $Innerbox = $(oo).find('.bottom_rec_goodpos');
                var $pre = $(oo).find('.bottom_rec_pre');
                var $next = $(oo).find('.bottom_rec_next');
                var $autoFun;

                var width = $Outerbox.outerWidth();
                var len = $Innerbox.find('li').length;
                var page_count = Math.ceil(len / i);

                //		//auto 自动滚动
                //		autoSlide();

                //next
                $next.click(function() {

                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == page_count) {
                            $Innerbox.animate({
                                left: '0px'
                            }, "slow");
                            page = 1;
                        } else {
                            $Innerbox.animate({
                                left: present_left - width
                            }, "slow")
                            page++;
                        }
                    }
                });
                //pre
                $pre.click(function() {
                    var present_left = $Innerbox.position().left;
                    if (!$Innerbox.is(':animated')) {
                        if (page == 1) {
                            $Innerbox.animate({
                                left: -width * (page_count - 1)
                            }, "slow");
                            page = page_count;
                        } else {
                            $Innerbox.animate({
                                left: present_left + width
                            }, "slow")
                            page--;
                        }
                    }
                });

                //		//停止滚动
                //		clearFun($Innerbox);
                //		clearFun($pre);
                //		clearFun($next);
                //
                //		//事件划入时停止自动滚动
                //		function clearFun(elem) {
                //			elem.hover(function() {
                //				clearAuto();
                //			}, function() {
                //				autoSlide();
                //			});
                //		};
                //
                //		//自动滚动
                //		function autoSlide() {
                //			$next.trigger('click');
                //			$autoFun = setTimeout(autoSlide, 8000); //此处不可使用setInterval,setInterval是重复执行传入函数,这会引起第二次划入时停止失效
                //		};
                //
                //		//清除自动滚动
                //		function clearAuto() {
                //			clearTimeout($autoFun);
                //		};
            }
            fun_slide("address_box")
        })();

        //评价弹窗
        $('.good_d_combtn').click(function(addcart) {
            addcart.preventDefault();
            $('#fade,.fade_center_box').show();
        });
        $('.fade_shopbtn,.close_win').click(function(fade_shopbtn) {
            fade_shopbtn.preventDefault();
            $('#fade,.fade_center_box').hide();
        });

        //商品详情选项卡-滚动显示
        function fun_gdtab() {
            var $tabT = $('#gdtab .tabsTitle');
            var $tabCon = $('#gdtab .tabsContent');
            if ($tabT.length > 0) {
                var TY = $tabT.position().top;
                var TX = $tabT.position().left;
            } else {
                return false;
            }

            $(window).scroll(function() {
                var isScroll = $(this).scrollTop() >= TY;
                if (isScroll) {
                    $tabCon.css('padding-top', '39px');
                    $tabT.addClass('scroll');

                } else {
                    $tabT.removeClass('scroll');
                    $tabCon.css('padding-top', '0px');
                }
            });

            $tabT.find('li').click(function() {
                if ($(window).scrollTop() >= TY) {
                    $('html,body').animate({
                        scrollTop: TY
                    });
                }
            });

        }
        fun_gdtab();

    });

//添加推荐购买到购物车
function add_tj_cart(obj)
{
    var goodsList =new Array();
    var i=0;
    $(obj).parents('#tj_goods').find('.good_act_checkbox').each(function(){
        if ($(this).is(':checked')){
            goodsList[i]=$(this).val();
            i++;
        }
    });
    $.ajax({
        type:'POST',
        url:'/Cart/AddGoodsToCart',
        data:'add_tj=tj&goodsTj='+goodsList,
        success:function(msg){
            if(msg=="error"){
                alert("加入购物车失败，请稍后重试！");
                return;
            }else{
                $(".cart_no").html(msg);
            }
        }
    });
}
//添加套装到购物车
function add_act_cart(obj)
{
    var goodsList =new Array();
    var tcid=$(obj).parents('.good_d_goodgrp').find("#tcId").val();
    var salesPromotion=$(obj).parents('.good_d_goodgrp').find("#salesPromotion").val();
    var i=0;
    $(obj).parents('.good_d_goodgrp').find('.good_act_hidden').each(function(){
        goodsList[i]=$(this).val();
        i++;
    });
    $.ajax({
        type:'POST',
        url:'/Cart/AddGoodsToCart',
        data:'add_tc=tc&goodsTc='+goodsList+'&tcId='+tcid+'&salesPromotion='+salesPromotion,
        success:function(msg){
            if(msg=="error"){
                alert("加入购物车失败，请稍后重试！");
                return;
            }else{
                $(".cart_no").html(msg);
            }
        }
    });
}

//商品详情添加套装到购物车
function add_act_carts(obj)
{
    var self=$(obj).parents('#tab_content').find("#self_goods").val()
    var goodsList =new Array();
    var t_type=$(obj).attr('t_type');
    var tcid=$(obj).parents('#tab_content').find("#tcId").val();
    var salesPromotion=$(obj).parents('#tab_content').find("#salesPromotion").val();
    var i=0;
    $(obj).parents('#tab_content').find('.good_act_hidden').each(function() {
        if($(this).attr('tc_type') == t_type) {
            goodsList[i] = $(this).val();
            i++;
        }
    });
    goodsList.splice(0,0,self);
    //goodsList.push(self);
    $.ajax({
        type:'POST',
        url:'/Cart/AddGoodsToCart',
        data:'add_tc=tc&goodsTc='+goodsList+'&tcId='+tcid+'&salesPromotion='+salesPromotion,
        success:function(msg){
            if(msg=="error"){
                alert("加入购物车失败，请稍后重试！");
                return;
            }else{
                $(".cart_no").html(msg);
            }
        }
    });
}