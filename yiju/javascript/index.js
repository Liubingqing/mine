/**
 * Created by Administrator on 2016/9/26 0026.
 */
//显示框的鼠标移进移出
$('#select').hover(
    function(){
        $('#area').show();
    },
    function(){
        $('#area').hide();
    }
)

//显示框的鼠标移进移出
$('#area').hover(
    function(){
        $(this).show();
    },
    function(){
        $(this).hide();
    }
)


$('#search_a1').click(function(){
    $(this).css('color','#ffffff');
    $('#search_a2').css('color','#dddddc');
    $('#fd_area').css('display','none');
    $('#search_blank').css('display','block');
})


$('#search_a2').click(function(){
    $(this).css('color','#ffffff');
    $('#search_a1').css('color','#dddddc');
    $('#fd_area').css('display','block');
    $('#search_blank').css('display','none');

})

$('#a_more').click(function(){
    location.href ='filter.html'
})
$('#search_btn').click(function(){
    location.href ='filter.html'
})


$('#fangdong').click(function(){
    location.href = 'boost.html'
})








//选择地区后，选择框消失。
console.log($('.area_li').eq(0).html());
for(var i=0;i<$('.area_li').length;i++){
       $('.area_li').eq(i).click(function(){
           $('#select').html($(this).html());
           $('#area').hide();
       })
}

//搜索框清除默认值
$('#input_search').focus(function(){
    if($(this).val()=='请输入小区名称'){
        $(this).val('');
    }}
)



$.ajax({
    type: 'post',
    url: 'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType: 'jsonp',
    success: function (data) {
        if (data.success) {
            console.log(data.data.length);
            var item = '';
            for(var i in data.data ){
                item+='<li class="li2" ><a href="detail.html?id='+data.data[i].id+'"><div class="img-l pot img-common">' +
                    '<img src="http://www.zhijunxing.com/yiju/upload/'+
                    data.data[i].photo.split(',')[0]+'"/><p>'+data.data[i].villageName+'</p><div>'+data.data[i].room+'<span>'+data.data[i].price+'</span> 元/月</div></a></li>'
            }

             console.log(item);

            $('#ul_img').append(item);


           /* $('#ul_img a').click(function(){
                this.attr('href','"detail.html?id="+data.data[i].id')

            });*/

            $('#img_box').carousel(
                {
                    element: $('#div_imgContent'),
                    time: 2000,
                    left: $('#pre'),
                    right: $('#next'),
                    oli: 4
                }, false, false);
        }

    }
});



$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType:'jsonp',
    success:function(data){
        console.log(data.data[0]);
        if(data.success){
            $('#header_nav a').eq(0).html('退出').attr({
                'onclick':'quitLogin()',
                'href':'###'
            });
            $('#header_nav a').eq(1).html('欢迎'+data.data[0].lname).attr('href','http://127.168.0.175/yiju/myCollection.html')
        }
    }
})


function quitLogin(){
    $.ajax({
        type:'post',
        url:'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType:'jsonp',
        success:function(data){
            if(data.resultCode=='0000'){
                $('#header_nav a').eq(0).html('登录').attr('href','http://127.168.0.175/yiju/login.html');
                $('#header_nav a').eq(1).html('注册').attr('href','http://127.168.0.175/yiju/register.html').removeAttr('onclick')
            }
        }
    })

}

