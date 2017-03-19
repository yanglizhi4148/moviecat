/**
 * Created by 琴瑟 on 2017/3/19.
 */
(function(angular){
    angular
        .module('moviecat.jsonp',[])
        .service('JsonpSrv',['$window',function($window){
            var doc=$window.document;

            var jsonp=function(url,params,callback){
                url+='?';
                for(var k in params){
                    url+=k + '=' +params[k]+'&';
                }
                var callbackName='itcast_'+(new Date() - 0);
                url+='callback='+callbackName;
                $window[callbackName]=function(data){
                    callback(data);
                    doc.body.removeChild(script);

                    delete  $window[callbackName];
                };
                var script=doc.createElement('script');
                script.src=url;
                doc.body.appendChild(script);

            };
            //暴露获取JSONP数据的方法
            this.jsonp=jsonp;

        }]);
})(angular);