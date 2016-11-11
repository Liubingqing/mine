/**
 * Created by Administrator on 2016/10/17 0017.
 */
function quitLogin() {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            if (data.resultCode == '0000') {
                /* $('#header_nav a').eq(0).html('登录').attr('href', 'http://127.168.0.175/yiju/login.html');
                 $('#header_nav a').eq(1).html('注册').attr('href', 'http://127.168.0.175/yiju/register.html').removeAttr('onclick')
                 */

                location.href = 'http://127.168.0.175/yiju/index.html'
            }}
    })
}

$.ajax({
    type: 'post',
    dataType: 'jsonp',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    success: function (data) {
        if (data.success) {

            $('#header_nav a').eq(0).html('退出').attr({
                'onclick':'quitLogin()',
                'href':'###'
            });

            $('#header_nav a').eq(1).html(data.data[0].lname);

        }


        }
    }
)


$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType: 'jsonp',
    success: function (data) {
        var item='';
        if (data.success){

            for (var i=0 ;i<data.data.length;i++) {
                item +='<li id="'+data.data[i].id+'">'+
                    '<img class="house" src="http://www.zhijunxing.com/yiju/upload/' +data.data[i].photo.split(',')[0]+'" style="width: 250px;height: 180px;"'+
                    '<div class="discription"><span class="span1">'+data.data[i].tittle+'  '+data.data[i].room+' '+data.data[i].type+'</span>'+
                    '<img class="icon" src="jingji.png" alt=""><img class="icon" src="honest.png" alt="">'+
                    '<p class="p1">'+data.data[i].room+'|'+data.data[i].rentway+'|'+data.data[i].hlevel+'|'+data.data[i].floor+'/'+data.data[i].countfloor+'层</p><img src="map.png"><span class="span2">'+data.data[i].address+'</span> <p class="p2">'+
                    '<span class="span3">精装修</span><span class="span4">地铁口</span></p></div>'+
                    '<div class="price"><p><span class="span_price">'+data.data[i].price+'</span><span class="month">/月</span></p>'+
                    '<span class="date">'+data.data[i].addtime+'</span></div></li>'
            }
            $('#list').html(item);

           /* $('#list li').click(function(){
                $.ajax({
                    type: 'get',
                    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
                    dataType: 'jsonp',
                    data: {
                        id: this.id
                    },
                    success: function (data) {
                        if (data.success){

                        }
                }});

            })*/


        }
    }
    }
)







function Collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo
        },
        success: function (data) {


            console.log(data);
            if (data.success) {
                var a;
                if (Math.ceil(data.rowCount / 7) <= 5) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 7); i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo <= 3) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b> ··· </b><a href="###">' + Math.ceil(data.rowCount / 7) + '</a><a href="###">下一页</a>';

                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 7)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 7) - i == pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 7) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 7) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo + 2 < Math.ceil(data.rowCount / 7)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 7) + '</a>' +
                        '<a href="###">下一页</a>';
                }

                $('.page-box').html(a);
            }
        }
    })
}

var obj = {};

$('#condition ul').children().click(function(){

    $(this).siblings().children().css('color','#666666');
    $(this).children().css('color','#5b8239');


    if($(this).parent().attr('id')=='price'){
        obj[$(this).parent().attr('id')] = $(this).children().eq(0).attr('price');
        condition();
    }else
    if($(this).parent().attr('id')=='region'){
        condition();
    }else
    if($(this).parent().attr('id')=='shi'){
        obj[$(this).parent().attr('id')] = $(this).children().eq(0).attr('count');
        condition();
    }else{
        obj[$(this).parent().attr('id')] = $(this).children().eq(0).html();
        condition();
    }

})


/*$('p select').eq(0).change(function(){

})*/


$('p select').eq(0).change(function(){
    obj.room = $("p select").eq(0).find("option:selected").text();
    condition();
})



$('p select').eq(1).change(function(){
    obj.level = $("p select").eq(1).find("option:selected").text();
    condition();
    console.log(obj);
})
/*

$('input[type=checkbox]').click(function(){

})

*/







function condition(){
    $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
            dataType: 'jsonp',
            data:obj,
            success: function (data) {
                var item='';
                if (data.success){
                    for (var i=0 ;i<data.data.length;i++) {
                        item +='<li id="'+data.data[i].id+'">'+
                            '<img class="house" src="http://www.zhijunxing.com/yiju/upload/' +data.data[i].photo.split(',')[0]+'" style="width: 250px;height: 180px;"'+
                            '<div class="discription"><span class="span1">'+data.data[i].tittle+'  '+data.data[i].room+' '+data.data[i].type+'</span>'+
                            '<img class="icon" src="jingji.png" alt=""><img class="icon" src="honest.png" alt="">'+
                            '<p class="p1">'+data.data[i].room+'|'+data.data[i].rentway+'|'+data.data[i].hlevel+'|'+data.data[i].floor+'/'+data.data[i].countfloor+'层</p><img src="map.png"><span class="span2">'+data.data[i].address+'</span> <p class="p2">'+
                            '<span class="span3">精装修</span><span class="span4">地铁口</span></p></div>'+
                            '<div class="price"><p><span class="span_price">'+data.data[i].price+'</span><span class="month">/月</span></p>'+
                            '<span class="date">'+data.data[i].addtime+'</span></div></li>'
                    }
                    $('#list').html(item);

                }
            }
        }
    )
}








function getPageNO(){
    var pageNo = 1;

    $(this).addClass('bj').siblings().removeClass('bj');

    Collect(pageNo);

    $('.page-box').on('click', 'a', function () {
        // console.log($('.page-box a').last().prev().html());
        if ($(this).html() == '上一页') {
            if (!(pageNo == 1)) {
                pageNo -= 1;
                Collect(pageNo);
            }
        } else if ($(this).html() == '下一页') {
            if (!(pageNo == $('.page-box a').last().prev().html())) {
                pageNo += 1;
                Collect(pageNo);
            }
        } else {
            pageNo = parseInt($(this).html());
            Collect(pageNo);
        }

    });


    //  pageNo=$('.page-box .page-checked').html();


    // Collect(pageNo);
}

getPageNO();



