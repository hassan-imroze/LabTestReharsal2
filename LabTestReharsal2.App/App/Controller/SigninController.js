var App;
(function (App) {
    "use strict";
    var SigninRequest = (function () {
        function SigninRequest() {
        }
        return SigninRequest;
    }());
    App.SigninRequest = SigninRequest;
    var SigninController = (function () {
        function SigninController(accSvc, state) {
            this.Title = "SigninController";
            this.accService = accSvc;
            this.stateService = state;
            this.Activate();
        }
        SigninController.prototype.Activate = function () {
            if (this.accService.authService.IsAuthenticated()) {
                this.stateService.go('root');
            }
            console.log('i m in signin controller activate method');
        };
        SigninController.prototype.Signin = function () {
            var self = this;
            self.ErrorOrSuccessList = new Array();
            self.isSaving = true;
            var success = function (result) {
                console.log(result);
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Signed In");
                self.isSaving = false;
                self.stateService.go('root');
            };
            var error = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };
            self.accService.SignIn(self.User).then(success, error);
        };
        SigninController.$inject = ["AccountService", "$state"];
        return SigninController;
    }());
    App.SigninController = SigninController;
    angular.module("app").controller("SigninController", SigninController);
})(App || (App = {}));
