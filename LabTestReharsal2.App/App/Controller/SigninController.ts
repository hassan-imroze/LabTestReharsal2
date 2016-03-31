module App {
    "use strict";
    export class SigninRequest {
        Username: string;
        Password: string;
    }


    export class SigninController {

        Title: string = "SigninController";
        User: SigninRequest;
        ErrorOrSuccessList: string[];
        statusClass: string;
        isSaving: boolean;

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
            self.ErrorOrSuccessList = new Array<string>();
            self.isSaving = true;

            var success = function (result) {
                console.log(result);
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Signed In");
                self.isSaving = false;
            }

            var error = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;

            }

            self.accService.SignIn(self.User);
        }
    }

    angular.module("app").controller("SigninController", SigninController);
}