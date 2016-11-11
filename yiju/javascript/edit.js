/**
 * Created by Administrator on 2016/10/14 0014.
 */

$('#uploadPhotoTab').click(function(){
    $(this).addClass('li_selected').siblings().removeClass('li_selected');
    $('#changePhoto').show();
    $('#changeName').hide();
    $('#changePsw').hide();
})
$('#changeNameTab').click(function(){
    $(this).addClass('li_selected').siblings().removeClass('li_selected');
    $('#changePhoto').hide();
    $('#changeName').show();
    $('#changePsw').hide();
})
$('#changePswTab').click(function(){
    $(this).addClass('li_selected').siblings().removeClass('li_selected');
    $('#changePhoto').hide();
    $('#changeName').hide();
    $('#changePsw').show();
})

login();

/*登录。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/
function login(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            if(data.success){
                pass = data.data[0].lpassword;
               /* var a='<a href="###">'+data.data[0].lname+'</a>|<a href="###" onclick="quitLogin()" >退出</a>';
                $('#header_nav').html(a);*/
                $('#header_nav a').eq(0).html('退出').attr({
                    'onclick':'quitLogin()',
                    'href':'###'
                });
                $('#header_nav a').eq(1).html(data.data[0].lname).attr('href','http://127.168.0.175/yiju/personCenter.html')
                $('#nicheng').html(data.data[0].lname);
                if(data.data[0].lphoto){
                    $('#photo_box img').attr('src','http://www.zhijunxing.com/yiju/upload/'+data.data[0].lphoto);
                }else{
                    alert('没有图片');
                }
            }else{
                location.href = 'http://127.168.0.175/yiju/login.html';
            }

        }
    });
}



$('#input_parent').on('change',$('#uploadPhoto'),function(){
    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var reader= new FileReader();
    var i = document.getElementById('uploadPhoto');
    var val=i.files[0];
    reader.readAsDataURL(val);
    reader.onload=function(){
        $('#bigPhoto_box img').attr('src',reader.result);
    }

})





/*上传图像。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/

/*
$('#uploadPhoto').change(function () {

    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }

    var reader= new FileReader(),
        val=this.files[0];
        console.log(val);
        reader.readAsDataURL(val);
        reader.onload=function(){
        $('#bigPhoto_box img').attr('src',reader.result);
    }
});

*/


$('#save').click(function () {
    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
        secureuri: false,
        fileElementId:'uploadPhoto',
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        complete: function(data){
            console.log(data);
        }
    });
    setTimeout(login,1000)
});


function quitLogin(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            console.log(data);
            if(data.resultCode=='0000'){
                location.href = 'http://192.168.0.175/yiju/01/index1.html';
            }

        }
    });

}
/*修改昵称。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/

$('#changeName input[type=text]').on({

    focus: function () {
        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        });
    },
    blur: function () {
        var val = $(this).val();
        if (/[\w]{6,20}$/.test(val)) {
            $('#changeName input[class=inputButton_select]').click(function () {
                $.ajax({
                    type: 'post',
                    url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                    dataType: 'jsonp',
                    data: {
                        lname: val
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.resultCode == '0000') {
                            login();
                        }
                    }
                })
            })
        }
    }
});

/*修改密码。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。*/
var pass;
$('#changePsw span input').focus(function () {

    $(this).css({
        'border-color': 'rgb(112, 173, 70)'
    });
});

$('#changePsw span input').eq(0).blur(function () {
    var val = $(this).val();
    console.log(val == pass);
    if (!(val == pass)) {

        $(this).css({
            'border-color': '#981616'
        });
    }
});

$('#changePsw span input').eq(1).blur(function () {
    var val = $(this).val();
    if (!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))) {
        $(this).css({
            'border-color': '#981616'
        });
    }

});

$('#changePsw span input').eq(2).blur(function () {
    var val = $(this).val();
    if (!(val == '' ? false : val === $('#changePsw span input').eq(1).val())) {
        $(this).css({
            'border-color': '#981616'
        });
    }

});


$('#changePsw #changePsw_save').click(function () {
    if (
        $('#changePsw span input').eq(0).val() == pass &&
        /^[a-zA-Z0-9][\w]{5,19}/.test($('#changePsw span input').eq(1).val()) &&
        $('#changePsw span input').eq(2).val() === $('#changePsw span input').eq(1).val()
    ) {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
            dataType: 'jsonp',
            data: {
                lpassword: $('#changePsw span input').eq(2).val()
            },
            success: function (data) {
                if (data.resultCode == '0000') {
                    alert('修改密码成功');
                    login();
                }
            }
        })

    }
});

