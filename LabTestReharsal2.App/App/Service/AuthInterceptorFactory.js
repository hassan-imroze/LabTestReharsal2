var App;
(function (App) {
    "use strict";
    var AuthInterceptorFactory = (function () {
        function AuthInterceptorFactory($q, $injector, localStorageService) {
            this.AccountInfo = new App.AccountInfo();
            this.qService = $q;
            this.injectr = $injector;
            this.localStorageService = localStorageService;
        }
        AuthInterceptorFactory.prototype.SetInfo = function () {
            var self = this;
            self.localStorageService.set("AccountInfo", self.AccountInfo);
        };
        AuthInterceptorFactory.prototype.FillAuthData = function () {
            var self = this;
            self.AccountInfo = self.localStorageService.get("AccountInfo");
        };
        AuthInterceptorFactory.prototype.IsAuthenticated = function () {
            return this.AccountInfo && this.AccountInfo.IsAuthenticated;
        };
        AuthInterceptorFactory.$inject = ["$q", "$injector", "localStorageService"];
        return AuthInterceptorFactory;
    }());
    App.AuthInterceptorFactory = AuthInterceptorFactory;
    angular.module("app").factory("AuthInterceptorFactory", AuthInterceptorFactory);
})(App || (App = {}));
