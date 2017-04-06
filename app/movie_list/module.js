/**
 * Created by 琴瑟 on 2017/3/18.
 */
(function(angular){
    //创建电影列表模块，统一实现其他三个模块的功能
    angular
        .module('moviecat.movieList',['ngRoute'])
        .config(['$routeProvider',function($routeProvider){
            $routeProvider.when('/:movieType/:page?',{
                templateUrl:'./movie_list/view.html',
                controller:'MovieListController'
            });
        }])
        .controller('MovieListController',['$scope','$http','$routeParams','$route','JsonpSrv',function($scope,$http,$routeParams,$route,JsonpSrv){
            //获取到路由参数，即：电影类型
            console.log($routeParams);
            $scope.isLoading=true;

            //分页的计算：
            //Math.ceil(27/5)

            //用大写字母来表示固定的值
            var COUNT=5;
            //通过路由参数获取当前页，并设置默认值
            var curPage=($routeParams.page||'1')-0;
            //暴露视图中使用
            $scope.curPage=curPage;

            var startNum=(curPage-1)*COUNT;

            //分页功能
            $scope.goPage=function(currentPage){
                //currentpage就表示当前页码，就是要根据当前页码获取指定的数据
                //只需让URL中的值发生变化，那么控制器中的代码就会重新执行
                //只要重新执行，就能够获取到当前页码并且发送请求获取
                if(currentPage<1||currentPage>$scope.totalPage){
                    return;
                }
                //通过修改路由参数来实现的分页功能
                //调用updateParams方法，更新路由数据
                $route.updateParams({page:currentPage});
            };

            //根据不同的路由，请求不同的接口，获取相对于那个的数据
            JsonpSrv.jsonp('https://api.douban.com/v2/movie/'+$routeParams.movieType,{
                start:startNum,
                count:COUNT,
                //这个q是为了电影搜索功能添加的参数，但是对于其他接口来说
                //因为其他的接口是不会获取q参数的，所以多了一个q参数，也不会对其他
                //接口产生影响
                q:$routeParams.q||''
            },function(data){
                //在回调函数中获取到jsonp返回的数据
                console.log(data);
                //因为发送JSONP请求是一个异步操作，异步操作时不会触发angular的双向绑定机制的
                $scope.movieList=data;

                $scope.totalPage=Math.ceil(data.total/COUNT);

                //隐藏加载动画效果
                $scope.isLoading=false;
                //手动触发angular的双向绑定机制，触发该机制，将数据的变化映射到视图中
                $scope.$apply();
            });
        }])
})(angular);