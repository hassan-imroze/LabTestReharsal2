module App {
    "use strict";

    export class AccountService {

        private httpService: angular.IHttpService;
        private qService: angular.IQService;
        private authService: AuthService; 
        static $inject: string[] = ["$http", "$q", "AuthService"];

        constructor($http: angular.IHttpService, $q: angular.IQService, authSvc: AuthService ) {
            this.httpService = $http;
            this.qService = $q;
            this.authService = authSvc;
        }

        //Get() {
        //    var self = this;
        //    var deffered = this.qService.defer();

        //    var successCallback = result => {
        //        console.log(result);
        //        return deffered.resolve(result);
        //    };
        //    var errorCallback = error => {
        //        console.log(error);
        //        return deffered.reject(error);
        //    };

        //    self.httpService.get("/api/Student")
        //        .then(successCallback, errorCallback);
        //    return deffered.promise;
        //}

        //EmailExists(email: string) {
        //    var self = this;
        //    var deffered = this.qService.defer();

        //    var successCallback = result => {
        //        console.log(result);
        //        return deffered.resolve(result);
        //    };
        //    var errorCallback = error => {
        //        console.log(error);
        //        return deffered.reject(error);
        //    };

        //    self.httpService.get("/api/Student?email=" + email)
        //        .then(successCallback, errorCallback);
        //    return deffered.promise;
        //}

        SignUp(data: Register): angular.IPromise<any> {
            var self = this;
            var deffered = this.qService.defer();

            var successCallback = result => {
                console.log(result);
                return deffered.resolve(result);
            };
            var errorCallback = error => {
                console.log(error);
                return deffered.reject(error);
            };

            self.httpService.post("/api/Account/Register", data)
                .then(successCallback, errorCallback);
            return deffered.promise;
        }

        SignIn(data: SigninRequest): angular.IPromise<any> {
            var self = this;
            var deffered = this.qService.defer();

            var successCallback = result => {
                self.authService.AccountInfo.Username = result.data.userName;
                self.authService.AccountInfo.AccessToken = result.data.access_token;
                return deffered.resolve(result);
            };
            var errorCallback = error => {
                return deffered.reject(error);
            };

            var config: angular.IRequestShortcutConfig = { headers: { 'Content-Type': "application/x-www-form-urlencoded" } };
            var req = "username=" + data.Username + "&password=" + data.Password + "&grant_type=password";
            
            self.httpService.post('/token', req, config).then(successCallback, errorCallback);
            return deffered.promise;
        }

    }
    angular.module("app").service("AccountService", AccountService);
}