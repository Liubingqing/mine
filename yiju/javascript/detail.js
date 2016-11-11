/**
 * Created by Administrator on 2016/10/24 0024.
 */
//获取登陆者信息

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

//解析url
function getUrlParams(name){

    var href = window.location.href;

    var str = (href.substr(href.indexOf("?")+1)).split("&");

    var params = [];
    for(var i=0; i<str.length; i++){
        params.push(str[i].split("="))
    }

    for(var i=0; i<params.length; i++){
        if(params[i][0] == name){
            return params[i][1];
        }
    }
}

//装备图标
function testIcon(arr){

    var str1='';
    for(var i=0;i<arr.length;i++){
            switch (arr[i]){
                case '床':  str1+='<dd><img src="chuang.png">床</dd>'
                    break;

                case '衣柜':  str1+='<dd><img src="chuang.png">衣柜</dd>'
                    break;

                case '沙发':  str1+='<dd><img src="chuang.png">沙发</dd>'
                    break;

                case '书桌':  str1+=' <dd><img src="shuzhuo.png">书桌</dd>'
                    break;
                case '电视':  str1+='<dd><img src="dianshi.png">电视</dd>'
                    break;
                case '冰箱':  str1+=' <dd><img src="bingxiang.png">冰箱</dd>'
                    break;
                case '微波炉':  str1+='<dd><img src="weibolu.png">微波炉</dd>'
                    break;
                case '电磁炉':  str1+='<dd><img src="diancilu.png">电磁炉</dd>'
                    break;
                case '洗衣机':  str1+='<dd><img src="xiyiji.png">洗衣机</dd>'
                    break;
                case '热水':  str1+='<dd><img src="reshui.png">热水</dd>'
                    break;
                case '宽带':  str1+=' <dd><img src="wangluo.png">宽带</dd>'
                    break;
                case '暖气':  str1+='<dd><img src="nuanqi.png">暖气</dd>'
                    break;
            }

        }
    return str1;
    }



//获取房源信息

$.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryHousesByid.action',
        dataType: 'jsonp',
        data:{
            id:getUrlParams('id')
        },
        success: function (data) {
            var item = '<dt >房源配置</dt>';
            if (data.success){

                 console.log(data.data[0]);
                //描述的动态生成
                  item ='<p>'+data.data[0].tittle+'</p>'+
                        '<ul>'+
                        '<li><span id="zujin">租金:</span><span class="yellow big normal">'+data.data[0].price+'</span><span class="yellow normal">/月</span></li>'+
                        '<li><span>面积：'+data.data[0].area+'m<sup>2</sup></span><span>户型：'+data.data[0].room+'</span></li>'+
                        '<li><span>朝向：'+data.data[0].direction+'</span><span>装修：'+data.data[0].hlevel+'</span></li>'+
                        '<li><span>租金押付：'+data.data[0].paymethod+'</span><span>租赁方式：'+data.data[0].rentway+'</span></li>'+
                        '<li><span>特色：'+data.data[0].features+'</span></li>'+
                        '<li><span>地址：'+data.data[0].address+'</span></li>'+
                        '</ul>'+
                        '<button>'+data.data[0].linkphone+' '+data.data[0].linkman+'</button>'+
                        '<span class="span_icon" id="collect"><img src="favorateFalse.png"><i>收藏</i></span>'+
                   ' <span class="span_icon"><img src="share.png"><i>分享</i></span>';
                $('#right_box').html(item);
                $('#big_img').attr('src','http://www.zhijunxing.com/yiju/upload/'+
                    data.data[0].photo.split(',')[0]);


                //小图的动态生成
                var str2=''
                for(var i=0;i<data.data[0].photo.split(',').length;i++){
                    str2+= '<li><img src="http://www.zhijunxing.com/yiju/upload/'+data.data[0].photo.split(',')[i]+'" alt=""></li>'
                }

                $('#img_box ul').html(str2);
                //小图的点击事件
                $('#img_box ul li img').click(function(){
                    $('#img_box ul li img').attr('class','');
                    $(this).attr('class','img_select');
                    $('#big_img').attr('src',$(this).attr('src'));
                })
                //处理家具标签的动态生成
                var arr=data.data[0].furniture.split(',');
                $('#fangyuan').html(testIcon(arr));

                //收藏按钮点击事件
                $('#collect').click(function(){
                    $.ajax({
                        type: 'post',
                        url: 'http://www.zhijunxing.com/yiju/addCollect.action',
                        dataType: 'jsonp',
                        data:{
                            id:getUrlParams('id')
                        },
                        success:function(data){
                            if(data.resultCode=='0000'){
                                alert('收藏成功')
                            }
                        }
                    })
                })


            }
        }
    }
)


// 百度地图API功能
var map = new BMap.Map("allmap");    // 创建Map实例

map.centerAndZoom("郑州", 11);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
map.setCurrentCity("郑州");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
var overView = new BMap.OverviewMapControl();
var overViewOpen = new BMap.OverviewMapControl({isOpen:true, anchor: BMAP_ANCHOR_BOTTOM_RIGHT});
map.addControl(overView);
map.addControl(overViewOpen);
map.addControl(new BMap.ScaleControl());//添加比例尺控件

//猜你喜欢

$.ajax({
    type:'post',
    dataType:'jsonp',
    url:'http://www.zhijunxing.com/yiju/queryHousesLike.action',
    success:function(data){
        var str3 = '<dt>猜你喜欢</dt>';
        console.log(str3);
        if(data.success){
            str3+=' <dd class="fl"><img src="like.png"><span class="span1">曼哈顿 地铁口 家电齐全 三室两厅</span>'+
            '<p class="p1">三室二厅|合租|豪华装修|15/23层</p>'+
            '<img src="map.png"><span class="span2">曼哈顿 商城国际</span>'+
            '</dd>'
        }
    }
})