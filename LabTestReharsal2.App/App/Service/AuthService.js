var App;
(function (App) {
    "use strict";
    var AccountInfo = (function () {
        function AccountInfo() {
        }
        return AccountInfo;
    }());
    App.AccountInfo = AccountInfo;
    var AuthService = (function () {
        function AuthService(localStorageService) {
            this.AccountInfo = new AccountInfo();
            this.localStorageService = localStorageService;
        }
        AuthService.prototype.SetInfo = function (acc) {
            var self = this;
            self.localStorageService.set("AccountInfo", acc);
        };
        AuthService.$inject = ["localStorageService"];
        return AuthService;
    }());
    App.AuthService = AuthService;
    angular.module("app").service("AuthService", AuthService);
})(App || (App = {}));
