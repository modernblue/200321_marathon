// console.log('read.');
$(function() {
// $(".fv__nav").clone(true).addClass("fixed").appendTo(".main__fv");
$(".header__nav .nav__items").clone(true).css("display", "block").appendTo(".menu__cont");
$(".info__items").clone(true).appendTo(".menu__cont");

//
var sexStatus = "men";
if (sexStatus == "men") {
	$(".isWomen").hide();
	$(".isMen").show();
	$(".sex__items .sex__men").addClass("active");
} else {
	$(".isMen").hide();
	$(".isWomen").show();
	$(".sex__items .sex__women").addClass("active");
}

//
});

let txt = 'babel test!';

/*======================================================
初期化
======================================================*/
$(window).load(function() {

	var host = location.hostname;
	// base_url = "https://www.modern-blue.com/ec/cmHeaderSearchProduct/doSearchProduct/cmHeader/%20/%20/1/%20?wd=";

	if (host.indexOf("modern-blue.com") != -1) {
		base_url = "https://www.modern-blue.com";
		shop = "mb";
	} else if (host.indexOf("rakuten.ne.jp") != -1) {
		base_url = "https://item.rakuten.co.jp/mb/";
		shop = "rk";
	} else if (host.indexOf("shopping.geocities.jp") != -1) {
		base_url = "https://shopping.geocities.jp/mb-y/yh/";
		shop = "yh";
	} else if (host.indexOf("localhost") != -1) {
		base_url = "https://www.modern-blue.com";
		shop = "mb";
	} else {
		base_url = "https://item.rakuten.co.jp/mb/";
		shop = "rk";
	}

	$(".shop__url").attr("href", base_url);

	// GAタグの読み込み
	if (shop == "mb") {
		// console.log("本店");
		/*$.ajax({
			url: 'assets/js/ga.min.js',
			dataType: 'script',
			cache: false
		});*/
	} else {
		// console.log("その他");
	};
	// SNSボタンの表示
	if (shop == "mb") {
		$(".sns").show();
	};





});

/*======================================================
ナビゲーションによるスクロール
======================================================*/
$(function() {
	// $('a').click(function() {
	$('a[href^="#"]').click(function() {

		var speed = 500;
		var href= $(this).attr("href");//移動先を取得
		var target = $(href == "#" || href == "" ? "html" : href);
		//var adjust = 103;
		var adjust = 40;

		// Colorbox inline HTML表示用
		if (href == '#inline_content') {
			return true;
		}

		//if ($('.header__nav[data-cat=pc]').is(':hidden') && $('.menu__cont').is(':visible')) {
		if ($('.header__nav').is(':hidden') && $('.menu__cont').is(':visible')) {
			$('.menu__cont').slideToggle();
			$('.toggle').removeClass('active');
			adjust -= 0;
		}

		var position = target.offset().top - adjust;//移動先を数値で取得、メニューの高さ分を差し引く
		$("body, html").animate({scrollTop:position}, speed, "swing");

		return false;
	});
});

/*======================================================
トップに戻るボタン
======================================================*/
$(function(){
	var topBtn = $("#totop");
	var headerNav = $(".header__nav");
	$(window).scroll(function(){
		if ($(this).scrollTop() > 103) {
			topBtn.fadeIn('fast');
			headerNav.addClass("fixd");
		} else {
			topBtn.fadeOut('fast');
			headerNav.removeClass("fixd");
		}
	});
});

/*======================================================
スライダー
======================================================*/
$(function() {
	$('.list__wrap').slick({
		infinite: true,
		slidesToShow: 1,
 		slidesToScroll: 1,
		arrows: true,
		dots: false,
		adaptiveHeight: true,//高さを自動可変
		//vertical: true,//縦スクロールにするか
		asNavFor: '.tabs',
		responsive: [{
			breakpoint: 415,//width:415px以下(SM)
				settings: {
					// variableWidth: false,
					arrows: false,
					// dots:true,
				}
			}/*,
			{
			breakpoint: 415,//width:415px以下(SP)
				settings: {
					variableWidth: false,
				}
			}*/
		]
	});
	$('.tabs').slick({
		infinite: false,
		slidesToShow: 2,//表示するカテゴリーの数に合わせて変更
		slidesToScroll: 1,
		arrows: false,
		asNavFor: '.list__wrap',
		dots: false,
		// centerMode: true,
		focusOnSelect: true
	});
	$('.banner__items').slick({
		arrows: false,
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
 		slidesToScroll: 1
	});
});

/*======================================================
フィルタリング
======================================================*/
/*$(function() {
	$('#tags .tag:not(.a)').hide();// 初期表示はイニシャルAのみを表示

	$("#btns .btn.active").click(function() {
		// console.log(this);
		var initial = this.children[0].className;
		// console.log(initial);
		$('#tags .tag').hide();
		if (initial == "all") {
			$('#tags .tag').fadeIn();
		} else {
			$('#tags .' + initial).fadeIn();
		}
	});
});*/
$(function() {
	$(".sex__items .item").on('click', function() {
		$(".sex__items .item").removeClass("active");
		$(this).addClass("active");
		$(".isMen, .isWomen").hide();

		if ($(this).hasClass("sex__men")) {
			$(".isMen").fadeIn();
		} else if ($(this).hasClass("sex__women")) {
			$(".isWomen").fadeIn();
		}

	});

	$(".headline__btn .btn__sex a").on('click', function() {
		$(".sex__items .item").removeClass("active");
		$(".isMen, .isWomen").hide();

		if ($(this).hasClass("sex__men")) {
			$(".isMen").fadeIn();
			$(".sex__items .sex__men").addClass("active");
		} else if ($(this).hasClass("sex__women")) {
			$(".isWomen").fadeIn();
			$(".sex__items .sex__women").addClass("active");
		}
	});
});

/*======================================================
メニューの表示/非表示
======================================================*/
$(function(){
	$('.toggle').click(function(){
		$('.menu__cont').slideToggle("fast");
		$(this).toggleClass('active');
	});
});

/*======================================================
検索
======================================================*/
$('.onSearch').on('click', function(e){
	// var search_wd = encodeURIComponent('BBGG ' + $(this).siblings().val());
	var search_wd = encodeURIComponent($(this).siblings().val());

	if (shop == "mb") {
		var open_url = "https://www.modern-blue.com/ec/cmHeaderSearchProduct/doSearchProduct/cmHeader/%20/%20/1/%20?wd=" + search_wd;
	} else if (shop == "rk") {
		var open_url = "https://search.rakuten.co.jp/search/mall/" + search_wd + "/?sid=195888";
	} else if (shop == "yh") {
		var open_url = "https://store.shopping.yahoo.co.jp/mb-y/search.html?p=" + search_wd + "#CentSrchFilter1";
	}

	// window.location.href = base_url + wd;
	// open(base_url + search_wd, '_blank');
	open(open_url, '_blank');
});
