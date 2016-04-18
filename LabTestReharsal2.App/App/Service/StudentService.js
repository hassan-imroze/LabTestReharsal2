var App;
(function (App) {
    "use strict";
    var StudentService = (function () {
        function StudentService($http, $q, authSvc) {
            this.httpService = $http;
            this.qService = $q;
            this.AuthSrvice = authSvc;
        }
        StudentService.prototype.Get = function () {
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
            self.httpService.get("/api/Student")
                .then(successCallback, errorCallback);
            return deffered.promise;
        };
        StudentService.prototype.EmailExists = function (email) {
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
            self.httpService.get("/api/Student?email=" + email)
                .then(successCallback, errorCallback);
            return deffered.promise;
        };
        StudentService.prototype.Save = function (data) {
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
            self.httpService.post("/api/Student", data)
                .then(successCallback, errorCallback);
            return deffered.promise;
        };
        StudentService.$inject = ["$http", "$q", "AuthService"];
        return StudentService;
    }());
    App.StudentService = StudentService;
    angular.module("app").service("StudentService", StudentService);
})(App || (App = {}));
//# sourceMappingURL=StudentService.js.map