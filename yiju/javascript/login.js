/**
 * Created by Administrator on 2016/10/11 0011.
 */
var off = {};


$('form input[name=lname]').on({
    focus: function () {
        $(this).css({
            'border-color': 'rgb(112, 173, 70)',
            'color':'#000000'
        });

    },
    blur: function () {
        var val = $(this).val();
        isinput(/[\w]{6,20}/.test(val), this);
    },
    click:function(){
        if($(this).val()=='请输入用户名'){
            $(this).val('')
        }
    }
}
).focus();



$('form input[name=lpassword]').on({
    focus: function () {
        // console.log($(this).tagName);


        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur: function () {
        var val = $(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val), this);

    }
});


function isinput(put, _this) {
    if (put) {
        $(_this).css({
            'border-color': 'rgb(112, 173, 70)'
        });
        off[_this.className] = true
    } else {

        $(_this).css({
            'border-color': '#981616'
        });
        off[_this.className] = false;
    }
}

$('form #ok').click(function () {

    var isform = true;
    for (var i in off) {
        if (!off[i]) {
            isform = false;
        }
    }

    if($('input[type=checkbox]').attr('checked')!='checked'){
        isform=false;
        alert('请阅读并勾选服务协议');
    }

    if (isform) {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                if (data.resultCode == 0000) {
                    location.href='http://127.168.0.175/yiju/index.html'
                } else {
                    alert('失败')
                }
            }
        })
    }

})


