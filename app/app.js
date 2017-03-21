(function (angular) {
    // "use strict";

    // start your ride

    //主模块，用于加载其他所有模块
    angular
        .module('moviecat',[
            'moviecat.home_page',
            //将details模块在movieList之前引入即可
            'moviecat.details',
            'moviecat.movieList',
            'moviecat.jsonp',
            'moviecat.menu-active'
            /*'moviecat.in_theaters',
            'moviecat.top250',
            'moviecat.coming_soon'*/
        ]);

})(angular);