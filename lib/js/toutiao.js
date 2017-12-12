$(function() {
	//app.load();
	
	swiperInit();
	var bannerSwiper = new Swiper ('#ban1', {
		preloadImages: true,
		lazyLoading: true,
		centeredSlides: true,
	    autoplay: 2500,
	    autoplayDisableOnInteraction: false,
	    loop: true,
		pagination: '.swiper-pagination'		    
	});
	$(".news-wrap a").click(function(){
		window.location.href='/news/info.html';
	});
});


function swiperInit(){
	//获得页面宽度
	var winW=$(window).width();
	//单位的宽度
	var unitW=winW/4;
	//获得导航的个数
	var navCount=$(".snav-header .swiper-slide").length;
	//顶部导航
	new Swiper('.snav-header', {
		slidesPerView: 4,
		freeMode: true
	});
	//计算内容高度
	$(".news-wrap>.swiper-wrapper>.swiper-slide").css({
		'height': $(window).height() - 132
	});
	//内容滚动
	var swiper = new Swiper('.news-wrap', {
		//拖动已完成事件
		onSlideChangeEnd: function(o) {
			console.log(o.activeIndex);
			$(".snav-header .swiper-slide").removeClass('active');
			$(".snav-header .swiper-slide").eq(o.activeIndex).addClass('active');			
			$(".nav-tip").animate({'left':+(25*o.activeIndex+2.5)+"%"});
			var that=document.getElementById('snav-wrapper');	
			if(o.activeIndex>2 && navCount>o.activeIndex+1){							
				swiperTran(that,-(o.activeIndex-2)*unitW);
			}
			if(o.activeIndex<3){
				swiperTran(that,0);
			}
		},
		//拖动进行中事件
		onProgress: function(swiper, progress) {
			//console.log(swiper.activeIndex);
			if(progress>0){
				//$(".nav-tip").css({'left':+(25*(progress*9.2))+"%"});
			}				
		}
	});
	$(".snav-header .swiper-slide").on('click', function() {
		$(this).addClass("active").siblings().removeClass('active');
		var index = $(this).index();
		$(".nav-tip").animate({'left':+(25*index+2.5)+"%"});
		swiper.slideTo(index);
	});
}

function swiperTran(that,v){
	that.style.transform="translate3d("+v+"px,0,0)"; 
	that.style.webkitTransform="translate3d("+v+"px,0,0)"; 
	that.style.transitionDuration=".5s";
	that.style.webkitTransitionDuration=".5s";
}
