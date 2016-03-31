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
            var success = function (result) {
                console.log(result);
            };
            var error = function (error) {
                console.log(error);
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