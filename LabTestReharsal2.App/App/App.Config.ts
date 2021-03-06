﻿module App {
    export class AppConfig {

        private stateProvider: angular.ui.IStateProvider;
        private urlProvider: angular.ui.IUrlRouterProvider;

        static $inject = ["$stateProvider", "$urlRouterProvider"];
        constructor($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
            this.stateProvider = $stateProvider;
            this.urlProvider = $urlRouterProvider;
            console.log('i m in appconfig.ts');
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state("root", {
                    abstract: true,
                    url: "",
                    template: "<div ui-view class=\"container-fluid slide\"></div>",
                })
                .state("root.home", {
                    url: "/",
                    template: "This is Home",
                })
                .state("root.students", {
                    url: "/Students",
                    templateUrl: "Partials/Student/students.tpl.html",
                    controller: "StudentQueryController",
                    controllerAs: "vm"
                })
                .state("root.studentEntry", {
                    url: "/StudentEntry",
                    templateUrl: "partials/Student/studententry.tpl.html",
                    controller: "StudentController",
                    controllerAs: "vm"
                }).state("root.signup", {
                    url: "/signUp",
                    templateUrl: "partials/account/signup.tpl.html",
                    controller: "SignUpController",
                    controllerAs: "vm"
                }).state("root.signin", {
                    url: "/signin",
                    templateUrl: "partials/account/signin.tpl.html",
                    controller: "SigninController",
                    controllerAs: "vm"
                });
        }
    }

    angular.module("app", ["ngResource", "ui.router","LocalStorageModule"]);
    angular.module("app").config(AppConfig);
}