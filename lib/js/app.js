$(function(){
	$(".header").load('/template/header-nav.html',function(){os.goLogin()});
	$(".footer").load('/template/foot-nav.html');
});

var os={
	goLogin:function(){ 
		
	}
}
/* 
 * 自定义loading加载插件 
 * 中间显示，支持正在加载，正确，以及错误提示
 * msg如果null  默认显示正在加载数据
 * options 支持types参数[error,success]
 * error=错误提示
 * success=正确提示
 * autoclose 是否自动消失提示，默认2秒  
 * duration和autoclose一起使用，可自定义消失时间，默认是毫秒
 * */
var app={
	alert:function(msg,options){		
		if(typeof(msg)=="object"){
			options=msg;
			msg=null;
		}
		if(!msg || msg==null || msg=='undefined'){
			msg='正在加载数据';
		}
		var icons='loading';		
		if(!options){
			options={
				types:'loading',
				autoclose:false,
				duration:2000
			}
		}else{
			options.duration=2000;
		}
		if(options.types=='error'){
			icons='fa fa-exclamation-triangle';
		}
		if(options.types=='success'){
			icons='fa fa-check';
		}
		if(options.types=='loading'){
			icons='fa fa-spinner fa-pulse';
		}
		$("body").append('<div class="page-cover"></div><div class="page-load"><i class="'+icons+'"></i><p>'+msg+'</p></div>');		
		//阻止页面滑动
		$('body').bind('touchmove', function (e) {
			e.preventDefault();
		})
		if(options.autoclose==true){			
			setTimeout(function(){
				app.loadClose();
			},options.duration);
		}
	},
	loadClose:function(){
		$(".page-load,.page-cover").fadeOut(300,function(){
			$(".page-load,.page-cover").remove();
		});
		//恢复页面滑动
		$('body').unbind('touchmove');
	},
	gtop:function(){
		$("body").append('<div class="gotop"><span><i class="mui-icon mui-icon-arrowup"></i></span></div>');	
		 $(window).scroll(function () {
            if ($(window).scrollTop() >= 200) {
                $('.gotop').fadeIn(300);
            } else {
                $('.gotop').fadeOut(300);
            }
        });
		$('.gotop').click(function () {
            $('html,body').animate({ scrollTop: '0px' }, 200);
        });
	},
	//页面无数据显示，支持自定义文字内容
	nodata:function(obj,msg){
		if(!msg || msg==null || msg=='undefined'){
			msg='暂无数据';
		}
		obj.append('<div class="no-data"><i class="iconfont icon-zanwushuju"></i><span>'+msg+'</span></div>')
	},
	//上拉刷新增加DOM  的加载显示
	domload:function(obj,msg){
		if(!msg || msg==null || msg=='undefined'){
			msg='正在加载数据';
		}
		obj.append('<div class="dom-load"><i class="mui-spinner"></i><span>'+msg+'</span></div>')
	},
	//全部加载完成
	loadok:function(obj,msg){
		if(!msg || msg==null || msg=='undefined'){
			msg='全部加载完成';
		}
		obj.append('<div class="dom-load"><span>'+msg+'</span></div>')
	},
	//随机数
	rand:function(){
		var x = 5879;     
    	var y = 0;   
    	return parseInt(Math.random() * (x - y + 1) + y);
	}
}
