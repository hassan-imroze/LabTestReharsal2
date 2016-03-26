module App {
    "use strict";

    export class StudentService {

        private httpService: angular.IHttpService;
        private qService: angular.IQService;
        static $inject: string[] = ["$http", "$q"];

        constructor($http: angular.IHttpService, $q: angular.IQService) {
            this.httpService = $http;
            this.qService = $q;
        }

        Get() {
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

            self.httpService.get("/api/Student")
                .then(successCallback, errorCallback);
            return deffered.promise;
        }

        EmailExists(email: string) {
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

            self.httpService.get("/api/Student?email=" + email)
                .then(successCallback, errorCallback);
            return deffered.promise;
        }

        Save(data: Student): angular.IPromise<any> {
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

            self.httpService.post("/api/Student", data)
                .then(successCallback, errorCallback);
            return deffered.promise;
        }

    }
    angular.module("app").service("StudentService", StudentService);
}