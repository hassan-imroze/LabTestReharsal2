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
        function SigninController(accSvc, state, $rootScope) {
            this.Title = "SigninController";
            this.accService = accSvc;
            this.stateService = state;
            this.rootScopeService = $rootScope;
            this.Activate();
        }
        SigninController.prototype.Activate = function () {
            if (this.accService.authService.IsAuthenticated()) {
                this.stateService.go('root.home');
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
                self.rootScopeService.$broadcast("SignedIn");
                self.isSaving = false;
                self.stateService.go('root.home');
            };
            var error = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };
            self.accService.SignIn(self.User).then(success, error);
        };
        SigninController.$inject = ["AccountService", "$state", "$rootScope"];
        return SigninController;
    }());
    App.SigninController = SigninController;
    angular.module("app").controller("SigninController", SigninController);
})(App || (App = {}));
//# sourceMappingURL=SigninController.js.map