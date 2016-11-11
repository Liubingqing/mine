/**
 * Created by Administrator on 2016/10/14 0014.
 */

$('#uploadPhotoTab').click(function(){
    location.href = 'http://127.168.0.175/yiju/edit.html';
})
$('#changeNameTab').click(function(){
    location.href = 'http://127.168.0.175/yiju/changeName.html';
})
$('#changePswTab').click(function(){
    location.href = 'http://127.168.0.175/yiju/changePsw.html';
})


$('#content input[type=text]').on({
    focus:function(){
        $(this).css('border-color','rgb(112, 173, 70');
    },
    blur:function(){

        $(this).css('border-color','#981616');
    }

})