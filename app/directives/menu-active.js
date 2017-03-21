/**
 * Created by 琴瑟 on 2017/3/19.
 */
(function(angular){
    angular
        .module('moviecat.menu-active',[])
        .directive('menuActive',['$location',function($location){
            return{
                restrict:'A',
                templateUrl:'./directives/menu-active.html',
                link:function(scope,element){
                    console.log('自定义指令中的代码执行了');
                    //最终的思路：监视hash值得变化，修改菜单的选中状态
                    //不管事单击菜单还是直接修改路由中的hash值，最终都修改了URL中的hash值
                    //element 的值是：nav
                    //element.children().children()
                    var lis=element.children().children();
                    scope.location=$location;
                    scope.$watch('location.url()',function(newValue){
                        //console.log(newValue);

                        for(var i=0;i<lis.length;i++){
                           //获取到每一个li
                            //home-page
                            var href=lis.eq(i).children().attr('href').slice(1);
                            //console.log(href);
                            if(newValue.indexOf(href)>-1){
                                lis.eq(i).addClass('active');
                            }
                            else{
                                lis.eq(i).removeClass('active');
                            }
                        }
                    })

                }
            };
        }]);
})(angular);