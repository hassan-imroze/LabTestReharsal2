angular.module('app').factory("authInterceptorService", [
       "$q", "$injector", "AuthService", function ($q, $injector, authService) {

           var authInterceptorServiceFactory = {};

           var request = function (config) {

               config.headers = config.headers || {};
               //  config.headers.Mama = 'mamamama';
               authService.FillAuthData();
               if (authService.IsAuthenticated()) {
                   config.headers.Authorization = "Bearer " + authData.AccessToken;
                   config.headers.Mama = new Date().toJSON();
               }

               console.log(config);

               return config;
           };
           var responseError = function (rejection) {
               if (rejection.status === 401) {
                   console.log('permission rejection');
                   console.log(rejection);
               }
               return $q.reject(rejection);
           };
           authInterceptorServiceFactory["request"] = request;
           authInterceptorServiceFactory["responseError"] = responseError;

           return authInterceptorServiceFactory;
       }
]);
angular.module("app").config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push("authInterceptorService");
}]);

//angular.module("app").run([
//    "AuthService", authService => {
//        authService.FillAuthData();
//    }
//]);

angular.module("app").run([
      "$rootScope", "$state",  "AuthService", function ($rootScope, $state, authService) {
          $rootScope.$on("$stateChangeStart",
              function (event, toState, toParams, fromState, fromParams) {
                  var key = toState.name.replace('root.', '');;
                    console.log(toState);
              });
      }
]);