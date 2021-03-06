/**
 * Created by 琴瑟 on 2017/3/18.
 */
(function(angular){
    //创建首页模块
    angular
        .module('moviecat.home_page',['ngRoute'])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/home_page',{
                //路径是相对于index.html页面的
                templateUrl:'./home_page/view.html'
            })
                .otherwise({
                    redirectTo:'/home_page'
                })
        }])
        .controller('SearchController',['$scope','$location',function($scope,$location){
            $scope.searchText='';

            $scope.search=function(){
                if($scope.searchText.trim()===''){
                    return;
                }
                //通过$location.url()传入参数，就表示设置hash值
                $location.url('/search?q='+$scope.searchText);
            };
        }]);
})(angular);