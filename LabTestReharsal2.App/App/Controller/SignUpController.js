var App;
(function (App) {
    var SignUpController = (function () {
        function SignUpController(accSvc) {
            this.accService = accSvc;
            this.isSaving = false;
        }
        SignUpController.prototype.SignUp = function () {
            var self = this;
            self.ErrorOrSuccessList = new Array();
            self.isSaving = true;
            if (self.Register.Password.trim() !== self.Register.ConfirmPassword.trim()) {
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push("Pasword and Confirm Pasword Does not Match");
            }
            if (self.ErrorOrSuccessList.length <= 0) {
                self.Save();
            }
            else {
                self.isSaving = false;
            }
        };
        SignUpController.prototype.Save = function () {
            var self = this;
            self.ErrorOrSuccessList = new Array();
            self.isSaving = true;
            var successCallback = function (result) {
                console.log(result);
                self.Register = new App.Register();
                self.statusClass = "successList";
                self.ErrorOrSuccessList.push("Registered Successfully");
                self.isSaving = false;
            };
            var errorCallback = function (error) {
                console.log(error);
                self.statusClass = "errorList";
                self.ErrorOrSuccessList.push(error.data);
                self.isSaving = false;
            };
            self.Register.Email = self.Register.Email.trim();
            self.Register.Password = self.Register.Password.trim();
            self.Register.ConfirmPassword = self.Register.ConfirmPassword.trim();
            self.accService.SignUp(self.Register)
                .then(successCallback, errorCallback);
        };
        SignUpController.$inject = ["AccountService"];
        return SignUpController;
    }());
    App.SignUpController = SignUpController;
    angular.module("app").controller("SignUpController", SignUpController);
})(App || (App = {}));
//# sourceMappingURL=SignUpController.js.map