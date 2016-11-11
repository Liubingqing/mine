/**
 * Created by Administrator on 2016/10/17 0017.
 */
$.ajax({
    type: 'post',
    dataType: 'jsonp',
    url: 'http://www.zhijunxing.com/yiju/loginSession.action',
    success: function (data) {
        console.log(data.data[0].lphoto);
        if (data.success) {
            $('#header_nav a').eq(0).html('退出').attr({
                'onclick':'quitLogin()',
                'href':'###'
            });

            $('#header_nav a').eq(1).html(data.data[0].lname);
            $('#nicheng').html(data.data[0].lname);
            $('#photo_box img').attr('src', 'http://www.zhijunxing.com/yiju/upload/'+data.data[0].lphoto);
        }
    }
})


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

/*点击*/

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



/*-----------------------------------------我的收藏---------------------------------------*/
/*


 for(var  i=100;i<200;i++){
 $.ajax({
 type: 'get',
 url: 'http://www.zhijunxing.com/yiju/addCollect.action',
 dataType: 'jsonp',
 data: {
 hid: i
 },
 success: function (data) {
 console.log(data);
 }
 });
 }
 */


function Collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo
        },
        success: function (data) {


            console.log(data.rowCount);
            if (data.success) {
                var a;
                if (Math.ceil(data.rowCount / 2) <= 5  ) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= Math.ceil(data.rowCount / 2); i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo <= 3  ) {

                    a = '<a href="###">上一页</a>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            a += '<a href="###" class="page-checked">' + i + '</a>'
                        } else {
                            a += '<a href="###">' + i + '</a>'
                        }
                    }
                    a += '<b> ··· </b><a href="###">' + Math.ceil(data.rowCount / 2) + '</a><a href="###">下一页</a>';

                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                            a += '<a href="###" class="page-checked">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        } else {
                            a += '<a href="###">' + (Math.ceil(data.rowCount / 2) - i) + '</a>'
                        }
                    }
                    a += '<a href="###">下一页</a>';

                } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                    a = '<a href="###">上一页</a>' +
                        '<a href="###">1</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + (parseInt(pageNo) - 1) + '</a>' +
                        '<a href="###" class="page-checked">' + pageNo + '</a>' +
                        '<a href="###">' + (parseInt(pageNo) + 1) + '</a>' +
                        '<b> ··· </b>' +
                        '<a href="###">' + Math.ceil(data.rowCount / 2) + '</a>' +
                        '<a href="###">下一页</a>';
                }

                $('.page-box').html(a);

                var item = '';

             /*   for (var i=0 ;i<data.data.length;i++) {
                    item += '<li class="j-clear"><div  class="center-l center-img1">' +
                        '<img src="http://www.zhijunxing.com/yiju/upload/' + data.data[i].photo.split(',')[0]+'" alt="" style="width: 100%;height: 100%;">' + '</div>' +
                        '<div class="center-m"><p>'+data.data[i].tittle+'  '+data.data[i].room+'<b>'+data.data[i].type+'</b><a href="###"><i class="ren"></i></a><a href="###"><i class="cheng"></i></a></p><span>3室2厅 | 合租 | 豪华装修 | 15/32层</span><span><i class="location"></i>曼哈顿 ［金水-燕庄 金水路未来路交汇处］</span><s>精装修</s><u>地铁口</u></div>' +
                        '<div></div>' +
                        '</li>'
                }*/

                for (var i=0 ;i<data.data.length;i++) {
                    item +='<li><span class="span_deleteTab Tab">删除</span><span class="span_editTab Tab">编辑</span>'+
                        '<img class="house" src="http://www.zhijunxing.com/yiju/upload/' +data.data[i].photo.split(',')[0]+'" style="width: 254px;height: 208px;'+
                            '<div class="discription"><span class="span1">'+data.data[i].tittle+'  '+data.data[i].room+' '+data.data[i].type+'</span>'+
                            '<img class="icon" src="jingji.png" alt=""><img class="icon" src="honest.png" alt="">'+
                            '<p class="p1">三室二厅|合租|豪华装修|15/23层</p><img src="map.png"><span class="span2">曼哈顿[金水-燕庄 金水路未来路交汇处]</span> <p class="p2">'+
                        '<span class="span3">精装修</span><span class="span4">地铁口</span></p></div>'+
                            '<div class="price"><p><span class="span_price">1300</span><span class="month">/月</span></p>'+
                            '<span class="date">今天</span></div></li>'
                }
                 $('#list').html(item);
                 $('.span_deleteTab').click(function(){

                     //记录房源的id
                     var houseId = data.data[0].id;
                     $.ajax({
                         type:'post',
                         dataType:'jsonp',
                         data:{
                             id:houseId
                         },
                         url:'http://www.zhijunxing.com/yiju/delHousesByidByLand.action'
                     })
                 })

            } else {

                alert('您没有收藏房源！');
            }
        }
    })
}

