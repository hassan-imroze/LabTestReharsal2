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
        function SigninController(accSvc) {
            this.Title = "SigninController";
            this.accService = accSvc;
            this.Activate();
        }
        SigninController.prototype.Activate = function () {
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
            };
            var error = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };
            self.accService.SignIn(self.User);
        };
        SigninController.$inject = ["AccountService"];
        return SigninController;
    }());
    App.SigninController = SigninController;
    angular.module("app").controller("SigninController", SigninController);
})(App || (App = {}));
//# sourceMappingURL=SigninController.js.map