module App {
    "use strict";
    export class SigninRequest {
        Username: string;
        Password: string;
    }


    export class SigninController {
        Title: string = "SigninController";
        User: SigninRequest;
        
        private accService: AccountService;
        static $inject: string[] = ["AccountService"];

        constructor(accSvc: AccountService) {
            this.accService = accSvc;
            this.Activate();
        }

        Activate() {
            console.log('i m in signin controller activate method');
        }

        Signin(): void {
            var self = this;

            var success = function (result) {
                console.log(result);
            }

            var error = function (error) {
                console.log(error);
            }

            self.accService.SignIn(self.User);
        }
    }

    angular.module("app").controller("SigninController", SigninController);
}