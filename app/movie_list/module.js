/**
 * Created by 琴瑟 on 2017/3/18.
 */
(function(angular){
    //创建电影列表模块，统一实现其他三个模块的功能
    angular
        .module('moviecat.movieList',['ngRoute'])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/:movieType/:pages?',{
                templateUrl:'./movie_list/view.html',
                controller:'MovieListController'
            });
        }])
        .controller('MovieListController',['$scope','$http','$routeParams','$route','JsonpSrv',function($scope,$http,$routeParams,$route,JsonpSrv){
            //获取到路由参数，即：电影类型
            console.log($routeParams);

            //分页的计算：

            //用大写字母来表示固定的值
            var COUNT=5;
            //
            var curPage=($routeParams.page||'1')-0;
            //
            $scope.curPage=curPage;

            var startNum=(curPage-1)*COUNT;

            //分页功能
            $scope.goPage=function(currentPage){
                if(currentPage<1||currentPage>$scope.totalPage){
                    return;
                }
                $route.updateParams({page:currentPage});
            };

            //根
            JsonpSrv.jsonp('https://api.douban.com/v2/movie/'+$routeParams.movieType,{
                start:startNum,
                count:COUNT
            },function(data){
                //在回调函数中获取到jsonp返回的数据
                console.log(data);
                //
                $scope.movieList=data;

                $scope.totalPage=Math.ceil(data.total/COUNT);

                //
                $scope.$apply();
            });
        }])
})(angular);