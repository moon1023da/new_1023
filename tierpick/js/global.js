$(function() {
    const defaultConfig = {
        megaMenu: ".megamenu",
        megaOpenButton: ".btn-megamenu",
        megaCloseButton: "btn-close",
        responsiveMobile: 1024,
    };

    const config = {
        visualPaging: ".visual__paging",
        visualPagingMobile: ".visual__paging__mobile",
        ...defaultConfig,
    };

    const $window = $(window);
    const $btnMega = $(defaultConfig.megaOpenButton);
    const $btnMegaClose = $(defaultConfig.megaCloseButton);
    const $megaMenu = $(defaultConfig.megaMenu);
    const $mobileSize = defaultConfig.responsiveMobile; //객체가 아닌 정수값
    const $visualPagination = $(config.visualPaging);
    const $visualPaginationMobile =$(config.visualPagingMobile);
    let visualPageName =[
        '새해 이벤트', 
        '리뷰 이벤트', 
        '앱 설치 혜택', 
        '피렐리 무상교환', 
        '삼성화제 이벤트', 
        '자동세차 100원'
    ];

    function init(){
        eventListens();
        visualSlide(".visual");
        mdSlide(".md-slide");
    }

    //모바일메뉴 클릭 이벤트 핸들링
    function eventListens() {
        $btnMega.on("click", megaOpen);
        $btnMegaClose.on("click", megaClose);

        //반응형 모바일메뉴 제어 1024기준으로 잡아놓음
        $window.on("resize load", responsive);
    }
    
    function megaOpen() {
        $megaMenu.show();
    }
    function megaClose(){
        $megaMenu.hide();
    }
    
    function responsive(){
        let $windowWidth = $window.width();
        if($windowWidth > $mobileSize) {
            //웹
            megaClose();
            $visualPagination.show();
            $visualPaginationMobile.hide();
        } else {
            //모바일
            $visualPagination.hide();
            swiper2.disable();
            
        }
    }
    //메인 비주얼 슬라이드
    function visualSlide($target) {
        var swiper = new Swiper($target, {
            loop: true,
            pagination: {
                el: config.visualPaging,
                clickable: true,
                renderBullet: function (index, className){
                    return (
                        '<button class="' + 
                        className + '">' + 
                        visualPageName[index] + 
                        "</button>"
                    );
                },
            },
        });


        var swiperFraction = new Swiper($target, {
            pagination: {
                el: config.visualPagingMobile,
                type: "fraction",
                clickable: true,
            },
        });
        
        swiper.controller.control = swiperFraction;
        
    }

    //md추천 영역 모바일 슬라이드 
    function mdSlide($target) {
        var swiper2 = new Swiper($target, {
            loop: true,
            slidesPerview: 3.5,
            spaceBetween: 15,
        });
    }
     
    init();
});