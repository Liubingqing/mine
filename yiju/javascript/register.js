/**
 * Created by Administrator on 2016/10/11 0011.
 */
var off={};

$('form input[name=lname]').on({
    focus: function () {
        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        });
    },
    blur:function () {
        var val=$(this).val();
        isinput(/[\w]{6,20}/.test(val),this);
    }
}).focus();

$('form input[name=lpassword]').on({
    focus: function () {
        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,19}/.test(val),this);

    }
});

$('form .input-3').on({
    focus: function () {
        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(val===$('form input[name=lpassword]').val(),this);
        if($(this).val()==''){
            $(this).css({
                'border-color': '#981616'
            });
        }
    }
});

$('form input[name=lemail]').on({
    focus: function () {

        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test(val),this);

    }
});

$('form input[name=lphone]').on({
    focus: function () {

        $(this).css({
            'border-color': 'rgb(112, 173, 70)'
        })
    },
    blur:function () {
        var val=$(this).val();
        isinput(/^1[0-9]{10}$/.test(val),this);
    }
});

function isinput(put,_this){
    if(put){
        $(_this).css({
            'border-color': 'rgb(112, 173, 70)'
        });
        // console.log(_this.className);
        off[_this.className]=true
    }else {

        $(_this).css({
            'border-color': '#981616'
        });
        off[_this.className]=false;
        //console.log($(_this).name());
    }

}

$('form #ok').click(function () {
    var isform=true;

    $('form input').blur();

    for (var i in off){
        if(!off[i]){
            isform=false;
        }
    }

    if($('input[type=checkbox]').attr('checked')!='checked'){
        isform=false;
        alert('请阅读并勾选服务协议');
    }


    if(isform){
        //console.log($('form').serialize());
        $.ajax({
            type:'post',
            url:'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType:'jsonp',
            data:$('form').serialize(),
            success: function (data) {
                $('#logBox').show();
                if(data.resultCode=='0000'){
                    /*location.href='http://127.168.0.175/yiju/login.html'*/
                }
                $('#i_quit').click(function(){
                    $('#logBox').hide();
                })

                $('#a_login').click(
                   function(){
                       $.ajax({
                           type:'post',
                           url:'http://www.zhijunxing.com/yiju/landlordLogin.action',
                           dataType:'jsonp',
                           data: {
                               lname:$('form input[name=lname]').val(),
                               lpassword:$('form input[name=lpassword]').val()
                           },
                           success: function (data) {
                               if (data.resultCode == 0000) {
                                   location.href = 'http://127.168.0.175/yiju/index.html'
                               } else {
                                   alert('失败')
                               }

                           }
                       })
                   }



                )


            }
        })
    }

})

/**
 * Created by Administrator on 2016/10/11 0011.
 */


