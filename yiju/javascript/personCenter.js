/**
 * Created by Administrator on 2016/10/13 0013.
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




