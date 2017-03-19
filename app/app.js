(function (angular) {
    // "use strict";

    // start your ride

    //主模块，用于加载其他所有模块
    angular
        .module('moviecat',[
            'moviecat.home_page',
            'moviecat.movieList',
            'moviecat.jsonp'
            /*'moviecat.in_theaters',
            'moviecat.top250',
            'moviecat.coming_soon'*/
        ])

})(angular);