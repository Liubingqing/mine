/**
 * Created by Administrator on 2016/10/19 0019.
 */

//退出登录函数
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


//获取登录信息
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


//设置家具点击事件
$('.houseConfigure').click(
    function() {
        if ($(this).attr('class') == 'houseConfigure select pointer') {
            $(this).attr('class', 'houseConfigure pointer');
        } else {
            $(this).attr('class', 'houseConfigure select pointer');
        }
    }

)

//获取家具
function getfurniture(){
  /*  console.log($('.houseConfigure').eq(2).attr('name'));*/
    var str = '';
    for(var i=0;i<$('.houseConfigure').length;i++){
        if(($('.houseConfigure').eq(i).attr('class'))=='houseConfigure select pointer'){
            str+=$('.houseConfigure').eq(i).attr('name')+',';
        }
    }
    //去掉最后一个逗号
    var strr = str.split('');
    strr.pop();
    return strr.join('');
}

//获取几室几厅
function getroom(){
    var item,input;
    input = document.getElementById('room').getElementsByTagName('input');
    item=input[0].value+'+'+input[1].value+'+'+input[2].value;
    return item;

}

/*encodeURI()
decodeURI()*/

//设置发布按钮点击事件

$('#btn_boost').click(
    function(){
        console.log(getData());
        $.ajax({
            type:'post',
            dataType:'jsonp',
            data:getData(),
            url:'http://www.zhijunxing.com/yiju/addHouses.action',
            success:function(){
                if(data.resultCode=='0000'){
                    alert(11);
                }
            }
        });

    }

);

//获取ajax的data对象
function getData() {
        var obj={};
        var arr1 = [], arr2 = [];
        arr1 = $('form').serialize().split('&');
        for (var i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i].split('='));
            obj[arr2[i][0]]=decodeURI(arr2[i][1]);
        }

        obj['Room']=getroom();
        obj['furniture']=getfurniture();
        console.log(obj);
        return obj;
}



