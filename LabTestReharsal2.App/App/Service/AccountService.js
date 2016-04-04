var App;
(function (App) {
    "use strict";
    var AccountService = (function () {
        function AccountService($http, $q, authSvc) {
            this.httpService = $http;
            this.qService = $q;
            this.authService = authSvc;
        }
        AccountService.prototype.SignUp = function (data) {
            var self = this;
            var deffered = this.qService.defer();
            var successCallback = function (result) {
                console.log(result);
                return deffered.resolve(result);
            };
            var errorCallback = function (error) {
                console.log(error);
                return deffered.reject(error);
            };
            self.httpService.post("/api/Account/Register", data)
                .then(successCallback, errorCallback);
            return deffered.promise;
        };
        AccountService.prototype.SignIn = function (data) {
            var self = this;
            var deffered = this.qService.defer();
            var successCallback = function (result) {
                console.log(result);
                self.authService.AccountInfo.Username = result.data.userName;
                self.authService.AccountInfo.AccessToken = result.data.access_token;
                self.authService.AccountInfo.IsAuthenticated = true;
                self.authService.SetInfo();
                return deffered.resolve(result);
            };
            var errorCallback = function (error) {
                console.log(error);
                return deffered.reject(error);
            };
            var config = { headers: { 'Content-Type': "application/x-www-form-urlencoded" } };
            var req = "grant_type=password&username=" + data.Username + "&password=" + data.Password;
            console.log(req);
            self.httpService.post('/Token', req, config).then(successCallback, errorCallback);
            return deffered.promise;
        };
        AccountService.$inject = ["$http", "$q", "AuthService"];
        return AccountService;
    }());
    App.AccountService = AccountService;
    angular.module("app").service("AccountService", AccountService);
})(App || (App = {}));
