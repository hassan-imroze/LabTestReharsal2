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
        private stateService: angular.ui.IStateService;
        private rootScopeService: angular.IRootScopeService;
        static $inject: string[] = ["AccountService", "$state", "$rootScope"];

        constructor(accSvc: AccountService, state: angular.ui.IStateService, $rootScope: angular.IRootScopeService) {
            this.accService = accSvc;
            this.stateService = state;
            this.rootScopeService = $rootScope;
            this.Activate();
        }

        Activate() {
            if (this.accService.authService.IsAuthenticated()) {
                this.stateService.go('root.home');
            }
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
                self.rootScopeService.$broadcast("SignedIn");
                self.isSaving = false;
                self.stateService.go('root.home');
            }

            var error = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;

            }

            self.accService.SignIn(self.User).then(success, error);
        }

        
        
    }

    angular.module("app").controller("SigninController", SigninController);
}